import fs from 'node:fs';
import path from 'node:path';

export function ensureDir(dir: string) {
	fs.mkdirSync(dir, { recursive: true });
}

export function writeFile(filePath: string, content: string) {
	ensureDir(path.dirname(filePath));
	fs.writeFileSync(filePath, content, 'utf-8');
}

export function fileExists(filePath: string): boolean {
	return fs.existsSync(filePath);
}

export function readFile(filePath: string): string {
	return fs.readFileSync(filePath, 'utf-8');
}
