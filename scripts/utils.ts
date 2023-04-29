import fs from 'node:fs';

export const FONTSOURCE_TYPES = [
	'google',
	'icons',
	'variable',
	'variable-icons',
	'other',
] as const;
export type FontsourceTypes = (typeof FONTSOURCE_TYPES)[number];

export const getDirectories = (type: string) =>
	fs
		.readdirSync(`./fonts/${type}`, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
