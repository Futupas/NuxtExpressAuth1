export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-auth-example',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },


  serverMiddleware: [{
      path: '/api',
      handler: '~/api',
    }
  ],
  
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth', method: 'post', propertyName: 'token' },
          user: { url: '/api/me', method: 'get', propertyName: false },
          logout: false
        },
        tokenRequired: true,
        tokenType: 'Bearer',
        tokenName: 'Authorization'
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
    },
  },

  generate: {
    dir: '..\\nuxt-server-example\\static_nuxt',
    routes: ['/info/1', '/info/2', '/async_info/1', '/async_info/2'],
  }
}
