<template>
    <div>
        <NavBar tab="meeting" />

        <div class="container">
            <h1 class="mb-1">Meetings</h1>
            <hr />
            <div class="sub-title">
                <div><router-link to="meetings-filter" class="link-plain">Filter/Search meetings</router-link></div>
                <div class="selected-sub-title">
                    <router-link to="meetings-add" class="link-plain">Add a meeting</router-link>
                </div>
            </div>
            <div class="add-section bg-primary mt-1 mb-3">
                <h2 class="mb-1">Add a new meeting</h2>
                <hr />
                <form @submit.prevent="onSubmit" id="add-meetings">
                    <div>
                        <div>
                            <label for="name">Name of the meeting</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                id="name"
                                v-model="name"
                                name="name"
                                class="add-block"
                                placeholder="AWS training sessions"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label for="date">Date</label>
                        </div>
                        <div>
                            <input type="date" v-model="date" id="date" name="date" class="add-block" />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label for="start-time">Start time (hh:mm AM/PM)</label>
                        </div>
                        <div>
                            <input
                                type="time"
                                v-model="startTime"
                                id="start-time"
                                name="startTime"
                                class="time-block"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label for="end-time">End time (hh:mm AM/PM)</label>
                        </div>
                        <div>
                            <input type="time" v-model="endTime" id="end-time" name="endTime" class="time-block" />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label for="description">Description</label>
                        </div>
                        <div>
                            <textarea
                                rows="1"
                                cols="100%"
                                name="description"
                                id="description"
                                v-model="description"
                                class="add-block"
                                placeholder="What is the agenda of the meeting ?"
                            ></textarea>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label for="attendees">EmailID's of attendees, or team's short</label>
                        </div>

                        <div>
                            <input
                                type="text"
                                id="attendees"
                                v-model="attendees"
                                name="attendees"
                                class="add-block"
                                placeholder="john@example.com, @teamname"
                            />
                            <div>
                                <span
                                    >Seprate emailId's/team short names by commas- team short names always begin with
                                    @</span
                                >
                            </div>
                        </div>
                    </div>

                    <div>
                        <input type="submit" value="Add meeting" class="submit-button btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from '@/components/utils/NavBar.vue';
import axios from 'axios';
import config from '@/config';
import { addMethods } from '@/services/addMethods';

export default {
    name: 'AddMeetings',

    components: {
        NavBar,
    },

    data() {
        return {
            name: '',
            date: '',
            startTime: '',
            endTime: '',
            description: '',
            attendees: [],
            userArr: [],
            teamArr: [],
            allEmailAndTeam: [],
        };
    },
    updated() {
        this.getAllRes();
    },
    beforeCreate() {},
    methods: {
        getAllRes() {
            // THIS METHOD WILL COLLECT ALL THE RESOURCES REQUIRED FOR THE VALIDATION OF ATTENDEES LIKE ALL THE EMAIL AND TEAM DATA
            //console.log('Hello User');
            this.userArr = this.$store.getters.getAllUsers;
            this.teamArr = this.$store.getters.getAllteamName;
            const emailAndTeam = [];
            // this.userArr = this.userArr.length > 0 ? this.userArr.split(',') : [];
            // this.teamArr = this.teamArr.length > 0 ? this.teamArr.split(',') : [];
            for (let i = 0; i < this.userArr.length; i++) {
                emailAndTeam.push(this.userArr[i]);
            }
            for (let i = 0; i < this.teamArr.length; i++) {
                emailAndTeam.push(this.teamArr[i]);
            }
            this.allEmailAndTeam = emailAndTeam;
            //console.log(emailAndTeam);
        },
        isValid() {
            if (this.name === '') {
                this.$toast.error('Name of the Meeting field Required');
                return false;
            }
            if (this.date === '') {
                this.$toast.error('Date field Required');
                return false;
            }
            if (this.startTime === '') {
                this.$toast.error('Start time field Required');
                return false;
            }
            if (this.endTime === '') {
                this.$toast.error('End time field Required');
                return false;
            }
            if (this.attendees.length === 0) {
                this.$toast.error('Atlest one attendees or team Required');
                return false;
            }
            return true;
        },

        async onSubmit() {
            if (this.isValid()) {
                // This part validate the attendees and teams

                const tempArr = this.attendees ? this.attendees.split(',') : [];
                const attendeeArr = tempArr.map((element) => {
                    return element.trim();
                });

                const set = new Set(this.allEmailAndTeam);
                let flag = true;
                for (let i = 0; i < attendeeArr.length; i++) {
                    if (!set.has(attendeeArr[i])) {
                        if (attendeeArr[i][0] == '@') {
                            this.$toast.error(attendeeArr[i] + ' is Invalid team !');
                            flag = false;
                            break;
                        } else {
                            this.$toast.error(attendeeArr[i] + ' is a Invalid user!');
                            flag = false;
                            break;
                        }
                    }
                }
                if (flag) {
                    const response = await axios.get(`${config.BaseUrl}/teams`, {
                        headers: {
                            Authorization: this.$store.getters.getToken,
                        },
                    });
                    // console.log(response.data);
                    // console.log(this.attendees);
                    let allEmailFromTeam = [];
                    for (let k = 0; k < attendeeArr.length; k++) {
                        if (attendeeArr[k][0] !== '@') continue;
                        let team = attendeeArr[k].substring(1);
                        for (let i = 0; i < response.data.length; i++) {
                            if (team === response.data[i].shortName) {
                                for (let j = 0; j < response.data[i].members.length; j++) {
                                    allEmailFromTeam.push(response.data[i].members[j].email);
                                }
                                break;
                            }
                        }
                    }
                    // console.log(allEmailFromTeam);
                    for (let i = 0; i < attendeeArr.length; i++) {
                        if (this.attendees[i][0] === '@') continue;
                        allEmailFromTeam.push(attendeeArr[i]);
                    }
                    //console.log(allEmailFromTeam);
                    const data = {
                        name: this.name,
                        date: this.date,
                        startTime: {
                            hours: parseInt(this.startTime.substring(0, 2)),
                            minutes: parseInt(this.startTime.substring(3, 5)),
                        },
                        endTime: {
                            hours: parseInt(this.endTime.substring(0, 2)),
                            minutes: parseInt(this.endTime.substring(3, 5)),
                        },
                        description: this.description,
                        attendees: allEmailFromTeam,
                    };
                    //console.log(data);
                    const helper = async () => {
                        this.meetingDetails = await addMethods.addMeeting(data, this.getToken);
                    };
                    if (helper()) {
                        this.$toast.success('Meeting added successfully !');
                        this.name = '';
                        this.date = '';
                        this.startTime = '';
                        this.endTime = '';
                        this.description = '';
                        this.attendees = [];
                    } else {
                        this.$toast.error('Something Error happened. Please try Again !');
                    }
                } else console.log('Clean Exit');
            }
        },
    },
    computed: {
        ...mapGetters(['getToken']),
        allmailAndTeam() {
            return this.allEmailAndTeam;
        },
    },
};
</script>

<style scoped>
@import '../assets/css/pages/meeting.css';
@import '../assets/css/pages/meetings-add-meetings.css';
</style>
