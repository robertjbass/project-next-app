import { store } from '../store'

export const AuthGuard = (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/signup')
}
}