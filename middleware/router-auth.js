export default function({ store, redirect, route }) {
  store.state.user != null && route.name == 'authUser' ? redirect('/profile') : ''
  store.state.user == null && route.name == 'profile' ? redirect('/') : ''
  // store.state.user == null && isAdminRoute(route) ? redirect('/authUser') : ''
}

// function isAdminRoute(route) {
//   if (route.matched.some(record => record.path == '/admin')) {
//     return true
//   }
// }