import Vue from 'vue'
import Vuex from 'vuex'
import { getAdminInfo } from '../api/getData'

Vue.use(Vuex)

const state = {
  // 用户信息
  adminInfo:{
    avatar:'default.jpg'
  }
}

const mutations = {
  // 保存用户信息
  saveAdminInfo(state,adminInfo) {
    state.adminInfo = adminInfo
  }
}

const actions = {
  // 获得用户信息
  async getAdminData({commit}) {
    try {
      const res = await getAdminInfo()
      if(res.status == 1) {
        commit('saveAdminInfo',res.data)
      }else{
        throw new Error(res.type)
      }
    } catch (error) {
      
    }
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})