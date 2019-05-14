
// initial state
const state = {
  id: null,
  email: null,
  firstname: null,
  lastname: null,
  persistence_token: null,
}

// getters
const getters = {}

// actions
const actions = {
  signin({ commit, state }, user) {
    commit('setUser', user)
  }
  // getAllProducts ({ commit }) {
  //   shop.getProducts(products => {
  //     commit('setProducts', products)
  //   })
  // }
}

// mutations
const mutations = {
  setUser (state, user) {
    console.log('setUser')
    console.log(user)

    if (typeof user.attributes !== 'undefined') {
      let attributes = user.attributes

      state.id = user.id
      state.email = attributes.email
      state.firstname = attributes.firstname
      state.lastname = attributes.lastname

      state.persistence_token = attributes.persistence_token
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
