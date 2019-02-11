<template>
  <b-card no-body
    style="max-width: 40rem; min-width: 18rem;">
    <b-container slot="header" class="px-0">
      <b-row class="text-center py-5">
        <b-col cols="10" class="px-0">
          <h3 v-if="_show.title">
          {{_title}}
          </h3>
        </b-col>
        <b-col class="px-0">
          <b-img
            slot="header"
            @click="showAudio = !showAudio"
            height="30"
            src="/image/tip.png"/>
        </b-col>
      </b-row>
      <b-card-body v-if="_show.audio && showAudio">
      <audio controls style="width: 250px;">
        <source :src="_audio" type="audio/mpeg">
      </audio>
    </b-card-body>
      <b-row class="text-center py-5">
        <b-col v-for="(letter, idx) in _letters" :key="idx" class="px-1">
        <b-button size="lg">
           {{letter}}
        </b-button>
        </b-col>
      </b-row>
              <!-- @click="$emit('change', answer)" -->
    </b-container>
  </b-card>
</template>

<script>
export default {
  name: 'word-constructor',
  props: {
    _title: { 
      type: String,
      default: ''
    },
    _letters: { 
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
      showAudio: false
    }
  }
}
</script>