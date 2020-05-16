<template>
  <b-container class="text-center">
    <h2>Profile</h2>
    <b-row class="justify-content-center">
      <b-col cols="auto" md="4" > 
        <profile-info/>
      </b-col>
      <b-col cols="auto" md="8">
        <tabs-profile/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ProfileInfo from './../../components/user/Profile-info.vue'
import TabsProfile from './../../components/control/Tabs-profile.vue'

export default {
  name: 'Profile',
  components: {
    ProfileInfo,
    TabsProfile
  }
}
</script>
