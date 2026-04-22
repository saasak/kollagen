import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		dedupe: [
			'bits-ui',
			'lucide-svelte',
			'svelte',
			'svelte-sonner',
			'vaul-svelte',
			'embla-carousel-svelte',
			'embla-carousel-autoplay',
			'paneforge',
			'@internationalized/date',
			'uqr'
		],
		alias: {
			'@internationalized/date': path.resolve(
				'node_modules/@internationalized/date'
			)
		}
	},
	server: {
		host: '0.0.0.0',
		allowedHosts: true,
		fs: {
			allow: ['../ui']
		}
	}
});
