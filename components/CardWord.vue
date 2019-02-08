<template>
  <b-card no-body
    style="max-width: 20rem;"
    :img-src="_imageWord"
    img-alt="Image"
    img-top>
    <h4 slot="header">{{_title}}</h4>
    <b-card-body>
      <p class="card-text">
        {{_text}}
      </p>
    </b-card-body>
    <b-list-group flush>
      <b-list-group-item v-if="_note">
        {{_note}}
      </b-list-group-item>
      <b-list-group-item>{{_transcription}}</b-list-group-item>
    </b-list-group>
    <b-card-body>
      <audio controls style="width: 250px;">
        <source :src="_audio" type="audio/mpeg">
      </audio>
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
      type: String,
      default: ''
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
    }
  },
   computed: {
    user () {
      return this.$store.state.user
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
