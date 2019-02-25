<template>
  <b-container v-if="userKnowledge">
    <b-row class="justify-content-center">
      <b-col
        cols="auto"
        md="auto">
        <h3>level: {{userKnowledge.level}}</h3>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
        <b-progress class="w-75 mt-2" :value="userKnowledge.knowledge" :max="maxKnowledge" animated /> 
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      maxKnowledge : 50
    }
  },
  created (){
    var today = new Date 
    if (!this.user.knowledge && !this.user.knowledge.data.day && today.toISOString() ===  this.user.knowledge.data.day) {
      this.$store.dispatch('addWordInDB', { id: 'knowledge',  knowledge: 1, day: today.toISOString(), knowledgeDay: 1})
    }
  },
  computed: {
    user () {
      return this.$store.state.appLogic.user || {}
    },
    userKnowledge () {
      if (this.user.knowledge) {
        return this.user.knowledge.data || {}
      }
    }
  }
}
</script>
