import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _d0674952 = () => interopDefault(import('..\\pages\\authUser\\index.vue' /* webpackChunkName: "pages_authUser_index" */))
const _088e2c74 = () => interopDefault(import('..\\pages\\dictionary\\index.vue' /* webpackChunkName: "pages_dictionary_index" */))
const _c9a7b4ae = () => interopDefault(import('..\\pages\\games\\index.vue' /* webpackChunkName: "pages_games_index" */))
const _7f0baaa2 = () => interopDefault(import('..\\pages\\practice\\index.vue' /* webpackChunkName: "pages_practice_index" */))
const _483a65c1 = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages_profile_index" */))
const _0bc0d156 = () => interopDefault(import('..\\pages\\authUser\\auth-signin\\index.vue' /* webpackChunkName: "pages_authUser_auth-signin_index" */))
const _49486a20 = () => interopDefault(import('..\\pages\\authUser\\auth-signup\\index.vue' /* webpackChunkName: "pages_authUser_auth-signup_index" */))
const _4cb2b856 = () => interopDefault(import('..\\pages\\games\\word-definition\\index.vue' /* webpackChunkName: "pages_games_word-definition_index" */))
const _0007defc = () => interopDefault(import('..\\pages\\practice\\audition\\index.vue' /* webpackChunkName: "pages_practice_audition_index" */))
const _9c913528 = () => interopDefault(import('..\\pages\\practice\\audition-phrase\\index.vue' /* webpackChunkName: "pages_practice_audition-phrase_index" */))
const _acbd6b48 = () => interopDefault(import('..\\pages\\practice\\make-word\\index.vue' /* webpackChunkName: "pages_practice_make-word_index" */))
const _ac27b0ee = () => interopDefault(import('..\\pages\\practice\\translation-word\\index.vue' /* webpackChunkName: "pages_practice_translation-word_index" */))
const _3ec76ac1 = () => interopDefault(import('..\\pages\\practice\\word-translation\\index.vue' /* webpackChunkName: "pages_practice_word-translation_index" */))
const _fa4626be = () => interopDefault(import('..\\pages\\dictionary\\id\\_id.vue' /* webpackChunkName: "pages_dictionary_id__id" */))
const _0ca91f04 = () => interopDefault(import('..\\pages\\dictionary\\id\\id.vue' /* webpackChunkName: "pages_dictionary_id_id" */))
const _32d023c1 = () => interopDefault(import('..\\pages\\dictionary\\word\\_word.vue' /* webpackChunkName: "pages_dictionary_word__word" */))
const _8822bb6c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/english/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/authUser",
      component: _d0674952,
      name: "authUser"
    }, {
      path: "/dictionary",
      component: _088e2c74,
      name: "dictionary"
    }, {
      path: "/games",
      component: _c9a7b4ae,
      name: "games"
    }, {
      path: "/practice",
      component: _7f0baaa2,
      name: "practice"
    }, {
      path: "/profile",
      component: _483a65c1,
      name: "profile"
    }, {
      path: "/authUser/auth-signin",
      component: _0bc0d156,
      name: "authUser-auth-signin"
    }, {
      path: "/authUser/auth-signup",
      component: _49486a20,
      name: "authUser-auth-signup"
    }, {
      path: "/games/word-definition",
      component: _4cb2b856,
      name: "games-word-definition"
    }, {
      path: "/practice/audition",
      component: _0007defc,
      name: "practice-audition"
    }, {
      path: "/practice/audition-phrase",
      component: _9c913528,
      name: "practice-audition-phrase"
    }, {
      path: "/practice/make-word",
      component: _acbd6b48,
      name: "practice-make-word"
    }, {
      path: "/practice/translation-word",
      component: _ac27b0ee,
      name: "practice-translation-word"
    }, {
      path: "/practice/word-translation",
      component: _3ec76ac1,
      name: "practice-word-translation"
    }, {
      path: "/dictionary/id/:id?",
      component: _fa4626be,
      children: [{
        path: "",
        component: _0ca91f04,
        name: "dictionary-id-id"
      }]
    }, {
      path: "/dictionary/word/:word?",
      component: _32d023c1,
      name: "dictionary-word-word"
    }, {
      path: "/",
      component: _8822bb6c,
      name: "index"
    }],

    fallback: false
  })
}
