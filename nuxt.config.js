export default {
  env: {
    apiUrl: process.env.API_URL
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ikv.ScreenshotWarehouse.UI',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue-stack-grid.js', mode: 'client'},
    {src: '~/plugins/lightGallery.client.js', mode: 'client' },
    '@/plugins/axios',
    { src: '~/plugins/vuex-persist', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/gtm'
  ],
  gtm: {
    id: 'GTM-TFTV9VL'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.apiUrl,
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.apiUrl
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
