import * as p from '@clack/prompts';

export function intro() {
	p.intro('kollagen');
}

export function outro(message: string) {
	p.outro(message);
}

export function cancel(message: string) {
	p.cancel(message);
}

export async function confirm(message: string): Promise<boolean> {
	const result = await p.confirm({ message });
	if (p.isCancel(result)) {
		cancel('Operation cancelled.');
		process.exit(0);
	}
	return result;
}

export function spinner() {
	return p.spinner();
}

export function log(message: string) {
	p.log.info(message);
}

export function success(message: string) {
	p.log.success(message);
}

export function warn(message: string) {
	p.log.warn(message);
}

export function error(message: string) {
	p.log.error(message);
}
