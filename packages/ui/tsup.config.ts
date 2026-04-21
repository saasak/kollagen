import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/cli/index.ts'],
	format: ['esm'],
	target: 'node22',
	outDir: 'dist/cli',
	clean: true,
	banner: {
		js: '#!/usr/bin/env node'
	}
});
