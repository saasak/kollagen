import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { updateCommand } from './commands/update.js';

const program = new Command();

program
	.name('kollagen')
	.description('Ready-to-use, themed SvelteKit components built on bits-ui')
	.version('1.0.4');

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(updateCommand);

program.parse();
