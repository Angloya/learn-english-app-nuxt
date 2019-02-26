export default {
  data () {
    return {
      maxDay: this.$store.getters.maxTargetDay
    }
  },
  computed: {
    user () {
      return this.$store.state.appLogic.user
    },
    maxTargetDay () {
      if (this.$store.getters.maxTargetDay)
      return this.$store.getters.maxTargetDay
    },
    userKnowledge () {
      if (this.user && this.user.knowledge) {
        if (this.user.knowledge.maxTargetDay) {
          this.$store.commit('setMaxTargetDay', Number(this.maxTargetDay || this.user.knowledge.maxTargetDay))
        }
        if (!this.user.knowledge || this.date !==  this.user.knowledge.day) {
          this.$store.dispatch('addWordInDB', { id: 'knowledge', day: this.date, knowledgeDay: 0}).then(()=>{
            return this.user.knowledge || {}
          })
        } else {
            return this.user.knowledge || {}
        }
      }
    },
    date () {
      var today = new Date
      var curr_date = today.getDate()
      var curr_month = today.getMonth() + 1
      var curr_year = today.getFullYear()
      var date = curr_year + "-" + curr_month + "-" + curr_date
      return date
    }
  },
  methods: {
    summation () {
      if (this.userKnowledge) {
        if (this.userKnowledge.day && this.date ===  this.userKnowledge.day) {
          this.$store.dispatch('addWordInDB', { id: 'knowledge', day: this.date, knowledgeDay: this.user.knowledge.knowledgeDay +=1})
        } else {
          this.$store.dispatch('addWordInDB', { id: 'knowledge', day: this.date, knowledgeDay: 1})
        }
      }
    }
  }
}