// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        // The private keys which are only available within server-side
        dbUrl: process.env.DB_URL,
        jwtKey: process.env.JWT_KEY,
        // Keys within public, will be also exposed to the client-side
      }
})
