<template>
  <div class="search">
    <p>Search for a new location:</p>
    <!-- <Countries/> -->
    <input
      v-model="query"
      @keyup="onKeyup"
      type="text"
      data-test="input"
      placeholder="example: Belgrade"
    />
    <p v-if="isSearching" data-test="isSearching">Searching...</p>
    <div v-else data-test="results">
      <ul v-if="items.length">
        <li v-for="(item, i) in items" :key="i">
          <span class="item" @click="addToList(item)">
            {{item.name}},
            {{item.sys.country}}
            <img :src="getFlag(item.sys.country)">
          </span>
        </li>
      </ul>
      <p v-else>No results.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Location } from '@/store/modules/LocationsStore'
// import Countries from './Countries.vue'

const LocationsStore = namespace('LocationsStore')
const debounceTimeoutMs = 500

@Component({
  components: {
    // Countries
  }
})
export default class SearchLocations extends Vue {
  private query = '';
  private isSearching = false;
  private debounceTimeout: number | null = null;

  @LocationsStore.State('searchItems') items!: Array<Location>;
  @LocationsStore.Action('addToSelectedItems') addToSelectedItems!: (item: Location) => void;
  @LocationsStore.Action('search') search!: (name: string) => Promise<void>;

  // NOTE: Alternative solution would be to use v-model and watcher
  onKeyup (e: KeyboardEvent) {
    if (e.key.includes('Arrow')) {
      return
    }
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }
    this.isSearching = true

    this.debounceTimeout = setTimeout(async () => {
      try {
        await this.search(this.query)
      } catch (e) {
        console.info('Request canceled')
      }
      this.isSearching = false
    }, debounceTimeoutMs)
  }

  addToList (item: Location) {
    this.addToSelectedItems(item)
  }

  getFlag (country: string): string {
    return `http://openweathermap.org/images/flags/${country.toLowerCase()}.png`
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
}
.item {
  cursor: pointer;
  &:hover {
    background:lightgray;
  }
}
</style>
