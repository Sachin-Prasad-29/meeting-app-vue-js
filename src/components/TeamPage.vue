<template>
    <div>
        <NavBar tab="team" />
        <div class="container">
            <h1 class="mb-1">Teams</h1>
            <hr />
            <div class="text-gray font-bold my-2">View and edit teams you are part of</div>
            <div class="main-team-block">
                <div class="teams-info">
                    <TeamCard
                        v-for="(team, index) in computedTeamData"
                        :key="index"
                        :team="team"
                        @reLoadTeam="loadTeams"
                    />
                </div>

                <div class="teams-form " id="teams-form">
                    <div class="content">
                        <div class="content-title font-bold">Add new Team</div>
                        <form @submit.prevent="onAddTeam" id="add-team-from">
                            <div class="input-label-div">
                                <label>Team Name</label>
                            </div>

                            <div class="input-div">
                                <input
                                    type="text"
                                    name="team-name"
                                    placeholder="Team name"
                                    class="add-team-element"
                                    v-model="name"
                                />
                            </div>
                            <div class="input-label-div">
                                <label>Team Short Name</label>
                            </div>
                            <div class="input-div">
                                <input
                                    type="text"
                                    name="team-short-name"
                                    placeholder="Team short name"
                                    class="add-team-element"
                                    v-model="shortName"
                                />
                            </div>
                            <div class="input-label-div">
                                <label>Description</label>
                            </div>
                            <div class="input-div">
                                <textarea
                                    rows="2"
                                    cols=""
                                    v-model="description"
                                    name="description"
                                    placeholder="Provide a description for the team !"
                                    class="add-team-element"
                                ></textarea>
                            </div>
                            <hr />
                            <div class="attendees mb-1">
                                <span class="font-bold">Members:</span>
                                <div class="add-team-member-section">
                                    <span v-for="(member, index) in memberList" :key="index"> {{ member + ', ' }}</span>
                                </div>
                            </div>
                            <div class="select-mem-div">
                                <input
                                    type="email"
                                    list="members"
                                    name="emails"
                                    v-model="newMember"
                                    class="select-members"
                                    placeholder="Select members"
                                />
                                <datalist id="members" class="meeting-card-datalist">
                                    <option v-for="(user, index) in userList" :key="index" :value="user">
                                        {{ user }}
                                    </option>
                                </datalist>
                                <button @click.prevent="addMember" class="btn btn-primary" id="add-member-btn">
                                    Add
                                </button>
                            </div>
                            <input type="submit" value=" Add team" class="btn btn-primary add-team-button" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/utils/NavBar.vue';
import TeamCard from './utils/TeamCard.vue';
import { addResourcesMethods } from '@/services/addResourcesMethods';
import { displayMethods } from '@/services/displayMethods';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'TeamPage',
    components: {
        NavBar,
        TeamCard,
    },
    data() {
        return {
            name: '',
            shortName: '',
            description: '',
            userList: [],
            newMember: '',
            memberList: new Set(),
            teamData: [],
            allTeamNameArr: [],
        };
    },
    created() {
        this.loadTeams();
    },

    computed: {
        ...mapGetters(['getToken', 'getAllUsers', 'getAllTeamName']),
        computedTeamData() {
            this.setAllTeam(this.teamData);
            this.setAllTeamName(this.allTeamNameArr);

            return this.teamData;
        },
    },

    methods: {
        ...mapActions(['setAllTeam', 'setAllTeamName']),
        async loadTeams() {
            this.loadScreen = this.$loading.show({
                color: 'rgb(51, 102, 255)',
                backgroundColor: 'lightblue',
                blur: '9px',
                height: 150,
                width: 150,
            });
            this.userList = this.getAllUsers;
            this.allTeamNameArr = this.getAllTeamName;

            displayMethods
                .displayTeams(this.getToken)
                .then((response) => {
                    this.teamData = response;
                    this.loadScreen.hide();
                })
                .catch((error) => {
                    console.log(error.message);
                    this.$toast.error('Some error Happened');
                    this.loadScreen.hide();
                });
        },
        addMember() {
            if (!this.newMember) this.$toast.error('Please select One valid member');
            else if (this.memberList.has(this.newMember)) {
                this.$toast.warning('Member already selected');
                this.newMember = '';
            } else {
                this.memberList.add(this.newMember);
                console.log(this.memberList);
                this.newMember = '';
            }
        },
        onAddTeam() {
            const members = Array.from(this.memberList);
            const data = {
                name: this.name,
                shortName: this.shortName,
                description: this.description,
                members,
            };
            addResourcesMethods
                .addTeam(data, this.getToken)
                .then((response) => {
                    if (!response) {
                        this.$$toast.error('Something wrong happened');
                    } else {
                        this.allTeamNameArr.push('@' + data.shortName);
                        this.memberList = new Set();
                        this.name = this.shortName = this.description = '';

                        this.loadTeams();
                        this.$toast.success('Team Added');
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
    },
};
</script>

<style scoped>
@import '@/assets/css/pages/teams.css';
.main-team-block{
    margin-bottom: 30px;
}
.select-members input:focus,
.add-team-element input:focus {
    border: 1px solid rgb(0, 0, 0);
    padding: 8px 8px;
    -webkit-box-shadow: 0 0 10px rgb(157, 255, 0);
    box-shadow: 0 0 10px rgba(8, 39, 141, 0.568);
}
</style>
