import { Command } from 'commander';
import { execSync } from 'node:child_process';
import { detectPackageManager } from 'nypm';
import * as logger from '../utils/logger.js';
import { isKollagenInitialized } from '../utils/detect.js';
import { getDlxCommand } from '../utils/pm.js';

export const addCommand = new Command('add')
	.description('Add a component to your project')
	.argument('<components...>', 'Component names (e.g., combobox select)')
	.option('--overwrite', 'Overwrite existing files without prompting')
	.action(async (components: string[], opts: { overwrite?: boolean }) => {
		logger.intro();
		const cwd = process.cwd();

		if (!isKollagenInitialized(cwd)) {
			logger.warn('Kollagen not initialized. Run `kollagen init` first.');
			process.exit(1);
		}

		const pm = await detectPackageManager(cwd);
		const dlx = getDlxCommand(pm?.name);

		const items = components.join(' ');

		const flags = ['--yes', opts.overwrite ? '--overwrite' : '', `--cwd ${cwd}`]
			.filter(Boolean)
			.join(' ');

		const cmd = `${dlx} jsrepo add ${items} ${flags}`.trim();

		try {
			execSync(cmd, { stdio: 'inherit', cwd });
		} catch {
			logger.error('Failed to add components. See errors above.');
			process.exit(1);
		}

		logger.outro('Done!');
	});
