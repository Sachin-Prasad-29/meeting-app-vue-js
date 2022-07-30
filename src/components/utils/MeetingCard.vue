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
        <div class="meeting-name font-bold">{{ meeting.name }}</div>
        <div class="mb-2">
            <button @click.prevent="excuse" class="btn btn-danger excuse-yourself">Excuse yourself</button>
        </div>
        <!-- <p>{{ meeting.id }}</p> -->
        <hr />
        <div class="attendees mb-1">
            <span class="font-bold">Attendees : </span>
            <span v-for="(att, index) in attendeesArr" :key="index">{{ att + ', ' }}</span>
        </div>

        <div class="select-mem-divs">
            <form @submit.prevent="addAttendee" class="add-member-to-meeting">
                <input
                    type="email"
                    list="members"
                    name="emails"
                    v-model="selectedAttendee"
                    id="emails"
                    class="select-member"
                    placeholder="Select members"
                />
                <datalist id="members" class="meeting-card-datalist">
                    <option v-for="(user, index) in userList" :key="index" :value="user">{{ user }}</option>
                </datalist>
                <input type="submit" value="Add" class="btn-primary btn select-member" />
            </form>
        </div>
    </div>
</template>

<script>
import { addAttendees } from '@/services/addAttendee';
import { excuseYourself } from '@/services/excuseYourself';
import { mapGetters } from 'vuex';

export default {
    name: 'MeetingCard',
    props: {
        meeting: Object,
    },
    data() {
        return {
            selectedAttendee: '',
            userList: [],
        };
    },
    computed: {
        ...mapGetters(['getToken', 'getAllUsers']),
        meetingId() {
            return this.meeting.id;
        },
        attendeesArr() {
            return this.meeting.attendeesArr;
        },
    },
    mounted() {
        this.userList = this.getAllUsers;
    },
    methods: {
        async addAttendee() {
            const attendeeSet = new Set(this.attendeesArr);

            if (!this.selectedAttendee) this.$toast.error('Please select one attendee');
            else if (attendeeSet.has(this.selectedAttendee))
                this.$toast.warning('Attendee already present in the Meeting');
            else {
                this.loadScreen = this.$loading.show({
                    color: 'rgb(51, 102, 255)',
                    backgroundColor: 'lightblue',
                    blur: '9px',
                    height: 150,
                    width: 150,
                });
                const res = await addAttendees.addAttendeeToMeeting(
                    this.meeting.id,
                    this.selectedAttendee,
                    this.getToken
                );
                if (res) {
                    this.$emit('load');
                    this.$toast.success('Attendee Added Sucessfully');
                    this.loadScreen.hide();
                } else {
                    this.$toast.error('Something error happened');
                }
            }

            this.selectedAttendee = '';
        },
        async excuse() {
            this.loadScreen = this.$loading.show({
                color: 'rgb(51, 102, 255)',
                backgroundColor: 'lightblue',
                blur: '9px',
                height: 150,
                width: 150,
            });
            const res = await excuseYourself.excuseMeeting(this.meetingId, this.getToken);
            if (res) {
                this.$emit('load');
                this.$toast.success('Successfully Excused from meeting');
                this.loadScreen.hide();
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
.search-result{
    -webkit-transition: 0.4s;
    transition: 0.4s;
}
</style>
