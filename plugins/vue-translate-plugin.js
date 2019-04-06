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
    'Value': 'Value',
    'Color scheme': 'Color scheme',
    'You can choose the color scheme of the site': 'You can choose the color scheme of the site',
    'white': 'white',
    'black': 'black',
    'Words from the dictionary': 'Words from the dictionary',
    'Use words from the dictionary in the exercises': 'Use words from the dictionary in the exercises',
    'random': 'random',
    'Update Profile': 'Update Profile',
    'Choose a image': 'Choose a image',
    'Save': 'Save',
    'Your name': 'Your name',
    'Login with': 'Login with',
    'Your email': 'Your email',
    'Your password': 'Your password',
    'Login': 'Login',
    'Reset': 'Reset',
    'Forgot password? enter your email and reset your password!': 'Forgot password? enter your email and reset your password!',
    'Enter email': 'Enter email',
    'Enter password': 'Enter password',
    'Confirm Password': 'Confirm Password',
    'Enter Name': 'Enter Name',
    'Submit': 'Submit',
    'Words added to your dictionary': 'Words added to your dictionary',
    'Wrong answers': 'Wrong answers',
    "Sorry we can't find the word": "Sorry we can't find the word",
    'For more features, it is recommended to log in': 'For more features, it is recommended to log in',
    'Learn more': 'Learn more',
    'Return to the dictionary for future reference': 'Return to the dictionary for future reference',
    'start': 'Start',
    'Stop the game': 'Stop the game'

  },
  russian: {
    'About site': 'На данном сайте вы можете узнать новые англиский слова и повысить свой уровень английского языка',
  }
});