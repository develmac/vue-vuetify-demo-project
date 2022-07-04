<template>
  <v-app>
    <v-main>
      <ExampleForm/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExampleForm from './components/ExampleForm.vue'

export default defineComponent({
  name: 'App',

  components: {
    ExampleForm,
  },

  data () {
    return {
      //
    }
  },
})
</script>
