import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      title: "TaskLine",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
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
    "@nuxtjs/device",
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/css/main.css"],
  nitro: {
    storage: {
      todos: {
        driver: "mongodb",
        connectionString: `${process.env.MONGODB_CONNECTION}`,
        databaseName: `${process.env.MONGODB_DB}`,
        collectionName: "todos",
      },
      tags: {
        driver: "mongodb",
        connectionString: `${process.env.MONGODB_CONNECTION}`,
        databaseName: `${process.env.MONGODB_DB}`,
        collectionName: "tags",
      },
    },
    devStorage: {
      todos: {
        driver: "memory",
      },
      tags: {
        driver: "memory",
      },
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
      jwtTTL: process.env.JWT_TTL_SECONDS,
    },
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    jwtSecret: process.env.JWT_SECRET,
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  i18n: {
    strategy: "prefix",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "de", name: "German", file: "de.json" },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
});
