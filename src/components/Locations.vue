<template>
  <div class="locations">
    <h1>Locations Dashboard</h1>
    <FilterLocations v-if="selectedItems.length"/>
    <hr>
    <div v-if="filteredItems.length">
      <draggable>
        <transition-group tag="div" class="grid" name="grid">
          <div class="cell" v-for="item in filteredItems" :key="item.id">
            <LocationItem :item="item"/>
          </div>
        </transition-group>
      </draggable>
    </div>
    <p v-else>No locations to show.</p>
    <hr>
    <SearchLocations/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import draggable from 'vuedraggable'
import LocationItem from '@/components/LocationItem.vue'
import { Location } from '@/store/modules/LocationsStore'
import SearchLocations from '@/components/SearchLocations.vue'
import FilterLocations from '@/components/FilterLocations.vue'

const LocationsStore = namespace('LocationsStore')

@Component({
  components: {
    draggable,
    LocationItem,
    SearchLocations,
    FilterLocations
  }
})
export default class Locations extends Vue {
  @LocationsStore.State('selectedItems') selectedItems!: Array<Location>;
  @LocationsStore.Getter('filteredItems') filteredItems!: Array<Location>;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-gap: 0.2em;
}

.grid-move {
  transition: all 0.3s;
}

.cell {
  background-color: #efefef;
  padding: .2rem;
  height: 13rem;
}
</style>
