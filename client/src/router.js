import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import User from './views/User.vue'
import Book from './views/Book.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/book/:id',
      name: 'book',
      component: Book
    }
  ]
})
