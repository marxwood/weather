
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import LocationsDataService from '@/services/LocationsDataService'

export interface Location {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  clouds: {
    all: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Weather[];
}

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface Country {
  id: string;
  code: string;
  name: string;
}

interface LocationsState {
  filter: string;
  selectedItems: Array<Location>;
  searchItems: Array<Location>;
  countries: Array<Country>;
  selectedCountry: Country | null;
}

@Module({ namespaced: true })
export default class LocationsStore extends VuexModule implements LocationsState {
  filter = '';
  selectedItems: Array<Location> = [];
  searchItems: Array<Location> = [];
  countries: Array<Country> = [];
  selectedCountry: Country | null = null;

  @Mutation
  setFilter (value: string): void {
    this.filter = value
  }

  @Mutation
  setSearchItems (items: Location[]): void {
    this.searchItems = items
  }

  @Mutation
  setSelectedCountry (value: Country): void {
    this.selectedCountry = value
  }

  @Mutation
  setToSelectedItems (item: Location): void {
    this.selectedItems.push(item)
  }

  @Action
  addToSelectedItems (item: Location): void {
    if (this.selectedItems.find(i => i.id === item.id)) {
      alert('Location has been selected already.')
      return
    }
    this.context.commit('setToSelectedItems', item)
  }

  @Action
  async search (name: string): Promise<void> {
    const res = await LocationsDataService.search(name, this.selectedCountry)
    this.context.commit('setSearchItems', res.data.list)
  }

  get filteredItems (): Location[] {
    return this.filter
      ? this.selectedItems.filter(i => i.sys.country.includes(this.filter))
      : this.selectedItems
  }

  get countryByCode () {
    return (code: string) => {
      return this.countries.find(i => i.code === code)
    }
  }
}
