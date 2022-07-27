<template>
    <div class="search-result my-2">
        <div class="mb-1">
            <span class="meeting-date">{{ meeting.date }} </span>
            <span class="meeting-time">
                {{ meeting.startTimehour }}:{{ meeting.startTimeMinues }} - {{ meeting.endTimehour }}:{{
                    meeting.endTimeMinues
                }}
            </span>
        </div>
        <div class="meeting-name">{{ meeting.name }}</div>
        <div class="mb-2">
            <button @click.prevent="excuse" class="btn btn-danger excuse-yourself">Excuse yourself</button>
        </div>

        <hr />
        <div class="attendees mb-1">
            <span class="font-bold">Attendees:</span>
            <span v-for="(att, index) in meeting.attendeesArr" :key="index">{{ att + ', ' }}</span>
        </div>

        <div class="select-mem-div">
            <form @submit.prevent="addAttendee" class="add-member-to-meeting">
                <input
                    type="email"
                    list="members"
                    name="emails"
                    v-model="selectedAttendee"
                    id="emails"
                    class="select-members"
                    placeholder="Select members"
                />
                <datalist id="members" class="meeting-card-datalist">
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

export default {
    name: 'FilterMeetingCard',
    props: {
        meeting: Object,
    },
    data() {
        return {
            meetingId: this.meeting.id,
            selectedAttendee: '',
            userList: [],
            atteData: this.meeting.attendeesArr,
            token: this.$store.getters.getToken,
        };
    },
    mounted() {
        this.userList = this.$store.getters.getAllUsers;
    },
    methods: {
        async addAttendee() {
            console.log('Add Attendee clicked');
            const res = await addAttendees.addAttendeeToMeeting(this.meeting.id, this.selectedAttendee, this.token);

            if (!res) {
                alert('Please enter a valid user');
            } else {
                alert(' added to the Meeting');
            }
            this.selectedAttendee = '';
        },
        async excuse() {
            console.log('excuse from meeting clicked');
            const res = await excuseYourself.excuseMeeting(this.meetingId, this.token);
            if (res) {
                alert('Successfully Excused from meeting');
            } else {
                alert('Cant excuse something Error happend');
            }
        },
    },
};
</script>

<style scoped>
@import '@/assets/css/pages/meeting.css';
@import '@/assets/css/pages/meetings-filter-meetings.css';
</style>
