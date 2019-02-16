<template>
  <b-container class="text-center">
    <b-row>
      <b-col>
        <signin/>
        <loginWithGoogle class="mt-4"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import signin from '~/components/user/Signin.vue'
import loginWithGoogle from '~/components/user/loginWithGoogle.vue'

export default {
  name: 'auth-signin',
  components: {
    signin,
    loginWithGoogle
  }
}
</script>