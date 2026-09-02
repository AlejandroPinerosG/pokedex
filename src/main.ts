import { createApp, h } from "vue";
import singleSpaVue from "single-spa-vue";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";


import App from "./App.vue";

import fontawesome from "@/utils/fontawesome";
import router from "@/router";

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        props: {
          name: this.name,
        },
      });
    },
  },
  handleInstance: (app) => {
    app.use(createPinia());
    app.use(router);
    fontawesome(app);
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

declare const process: {
  env: {
    NODE_ENV: "development" | "production" | "test";
  };
};

if (process.env.NODE_ENV === "development") {
  const mountVue = () => {
    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    fontawesome(app);
    app.mount("#pokedex");
  };

  mountVue();
}
