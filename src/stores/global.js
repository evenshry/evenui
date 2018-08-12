const PN = 'global.'

export const state = {
  global: {
    token: null
  }
}

export const getters = {
  [PN + 'token']: state => state.global.token
}

export const mutations = {
  [PN + 'login'] (state, token) {
    state.global.token = token
  },
  [PN + 'logout'] (state) {
    state.global.token = null
  }
}

export const actions = {}
