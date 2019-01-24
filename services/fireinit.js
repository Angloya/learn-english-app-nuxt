import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyDl4MxyVv6we8ENhgrYRuvhmxsLitqMKC0",
  authDomain: "learn-english-7f114.firebaseapp.com",
  databaseURL: "https://learn-english-7f114.firebaseio.com",
  projectId: "learn-english-7f114",
  storageBucket: "learn-english-7f114.appspot.com",
  messagingSenderId: "43843875311"
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
