<template>
  <b-row class="my-4 justify-content-center">
    <b-col 
      cols="auto"
      md="auto"
      class="mb-3">
      <b-card
        v-if='_meaning'
        :img-src="getMeaningImg(_meaning)"
        :img-alt="_meaning.text"
        :bg-variant="isColorDark ? 'dark' : 'light'"
        :text-variant="isColorDark ? 'light' : 'dark'"
        :border-variant="isColorDark ? 'light' : 'dark'"
        :title="_meaning.text"
        style="max-width: 20rem;"
        :sub-title="_meaning.transcription">
        <b-card-body>
            <audio controls style="width: 250px;">
              <source :src="_meaning.soundUrl" type="audio/mpeg">
            </audio>
          </b-card-body>
          <b-list-group flush>
            <b-list-group-item
              :variant="isColorDark ? 'dark' : 'light'">
              {{ _meaning.translation.text}}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col
        cols="auto"
        md="auto"
        class="mb-3">
        <b-card
          v-if='_meaning && _meaning.examples'
          title="Examples"
          :bg-variant="isColorDark ? 'dark' : 'light'"
          :text-variant="isColorDark ? 'light' : 'dark'"
          :border-variant="isColorDark ? 'light' : 'dark'"
          style="max-width: 20rem;"
          :sub-title="_meaning.text">
          <b-list-group flush>
            <b-list-group-item
            class="mb-1"
            :variant="isColorDark ? 'dark' : 'light'"
            v-for="(example, exampleIdx) in _meaning.examples"
            :key="exampleIdx">
            <p class="card-text">
              {{example.text}}
            </p>
            <audio controls style="width: 250px;">
              <source :src="example.soundUrl" type="audio/mpeg">
            </audio>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col
        cols="auto"
        md="auto"
        class="mb-3">
        <b-card
          v-if='_meaning && _meaning.definition && _meaning.alternativeTranslations'
          title="Definition"
          :bg-variant="isColorDark ? 'dark' : 'light'"
          :text-variant="isColorDark ? 'light' : 'dark'"
          :border-variant="isColorDark ? 'light' : 'dark'"
          style="max-width: 20rem;">
          <b-card-body>
            {{ _meaning.definition.text}}
            <audio controls style="width: 250px;">
              <source :src="_meaning.definition.soundUrl" type="audio/mpeg">
            </audio>
          </b-card-body>
      </b-card>
    </b-col>
  </b-row> 
</template>

<script>
export default {
  name: 'meaning-info',
  props: {
    _meaning: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isColorDark () {
      return this.$store.state.colorScheme.isColorDark
    }
  },
  methods: {
    getMeaningImg (mean) {
      if (mean && mean.images.length != 0) {
        return mean.images[0].url
      } else {
        return ''
      }
    }
  }
}
</script>

