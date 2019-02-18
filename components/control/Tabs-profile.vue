<template>
  <b-card no-body
    :bg-variant="isColorDark ? 'dark' : 'light'"
    :text-variant="isColorDark ? 'light' : 'dark'">
    <b-tabs card>
      <b-tab title="Settigns">
        <settings/>
      </b-tab>
      <b-tab title="Update profile">
        <update-profile/>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import UpdateProfile from '~/components/user/Update-profile.vue'
import Settings from '~/components/user/Settings.vue'

export default {
  name: 'tabs-profile',
  components: {
    UpdateProfile,
    Settings
  },
  computed: {
    isColorDark () {
      return this.$store.state.colorScheme.isColorDark
    }
  }
}
</script>
