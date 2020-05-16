<template>
  <b-card-group  deck>
    <no-ssr>
      <b-card
        :bg-variant="selectedColor ? 'dark' : 'light'"
        :text-variant="selectedColor ? 'light' : 'dark'"
        :border-variant="selectedColor ? 'light' : 'dark'"
        header-border-variant="light"
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
      <words-dictionary-setting :_isColorBlack="selectedColor"/>
    </no-ssr>
  </b-card-group>
</template>

<script>
import wordsDictionarySetting from './../../components/control/words-dictionary-setting.vue'
export default {
  name: 'settings',
  components: {
    wordsDictionarySetting
  },
  data () {
    return {
      settings: [
        {
          header: this.t('Color scheme'),
          title: this.t('You can choose the color scheme of the site'),
          model: this.selectedColor || false,
          name: 'selectedColor',
          checked: this.t('white'),
          unchecked: this.t('black')
        },
                {
          header: this.t('Words from the dictionary'),
          title: this.t('Use words from the dictionary in the exercises'),
          model: this.selectedDictionary || false,
          name: 'selectedDictionary',
          unchecked: this.t('Dictionary'),
          checked: this.t('random')
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
