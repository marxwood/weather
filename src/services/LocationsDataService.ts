import http, { CancelToken } from '../http-config'
import { Country } from '@/store/modules/LocationsStore'

let cancel: Function

interface Response {
  data: { list: {}};
}

class LocationsDataService {
  getCountries (): Array<object> {
    // TODO: Get from JSON
    return []
  }

  search (name: string, country: Country | null = null): Promise<Response> {
    // Cancel existing request if there is a new one, to prevent throttling
    if (cancel) {
      cancel()
    }

    return http.get(`/find?q=${name}${country ? `, ${country}` : ''}`, {
      cancelToken: new CancelToken(function (cancelFunction) {
        cancel = cancelFunction
      })
    })
  }
}
export default new LocationsDataService()
