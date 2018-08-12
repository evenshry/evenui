const PN = 'user.'

export default {
  state: {
    loginUser: null
  },
  getters: {
    [PN + 'loginUser']: state => {
      if (state.loginUser) {
        return state.loginUser
      } else {
        return null
      }
    }
  }
}
