// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  runtimeConfig: {
    n8nWebhookUrl: process.env.N8N_WEBHOOK_URL,
    n8nApiSecret: process.env.N8N_API_SECRET,
    public: {},
  },
  css: ["~/assets/css/global.css"],
});
