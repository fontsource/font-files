import fs from 'node:fs';

import { FONTSOURCE_TYPES, getDirectories } from './utils';
import stringify from 'json-stringify-pretty-compact';

interface FontList {
	[x: string]: string;
}

const fontlist: FontList[] = [];

const google = new Set<string>();
const icons = new Set<string>();
const other: string[] = [];

interface Metadata {
	family: string;
	id: string;
	type: string;
	lastModified: string;
}

// Iterate through directories and push to relevant arrays
const pushFonts = (type: string) => {
	const directories = getDirectories(type);

	for (const directory of directories) {
		const fontDir = `./fonts/${type}/${directory}`;

		const metadata: Metadata = JSON.parse(
			fs.readFileSync(`${fontDir}/metadata.json`, 'utf8')
		);

		// JSON file
		const object = { [metadata.id]: metadata.lastModified };
		fontlist.push(object);

		switch (type) {
			case 'google' || 'variable': {
				google.add(metadata.family);

				break;
			}
			case 'icons' || 'variable-icons': {
				icons.add(metadata.family);
				break;
			}
			case 'other': {
				other.push(metadata.family);
				break;
			}
			default: {
				throw new Error(`${metadata.family} has unknown type ${type}.`);
			}
		}
	}
};

// Get all fonts from each directory
for (const type of FONTSOURCE_TYPES) {
	pushFonts(type);
}

// Write JSON list to be pulled externally.
fs.writeFileSync('FONTLIST.json', stringify(Object.assign({}, ...fontlist)));

// Write MD file
const fontlistMarkdown = (
	google: Set<string>,
	icons: Set<string>,
	other: string[]
) => `# Supported Font List

## Google Fonts
${google.forEach((font) => `- ${font}\n`)}

## Icons
${icons.forEach((font) => `- ${font}\n`)}

## Other
${other.forEach((font) => `- ${font}\n`)}`;

const fontlistWrite = fontlistMarkdown(google, icons, other);

fs.writeFileSync(`FONTLIST.md`, fontlistWrite);
