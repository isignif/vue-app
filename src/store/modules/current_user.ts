// declare module "jwt-decode";
// import jwt_decode from "jwt-decode";
const jwt_decode = require("jwt-decode");

interface CurrentUserState {
  id?: Number;
  email?: String;
  firstname?: String;
  lastname?: String;
  token?: String;
}

// initial state
const state: CurrentUserState = {
  id: undefined,
  email: undefined,
  firstname: undefined,
  lastname: undefined,
  token: undefined
};

// getters
const getters = {
  id: (state: CurrentUserState) => state.id,
  token: (state: CurrentUserState) => state.token,
  completeName: (state: CurrentUserState, getters: any) => {
    if (getters.isLogged == false) {
      return "";
    }

    return `${state.firstname} ${state.lastname}`;
  },
  isLogged: (state: CurrentUserState) => {
    return state.id !== null;
  }
};

// actions
const actions = {
  setToken({ commit }: { commit: any }, token: string) {
    commit("SET_TOKEN", token);
  },
  signout({ commit }: { commit: any }) {
    commit("REMOVE_USER");
  }
};

// mutations
const mutations = {
  SET_TOKEN(state: CurrentUserState, token: String) {
    state.token = token;

    const userData = jwt_decode(token);
    state.id = userData.user_id;
    state.email = userData.email;
    state.firstname = userData.firstname;
    state.lastname = userData.lastname;
  },
  REMOVE_USER(state: CurrentUserState) {
    state.id = undefined;
    state.email = undefined;
    state.firstname = undefined;
    state.lastname = undefined;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
