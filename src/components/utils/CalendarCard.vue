<template>
  <div class="meeing-guider">
    <div class="hours-block">
      <div class="block-time"></div>
      <div class="meeting-detail-div" style="width:96%" :style="{ height: meeting.height , marginTop: meeting.marginTop +`px`}">
        <p class="m-0 p-0 font-bold">{{ meeting.meetingName }}</p>
        <hr />
        <span class="font-bold">Attendees: </span>{{ meeting.attendeesList }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarCard',
  props: {
    meeting: Object,
  },
};
</script>

<style scoped>
@import '@/assets/css/pages/calender.css';
</style>
