import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const loadimage = "https://res.cloudinary.com/dmo4hvhcj/image/upload/v1645876761/web/lazy_dy4ssu.jpg"
const errorimage = "https://res.cloudinary.com/dmo4hvhcj/image/upload/v1644779815/web/1_naxsvg.jpg"

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})

