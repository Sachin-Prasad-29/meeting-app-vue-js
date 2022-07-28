<template>
    <div class="content team-search-result" team-id="${id}">
        <div class="content-title font-bold">{{ team.name }}</div>
        <div class="font-bold">@{{ team.shortName }}</div>
        <div class="font-bold text-gray">{{ team.description }}</div>
        <div class="mb-2">
            <button @click.prevent="excuse" class="btn btn-danger excuse-yourself-from-team">Excuse yourself</button>
        </div>
        <hr />
        <!-- {{ teamId }} -->
        <div class="attendees mb-1">
            <span class="font-bold">Attendees: </span>
            <span v-for="(member, index) in team.members" :key="index">{{ member.email + ', ' }}</span>
        </div>
        <div class="select-mem-div">
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
                <input type="submit" value="Add" class="btn-primary btn select-members" />
            </form>
        </div>
    </div>
</template>

<script>
import { addAttendees } from '@/services/addAttendee';
import { excuseYourself } from '@/services/excuseYourself';
import { displayMethods } from '@/services/displayMethods';
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
    computed:{
        ...mapGetters(['getToken','getAllUsers']),
    },
    methods: {
        // this function will get called when we add any member to the existing Team
        async addMember() {
            console.log('addMember clicked');
            const res = await addAttendees.addMemberToTeam(this.teamId, this.selectedMember, this.getToken);
            if (!res) {
                alert('Please enter a valid user');
            } else {
                alert('added to the Team');
            }
            this.selectedMember = '';
        },
        // this function will get called when we excuse ourself from the existing team
        async excuse() {
            console.log('excuse yourself clicked');
            const res = await excuseYourself.excuseTeam(this.teamId, this.getToken);
            if (res) {
                const loader = async (token) => await displayMethods.displayTeams(token);
                loader(this.getToken);
                alert('Successfully Excused from Team');
            } else {
                alert('Cant excuse something Error happend');
            }
        },
    },

};
</script>

<style></style>
