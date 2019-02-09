export default function({ store, redirect, route }) {
  store.state.appLogic.user != null && route.name == 'authUser' ? redirect('/profile') : ''
  store.state.appLogic.user == null && route.name == 'profile' ? redirect('/') : ''
  store.state.appLogic.user == null && route.name == 'dictionary' ? redirect('/') : ''
}

// function isAdminRoute(route) {
//   if (route.matched.some(record => record.path == '/admin')) {
//     return true
//   }
// }