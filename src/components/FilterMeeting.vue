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

                    <div>
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
                <FilterMeetingCard v-for="(meeting, index) in filterMeetingDetails" :key="index" :meeting="meeting" />
            </div>
        </div>
    </div>
</template>

<script>

import FilterMeetingCard from './utils/filterMeetingCard';
import NavBar from '@/components/utils/NavBar.vue';
import axios from 'axios';

// import config from '@/config';
import { displayMethods } from '@/services/fetchAndDisplay';

export default {
    name: 'FilterMeetings',

    components: {
        NavBar,
        FilterMeetingCard,
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
    computed:{
        token(){
            return this.$store.getters.getToken;
        }
    },

    methods: {
        async onSearch() {
            const period = this.period;
            const search = this.search;
            const token = this.token;

            var req = {
                method: 'get',
                url: `https://mymeetingsapp.herokuapp.com/api/meetings?period=${period}&search=${search}`,
                headers: {
                    Authorization: token,
                },
            };

            try {
                const response = await axios(req);
                const display = async (data) => {
                    this.filterMeetingDetails = await displayMethods.displayMeetings(data);
                };
                await display(response.data);
            } 
            catch (error) {
                console.log(error.message);
            }
        },
    },
};
</script>

<style scoped>
@import '../assets/css/pages/meeting.css';
@import '../assets/css/pages/meetings-filter-meetings.css';
</style>
