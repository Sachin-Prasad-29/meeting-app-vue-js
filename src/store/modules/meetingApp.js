// Its our meeting app module where we put all our state , getters, actions and mutations
import { getAllEmail, getAllTeam, loginUser } from '@/services/accountServices';

const TOKEN_KEY = 'token';
const EMAIL_KEY = 'email';
const MESSAGE_KEY = 'message';
const NAME_KEY = 'name';
const ALL_USERS = 'allUsers';
const ALL_TEAMS = 'allTeams';
const ALL_TEAM_NAME = 'allTeamName';
const TEAM_OBJECT = 'teamObj';

// All the states of the store
const state = {
    token: localStorage.getItem(TOKEN_KEY) || '',
    email: localStorage.getItem(EMAIL_KEY) || '',
    message: localStorage.getItem(MESSAGE_KEY) || '',
    name: localStorage.getItem(NAME_KEY) || '',
    allUsers: localStorage.getItem(ALL_USERS) ? localStorage.getItem(ALL_USERS).split(',') : [],
    allTeams: localStorage.getItem(ALL_TEAMS) || [],
    allTeamName: localStorage.getItem(ALL_TEAM_NAME) ? localStorage.getItem(ALL_TEAM_NAME).split(',') : [],
    teamObj: localStorage.getItem(TEAM_OBJECT) || [],
};

// All the getters to access the store
const getters = {
    userEmail: (state) => state.email,
    userName: (state) => state.name,
    getToken: (state) => state.token,
    getAllUsers: (state) => state.allUsers,
    getAllTeams: (state) => state.allTeams,
    getAllTeamName: (state) => state.allTeamName,
    getTeamObj: (state) => state.teamObj,
};

// All the mutation methods to change the state of the store
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

// Action conitains all the methods which perform some operation of the state 
// And it uses the mutation method using commit to change the state of the store
const actions = {
    // Here in login action we will set the token, user, email all the data fo user
    // Into the state and localStorage to use it later in the application
    async login({ commit }, data) {
        const response = await loginUser(data);
        if (response !== false) {
            const { message, token, email, name } = response.data;
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(EMAIL_KEY, email);
            localStorage.setItem(MESSAGE_KEY, message);
            localStorage.setItem(NAME_KEY, name);

            commit('setToken', token);
            commit('setMessage', message);
            commit('setEmail', email);
            commit('setName', name);
            return true;
        } else {
            return false;
        }
    },

    async fetchAllEmail({ commit }) {
        //this function will fetch the data and store the all users in the store
        const response = await getAllEmail(state.token);
        const allUserArr = [];
        for (let i = 0; i < response.data.length; i++) {
            allUserArr.push(response.data[i].email);
        }
        localStorage.setItem(ALL_USERS, allUserArr);
        commit('setAllUser', allUserArr);
    },

    async fetchAllTeam({ commit }) {
        //this function will fetch all team data the data
        const response = await getAllTeam(state.token);
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

    async setAllTeam({ commit }, data) {
        localStorage.setItem(ALL_TEAMS, data);
        commit('setAllTeam', data);
    },

    async setAllTeamName({ commit }, data) {
        localStorage.setItem(ALL_TEAM_NAME, data);
        commit('setAllTeamName', data);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
