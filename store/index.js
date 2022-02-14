import {eraseCookie} from "@/utils/api";

export const state = () => ({
})

export const mutations = {
  loginUser(state, user){
    state.user = user
  },
  logoutUser(state){
    state.user = null
    eraseCookie("jwt")
  },
}

export const getters = {
  getUser: (state) => () => {
    return state.user
  }
}
