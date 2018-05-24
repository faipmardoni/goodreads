import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasLogin: false,
    books: [],
    booksByUser: [],
    reviewsByUser: []
  },
  mutations: {
    changeLogin(state, val) {
      state.hasLogin = val
    },
    getBooks(state, val) {
      state.books = val
    },
    getbooksByUser(state, val) {
      state.booksByUser = val
    },
    reviewsByUser(state, val) {
      state.reviewsByUser = val
    },
    addBooks(state, val) {
      state.books.unshift(val)
      state.booksByUser.unshift(val)
    },
    deleteBook(state, val) {
      state.booksByUser.splice(val, 1)    
    }
  },
  actions: {
    getBooks({ commit }) {
      axios
        .get('http://localhost:3000/books/')
        .then((result) => {
          let arrBook = result.data.result
          function compare(a,b) {
            if (a.reviews.length > b.reviews.length)
              return -1;
            if (a.reviews.length < b.reviews.length)
              return 1;
            return 0;
          }
          arrBook.sort(compare)
          commit('getBooks', arrBook)
        }).catch((err) => {
        });
    },
    getbooksByUser({ commit }) {
      const token = localStorage.getItem('Token')
      const userId = localStorage.getItem('userId')
      axios.
        get(`http://localhost:3000/users/${userId}`, {
          headers: {
            token
          }
        })
        .then((result) => {
          commit('getbooksByUser', result.data.user.books)
          commit('reviewsByUser', result.data.user.reviews)
        }).catch((err) => {
          console.log('err :', err.response.data);
        });
    }
  }
})
