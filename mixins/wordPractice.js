export default {
  computed: {
    user () {
      return this.$store.state.appLogic.user
    }
  },
  methods: {
    sortArray(array) {
      array.sort(this.compareRandom)
    },
    compareRandom(a, b) {
      return Math.random() - 0.5
    },
    getSkyengMeanings () {
      this.$store.dispatch('getSkyengMeanings', this.randomIds()).then(() => {
        if( this.$store.state.appLogic.meanings.length === 5) {
          this.start = true
          this.wrongAnswers = {}
          this.setWordMeans()
          return this.$store.state.appLogic.meanings
        } else {
          this.getSkyengMeanings()
        }
      })
    },
    getMeaningImg (mean) {
      if (mean.images.length != 0) {
        return mean.images[0].url
      } else {
        return ''
      }
    },
    randomIds () {
      var randomNum = []
      for (var i=0; i<5; i++) {
        var id = Math.floor(Math.random()*(100000))
         randomNum[i]=id
      }
      return randomNum
    },
    setWrongAnswer (answer) {
        if (this.user && answer.id) {
          this.$store.dispatch('addWordInDB', answer).then(() => {
            this.wrongAnswers[answer.id] = answer
        })
      }
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