<template>
  <b-card no-body
    :bg-variant="_color ? _color : isColorDark ? 'dark' : 'light'"
    :text-variant="isColorDark ? 'light' : 'dark'"
    style="max-width: 60rem; min-width: 20rem;">
    <b-container slot="header" class="px-0">
      <b-row class="text-center">
        <h3 v-if="_check"> {{_answer}}</h3>
        <b-col cols="1" class="px-0">
          <i slot="header"
            v-if="!_check"
            @click="resetwords"
            class="material-icons md-light">cached</i>
        </b-col>
        </b-row>
    </b-container>
    <b-card-body v-if="_show.audio">
      <audio controls style="width: 250px;">
        <source :src="_audio" type="audio/mpeg">
      </audio>
    </b-card-body>
    <b-card-body>
      <b-row class="text-center py-5" v-if="!_check">
        <b-col v-for="(word, idx) in words" :key="idx" class="px-1">
          <b-button
            size="lg"
            class='word-constructor-word-button my-2 mx-2'
            @click="setword(idx)">
            {{word}}
          </b-button>
        </b-col>
      </b-row>
    </b-card-body>
     <b-card
      :bg-variant="_color ? _color : isColorDark ? 'dark' : 'light'"
      :text-variant="isColorDark ? 'light' : 'dark'"
      :title="_check ? _userAnswer : answer"/>
    <b-card-body>
      <b-button
        variant="light"
        v-if="!_check"
        size="lg"
        @click="$emit('change', answer)">
        {{t('Check')}}
      </b-button>
      <b-button
        variant="light"
        v-if="_check"
        size="lg"
        @click="$emit('next')">
        {{t('continue')}}
      </b-button>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'word-constructor',
  props: {
    _answer: {
      type: String
    },
    _color: {
      type: String,
      default: ''
    },
    _check: {
      type: Boolean,
      default: false
    },
    _userAnswer: {
      type: String
    },
    _words: { 
      type: Array,
      default: ''
    },
    _audio: {
      type: String,
      default: ''
    },
    _show: {
      type: Object
    }
  },
  data () {
    return {
      showAudio: false,
      answer: '',
      words: [...this._words] || []
    }
  },
  computed: {
    isColorDark () {
      return this.$store.state.colorScheme.isColorDark
    }
  },
  methods: {
    resetwords () {
      this.words = [...this._words]
      this.answer = ''
    },
    setword (id) {
      this.answer += (this.words[id] + ' ')
      this.words.splice(id, 1)
    }
  }
}
</script>