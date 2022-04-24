
// import {Vue} from 'vue';
import { createApp } from "vue";
import App from "./App.vue";

import * as vueRouter from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import WelcomeItem from "./components/WelcomeItem.vue";

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

export default router;



createApp(App).use(router).mount("#app");

