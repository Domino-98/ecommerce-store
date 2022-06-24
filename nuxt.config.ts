import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    meta: {
        link: [
          {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
          },
          {
            href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css",
            rel: 'stylesheet',
          },
        ],
        script: [
          {
            src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
          },
        ],
      },
      typescript: {
        typeCheck: true,
      },
      buildModules: [
        // pinia plugin
        '@pinia/nuxt',
      ],
      css: [
        '~/assets/css/main.css',
        '~/assets/css/reset.css'
      ]
})
