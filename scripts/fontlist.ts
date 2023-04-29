import fs from "node:fs";

import { getDirectories } from "./utils";
import stringify from 'json-stringify-pretty-compact';

interface FontList {
  [x: string]: string;
}

const fontlist: FontList[] = [];
const icons: string[] = [];
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

		try {
			const metadata: Metadata = JSON.parse(fs.readFileSync(
				`${fontDir}/metadata.json`, "utf8"
			));
				
			// JSON file
			const object = { [metadata.id]: metadata.lastModified };
			fontlist.push(object);

			switch (metadata.type) {
				case "icons": {
				icons.push(metadata.family);
				break;
				}
				case "other": {
				other.push(metadata.family);
				break;
				}
				case "google": {
				// Empty to prevent calling unknown type catch
				break;
				}
				default: {
				console.log(`${metadata.family} has unknown type ${metadata.type}.`);
				}
			}
		} catch (error) {
		console.error(error);
		}
  };
};

pushFonts("google");
// pushFonts("league");
// pushFonts("icons");
// pushFonts("other");

// Write JSON list to be pulled externally.
fs.writeFileSync("FONTLIST.json", stringify(Object.assign({}, ...fontlist)));

// Write MD file
const fontlistMarkdown = (icons, other) => `# Supported Font List

## [Google Fonts](https://fonts.google.com/)
All Google Fonts are supported and updated bi-weekly. Find the whole list [here](https://fonts.google.com/).
Variable fonts from Google are included. Supported list [here](https://fonts.google.com/variablefonts).

## Icons
${icons.forEach(font => `- ${font}\n`)}

## Other
${other.forEach(font => `- ${font}\n`)}`

const fontlistWrite = fontlistMarkdown(icons, other);

fs.writeFileSync(`FONTLIST.md`, fontlistWrite);