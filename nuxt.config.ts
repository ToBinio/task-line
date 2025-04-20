import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@pinia/nuxt", "@vueuse/nuxt", "@nuxt/eslint", "nuxt-vue3-google-signin"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  googleSignIn: {
    clientId: '366824119747-ni0so935ro48369c511dvs0ka08e56n9.apps.googleusercontent.com',
  }
});
