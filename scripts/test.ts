import { getDirectories } from './utils';
import { consola } from 'consola';
import { verify } from '@fontsource-utils/cli';

const verifyPackages = async () => {
	const directories = getDirectories('other');
	let hasErrors = false;

	for (const directory of directories) {
		const fontDir = `./fonts/other`;

		try {
			await verify({ font: directory, ci: true, cwd: fontDir });
		} catch (error) {
			consola.warn(`Error verifying ${directory}.`);
			consola.warn(error);
			hasErrors = true;
		}
	}

	if (hasErrors) {
		consola.error('Errors found. Exiting.');
		process.exit(1);
	}
}

verifyPackages().then(() => {
	consola.success('All packages valid.');
});
