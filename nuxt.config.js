export default {
  env: {
    apiUrl: process.env.API_URL,
    API_URL: process.env.API_URL
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'İstanbul Kıyamet Vakti SS Deposu',
    htmlAttrs: {
      lang: 'tr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: "İkv SS Deposu",
        name: "İkv SS Deposu",
        content: "İstanbul Kıyamet Vakti oyununun ekran görüntülerini bulabileceğiniz ve yükleyebileceğiniz bir paylaşım sitesi."
      }
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
    { src: '~/plugins/vuex-persist.js', mode: 'client'},
    { src: '~/plugins/vue-lazy-load.js', mode: 'client' },
    { src: '~/plugins/md5.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    ['@nuxtjs/axios', { baseURL: process.env.API_URL }],
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/gtm'
  ],
  gtm: {
    id: 'GTM-TFTV9VL'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    axios: {
      API_URL: process.env.API_URL,
      browserBaseURL: process.env.API_URL
    }
  },
  privateRuntimeConfig: {
    API_URL: process.env.API_URL,
    axios: {
      browserBaseURL: process.env.API_URL
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
