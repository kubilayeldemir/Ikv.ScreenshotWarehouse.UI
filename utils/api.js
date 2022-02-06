import axios from 'axios'

const api_url=process.env.apiUrl
export const api = axios.create({
  baseURL:api_url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials':true
  },
})
