// declare module "jwt-decode";
// import jwt_decode from "jwt-decode";
const jwt_decode = require("jwt-decode");

interface ICurrentUserState {
  id?: Number;
  email?: String;
  firstname?: String;
  lastname?: String;
  token?: String;
}

// initial state
const state: ICurrentUserState = {
  id: undefined,
  email: undefined,
  firstname: undefined,
  lastname: undefined,
  token: undefined
};

interface IPayload {
  email: string;
  exp: number;
  firstname: string;
  lastname: string;
  user_id: number;

}

// getters
const getters = {
  id: (state: ICurrentUserState) => state.id,
  token: (state: ICurrentUserState) => state.token,
  completeName: (state: ICurrentUserState, getters: any): string => {
    if (getters.isLogged == false) {
      return "";
    }

    return `${state.firstname} ${state.lastname}`;
  },
  isLogged: (state: ICurrentUserState): boolean => {
    return state.id !== null;
  },
  getPayload: (state: ICurrentUserState): IPayload => {
    return jwt_decode(state.token);
  }
};

// actions
const actions = {
  setToken({ commit }: { commit: any }, token: string) {
    commit("SET_TOKEN", token);
  },
  signout({ commit }: { commit: any }) {
    commit("REMOVE_USER");
  },
  checkToken({ commit, state }: { commit: any, state: ICurrentUserState }) {
    if (!state.token) {
      return;
    }
    const payload: IPayload = jwt_decode(state.token);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (currentTimestamp > payload.exp) {
      commit("REMOVE_USER");
    }
  }
};

// mutations
const mutations = {
  SET_TOKEN(state: ICurrentUserState, token: String) {
    state.token = token;

    const payload = jwt_decode(token);
    console.log(payload)
    state.id = payload.user_id;
    state.email = payload.email;
    state.firstname = payload.firstname;
    state.lastname = payload.lastname;
  },
  REMOVE_USER(state: ICurrentUserState) {
    state.id = undefined;
    state.token = undefined;
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
