export const state = () => ({
  user:{}
})

export const mutations = {
  loginUser(state, user){
    state.user = user
  },
}

export const getters = {
  getUser: (state) => () => {
    return state.user
  }
}
