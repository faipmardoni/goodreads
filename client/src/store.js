import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasLogin: false,
    books: [],
    questionsByUser: [],
    answersByUser: []
  },
  mutations: {
    changeLogin(state, val) {
      state.hasLogin = val
    },
    getBooks(state, val) {
      state.books = val
    },
    // questionsByUser(state, val) {
    //   state.questionsByUser = val
    // },
    // answersByUser(state, val) {
    //   state.answersByUser = val
    // },
    addBooks(state, val) {
      state.books.unshift(val)
      // state.questionsByUser.unshift(val)
    },
    // deleteQuestions(state, val) {
    //   state.questionsByUser.splice(val, 1)    
    // }
  },
  actions: {
    getBooks({ commit }) {
      axios
        .get('http://localhost:3000/books/')
        .then((result) => {
          commit('getBooks', result.data.result)
        }).catch((err) => {
        });
    },
    // questionsByUser({ commit }) {
    //   const token = localStorage.getItem('Token')
    //   const userId = localStorage.getItem('userId')
    //   axios.
    //     get(`http://localhost:3000/users/${userId}`, {
    //       headers: {
    //         token
    //       }
    //     })
    //     .then((result) => {
    //       commit('questionsByUser', result.data.user.questions)
    //       commit('answersByUser', result.data.user.answers)
    //     }).catch((err) => {
    //       console.log('err :', err.response.data);
    //     });
    // }
  }
})
