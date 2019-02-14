<template>
  <b-container class="text-center">
    <h2  class="my-2">Dictionary</h2>
    <loading v-if="loading"/>
    <b-row class="my-4 justify-content-center" v-if="!loading">
      <b-col 
        cols="auto"
        md="auto"
        class="mb-3">
        <b-card
          v-if='meaning'
          :img-src="getMeaningImg(meaning)"
          :img-alt="meaning.text"
          bg-variant="light"
          :title="meaning.text"
          style="max-width: 20rem;"
          :sub-title="meaning.transcription">
          <b-card-body>
            <audio controls style="width: 250px;">
              <source :src="meaning.soundUrl" type="audio/mpeg">
            </audio>
          </b-card-body>
          <b-list-group flush>
            <b-list-group-item>
              {{ meaning.translation.text}}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col
        cols="auto"
        md="auto"
        class="mb-3">
        <b-card
          v-if='meaning && meaning.examples'
          title="Examples"
          bg-variant="light"
          style="max-width: 20rem;"
          :sub-title="meaning.text">
          <b-list-group flush>
            <b-list-group-item
            class="mb-1"
            v-for="(example, exampleIdx) in meaning.examples"
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
          v-if='meaning && meaning.definition && meaning.alternativeTranslations'
          title="Definition"
          bg-variant="light"
          style="max-width: 20rem;">
          <b-card-body>
            {{ meaning.definition.text}}
            <audio controls style="width: 250px;">
              <source :src="meaning.definition.soundUrl" type="audio/mpeg">
            </audio>
          </b-card-body>
      </b-card>
    </b-col>
  </b-row>            
</b-container>
</template>

<script>
import cardWord from '~/components/CardWord.vue'
import loading from '~/components/loading.vue'

export default {
  name: 'dictionary-word-id',
  components: {
    cardWord,
    loading
  },
  created () {
    this.$store.dispatch('getSkyengMeanings', this.searchWordId).then(() => {
      return this.$store.state.appLogic.meanings
    })
  },
  computed: {
    searchWordId () {
      return this.$route.params.id
    },
    meaning () {
      if (this.$store.state.appLogic.meanings) {
        return this.$store.state.appLogic.meanings[0]
      }
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
