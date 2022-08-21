import houdini from 'houdini/preprocess'
import path from 'path'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'
import watchAndRun from '@kitql/vite-plugin-watch-and-run'
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$houdini: path.resolve('.', '$houdini'),
			$graphql: path.resolve('src', 'lib', 'graphql')
		}
	},
	preprocess: [preprocess(), houdini()]
}

export default config
