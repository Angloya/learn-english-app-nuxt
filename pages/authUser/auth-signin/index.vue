<template>
  <b-container class="text-center">
    <b-row>
      <b-col>
        <signin/>
        <login-with-google class="mt-4"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import signin from '~/components/user/Signin.vue'
import LoginWithGoogle from '~/components/user/LoginWithGoogle.vue'

export default {
  name: 'auth-signin',
  components: {
    signin,
    LoginWithGoogle
  }
}
</script>