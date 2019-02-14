export default {
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
      await this.$store.dispatch('getDocFB', ['structure', 'practice']).then(() => {
        for (var practice in this.practices) {
          if (practice == this.name) {
            this.info = this.practices[practice]
            break
          }
        }
      })
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