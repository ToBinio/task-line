import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  ssr: process.env.TAURI_USED === "true" ? false : true,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "nuxt-vue3-google-signin",
  ],
  css: ["~/assets/css/main.css"],
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    clearScreen: false,
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      strictPort: true,
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL ?? "",
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleRedirectUrl: process.env.GOOGLE_REDIRECT_URL,
    },
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    jwtTTL: process.env.JWT_TTL,
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
});
