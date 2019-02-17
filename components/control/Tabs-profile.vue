<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Update profile" active>
        <update-profile/>
      </b-tab>
      <b-tab title="Settigns">Tab Contents 2</b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import UpdateProfile from '~/components/user/Update-profile.vue'

export default {
  name: 'tabs-profile',
  components: {
    UpdateProfile
  }
}
</script>
