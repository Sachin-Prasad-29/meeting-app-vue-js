<template>
    <div>
        <NavBar tab="meeting" />

        <div class="container">
            <h1 class="mb-1">Meetings</h1>
            <hr />
            <div class="sub-title">
                <div><router-link to="meetings-filter" class="link-plain">Filter/Search meetings</router-link></div>
                <div class="selected-sub-title">
                    <router-link to="meetings-add" class="link-plain">Add a meeting </router-link>
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
                                v-model.trim="$v.name.$model"
                                name="name"
                                class="add-block"
                                placeholder="AWS training sessions"
                                :class="{ error: $v.name.$error, valid: !$v.name.$invalid }"
                            />
                            <transition name="bounce">
                                <div v-if="$v.name.$error" class="errorMessage">
                                    <p v-if="!$v.name.required">Name of the meeting is Required !</p>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div class="mt-2">
                        <div>
                            <label for="date">Date</label>
                        </div>
                        <div>
                            <input
                                type="date"
                                v-model.trim="$v.date.$model"
                                id="date"
                                name="date"
                                class="add-block"
                                :class="{ error: $v.date.$error, valid: !$v.date.$invalid }"
                            />
                            <transition name="bounce">
                                <div v-if="$v.date.$error" class="errorMessage">
                                    <p v-if="!$v.date.required">Date is Required !</p>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div class="mt-2">
                        <div>
                            <label for="start-time">Start time (hh:mm AM/PM)</label>
                        </div>
                        <div>
                            <input
                                type="time"
                                v-model.trim="$v.startTime.$model"
                                id="start-time"
                                name="startTime"
                                class="time-block"
                                :class="{ error: $v.startTime.$error, valid: !$v.startTime.$invalid }"
                            />
                            <transition name="bounce">
                                <div v-if="$v.startTime.$error" class="errorMessage">
                                    <p v-if="!$v.startTime.required">Start Time is Required !</p>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div class="mt-2">
                        <div>
                            <label for="end-time">End time (hh:mm AM/PM)</label>
                        </div>
                        <div>
                            <input
                                type="time"
                                v-model.trim="$v.endTime.$model"
                                id="end-time"
                                name="endTime"
                                class="time-block"
                                :class="{ error: $v.endTime.$error, valid: !$v.endTime.$invalid }"
                            />
                            <transition name="bounce">
                                <div v-show="isGreater" class="errorMessage">
                                    The End time should be Greater than Start time
                                </div>
                                <div v-if="$v.endTime.$error" class="errorMessage">
                                    <p v-if="!$v.endTime.required">End Time is Required !</p>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div class="mt-2">
                        <div>
                            <label for="description">Description</label>
                        </div>
                        <div>
                            <textarea
                                rows="1"
                                cols="100%"
                                name="description"
                                id="description"
                                v-model.trim="$v.description.$model"
                                class="add-block"
                                placeholder="What is the agenda of the meeting ?"
                                :class="{ error: $v.description.$error, valid: !$v.description.$invalid }"
                            ></textarea>
                            <transition name="bounce">
                                <div v-if="$v.description.$error" class="errorMessage">
                                    <p v-if="!$v.description.required">Description is Required !</p>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div class="mt-2">
                        <div>
                            <label for="attendees">EmailID's of attendees, or team's short</label>
                        </div>

                        <div>
                            <input
                                type="text"
                                id="attendees"
                                v-model.trim="$v.attendees.$model"
                                name="attendees"
                                class="add-block"
                                placeholder="john@example.com, @teamname"
                                :class="{ error: $v.attendees.$error, valid: !$v.attendees.$invalid }"
                            />
                            <transition name="bounce">
                                <div v-if="$v.attendees.$error" class="errorMessage">
                                    <p v-if="!$v.attendees.required">Atleast one Attendee or team Required !</p>
                                </div>
                            </transition>
                            <div>
                                <span
                                    >Seprate emailId's/team short names by commas- team short names always begin with
                                    @</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="mt-2">
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
import { addResourcesMethods } from '@/services/addResourcesMethods';
import { required } from 'vuelidate/lib/validators';
import { getAllTeam } from '@/services/accountServices';

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
            submitStatus: null,
        };
    },

    validations: {
        name: { required },
        date: { required },
        startTime: { required },
        endTime: { required },
        description: { required },
        attendees: { required },
    },

    updated() {
        this.getAllRes();
    },

    computed: {
        ...mapGetters(['getToken']),
        allmailAndTeam() {
            return this.allEmailAndTeam;
        },
        isGreater() {
            return this.startTime > this.endTime;
        },
    },

    methods: {
        getAllRes() {
            // THIS METHOD WILL COLLECT ALL THE RESOURCES REQUIRED FOR THE VALIDATION OF ATTENDEES LIKE ALL THE EMAIL AND TEAM DATA
            this.userArr = this.$store.getters.getAllUsers;
            this.teamArr = this.$store.getters.getAllTeamName;
            const emailAndTeam = [];
            for (let i = 0; i < this.userArr.length; i++) {
                emailAndTeam.push(this.userArr[i]);
            }
            for (let i = 0; i < this.teamArr.length; i++) {
                emailAndTeam.push(this.teamArr[i]);
            }
            this.allEmailAndTeam = emailAndTeam;
        },

        async onAddMeeting() {
            this.loadScreen = this.$loading.show(this.$spinner);
            // This part validate the attendees and teams
            const tempArr = this.attendees ? this.attendees.split(',') : [];
            const attendeeArr = tempArr.map((email) => {
                return email.trim();
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
                try {
                    const response = await getAllTeam(this.getToken);
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

                    for (let i = 0; i < attendeeArr.length; i++) {
                        if (this.attendees[i][0] === '@') continue;
                        allEmailFromTeam.push(attendeeArr[i]);
                    }

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
                    const helper = async () => {
                        this.meetingDetails = await addResourcesMethods.addMeeting(data, this.getToken);
                    };
                    if (helper()) {
                        this.$toast.success('Meeting added successfully !');
                        this.attendees = [];
                    } else {
                        this.$toast.error('Something Error happened. Please try Again !');
                    }
                    this.loadScreen.hide();
                } catch (error) {
                    console.log(error.message);
                }
            } else {
                this.loadScreen.hide();
            }
        },

        onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'FAIL';
            } else if (this.isGreater) {
                this.submitStatus = 'FAIL';
            } else {
                this.submitStatus = 'SUCCESS';
                this.onAddMeeting();
            }
        },
    },
    
};
</script>

<style scoped>
@import '../assets/css/pages/meeting.css';
@import '../assets/css/pages/meetings-add-meetings.css';
form .add-block {
    width: 100%;
    padding: 10px 20px;
    margin: 8px 0 0 0;
    border: 1px solid gray;
    box-sizing: border-box;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    outline: none;
}
.add-block:focus {
    border: 2px solid rgb(142, 138, 139);
    -webkit-box-shadow: 0 0 10px rgb(157, 255, 0);
    box-shadow: 0 0 10px rgba(8, 39, 141, 0.7);
    padding-left: 10px;
}

.add-block:hover {
    box-shadow: 0 0 10px rgba(8, 141, 108, 0.568);
}
.successmessage {
    color: rgb(6, 158, 6);
    transition: visibility 0s, opacity 0.5s linear;
}
.errorMessage {
    transition: visibility 0s, opacity 0.5s linear;
    color: rgb(233, 64, 22);
    font-size: 0.8em;
}
form div .error {
    border: 1.5px solid red;
    color: rgb(247, 10, 10);
}
form .valid {
    border: 1.5px solid rgb(55, 161, 14);
    color: rgb(26, 82, 4);
}
.errorMessage p {
    margin: 5px;
}
</style>
