<template>
  <b-card no-body
    style="max-width: 20rem;"
    :img-src="_imageWord"
    img-alt="Image"
    :bg-variant="isColorDark ? 'dark' : 'light'"
    :text-variant="isColorDark ? 'light' : 'dark'"
    img-top>
    <h4 slot="header">{{_title}}</h4>
    <b-card-body>
      <p class="card-text">
        {{_text}}
      </p>
    </b-card-body>
    <b-list-group flush>
      <b-list-group-item 
        :variant="isColorDark ? 'dark' : 'light'"
        v-if="_note">
        {{_note}}
      </b-list-group-item>
      <b-list-group-item
        :variant="isColorDark ? 'dark' : 'light'"
        v-if="_transcription">{{_transcription}}</b-list-group-item>
    </b-list-group>
    <b-card-body>
      <audio controls style="width: 250px;">
        <source :src="_audio" type="audio/mpeg">
      </audio>
    </b-card-body>
    <b-card-body>
      <span>degree of knowledge</span>
      <b-progress :value="_counter" :max="10" animated />
    </b-card-body>
    <b-card-footer v-if="_showAllMean">
      <b-button @click="$emit('click')">{{_showAllMean}}
        </b-button>
      </b-card-footer>
      <b-button 
        v-if="_isExtraButtonShow && user"
        @click="$emit('change')">
      <i class="material-icons md-light">{{_extraButton}}</i>
    </b-button>
  </b-card>
</template>

<script>
export default {
  name: 'card-word',
  props: {
    _imageWord : {
      type: String,
      default: ''      
    },
    _counter: {
      type: Number,
      default: 0 
    },
    _title: { 
      type: String,
      default: ''
    },
    _text: {
      type: String,
      default: ''
    },
    _note: {
      type: String
    },
    _transcription: {
      type: String
    },
    _audio: {
      type: String,
      default: ''
    },
    _showAllMean: {
      type: String
    },
    _isExtraButtonShow: {
      type: Boolean,
      default: false
    },
    _extraButton: {
      type: String,
      default: 'delete'
    },
    _isColorSchemeDark: {
      type: Boolean,
      default: false
    }
  },
   computed: {
    user () {
      return this.$store.state.appLogic.user
    },
    isColorDark () {
      return this.$store.state.colorScheme.isColorDark
    }
  }
}
</script>

<style scoped>
.plyr--audio .plyr__controls {
background-color:transparent;
border:none;
color:#fff;
padding:20px 20px 20px 13px;
width:100%;
}
</style>
