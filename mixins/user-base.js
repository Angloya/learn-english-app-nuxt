export default {
  computed: {
    user () {
      return this.$store.state.appLogic.user
    },
    userKnowledge () {
      if (this.user && this.user.knowledge) {
        if (this.date !==  this.user.knowledge.data.day) {
          this.$store.dispatch('addWordInDB', { id: 'knowledge', day: this.date, knowledgeDay: 0}).then(()=>{
            return this.user.knowledge.data || {}
          })
        } else {
            return this.user.knowledge.data || {}
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
          this.$store.dispatch('addWordInDB', { id: 'knowledge', day: this.date, knowledgeDay: this.user.knowledge.data.knowledgeDay +=1})
        } else {
          this.$store.dispatch('addWordInDB', { id: 'knowledge', day: this.date, knowledgeDay: 1})
        }
      }
    }
  }
}