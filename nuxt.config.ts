// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  nitro: {
    // preset: "vercel-edge",
    minify: false,
  },
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    openaiApiKey:
      process.env.NUXT_OPENAI_API_KEY ||
      (() => {
        throw new Error("NUXT_OPENAI_API_KEY is not set!");
      })(),
  },
});
