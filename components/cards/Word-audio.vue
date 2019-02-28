<template>
  <b-card no-body
    :bg-variant="_color ? _color : isColorDark ? 'dark' : 'light'"
    :text-variant="isColorDark ? 'light' : 'dark'"
    style="max-width: 25rem; min-width: 15rem;">
    <b-container slot="header" class="px-0">
      <b-row class="text-center"  v-if="!_check">
        <b-col cols="10" class="px-0">
          <h3 slot="header">
          Listen to the word
          </h3>
        </b-col>
        <b-col class="px-0">
          <i slot="header"
            @click="showTip = !showTip"
            class="material-icons md-light">help</i>
        </b-col>
      </b-row>
      <b-card-body v-if="_show.audio">
      <audio controls style="width: 250px;">
        <source :src="_audio" type="audio/mpeg">
      </audio>
      </b-card-body>
    </b-container>
    <b-card-body v-if="_show.title && showTip">
      <h3>{{_title}}</h3>
    </b-card-body>
    <b-card-body>
      <b-row class="text-center py-1">
        <b-input
          v-if="!_check"
          size="md"
          class="my-1"
          v-model="answer"
          type="text"
          placeholder="Enter word"/>
      </b-row>
    </b-card-body>
    <b-card
      :bg-variant="isColorDark ? 'dark' : 'light'"
      :text-variant="isColorDark ? 'light' : 'dark'"
      v-if="!_check" :title="answer"/>
    <b-card-body>
      <b-button
        variant="light"
        v-if="!_check"
        size="lg"
        @click="$emit('change', answer)">
        Check
      </b-button>
      <b-button
        variant="light"
        v-if="_check"
        size="lg"
        @click="$emit('next')">
        continue
      </b-button>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'word-audio',
  props: {
    _title: { 
      type: String,
      default: ''
    },
    _color: {
      type: String
    },
    _check: {
      type: Boolean,
      default: false
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
      showTip: false,
      answer: ''
    }
  },
  computed: {
    isColorDark () {
      return this.$store.state.colorScheme.isColorDark
    }
  }
}
</script>