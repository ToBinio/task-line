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
    clientId: process.env.GOOGLE_CLIENT_ID,
  }
});
