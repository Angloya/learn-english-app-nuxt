<template>
  <b-card-group deck>
    <b-card
      v-for="(setting, settingIdx) in settings"
      :key="settingIdx"
      :header="setting.header"
      :sub-title="setting.title">
        <toggle-button :width="100" :height="30" :labels="{checked: setting.checked, unchecked: setting.unchecked}" class="vue-switcher" v-model="setting.model"/>
    </b-card>
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
          model: false,
          checked: 'black',
          unchecked: 'white'
        },
                {
          header: 'Words from the dictionary',
          title: 'Use words from the dictionary in the exercises',
          model: false,
          unchecked: 'random',
          checked: 'dictionary'
        }
      ]
    }
  }
}
</script>
