<template>
  <nav>
    
    <div class="container nav-ele-grid">
      <div class="ele-grid list-unstyle menu left-menu">
        <div class="nav-items d-sm-none float-left" :class="{ 'curr-page': tab === 'calendar' }">
          <router-link to="/calendar" class="link-plain items">Calendar</router-link>
        </div>
        <div class="nav-items d-sm-none float-left" :class="{ 'curr-page': tab === 'meeting' }">
          <router-link to="/meetings/add" class="link-plain items">Meetings</router-link>
        </div>
        <div class="nav-items d-sm-none float-left" :class="{ 'curr-page': tab === 'team' }">
          <router-link to="/team" class="link-plain items">Teams</router-link>
        </div>
      </div>
      <div class="ele-grid list-unstyle menu right-menu">
        <div class="nav-items d-sm-none float-right">
          <router-link to="/login" class="link-plain items" id="log-out">logout</router-link>
        </div>
        <div class="nav-items d-sm-none float-right">
          <router-link to="/calendar" class="link-plain items" id="loged-in-user">Hello, ssad@gmail.com</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['tab'],
  methods: {},
};
</script>

<style scoped>
@import '../assets/css/navbar.css';
/* @import '../assets/external/@fortawesome/fontawesome-free/css/all.min.css'; */
</style>
