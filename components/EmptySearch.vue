<template>
<b-container class="text-center my-2">
    <b-row class="my-4 justify-content-center">
       <h2 class="my-2"> Sorry we can't find the word "{{_searchWord}}"</h2>
     </b-row>
     <b-row class="justify-content-center">
       <i class="material-icons empty-search-material-icons">sentiment_dissatisfied</i>
     </b-row>
</b-container>
</template>

<script>
export default {
  name: 'empty-search',
  props: {
    _searchWord:  {
      type: String,
      default: ''   
    }
  }
}
</script>

<style scoped>
.empty-search-material-icons {
  font-size: 10rem;
}
</style>
