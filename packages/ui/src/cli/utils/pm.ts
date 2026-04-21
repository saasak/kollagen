export function getDlxCommand(pmName?: string): string {
	switch (pmName) {
		case 'pnpm':
			return 'pnpm dlx';
		case 'yarn':
			return 'yarn dlx';
		case 'bun':
			return 'bunx';
		default:
			return 'npx';
	}
}
