<template>
    <div class="content team-search-result" team-id="${id}">
        <div class="content-title font-bold">{{ team.name }}</div>
        <div class="font-bold">@{{ team.shortName }}</div>
        <div class="font-bold text-gray">{{ team.description }}</div>
        <div class="mb-2">
            <button @click.prevent="excuse" class="btn btn-danger excuse-yourself-from-team">Excuse yourself</button>
        </div>
        <hr />
        <div class="attendees mb-1">
            <span class="font-bold">Attendees: </span>
            <span v-for="(member, index) in team.members" :key="index">{{ member.email + ', ' }}</span>
        </div>
        <div>
            <form @submit.prevent="addMember" class="add-member-to-team">
                <input
                    type="email"
                    list="members"
                    name="members"
                    v-model="selectedMember"
                    class="select-members"
                    placeholder="Select members"
                />
                <datalist id="members">
                    <option v-for="(user, index) in userList" :key="index" :value="user">{{ user }}</option>
                </datalist>
                <input type="submit" value="Add" class="btn-primary btn " />
            </form>
        </div>
    </div>
</template>

<script>
import { addAttendees } from '@/services/addAttendee';
import { excuseYourself } from '@/services/excuseYourself';
import { mapGetters } from 'vuex';

export default {
    name: 'FetchedTeamCard',
    props: {
        team: Object,
    },
    data() {
        return {
            teamId: this.team._id,
            selectedMember: '',
            userList: [],
        };
    },

    mounted() {
        this.userList = this.getAllUsers;
    },
    computed: {
        ...mapGetters(['getToken', 'getAllUsers']),
    },
    methods: {
        // this function will get called when we add any member to the existing Team
        async addMember() {
            addAttendees
                .addMemberToTeam(this.teamId, this.selectedMember, this.getToken)
                .then((res) => {
                    if (res) {
                        this.$emit('reLoadTeam');
                        this.$toast.success('Member Added');
                    } else {
                        this.$toast.error('Some error happended');
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    this.$toast.error('Error !');
                });
            this.selectedMember = '';
        },
        // this function will get called when we excuse ourself from the existing team
        async excuse() {
            excuseYourself
                .excuseTeam(this.teamId, this.getToken)
                .then((response) => {
                    if (response) {
                        this.$emit('reLoadTeam');
                        this.$toast.success('Your Excused from Team');
                    } else {
                        this.$toast.error('Some error happended');
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    this.$toast.error('Something Error Happended');
                });
        },
    },
};
</script>

<style scoped>
.content{
    -webkit-transition: 0.4s;
    transition: 0.4s;
}</style>
