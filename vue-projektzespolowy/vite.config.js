import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	type: "module",
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: [
			{
				"@": fileURLToPath(new URL("./src", import.meta.url)),
				// this is required for the SCSS modules
				find: /^~(.*)$/,
				replacement: "$1",
				"@src": path.resolve(__dirname, "./src"),
				"@assets": path.resolve(__dirname, "./assets"),
			},
		],
	},
	minify: "terser",
});
