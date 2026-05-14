import { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { detectPackageManager, addDependency } from 'nypm';
import * as logger from '../utils/logger.js';
import { isSvelteKit, findAppCss } from '../utils/detect.js';
import { writeFile } from '../utils/fs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEMES_DIR = path.resolve(__dirname, '../themes');
const UTILS_DIR = path.resolve(__dirname, '../utils');

function listThemeFiles(): string[] {
	const files = fs.readdirSync(THEMES_DIR).filter((f) => f.endsWith('.css'));
	return files;
}

function readThemeFile(filename: string): string {
	return fs.readFileSync(path.join(THEMES_DIR, filename), 'utf-8');
}

function readUtilsFile(filename: string): string {
	return fs.readFileSync(path.join(UTILS_DIR, filename), 'utf-8');
}

export const initCommand = new Command('init')
	.description('Initialize Kollagen in your SvelteKit project')
	.action(async () => {
		logger.intro();
		const cwd = process.cwd();

		// 1. Verify SvelteKit
		if (!isSvelteKit(cwd)) {
			logger.error('No svelte.config.js/ts found. Run this inside a SvelteKit project.');
			process.exit(1);
		}

		const pm = await detectPackageManager(cwd);
		logger.log(`Detected package manager: ${pm!.name}`);

		// 2. Install peer deps
		const s = logger.spinner();
		s.start('Installing dependencies');

		try {
			await addDependency('bits-ui', { cwd, packageManager: pm });
			await addDependency('lucide-svelte', { cwd, packageManager: pm });
			await addDependency('tailwind-merge', { cwd, packageManager: pm });
			await addDependency('tailwind-variants', { cwd, packageManager: pm });
			s.stop('Dependencies installed');
		} catch {
			s.stop('Failed to install dependencies');
			logger.error(
				'Could not install dependencies. Install manually: bits-ui lucide-svelte tailwind-merge tailwind-variants'
			);
			process.exit(1);
		}

		// 3. Copy base theme
		const allFiles = listThemeFiles();
		const baseContent = readThemeFile('kollagen.css');

		const cssPath = path.join(cwd, 'src/lib/styles/kollagen.css');
		writeFile(cssPath, baseContent);
		logger.success('Created src/lib/styles/kollagen.css');

		// 4. Copy variant themes
		const themeFiles = allFiles.filter((f) => f !== 'kollagen.css');
		for (const filename of themeFiles) {
			const content = readThemeFile(filename);
			const themePath = path.join(cwd, `src/lib/styles/themes/${filename}`);
			writeFile(themePath, content);
		}
		if (themeFiles.length > 0) {
			logger.success(`Copied ${themeFiles.length} themes to src/lib/styles/themes/`);
		}

		// 5. Copy shared utilities
		const cnPath = path.join(cwd, 'src/lib/utils/cn.ts');
		writeFile(cnPath, readUtilsFile('cn.ts'));
		logger.success('Created src/lib/utils/cn.ts');

		// 6. Create jsrepo.config.ts for component paths
		const jsrepoConfigPath = path.join(cwd, 'jsrepo.config.ts');
		if (!fs.existsSync(jsrepoConfigPath)) {
			const jsrepoConfig = `import { defineConfig } from "jsrepo";

export default defineConfig({
\tpaths: {
\t\tcomponent: "src/lib/components",
\t\tblock: "src/lib/blocks",
\t},
\tregistries: ["github/saasak/kollagen"],
});
`;
			writeFile(jsrepoConfigPath, jsrepoConfig);
			logger.success('Created jsrepo.config.ts');
		} else {
			logger.log('jsrepo.config.ts already exists');
		}

		// 7. Auto-configure: inject @import into app.css
		const appCss = findAppCss(cwd);
		if (appCss) {
			const appCssPath = path.join(cwd, appCss);
			let content = fs.readFileSync(appCssPath, 'utf-8');
			const importLine = `@import "$lib/styles/kollagen.css";`;

			if (!content.includes(importLine)) {
				const themeImports = themeFiles
					.map((f) => {
						const name = f.replace('.css', '');
						return `@import "$lib/styles/themes/${name}.css";`;
					})
					.join('\n');
				content = importLine + '\n' + themeImports + '\n' + content;
				writeFile(appCssPath, content);
				logger.success(`Added kollagen.css and theme imports to ${appCss}`);
			} else {
				logger.log('kollagen.css import already present');
			}
		} else {
			logger.warn(
				"No app.css found. Manually add: @import '$lib/styles/kollagen.css' to your global CSS."
			);
		}

		logger.outro('Kollagen initialized! Run `kollagen add combobox` to add your first component.');
	});
