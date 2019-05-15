
// initial state
const state = {
  display: false,
  color: null,
  message: null,
}

// getters
const getters = { }

// actions
const actions = {
  display({commit}, playload) {
    console.log(playload)
    playload.display = true

    commit('CHANGE_DISPLAY', playload)
  },
  close({commit}) {
    commit('CHANGE_DISPLAY', {
      display: false,
      color: null,
      message: null,
    })
  },
}

// mutations
const mutations = {
  CHANGE_DISPLAY (state, payload) {
    state.display = payload.display
    state.color = payload.color
    state.message = payload.message
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
