<template>
  <div class="home">
    <Locations/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Locations from '@/components/Locations.vue'

@Component({
  components: {
    Locations
  }
})
export default class Home extends Vue {}
</script>
