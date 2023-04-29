import stringify from 'json-stringify-pretty-compact';
import path from 'pathe';
import fs from 'node:fs';

import { getDirectories } from './utils';

/**
 * Google may sometimes push a new font that already exists in the custom folder
 * This checks if there are any duplicates between the two font folders and purges the duplicate from generic
 */

// Check if package exists in a non-google directory and deletes it
const checkDirectory = (dirPath: string) => {
	try {
		fs.accessSync(dirPath);
		const packageJson = JSON.parse(
			fs.readFileSync(path.join(dirPath, 'package.json'), 'utf8')
		);
		fs.rmSync(dirPath, { recursive: true });
		return packageJson;
	} catch {
		return undefined;
	}
};

const purgeDuplicates = () => {
	const directories = [
		...getDirectories('google'),
		// ...getDirectories('icons'),
		...getDirectories('other'),
	];

	// Return an array of duplicate packages found
	const duplicates = directories.filter(
		(item, index) => directories.indexOf(item) !== index
	);

	// Delete packages from other directory
	for (const dir of duplicates) {
		for (const type of ['other']) {
			const dirPath = path.join('fonts', type, dir);
			const packageJson = checkDirectory(dirPath);

			// If package.json exists, update version number in the Google dir
			// This is to prevent publish errors as the newly formed Google package
			// will have an older version number
			if (packageJson) {
				const packageJsonGoogle = JSON.parse(
					fs.readFileSync(
						path.join('fonts', 'google', dir, 'package.json'),
						'utf8'
					)
				);
				packageJsonGoogle.version = packageJson.version;
				fs.writeFileSync(
					path.join('fonts', 'google', dir, 'package.json'),
					stringify(packageJsonGoogle)
				);
			}
		}
	}
};

purgeDuplicates();
