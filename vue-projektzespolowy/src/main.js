
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
			name: "ggg",
			component: () => import("./components/WelcomeItem.vue"),
		},
		{
			path: "/welcome",
			name: "WelcomeItem",
			component: WelcomeItem,
		},
		{
			path: "/about",
			name: "About",
			component: () => import("./views/About.vue"),
		},
	],
});

export default router;



createApp(App).use(router).mount("#app");

