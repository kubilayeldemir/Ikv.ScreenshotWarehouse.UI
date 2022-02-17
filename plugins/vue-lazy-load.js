import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const loadimage = require('/static/1.jpeg')
const errorimage = require('/static/1.jpeg')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})

