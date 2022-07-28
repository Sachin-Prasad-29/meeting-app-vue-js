// Its our meeting app module where we put all our state , getters, actions and mutations
import axios from 'axios';
import config from '@/config';

const TOKEN_KEY = 'token';
const EMAIL_KEY = 'email';
const MESSAGE_KEY = 'message';
const NAME_KEY = 'name';
const ALL_USERS = 'allUsers';
const ALL_TEAMS = 'allTeams';
const ALL_TEAM_NAME = 'allTeamName';
const TEAM_OBJECT = 'teamObj';

const state = {
    token: localStorage.getItem(TOKEN_KEY) || '',
    email: localStorage.getItem(EMAIL_KEY) || '',
    message: localStorage.getItem(MESSAGE_KEY) || '',
    name: localStorage.getItem(NAME_KEY) || '',
    allUsers:localStorage.getItem(ALL_USERS)? localStorage.getItem(ALL_USERS).split(',') : [], //This array will all the data of the user
    allTeams: localStorage.getItem(ALL_TEAMS) || [], // This array will store the data of all the Teams
    allTeamName:localStorage.getItem(ALL_TEAM_NAME)? localStorage.getItem(ALL_TEAM_NAME).split(',') : [],
    teamObj: localStorage.getItem(TEAM_OBJECT) || [],
};

const getters = {
    userEmail: (state) => state.email,
    userName: (state) => state.name,
    getToken: (state) => state.token,
    getAllUsers: (state) => state.allUsers,
    getAllTeams: (state) => state.allTeams,
    getAllTeamName: (state) => state.allTeamName,
    getTeamObj: (state) => state.teamObj,
};

const mutations = {
    setToken(state, token) {
        state.token = token;
    },
    setEmail(state, email) {
        state.email = email;
    },
    setMessage(state, message) {
        state.message = message;
    },
    setName(state, name) {
        state.name = name;
    },
    setAllUser(state, allUserArr) {
        state.allUsers = allUserArr;
    },
    setAllTeam(state, allTeamArr) {
        state.allTeams = allTeamArr;
    },
    setAllTeamName(state, teamEl) {
        state.allTeamName = teamEl;
    },
    setTeamObj(state, teamObj) {
        state.teamObj = teamObj;
    },
};

const actions = {
    async login({ commit }, data) {
        //console.log(data, ' calling from action');
        try {
            const response = await axios.post(`${config.BaseUrl}/auth/login`, data);
            const { message, token, email, name } = response.data;
            //console.log(email, message, name, token);

            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(EMAIL_KEY, email);
            localStorage.setItem(MESSAGE_KEY, message);
            localStorage.setItem(NAME_KEY, name);

            commit('setToken', token);
            commit('setMessage', message);
            commit('setEmail', email);
            commit('setName', name);
            return true;
        } catch (error) {
            const msg = error.response.data;
            console.log(msg);
            return false;
        }
    },

    async fetchAllEmail({ commit }) {
        //this function will fetch the data and store the all users in the store
        const response = await axios.get(`${config.BaseUrl}/users`, {
            headers: {
                Authorization: state.token,
            },
        });
        const allUserArr = [];
        for (let i = 0; i < response.data.length; i++) {
            allUserArr.push(response.data[i].email);
        }
        localStorage.setItem(ALL_USERS, allUserArr);
        commit('setAllUser', allUserArr);
    },

    async fetchAllTeam({ commit }) {
        //this function will fetch all team data the data
        const response = await axios.get(`${config.BaseUrl}/teams`, {
            headers: {
                Authorization: state.token,
            },
        });
        localStorage.setItem(TEAM_OBJECT, response.data);
        commit('setTeamObj', response.data);

        const allTeamNameArr = [];
        for (let i = 0; i < response.data.length; i++) {
            allTeamNameArr.push('@' + response.data[i].shortName);
        }
        localStorage.setItem(ALL_TEAM_NAME, allTeamNameArr);
        commit('setAllTeamName', allTeamNameArr);

        const teamEl = [];
        for (let i = 0; i < response.data.length; i++) {
            let teamArr = [];
            for (let j = 0; j < response.data[i].members.length; j++) {
                teamArr.push(response.data[i].members[j].email);
            }
            teamEl.push({ [response.data[i].shortName]: teamArr });
        }

        localStorage.setItem(ALL_TEAMS, teamEl);
        commit('setAllTeam', teamEl);
    },
    async setAllTeam({commit},data){
        localStorage.setItem(ALL_TEAMS, data);
        commit('setAllTeam',data);
    },
    async setAllTeamName({commit},data){
        localStorage.setItem(ALL_TEAM_NAME, data);
        commit('setAllTeamName',data);
    }
    
};

export default {
    state,
    getters,
    actions,
    mutations,
};
