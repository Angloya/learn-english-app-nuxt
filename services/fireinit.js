import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyBn2nxRkorKZ1-a7GWUczlo9bE_LXnyeG0',
  authDomain: 'social-network-movie.firebaseapp.com',
  databaseURL: 'https://social-network-movie.firebaseio.com',
  projectId: 'social-network-movie',
  storageBucket: 'social-network-movie.appspot.com',
  messagingSenderId: '511734310402'
}
!firebase.apps.length ? firebase.initializeApp(config) : ''

// date issue fix according to firebase
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export const currentUser = auth.currentUser
export const storage = firebase.storage()
// export const usersCollection = db.collection('users')
export default firebase
