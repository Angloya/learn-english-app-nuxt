<template>
  <b-container>
    <h2>Profile info</h2>
    <b-row>
      <b-col>
        <b-img rounded width="200"
        height="300"
        thumbnail class="m-3"
        :src='photoURL'
        fluid alt="userIcon"/>
      </b-col>
      <b-col>
        <h2 class="m-3">{{ user.name }}</h2>
        <p class="m-3"><b>Your email: </b> {{ user.email }}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    user () {
         return this.$store.getters.user || {}
    },
    photoURL () {
      return this.user.photoURL || "/image/avatar.png"
    }
  }
}
</script>
