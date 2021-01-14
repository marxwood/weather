<template>
  <div>
    Filter by country code:
    <input type="text" v-model="value" @input="setValue" placeholder="example: US">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const LocationsStore = namespace('LocationsStore')

@Component
export default class Locations extends Vue {
  private value = '';

  @LocationsStore.Mutation('setFilter') setFilter!: (value: string) => void;

  setValue (): void {
    this.setFilter(this.value.toUpperCase())
  }
}
</script>

<style scoped lang="scss">
</style>
