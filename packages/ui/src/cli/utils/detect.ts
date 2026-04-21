import fs from 'node:fs';
import path from 'node:path';

export function isSvelteKit(cwd: string): boolean {
	return (
		fs.existsSync(path.join(cwd, 'svelte.config.js')) ||
		fs.existsSync(path.join(cwd, 'svelte.config.ts'))
	);
}

export function isKollagenInitialized(cwd: string): boolean {
	return fs.existsSync(path.join(cwd, 'src/lib/styles/kollagen.css'));
}

export function findAppCss(cwd: string): string | null {
	const candidates = ['src/app.css', 'src/app.pcss', 'src/app.postcss'];
	for (const candidate of candidates) {
		if (fs.existsSync(path.join(cwd, candidate))) {
			return candidate;
		}
	}
	return null;
}
