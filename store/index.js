import Vue from 'vue'
import Vuex from 'vuex'
import firebase, {auth, GoogleProvider, StoreDB, storage} from '@/services/fireinit.js'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      loading: false,
      error: null,
      photoURL: null,
      progress: null,
      progressShow: false,
      docsFB: [],
      word: null,
      meanings: null,
      wordsForDictionary: null
    },
    mutations: {
      setUser (state, payload) {
        state.user = payload
      },
      setLoading (state, payload) {
        state.loading = payload
      },
      setError (state, payload) {
        state.error = payload
      },
      clearError (state) {
        state.error = null
      },
      setURLPhoto (state, payload) {
        state.photoURL = payload
      },
      setProgress (state, payload) {
        state.progress = payload
      },
      setProgressShow (state, payload) {
        state.progressShow = payload
      },
      setDocsFB (state,[doc, payload]) {
        state.docsFB[doc] = payload
      },
      setWord (state, payload) {
        state.word = payload
      },
      setMeanings (state, payload) {
        state.meanings = payload
      },
      setWordsForDictionary (state, payload) {
        state.wordsForDictionary = payload
      },
    },
    actions: {
      // authorization
      signUserUp ({ commit }, payload) {
        commit('setLoading', true)
        commit('clearError')
        auth.createUserWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
              auth.currentUser.updateProfile({
                displayName: payload.displayName
              }).then(() => {
                console.log('successful')
                window.location.reload()
              })
              const newUser = {
                id: user.uid,
                email: user.email
              }
              commit('setUser', newUser)
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
        commit('setLoading', false)
      },
      signUserIn ({ commit }, payload) {
        commit('setLoading', true)
        commit('clearError')
        auth.signInWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
              commit('setLoading', false)
              const newUser = {
                id: user.uid,
                name: user.displayName,
                email: user.email
              }
              commit('setUser', newUser)
              window.location.reload()
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },
      signUserInGoogle ({ commit }) {
        commit('setLoading', true)
        commit('clearError')
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(
            user => {
              commit('setLoading', false)
              const newUser = {
                id: user.user.uid,
                name: user.user.displayName,
                email: user.user.email
              }
              commit('setUser', newUser)
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },
      autoSignIn ({ commit }, payload) {
        commit('setLoading', true)
        commit('setUser', {
          id: payload.uid,
          name: payload.displayName,
          email: payload.email,
          photoURL: payload.photoURL
        })
        commit('setLoading', false)
      },
      logout (context) {
        auth.signOut()
        context.commit('setUser', null)
        window.location.reload()
      },
      // update profile
      updateProfile ({ commit, state }, user) {
        commit('setLoading', true)
        if (auth.currentUser) {
          if (user.photoURL !== null && user.photoURL !== undefined) {
            this.dispatch('uploadFileFirebase', [user, state.user.uid, 'Avatar'])
          } else {
            auth.currentUser.updateProfile({
              displayName: user.displayName
            }).then(() => {
              // Update successful
              console.log('successful')
              window.location.reload()
            })
              .catch(
                error => {
                  commit('setLoading', false)
                  commit('setError', error)
                  console.log(error)
                }
              )
          }
        }
        commit('setLoading', false)
      },
      // reset Password With Email
      resetPasswordWithEmail ({ commit }, payload) {
        const { email } = payload
        commit('setLoading', true)
        auth.sendPasswordResetEmail(email)
          .then(
            () => {
              commit('setLoading', false)
              console.log('Email Sent')
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            })
      },
      // upload file to Firebase
      uploadFileFirebase ({ commit, state }, [file, userID, fileName]) {
        // Нужно добавить сжатие картинок
        // Create a root reference
        var storageRef = storage.ref()
        var metadata = {
          contentType: 'image/jpeg/png'
        }
        var uploadTask = storageRef.child(userID + '/' + fileName)
        var uploadFile = uploadTask.put(file.photoURL, metadata)
        uploadFile.on('state_changed', (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          commit('setProgress', progress)
          commit('setProgressShow', true)
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
        })
        return uploadFile.then(() => {
          return uploadTask.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL)
            commit('setURLPhoto', downloadURL)
            return auth.currentUser.updateProfile({
              photoURL: downloadURL,
              displayName: state.user.name
            }).then(() => {
              // Update successful
              console.log('successful')
              commit('setProgressShow', false)
              window.location.reload()
            })
              .catch(
                error => {
                  commit('setLoading', false)
                  commit('setError', error)
                  commit('setProgressShow', false)
                  console.log(error)
                }
              )
          })
        })
      },
      getDocFB ({ commit }, [colName, docName]) {
        commit('setLoading', true)
        return StoreDB.collection(colName).doc(docName).get().then((doc) => {
          if (doc.exists) {
            commit('setDocsFB', [docName, doc.data()])
            commit('setLoading', false)
          } else {
            console.log('No such document!')
          }
        }).catch((error) => {
          console.log('Error getting document:', error)
        })
      },
      getSkyengWord ({ commit }, word) {
        commit('setLoading', true)
        return axios.get("http://dictionary.skyeng.ru/api/public/v1/words/search?_format=json&search=" + word).then(response => {
          commit('setWord', response.data)
          commit('setLoading', false)
          return response.data
        })
          .catch(e => {
            console.log(e)
            commit('setError', e)
          })
      },
      getSkyengMeanings ({ commit }, ids) {
        commit('setLoading', true)
        return axios.get("http://dictionary.skyeng.ru/api/public/v1/meanings?_format=json&ids=" + ids).then(response => {
          commit('setMeanings', response.data)
          commit('setLoading', false)
          return response.data
        })
          .catch(e => {
            console.log(e)
            commit('setError', e)
          })
      },
      addWordInDB ({ state }, data) {
        StoreDB.collection(state.user.id).doc(data.id).set({
          data
        })
          .then(() => {
            console.log('Document successfully written!')
          })
          .catch((error) => {
            console.error('Error writing document: ', error)
          })
      },
      getWordsFromDB ({ commit, state }) {
        var words = []
        commit('setLoading', true)
        return StoreDB.collection(state.user.id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) =>  {
            let word = doc.data()
            words.push(word.data)
          })
          commit('setWordsForDictionary', words)
          commit('setLoading', false)
        }).catch((error) => {
          console.log('Error getting document:', error)
        })
      }
    }
  })
}
export default createStore
