<template>
  <b-row class="justify-content-center">
    <b-card
      v-if="_practiceInfo"
      :title="_practiceInfo.name"
      :border-variant="isColorDark ? 'light' : 'dark'"
      :bg-variant="isColorDark ? 'dark' : 'light'"
      :text-variant="isColorDark ? 'light' : 'dark'"
      img-src="/image/wordImage2.png"
      style="max-width: 20rem;"
      class="mb-2">
      <p class="card-text">
        {{_practiceInfo.text}}
      </p>
      <b-button
        @click="$emit('click')"> 
          {{t('begin to learn the words')}}
      </b-button>
    </b-card>
    <b-card v-if="_notEnoughWords"
      :bg-variant="isColorDark ? 'dark' : 'light'"
      :text-variant="isColorDark ? 'light' : 'dark'"
      :title="t('You do not have enough words in the dictionary to train, you can learn random words')">
    <words-dictionary-setting :_isColorBlack="isColorDark"/>
    </b-card>
    <wrongAnswers 
      :_wrongAnswers='_wrongAnswers' 
      v-if="_wrongAnswers"/>
  </b-row>
</template>

<script>
import wrongAnswers from '~/components/cards/Wrong-answers.vue'
import wordsDictionarySetting from '~/components/control/words-dictionary-setting.vue'

export default {
  name: 'practice-card',
  components: {
    wrongAnswers,
    wordsDictionarySetting
  },
  props: {
    _practiceInfo: {
      type: Object
    },
    _wrongAnswers: {
      type: Object
    },
    _notEnoughWords: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isColorDark () {
      return this.$store.state.colorScheme.isColorDark
    }
  }
}
</script>
