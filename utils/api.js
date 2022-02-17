import axios from 'axios'

const api_url = process.env.apiUrl
export const api = axios.create({
  baseURL: api_url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
})

export function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

export function eraseCookie(name){
  document.cookie = name+'=; Max-Age=-99999999;';
}


export function getAxiosConfigWithJwt() {
  var config = {
    headers: {
      Authorization: 'Bearer ' + getCookie("jwt")
    }
  }
  return config
}
