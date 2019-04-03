<template>
  <b-card no-body
    :bg-variant="isColorDark ? 'dark' : 'light'"
    :border-variant="isColorDark ? 'light' : 'dark'"
    :text-variant="isColorDark ? 'light' : 'dark'"
    :header-border-variant="isColorDark ? 'dark' : 'light'">
    <b-tabs card class="border-bottom">
      <b-tab :title="t('Progress')">
        <user-progress/>
      </b-tab>
      <b-tab :title="t('Settigns')">
        <settings/>
      </b-tab>
      <b-tab :title="t('Update profile')">
        <update-profile/>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import UpdateProfile from '~/components/user/Update-profile.vue'
import Settings from '~/components/user/Settings.vue'
import UserProgress from '~/components/user/User-progress.vue'

export default {
  name: 'tabs-profile',
  components: {
    UpdateProfile,
    Settings,
    UserProgress
  },
  computed: {
    isColorDark () {
      return this.$store.state.colorScheme.isColorDark
    }
  }
}
</script>
