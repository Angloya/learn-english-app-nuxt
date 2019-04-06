<template>
  <b-container class="text-center">
    <b-row>
      <b-col>
        <h3 v-translate>For more features, it is recommended to log in</h3>
        <b-button class="m-5" to="/authUser/signin" v-translate>SignIn</b-button>
        <b-button class="m-5" to="/authUser/signup" v-translate>SignUp</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'authUser'
}
</script>
