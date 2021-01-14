import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import SearchLocations from '@/components/SearchLocations.vue'
import { Location } from '@/store/modules/LocationsStore'

jest.useFakeTimers();

const localVue = createLocalVue()
localVue.use(Vuex)

function storeFactory(items:Location[]) {
  const store = new Vuex.Store({
    modules: {
      LocationsStore: {
        namespaced: true,
        state: {
          searchItems: items
        }
      }
    }
  })
  return store;
}

const mockItem = {
  "id":2802359,
  "name":"Location1",
  "coord":{"lat":50.4714,"lon":4.8294},
  "main":{"temp":274.09,"feels_like":267.93,"temp_min":273.15,"temp_max":275.37,"pressure":1014,"humidity":100},
  "dt":1610633191,
  "wind":{"speed":6.17,"deg":100},
  "sys":{"country":"BE"},
  "rain":null,
  "snow":{"1h":0.19},
  "clouds":{"all":75},
  "weather":[{"id":601,"main":"Snow","description":"snow","icon":"13d"}]
}

describe('SearchLocations.vue', () => {
  it('ensures the initial layout', () => {
    const mockItems:Location[] = [];
    const wrapper = shallowMount(SearchLocations, { 
      store: storeFactory(mockItems), 
      localVue 
    })

    expect(wrapper.find('[data-test="isSearching"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="results"]').text()).toMatch('No results.');
  })

  it('lists results for the given store state', async () => {
    const mockItems:Location[] = [mockItem];
    const wrapper = shallowMount(SearchLocations, { 
      store: storeFactory(mockItems),
      localVue
    })

    expect(wrapper.find('[data-test="results"]').text()).toMatch('Location1');
  })

  it('calls debounced timer after the input triggers keyup', async () => {
    const mockItems:Location[] = [];
    const wrapper = shallowMount(SearchLocations, { 
      store: storeFactory(mockItems),
      localVue
    })

    await wrapper.find('[data-test="input"]').trigger('keyup');

    expect(wrapper.find('[data-test="isSearching"]').exists()).toBe(true);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  })
})
