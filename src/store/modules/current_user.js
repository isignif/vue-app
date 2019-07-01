import jwt_decode from 'jwt-decode';


// initial state
const state = {
  id: null,
  email: null,
  firstname: null,
  lastname: null,
  token: null,
}

// getters
const getters = {
  id: state => state.id,
  token: state => state.token,
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
  setToken({commit}, token) {
    commit('SET_TOKEN', token)
  },
  signout({commit}) {
    commit('REMOVE_USER')
  }
}

// mutations
const mutations = {
  SET_TOKEN (state, token) {
    state.token = token

    const userData = jwt_decode(token)
    state.id = userData.user_id
    state.email = userData.email
    state.firstname = userData.firstname
    state.lastname = userData.lastname
  },
  REMOVE_USER (state) {
    state.id = null
    state.email = null
    state.firstname = null
    state.lastname = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
