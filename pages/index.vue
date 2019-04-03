<template>
  <b-container>
    <b-row class="justify-content-center"> 
      <h4 class="text-center" v-translate>About site</h4>
    </b-row>
    <b-row class="justify-content-center">
    <b-carousel
      id="carousel1"
      style="text-shadow: 0px 0px 2px #000; max-width: 30rem"
      controls
      indicators
      background="#с4с4с4"
      :interval="3000"
      img-width="850"
      img-height="620"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      >
      <div
        v-for="(slide,idx) in slides"
        :key="idx"
        @click="onSelectSlide(slide.name)">
      <b-carousel-slide 
        :caption="slide.caption"
        :text="slide.text"
        :img-src="slide.src"
      />
      </div>
    </b-carousel>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
        slides: [
          {
            src: "/image/practice.png",
            name: 'practice',
            caption: 'practice',
            text: '...'
          },
          {
            src: "/image/games.png",
            name: 'games',
            caption: 'Games',
            text: '...'
          },
          {
            src: "/image/dictionary.png",
            name: 'dictionary',
            caption: 'dictionary',
            text: '...'
          }
        ]
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
      },
      onSelectSlide(name) {
        this.$router.push("/" + name)
      }
    }
  }
</script>