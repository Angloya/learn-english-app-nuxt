export default {
  data () {
    return {
      infoPractice: {},
      dictionaryWords: null,
      notEnoughWords: false,
      timeout: null,
      setInterval: null,
      gameTime: 60
    }
  },
  created () {
    this.getDBCards()
  },
  computed: {
    meanings () {
      return this.dictionaryWords || this.$store.getters.meanings || []
    },
    practices () {
      return this.$store.state.appLogic.docsFB.practice || {}   
    },
    loading () {
      return this.$store.state.appLogic.loading
    },
    isWordDictionary () {
      return this.$store.state.wordsForPractice.isWordDictionary     
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
    startPractice (setWordMeans) {
      this.start = true
      this.wrongAnswers = {}
      if (setWordMeans) {
        this.setWordMeans()
      }
    },
    timerGame () {
      this.setInterval = setInterval(() => {
        if (this.gameTime > 0) {
          this.gameTime -= 1
        } else {
          clearInterval(this.setInterval)
          // this.message = "time's up"
          this.start = false
        }
      }, 1000)
    },
    getWordsFromDB (setWordMeans) {
      this.notEnoughWords = false
      this.dictionaryWords = []
      var wordId = []
      var words = this.$store.state.appLogic.wordsForDictionary
      for (let word of words) {
        if (word.knowledge < 10) {
          wordId.push(word)
        }
      }
      var ids = this.randomIds(wordId.length)
      if (wordId.length > 4) {
        if (ids.length > 4) {
          for (let id in ids) {
            this.dictionaryWords[id] = wordId[ids[id]]
          }
          this.startPractice(setWordMeans)
          return this.dictionaryWords
        } else {
          this.getWordsFromDB(setWordMeans)
        }
      } else {
        this.notEnoughWords = true
      }
    },
    getSkyengMeanings (setWordMeans) {
      if (this.isWordDictionary && this.user) {
        this.$store.dispatch('getWordsFromDB').then(() => {
          this.getWordsFromDB(setWordMeans)
        })
      } else {
        this.dictionaryWords = null
        this.$store.dispatch('getSkyengMeanings', this.randomIds(10000)).then(() => {
          if( this.$store.state.appLogic.meanings.length === this.wordsCount) {
            this.startPractice(setWordMeans)
            return this.$store.state.appLogic.meanings
          } else {
            this.getSkyengMeanings(setWordMeans)
          }
        })
      }
    },
    setWordMeans () {
      this.answers = []
      var meanings = []
      meanings = _.cloneDeep(this.meanings)
      meanings.forEach(meaning => {
        if (!meaning.wrong) {
          this.answers.push(meaning)
        }
      })
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
        for (var i=0; i<this.wordsCount; i++) {
          var id = Math.floor(Math.random()*(num))
           randomNum[i]=id
      }
      let randomId = [...new Set(randomNum)]
      return randomId
    },
    setWrongAnswer (answer) {
      if (this.user && answer.id) {
        delete answer.color
        this.$store.dispatch('addWordInDB', answer)
      }
      answer.wrong = true
      this.meanings.push(answer)
      answer.color = 'danger'
      this.wrongAnswers[answer.id] = answer
      
    },
    checkAnswer (answer) {
      clearTimeout(this.timeout)
      if (this.meanings[this.meanId].id == answer.id) {
        if (this.isWordDictionary) {
          answer.knowledge += 1
          this.$store.dispatch('addWordInDB', { id: 'knowledge',  knowledge: this.userKnowledge.knowledge += 1,})
          this.$store.dispatch('addWordInDB', answer)
        }
        if (this.userKnowledge) {
          this.$store.dispatch('addWordInDB', { id: 'knowledge',  knowledge: this.userKnowledge.knowledge += 1 })
        } else {
          this.$store.dispatch('addWordInDB', { id: 'knowledge',  knowledge: 1,})
        }
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
      this.timeout = setTimeout(() => {
        this.setMeanId()
      }, 2000)
    }
  }
}