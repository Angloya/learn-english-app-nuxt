<template>
  <b-container>
    <b-carousel
      id="carousel1"
      style="text-shadow: 1px 1px 2px #333; max-width: 60rem;"
      controls
      indicators
      background="#ababab"
      :interval="4000"
      img-width="1024"
      img-height="480"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">
      <b-carousel-slide 
        caption="Practice"
        text="..."
        img-src="/image/practice.png"
      />
      <b-carousel-slide  img-src="/image/games.png">
        <h1>Games</h1>
      </b-carousel-slide>
      <b-carousel-slide img-src="/image/dictionary.png" 
      caption="dictionary"
        text="..."/>
    </b-carousel>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>