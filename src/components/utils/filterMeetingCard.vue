<template>
  <div class="search-result my-2" data-id="${id}">
    <div class="mb-1">
      <span class="meeting-date"></span>
      <span class="meeting-time"></span>
    </div>
    <div class="meeting-name"></div>
    <div class="mb-2">
      <button class="btn btn-danger excuse-yourself" id="excuse-yourself-${id}">Excuse yourself</button>
    </div>
    <hr />
    <div class="attendees mb-1">
      <span class="font-bold">Attendees:</span>
    </div>

    <div class="select-mem-div">
      <form method="post" id="add-member-to-meeting-id" class="add-member-to-meeting">
        <input type="hidden" name="id" value="id" id="id" />
        <input
          type="email"
          list="members"
          name="emails"
          id="emails"
          class="select-members"
          placeholder="Select members"
        />
        <datalist id="members" class="meeting-card-datalist"></datalist>
        <input type="submit" value="Add" class="btn-primary btn select-members" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterMeetingCard',
};
</script>

<style scoped>
@import '@/assets/css/pages/meeting.css';
@import '@/assets/css/pages/meetings-filter-meetings.css';
</style>
