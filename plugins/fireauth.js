import { auth } from '@/services/fireinit.js'

export default context => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      debugger
      if (user) {
        return resolve(store.commit('setUser', user))
      }
      return resolve()
    })
  })
}



//   return new Promise((resolve, reject) => {
//     auth.onAuthStateChanged(user => {
//       debugger
//       if (user) {
//         return this.$store.dispatch('autoSignIn', user)
//       }
//     })
//   })
// }