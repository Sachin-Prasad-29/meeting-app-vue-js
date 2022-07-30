<template>
    <div>
        <header :class="{ 'scrolled-nav': scrollPosition }">
            <nav>
                <div v-show="!mobile" class="container nav-ele-grid">
                    <div class="ele-grid list-unstyle menu left-menu">
                        <router-link to="/calendar" class="link-plain items">
                            <div class="nav-items float-left" :class="{ 'curr-page': tab === 'calendar' }">
                                Calendar
                            </div>
                        </router-link>
                        <router-link to="/meetings-add" class="link-plain items">
                            <div class="nav-items float-left" :class="{ 'curr-page': tab === 'meeting' }">Meetings</div>
                        </router-link>
                        <router-link to="/team" class="link-plain items">
                            <div class="nav-items float-left" :class="{ 'curr-page': tab === 'team' }">Teams</div>
                        </router-link>
                    </div>

                    <div class="ele-grid list-unstyle menu right-menu">
                        <router-link to="/login" class="link-plain items" id="log-out">
                            <div @click.prevent="logOut()" class="nav-items float-right">logout</div>
                        </router-link>
                        <router-link to="/calendar" class="link-plain items" id="loged-in-user">
                            <div class="nav-items float-right dis-non-md">
                                Hello,<span class="primary"> {{ userName }}</span> !
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="menu-icon">
                    <i
                        @click="toggleMobileNav"
                        v-show="mobile"
                        class="fa-solid fa-bars"
                        :class="{ 'menu-icon-active': mobileNav }"
                    ></i>
                </div>
                <transition class="container" name="mobile-nav">
                    <ul v-show="mobileNav" class="dropdown-nav">
                        <router-link class="link" to="/calendar"
                            ><li :class="{ 'curr-page': tab === 'calendar' }">Calendar</li></router-link
                        >
                        <router-link class="link" to="/meetings-add"
                            ><li :class="{ 'curr-page': tab === 'meeting' }">Meeting</li></router-link
                        >
                        <router-link class="link" to="/team"
                            ><li :class="{ 'curr-page': tab === 'team' }">Team</li></router-link
                        >
                        <router-link class="link" to="/calendar"
                            ><li>
                                Hello <span class="primary"> {{ userName }}</span> !
                            </li></router-link
                        >
                        <router-link class="link" to="/login"><li @click.prevent="logOut()">logout</li></router-link>
                    </ul>
                </transition>
            </nav>
        </header>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import logout from '@/services/accountServices';

export default {
    name: 'NavBar',
    data() {
        return {
            scrollPosition: null,
            mobile: true,
            mobileNav: null,
            windowWidth: null,
        };
    },
    props: ['tab'],

    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    methods: {
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 700) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },
        logOut() {
            console.log('logout clicked');
            localStorage.clear();
            this.$router.replace('/login');
        },
    },

    computed: {
        ...mapGetters(['userName', 'userEmail']),
    },
};
</script>

<style scoped>
@import '@/assets/css/navbar.css';
.box {
    margin-top: 60px;
}

header {
    background-color: white;
    transition: 0.5s ease all;
    color: white;
}
ul {
    margin-top: -10px;
    padding-top: 40px;
    background: #e7e8e8;
    float: left;
    clear: both;
    width: 100%;
}

ul,
.link {
    font-weight: 500;
    color: black;
    list-style: none;
    text-decoration: none;
}
li {
    padding: 8px;
    width: 92%;
    border-top: 1px solid rgb(204, 199, 199);
}
.link {
    transition: 0.8s ease all;
    border-bottom: 1px solid transparent;
}
li:hover {
    padding-bottom: 3px;
    transition: 0.8s ease all;
    border-bottom: 3px solid rgb(4, 163, 255);
    background-color: rgba(173, 214, 220, 0.578);
}
.menu-icon {
    color: black;
    display: flex;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 7.4%;
    font-size: 25px;
    cursor: pointer;
    transition: 0.8 ease all;
}
i {
    transition: 0.6s ease all;
}
.menu-icon-active {
    transform: rotate(180deg);
}
.dropdown-nav {
    padding-bottom: 10px;
    padding-top: 60px;
}
.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: 0.6s ease all;
}
.mobile-nav-enter-form {
    transform: translateY(0px);
}
.mobile-nav-leave-to {
    transform: translateY(-300px);
}
/* .mobile-nav-enter-to {
  transform: translateY(50px);
} */
@media all and (max-width: 888px) {
    .dis-non-md {
        display: none;
    }
}
</style>
