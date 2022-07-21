// Its our meeting app module where we put all our state , getters, actions and mutations
import axios from 'axios';
import config from '@/config';

const TOKEN_KEY = 'token';
const EMAIL_KEY = 'email';
const MESSAGE_KEY = 'message';
const NAME_KEY = 'name';

const state = {
  token: localStorage.getItem(TOKEN_KEY) || '',
  email: localStorage.getItem(EMAIL_KEY) || '',
  message: localStorage.getItem(MESSAGE_KEY) || '',
  name: localStorage.getItem(NAME_KEY) || '',
};

const getters = {};

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
};

const actions = {
  async login({ commit }, data) {
    console.log(data, ' calleding from action');
    try{
    const response = await axios.post(`${config.BaseUrl}/auth/login`, data);
    const { message, token, email, name } = response.data;
    console.log(email, message, name, token);

    localStorage.setItem(TOKEN_KEY,token);
    localStorage.setItem(EMAIL_KEY,email);
    localStorage.setItem(MESSAGE_KEY,message);
    localStorage.setItem(NAME_KEY,name);

    commit('setToken',token);
    commit('setMessage',message);
    commit('setEmail',email);
    commit('setName',name);
    return true; 
  }catch(error){
    const msg = error.response.data
    console.log(msg);
    return false;
  }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
