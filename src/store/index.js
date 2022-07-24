// Its an entry point to vue X
// Here we will combine all our module

import Vuex from 'vuex';
import Vue from 'vue';
import meetingApp from './modules/meetingApp';


//Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({
    modules:{
        meetingApp
    }
})