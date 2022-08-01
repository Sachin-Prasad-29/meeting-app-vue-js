<template>
    <div>
        <NavBar tab="meeting" />
        <div class="container">
            <h1 class="mb-1">Meetings</h1>
            <hr />
            <div class="sub-title">
                <div class="selected-sub-title">
                    <router-link to="/meetings-filter" class="link-plain">Filter/Search meetings</router-link>
                </div>
                <div><router-link to="/meetings-add" class="link-plain">Add a meeting</router-link></div>
            </div>
            <div class="add-section bg-primary mt-1">
                <h2 class="mb-1">Search For meetings</h2>
                <hr />
                <form @submit.prevent="onSearch" id="filter-meetings">
                    <div>
                        <div>
                            <label for="period">Date</label>
                        </div>
                        <div class="dropdown-menus">
                            <select name="period" id="period" v-model="period" class="add-block add-block-filter">
                                <option value="all">ALL</option>
                                <option value="past">PAST</option>
                                <option value="present">TODAY</option>
                                <option value="future">UPCOMING</option>
                            </select>
                        </div>
                    </div>

                    <div class="mt-2">
                        <div>
                            <label for="search">Search for</label>
                        </div>
                        <div>
                            <textarea
                                rows="2"
                                cols="100%"
                                name="search"
                                v-model="search"
                                id="search"
                                class="add-block"
                                placeholder="Search using words describe the meeting"
                            ></textarea>
                        </div>
                    </div>

                    <div>
                        <input type="submit" value="Search" class="submit-button" />
                    </div>
                </form>
            </div>
            <h2>Meetings matching search criteria</h2>
            <hr />

            <div id="filter-meeting-details">
                <MeetingCard
                    v-for="(meeting, index) in filterMeetingDetails"
                    :key="index"
                    :meeting="meeting"
                    @load="onSearch"
                />
            </div>
        </div>
    </div>
</template>

<script>
import MeetingCard from './utils/MeetingCard';
import NavBar from '@/components/utils/NavBar.vue';

// import config from '@/config';
import { displayMethods } from '@/services/displayMethods';
import { mapGetters } from 'vuex';

export default {
    name: 'FilterMeetings',

    components: {
        NavBar,
        MeetingCard,
    },

    data() {
        return {
            period: 'all',
            search: '',
            filterMeetingDetails: '',
            meetingId: '',
            attendee: '',
        };
    },
    computed: {
        ...mapGetters(['getToken']),
    },

    methods: {
        async onSearch() {
             this.loadScreen = this.$loading.show(this.$spinner);
            this.filterMeetingDetails = await displayMethods.displayMeetings(this.period, this.search, this.getToken);
            this.loadScreen.hide();
        },
    },
};
</script>

<style scoped>
@import '../assets/css/pages/meeting.css';
@import '../assets/css/pages/meetings-filter-meetings.css';
</style>
