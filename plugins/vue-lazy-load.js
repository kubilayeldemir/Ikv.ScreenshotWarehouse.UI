import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const loadimage = "https://res.cloudinary.com/dmo4hvhcj/image/upload/v1685806656/lazy_dy4ssu_ou8e0u.jpg"
const errorimage = "https://res.cloudinary.com/dmo4hvhcj/image/upload/v1685806851/hata_tzgpgy.jpg"

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})

