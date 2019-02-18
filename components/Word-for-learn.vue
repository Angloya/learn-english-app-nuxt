<template>
  <b-card no-body
    :border-variant="isColorDark ? 'light' : 'dark'"
    :bg-variant="isColorDark ? 'dark' : 'light'"
    :text-variant="isColorDark ? 'light' : 'dark'"
    style="max-width: 20rem; min-width: 18rem;">
    <b-container slot="header" class="px-0">
      <b-row class="text-center">
        <b-col cols="10" class="px-0">
          <h4 v-if="_show.title">
            {{_title}}</h4>
        </b-col>
        <b-col class="px-0">
           <i slot="header"
            @click="showImage = !showImage"
            class="material-icons md-light">help</i>
        </b-col>
      </b-row>
    </b-container>
    <b-img thumbnail fluid :src="_image"
      v-if="showImage && _show.image"   
      :alt="_title"/>
    <b-card-body v-if="_show.audio">
      <audio controls style="width: 250px;">
        <source :src="_audio" type="audio/mpeg">
      </audio>
    </b-card-body>
    <b-list-group flush
      v-for="answer in _answers"
      :key="answer.id">
      <b-list-group-item 
        :variant="answer.color ? answer.color : isColorDark ? 'dark' : 'light'"
        v-if="_answerLabel"
        @click="$emit('change', answer)">
        {{answer[_answerLabel].text}}
      </b-list-group-item>
      <b-list-group-item 
        :variant="answer.color ? answer.color : isColorDark ? 'dark' : 'light'"
        v-if="!_answerLabel"
        @click="$emit('change', answer)">
        {{answer.text}}
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  name: 'word-for-learn',
  props: {
    _image: { 
      type: String,
      default: ''
    },
    _title: { 
      type: String,
      default: ''
    },
    _answerId:{
      type: String,
      default: 'text'
    },
    _answers: {
      type: Array
    },
    _audio: {
      type: String,
      default: ''
    },
    _show: {
      type: Object
    },
    _answerLabel: {
      type: String
    }
  },
  data () {
    return {
      showImage: false
    }
  },
  computed: {
    isColorDark () {
      return this.$store.state.colorScheme.isColorDark
    }
  }
}
</script>
