import fs from 'node:fs'

export const getDirectories = (type: string) =>
	fs
		.readdirSync(`./fonts/${type}`, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);