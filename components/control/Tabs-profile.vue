<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Settigns">
        <settings/>
      </b-tab>
      <b-tab title="Update profile" active>
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
  }
}
</script>
