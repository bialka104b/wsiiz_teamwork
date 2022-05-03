//CONFIGURATION LANG
import * as lang from "../src/translations/lang.json";
const obj = JSON.parse(JSON.stringify(lang));
const messages = obj;

// import {Vue} from 'vue';
import { createApp } from "vue";
import App from "./App.vue";

import * as vueRouter from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import WelcomeItem from "./components/WelcomeItem.vue";
import { createI18n } from "vue-i18n";
// import BootstrapVue3 from "bootstrap-vue-3";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const router = vueRouter.createRouter({
	history: vueRouter.createWebHistory(),
	routes: [
		{
			path: "/",
			name: "Home",
			component: () => import("./components/Calculator.vue"),
		},
		{
			path: "/allProducts",
			name: "allProducts",
			component: () => import("./components/AllProducts.vue"),
		},
		{
			path: "/about",
			name: "About",
			component: () => import("./components/Calculator.vue"),
		},
	],
});

export const i18n = createI18n({
	// something vue-i18n options here ...
	locale: "pl", // set locale
	fallbackLocale: "en", // set fallback locale
	messages, // set locale messages
	// If you need to specify other options, you can set other options
	// ...
});

const app = createApp({
	// something vue options here ...
});

export default router;

createApp(App).use(router).use(i18n).mount("#app");
