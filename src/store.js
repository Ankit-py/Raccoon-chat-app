import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//To create a store we need to create a state that holds all data

const state = {
  currentUser: null,
  currentChannel: null,
  isPrivate: false
};

//Update state data through mutations

const mutations = {
  SET_USER(state, user) {
    state.currentUser = user;
  },
  SET_CURRENT_CHANNEL(state, channel) {
    state.currentChannel = channel
  },

  SET_PRIVATE(state, isPrivate) {
      state.isPrivate = isPrivate;
  }
};

//create actions for mutations with necessary data

const actions = {
  setUser(state,user) {
    state.commit('SET_USER',user);
  },

  setCurrentChannel({commit}, channel) {
    commit('SET_CURRENT_CHANNEL',channel)
  },

  setPrivate({ commit }, isPrivate) {
    commit('SET_PRIVATE', isPrivate);
  }
};

//get the data from the state

const getters = {
  currentUser: state => state.currentUser,
  currentChannel: state => state.currentChannel,
  isPrivate: state => state.isPrivate
};

//create vuex store

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store