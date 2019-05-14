
// initial state
const state = {
  id: null,
  email: null,
  firstname: null,
  lastname: null,
  persistence_token: null,
}

// getters
const getters = {
  id: state => {
    return state.id
  },
  completeName: (state, getters) => {
    if (getters.isLogged == false) {
      return '';
    }

    return `${state.firstname} ${state.lastname}`
  },
  isLogged: state => {
    return state.id !== null
  }
}

// actions
const actions = {
  signin({ commit, state }, user) {
    if (typeof user.attributes !== 'undefined') {
      commit('SET_USER', user)
    } else {
      console.error('Bad data passed into signin')
    }
  },
  signout({ commit, state }) {
    commit('REMOVE_USER')
  }
}

// mutations
const mutations = {
  // TODO set mutliples mutators
  SET_USER (state, user) {
      let attributes = user.attributes

      state.id = user.id
      state.email = attributes.email
      state.firstname = attributes.firstname
      state.lastname = attributes.lastname
      state.persistence_token = attributes.persistence_token
  },
  REMOVE_USER (state) {
    state.id = null
    state.email = null
    state.firstname = null
    state.lastname = null
    state.persistence_token = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
