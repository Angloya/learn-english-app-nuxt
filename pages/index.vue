<template>
  <b-container>
    <b-row class="justify-content-center">
    <b-carousel
      id="carousel1"
      style="text-shadow: 0px 0px 2px #000; max-width: 30rem"
      controls
      indicators
      background="#с4с4с4"
      :interval="4000"
      img-width="850"
      img-height="620"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">
      <b-carousel-slide 
        caption="Practice"
        text="..."
        img-src="/image/practice.png"
        to="/practice"
      />
      <b-carousel-slide  img-src="/image/games.png">
        <h1>Games</h1>
      </b-carousel-slide>
      <b-carousel-slide img-src="/image/dictionary.png" 
      caption="dictionary"
        text="..."/>
    </b-carousel>
    </b-row>
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
    created () {
      this.onSlideStart(this.slide)
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