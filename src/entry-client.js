import { loadAsyncComponents } from "@akryum/vue-cli-plugin-ssr/client";

import { createApp } from "./main";

createApp({
  async beforeApp({ router }) {
    const components = await loadAsyncComponents({ router });
    console.log(components);
  },

  afterApp({ app, router }) {
    app.$mount("#app");
  }
});
