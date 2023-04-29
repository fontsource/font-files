import * as fs from 'fs';
import stringify from 'json-stringify-pretty-compact';
import { FontsourceTypes, getDirectories } from './utils';

interface AxesData {
	[axis: string]: {
		min: string;
		max: string;
		default: string;
		step: string;
	};
}

interface LicenseData {
	type: string;
	url: string;
	attribution: string;
}
interface FontsourceMetadata {
	id: string;
	family: string;
	subsets: string[];
	weights: number[];
	styles: string[];
	defSubset: string;
	variable: false | AxesData;
	lastModified: string;
	version: string;
	category: string;
	license: LicenseData;
	source: string;
	type: 'google' | 'other';

	npmVersion: string;
	unicodeRange: {
		[subset: string]: string;
	};
}

const fontsourceMetadata: Record<string, FontsourceMetadata> = {};

// We want to iterate over all fonts and read their metadata and write it to an object
const createMetadata = (type: FontsourceTypes) => {
	const directories = getDirectories(type);

	for (const directory of directories) {
		const fontDir = `./fonts/${type}/${directory}`;

		const metadata = JSON.parse(
			fs.readFileSync(`${fontDir}/metadata.json`, 'utf8')
		) as Omit<FontsourceMetadata, 'npmVersion' | 'unicodeRange'>;

		const unicodeRange = JSON.parse(
			fs.readFileSync(`${fontDir}/unicode.json`, 'utf8')
		) as FontsourceMetadata['unicodeRange'];

		const npmVersion = JSON.parse(
			fs.readFileSync(`${fontDir}/package.json`, 'utf8')
		).version as string;

		fontsourceMetadata[metadata.id] = {
			...metadata,
			npmVersion,
			unicodeRange,
		};
	}
};

createMetadata('google');
createMetadata('icons');
createMetadata('variable');
createMetadata('variable-icons');
// createMetadata("other");

fs.writeFileSync('metadata/fontsource.json', stringify(fontsourceMetadata));
