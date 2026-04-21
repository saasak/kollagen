import { Command } from 'commander';
import { execSync } from 'node:child_process';
import { detectPackageManager } from 'nypm';
import * as logger from '../utils/logger.js';
import { isKollagenInitialized } from '../utils/detect.js';
import { getDlxCommand } from '../utils/pm.js';

export const updateCommand = new Command('update')
	.description('Update previously added components with interactive diffs')
	.option('--overwrite', 'Overwrite files without prompting')
	.option('-E, --expand', 'Show full file diffs instead of collapsed')
	.action(async (opts: { overwrite?: boolean; expand?: boolean }) => {
		logger.intro();
		const cwd = process.cwd();

		if (!isKollagenInitialized(cwd)) {
			logger.warn('Kollagen not initialized. Run `kollagen init` first.');
			process.exit(1);
		}

		const pm = await detectPackageManager(cwd);
		const dlx = getDlxCommand(pm?.name);

		const flags = [
			opts.overwrite ? '--overwrite' : '',
			opts.expand ? '--expand' : '',
			`--cwd ${cwd}`
		]
			.filter(Boolean)
			.join(' ');

		const cmd = `${dlx} jsrepo update ${flags}`.trim();

		try {
			execSync(cmd, { stdio: 'inherit', cwd });
		} catch {
			logger.error('Failed to update components. See errors above.');
			process.exit(1);
		}

		logger.outro('Done!');
	});
