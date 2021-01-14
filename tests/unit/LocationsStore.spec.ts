import LocationsStore, { Location } from '@/store/modules/LocationsStore'

let mockError = false
const mockValues:Array<Location> = [
  {
    "id":2802359,
    "name":"Location1",
    "coord":{"lat":50.4714,"lon":4.8294},
    "main":{"temp":274.09,"feels_like":267.93,"temp_min":273.15,"temp_max":275.37,"pressure":1014,"humidity":100},
    "sys":{"country":"BE"},
    "clouds":{"all":75},
    "weather":[{"id":601,"main":"Snow","description":"snow","icon":"13d"}]
  },
  {
    "id":2802359,
    "name":"Location1",
    "coord":{"lat":50.4714,"lon":4.8294},
    "main":{"temp":274.09,"feels_like":267.93,"temp_min":273.15,"temp_max":275.37,"pressure":1014,"humidity":100},
    "sys":{"country":"BE"},
    "clouds":{"all":75},
    "weather":[{"id":601,"main":"Snow","description":"snow","icon":"13d"}]
  }
];

jest.mock("@/services/LocationsDataService", () => ({
  search: () => {
    return new Promise((resolve) => {
      if (mockError) {
        throw Error("Mock error")
      } 
      resolve({data: {list: mockValues}});
    })
  }
}))

describe('LocationsStore', () => {
  describe('@Mutation setFilter', () => {
    it('sets filter to the state', () => {
      const value = 'RS'
      const state = {
        filter: ''
      }
  
      LocationsStore.mutations!.setFilter(state, value);
  
      expect(state).toEqual({
        filter: value
      })
    })
  })

  describe('@Mutation setSearchItems', () => {
    it('sets items returned from search results to the state', () => {
      const items = mockValues
      const state = {
        searchItems: []
      }
  
      LocationsStore.mutations!.setSearchItems(state, items);
  
      expect(state).toEqual({
        searchItems: mockValues
      })
    })
  })

  describe('@Mutation setToSelectedItems', () => {
    it.todo('adds an item to the array of selectedItems')
  })

  describe('@Action addToSelectedItems', () => {
    it.todo('adds picked item from search results to selectedItems')
    it.todo('does not add item to selectedItems if it is already added')
  })

  describe('@Action search', () => {
    it('fetches data from api by a given search query and commits it to the state', async () => {
      expect.assertions(1);

      const commit = jest.fn()
      await (LocationsStore.actions! as any).search({ commit }) // TODO: strict typing

      expect(commit).toHaveBeenCalledWith("setSearchItems", mockValues)
    })

    it.todo('handles a response error')
  })
});
