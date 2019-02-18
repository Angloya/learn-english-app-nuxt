<template>
  <b-card-group deck>
    <no-ssr>
      <b-card
        :bg-variant="selectedColor ? 'dark' : 'light'"
        :text-variant="selectedColor ? 'light' : 'dark'"
        :header="settings[0].header"
        :sub-title="settings[0].title">
          <toggle-button
            @change="selectedAction(selectedColor, settings[0].name)"
            :width="100"
            :height="30"
            :labels="{checked: settings[0].checked, unchecked: settings[0].unchecked}"
            class="vue-switcher"
            v-model="selectedColor"/>
      </b-card>
      <b-card
        :bg-variant="selectedColor ? 'dark' : 'light'"
        :text-variant="selectedColor ? 'light' : 'dark'"
        :header="settings[1].header"
        :sub-title="settings[1].title">
          <toggle-button
            @change="selectedAction(selectedDictionary, settings[1].name)"
            :width="100"
            :height="30"
            :labels="{checked: settings[1].checked, unchecked: settings[1].unchecked}"
            class="vue-switcher"
            v-model="selectedDictionary"/>
      </b-card>
    </no-ssr>
  </b-card-group>
</template>

<script>

export default {
  name: 'settings',
  data () {
    return {
      settings: [
        {
          header: 'Color scheme',
          title: 'You can choose the color scheme of the site',
          model: this.selectedColor || false,
          name: 'selectedColor',
          checked: 'white',
          unchecked: 'black'
        },
                {
          header: 'Words from the dictionary',
          title: 'Use words from the dictionary in the exercises',
          model: this.selectedDictionary || false,
          name: 'selectedDictionary',
          unchecked: 'dictionary',
          checked: 'random'
        }
      ]
    }
  },
  computed: {
    selectedColor: {
      get () {
        return this.$store.state.colorScheme.isColorDark
      },
      set (_val) {
        this.$store.commit('colorScheme/isColorDark', _val)
      }
    },
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
    selectedAction (model, name) {
      if (name == 'selectedDictionary') {
        this.selectedDictionary = model
      } else if (name == 'selectedColor')
      this.selectedColor = model
    }
  }
}
</script>
