export default {
  data () {
    return {
      infoPractice: {},
      dictionaryWords: []
    }
  },
  created () {
    this.getDBCards()
  },
  computed: {
    user () {
      return this.$store.state.appLogic.user
    },
    practices () {
      return this.$store.state.appLogic.docsFB.practice || {}   
    },
    loading () {
      return this.$store.state.appLogic.loading
    }
  },
  methods: {
    async getDBCards () {
      await this.$store.dispatch('getDocFB', ['structure', 'practice'])
        for (var practice in this.practices) {
          if (practice == this.$options.name) {
            this.infoPractice = this.practices[practice]
            return this.infoPractice
          }
        }
    },
    getSkyengMeanings (setWordMeans) {
      if (this.$store.state.wordsForPractice.isWordDictionary && this.user) {
          this.$store.dispatch('getWordsFromDB').then(() => {
            this.dictionaryWords = []
            var ids = this.randomIds(this.$store.state.appLogic.wordsForDictionary.length)
            for (let id in ids) {
              this.dictionaryWords[id] = this.$store.state.appLogic.wordsForDictionary[ids[id]]
            }
            this.start = true
            this.wrongAnswers = {}
            if (setWordMeans) {
              this.setWordMeans()
            }
            return this.dictionaryWords
          })
      } else {
        this.$store.dispatch('getSkyengMeanings', this.randomIds(10000)).then(() => {
          if( this.$store.state.appLogic.meanings.length === 5) {
            this.start = true
            this.wrongAnswers = {}
            if (setWordMeans) {
              this.setWordMeans()
            }
            return this.$store.state.appLogic.meanings
          } else {
            this.getSkyengMeanings()
          }
        })
      }
    },
    setWordMeans () {
      this.answers = []
      this.answers = _.cloneDeep(this.meanings)
      this.sortArray(this.answers)
    },
    sortArray(array) {
      array.sort(this.compareRandom)
    },
    compareRandom(a, b) {
      return Math.random() - 0.5
    },
    getMeaningImg (mean) {
      if (mean.images.length != 0) {
        return mean.images[0].url
      } else {
        return ''
      }
    },
    randomIds (num) {
      var randomNum = []
      for (var i=0; i<5; i++) {
        var id = Math.floor(Math.random()*(num))
         randomNum[i]=id
      }
      return randomNum
    },
    setWrongAnswer (answer) {
      if (this.user && answer.id) {
        this.$store.dispatch('addWordInDB', answer)
      }
      this.wrongAnswers[answer.id] = answer
    },
    checkAnswer (answer) {
      clearTimeout(timerId)
      if (this.meanings[this.meanId].id == answer.id) {
        answer.color = 'success'
        this.keyColor = 'success'
      } else {
        answer.color = 'danger'
        for (let item of this.answers) {
          if (item.id == this.meanings[this.meanId].id) {
            item.color = 'success'
            break
          }
        }
        this.keyColor = 'danger'
        this.setWrongAnswer(answer)
      }
      var timerId = setTimeout(() => {
        this.setMeanId()
      }, 1000)
    }
  }
}