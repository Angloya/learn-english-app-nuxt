<template>
  <div>
    <b-container v-if="!userKnowledge">
      <b-row class="justify-content-center">
        <h3>level: 0</h3>
      </b-row>
        <b-row class="justify-content-center">
          <p>Start classes to see your progress here</p>
        </b-row>
    </b-container>
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
      <b-row class="mt-3 justify-content-center">
        <b-col
          cols="auto"
          md="auto">
          <h5>Day progress</h5>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-progress :max="Number(maxTargetDay)" class="w-75 my-2" variant="success" height="2rem">
          <b-progress-bar :value="userKnowledge ? userKnowledge.knowledgeDay : 0">
            Progress: <strong>{{ userKnowledge ? userKnowledge.knowledgeDay : 0 }} / {{ maxTargetDay }}</strong>
          </b-progress-bar>
        </b-progress>
      </b-row>
      <b-row class="justify-content-center">
        <h5>Сhange daily target</h5>
        <b-form-input @change="changeDayTarget()" class="custom-range w-75" type="range" id="range-1" v-model="maxDay" min="5" step="5" max="50" />
      </b-row>
      <b-row class="justify-content-center">
          Value: {{ maxDay }}
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      maxKnowledge: 50
    }
  },
  methods: {
    changeDayTarget () {
      if (this.userKnowledge) {
        this.$store.dispatch('addDocInDB', { id: 'knowledge',  maxTargetDay: this.maxDay })
        this.$store.commit('setMaxTargetDay', Number(this.maxDay))
      }
    }
  },
  mixins: [
    require('~/mixins/user-base').default
  ]
}
</script>
