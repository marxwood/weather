import axios from 'axios'

export const CancelToken = axios.CancelToken

export default axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  /* headers: {
    'Content-type': 'application/json',
  } */
  params: {
    appid: '8041567580af3b158a42e66ef367b44a'
  }
})
