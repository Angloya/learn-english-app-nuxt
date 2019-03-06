<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img src="/image/rules.jpg" class="rounded-0" />
      </b-col>
      <b-col md="6">
        <b-card-body :title="_title">
          <b-card-text>
            {{_text}}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    _title: {
      type: String
    },
    _text: {
      type: String
    }
  }
}
</script>
