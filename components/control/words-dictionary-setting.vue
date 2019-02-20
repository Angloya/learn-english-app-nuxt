<template>
  <b-card
    :bg-variant="_isColorBlack ? 'dark' : 'light'"
    :text-variant="_isColorBlack ? 'light' : 'dark'"
    :border-variant="_isColorBlack ? 'light' : 'dark'"
    header-border-variant="light"
    :header="header"
    :sub-title="title">
    <toggle-button
      @change="selectedAction(selectedDictionary)"
      :width="100"
      :height="30"
      :labels="{checked: checked, unchecked: unchecked}"
      class="vue-switcher"
      v-model="selectedDictionary"/>
  </b-card>
</template>

<script>
export default {
  name: 'words-dictionary-setting',
  props: {
    _isColorBlack: {
      type: Boolean
    }
  },
  data () {
    return {
      header: 'Words from the dictionary',
      title: 'Use words from the dictionary in the exercises',
      model: this.selectedDictionary || false,
      name: 'selectedDictionary',
      unchecked: 'dictionary',
      checked: 'random'
    }
  },
  computed: {
    selectedDictionary: {
      get () {
        return this.$store.state.wordsForPractice.isWordDictionary
      },
      set (_val) {
        this.$store.commit('wordsForPractice/isWordDictionary', _val)
      }
    }
  },
  methods: {
    selectedAction (model) {
      this.selectedDictionary = model
    }
  }
}
</script>
