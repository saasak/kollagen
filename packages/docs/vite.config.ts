import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
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
		]
	},
	server: {
		host: '0.0.0.0',
		allowedHosts: true,
		fs: {
			allow: ['../ui']
		}
	}
});
