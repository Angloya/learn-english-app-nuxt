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
  mixins: [
    require('~/mixins/user-base').default
  ]
}
</script>
