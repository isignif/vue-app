interface SnackBarState {
  display: Boolean;
  color?: String;
  message?: String;
}

// initial state
const state: SnackBarState = {
  display: false,
  color: undefined,
  message: undefined
};

// getters
const getters = {};

// actions
const actions = {
  display({ commit }, payload: SnackBarState) {
    payload.display = true;

    commit("CHANGE_DISPLAY", payload);
  },
  close({ commit }) {
    commit("CHANGE_DISPLAY", {
      display: false,
      color: undefined,
      message: undefined
    });
  }
};

// mutations
const mutations = {
  CHANGE_DISPLAY(state: SnackBarState, payload: SnackBarState) {
    state.display = payload.display;
    state.color = payload.color;
    state.message = payload.message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
