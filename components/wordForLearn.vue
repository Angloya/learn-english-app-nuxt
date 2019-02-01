<template>
  <b-card></b-card>
</template>

<script>
export default {
  name: 'word-for-learn',
  props: {
    _collection: {
      type: String
    },
    _document: {
      type: String
    },
    _cards: {
      type: Object
    }
  },
  computed: {
    correctAnswer () {
      
    }
  },
  methods: {
    checkAnswer () {
      return correctAnswer
    }
  }
}
</script>
