// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        // The private keys which are only available within server-side
        dbUrl: "123",
        jwtKey: "123",
        // Keys within public, will be also exposed to the client-side
      }
})
