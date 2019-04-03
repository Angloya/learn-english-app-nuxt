import Vue from 'vue'
import VueTranslate from 'vue-translate-plugin'

if (process.client) {
  Vue.use(VueTranslate);
}

Vue.locales({
  english: {
    'About site': 'On the site you can to learn new english words and improve your English',
    'Practice': 'Practice',
    'Games': 'Games',
    'Dictionary': 'Dictionary',
    'SignIn': 'SignIn',
    'SignUp': 'SignUp',
    'Profile': 'Profile',
    'Signout': 'Signout',
    'Progress': 'Progress',
    'level': 'level',
    'Start classes': 'Start classes to see your progress here',
    'Day progress': 'Day progress',
    'Progress': 'Progress',
    'Сhange daily target': 'Сhange daily target',
    'Value': 'Value'
  },
  russian: {
    'About site': 'На данном сайте вы можете узнать новые англиский слова и повысить свой уровень английского языка',
  }
});