<template>
    <div>
        <NavBar tab="calendar" />
        <div class="container">
            <h1 class="mb-1">Calendar</h1>
            <hr />

            <div class="today-date-Cal-div">
                <h3 class="todays-date m-0" id="today-date">{{ todayDate }}</h3>
                <input @change="setCalDate" type="date" id="myDate" class="calender-block" v-model="message" />
            </div>

            <transition name="bounce">
                <div class="text-gray font-bold" id="todays-day">{{ day }}</div>
            </transition>
        </div>
        <div class="calender-details meeting-time-container">
            <div class="time-guider">
                <div class="hours-block">
                    <div class="block-time">0</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">1</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">2</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">3</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">4</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">5</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">6</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">7</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">8</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">9</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">10</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">11</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">12</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">13</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">14</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">15</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">16</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">17</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">18</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">19</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">20</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">21</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">22</div>
                    <div class="meeting-detail-div"></div>
                </div>
                <div class="hours-block">
                    <div class="block-time">23</div>
                    <div class="meeting-detail-div"></div>
                </div>
            </div>

            <div class="main-meeting-details-div">
                <CalendarCard v-for="(meeting, index) in meetingDetails" :key="index" :meeting="meeting" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from '@/components/utils/NavBar.vue';
import { CalenderMethods } from '@/services/CalenderFetchMethod';
import { getDateMethods } from '@/services/getDateformat';
import CalendarCard from '@/components/utils/CalendarCard';

export default {
    name: 'CalenderPage',
    components: {
        NavBar,
        CalendarCard,
    },
    data() {
        return {
            status: true,
            message: '',
            date: '',
            month: '',
            year: '',
            day: '',
            meetingDetails: '',
        };
    },
    methods: {
        dateFunction: function () {
            var formattedDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
            this.message = formattedDate;
        },
        setCalDate() {
            const dateData = getDateMethods.getDate(this.message); // getting the 
            this.date = dateData.cdate;
            this.month = dateData.month;
            this.year = dateData.year;
            this.day = dateData.day;
            this.meetingDetails = '';
            const helper = async () => {
                this.meetingDetails = await CalenderMethods.fetchAndShowCalender(this.message, this.getToken);
                this.loadScreen.hide();
            };
            helper();
        },
    },
    created() {
        this.loadScreen = this.$loading.show({
            color: 'rgb(51, 102, 255)',
            backgroundColor: 'lightblue',
            blur: '9px',
            height: 150,
            width: 150,
        });
        this.dateFunction();
        this.setCalDate();
    },
    computed: {
        ...mapGetters(['getToken']),
        loadingScreen() {
            return this.status;
        },
        todayDate() {
            return this.date + ' ' + this.month + ' ' + this.year;
        },
    },
};
</script>

<style scoped>
@import '../assets/css/pages/calender.css';
</style>
