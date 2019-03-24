export default function({ store, redirect, route }) {
  store.state.appLogic.user && route.name == 'authUser' ? redirect('/profile') : ''
  store.state.appLogic.user && route.name == 'auth-signup' ? redirect('/profile') : ''
  store.state.appLogic.user && route.name == 'auth-signin' ? redirect('/profile') : ''
  !store.state.appLogic.user && route.name == 'profile' ? redirect('/') : ''
  // !store.state.appLogic.user && route.name == 'dictionary' ? redirect('/') : ''
}

// function isAdminRoute(route) {
//   if (route.matched.some(record => record.path == '/admin')) {
//     return true
//   }
// }