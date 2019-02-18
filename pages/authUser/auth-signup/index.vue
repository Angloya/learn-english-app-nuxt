<template>
  <b-container class="text-center">
    <b-row>
      <b-col>
        <signup/>
        <login-with-google class="mt-4"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import signup from '~/components/user/Signup.vue'
import LoginWithGoogle from '~/components/user/LoginWithGoogle.vue'

export default {
  name: 'auth-signup',
  components: {
    signup,
    LoginWithGoogle
  }
}
</script>