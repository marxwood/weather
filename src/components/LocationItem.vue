<template>
  <div class="location">
    <h2>{{ item.name }}, {{item.sys.country}} <img :src="getFlag(item.sys.country)"></h2>
    <div>Temp: {{ convertKtoC(item.main.temp) }}*C</div>
    <div>Humidity: {{ item.main.humidity }}</div>
    <img :src="getWeatherIcon(item.weather[0].icon)">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Location } from '@/store/modules/LocationsStore'

@Component
export default class Locations extends Vue {
  @Prop({ required: true }) readonly item!: Location

  getFlag (country: string): string {
    return `http://openweathermap.org/images/flags/${country.toLowerCase()}.png`
  }

  convertKtoC (K: number) {
    return Math.ceil(K - 273.15)
  }

  getWeatherIcon (icon: string) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
  }
}
</script>

<style scoped lang="scss">
</style>
