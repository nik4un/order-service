import store from '../store' // из index.js указанной папки

export default function (to, from, next) {
  if (store.getters.user) {
    next()
  } else {
    next('/login?loginError=true')
  }
}
