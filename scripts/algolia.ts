import algoliasearch from 'algoliasearch';
import metadataImport from '../metadata/fontsource.json';

interface AlgoliaMetadata {
	objectID: string;
	family: string;
	subsets: string[];
	weights: number[];
	styles: string[];
	defSubset: string;
	category: string;
	variable: boolean;
	lastModified: number;
	downloadMonth: number;
	randomIndex: number;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const client = algoliasearch('WNATE69PVR', process.env.ALGOLIA_ADMIN_KEY!);

const shuffleArray = (size: number) => {
	// Generate array of numbers from 0 to size
	const arr: number[] = [...Array.from({ length: size }).keys()];

	// Durstenfeld shuffle to randomly sort array
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

const updateAlgoliaIndex = async (force?: boolean) => {
	try {
		// Get font list
		const list = Object.keys(metadataImport);
		const indexArray: AlgoliaMetadata[] = [];

		// For the random shuffle, we need a presorted index
		// as Algolia does not support random sorting natively
		const randomIndexArr = shuffleArray(list.length);

		let index = 0;
		for (const id of list) {
			const metadata = metadataImport[id];
			if (!metadata)
				console.warn(`No metadata found for ${id} when updating Algolia index`);

			const stats = (await (
				await fetch(`https://api.fontsource.org/v1/stats/${id}`)
			).json()) as any;
			const downloadCountMonthly = stats?.total?.npmDownloadMonthly;

			const obj = {
				objectID: id,
				family: metadata.family,
				subsets: metadata.subsets,
				weights: metadata.weights,
				styles: metadata.styles,
				category: metadata.category,
				defSubset: metadata.defSubset,
				variable: metadata.variable,
				// Algolia sorts date using a unix timestamp instead
				lastModified: Math.floor(
					new Date(metadata.lastModified).getTime() / 1000
				),
				downloadMonth: downloadCountMonthly ?? 0,
				randomIndex: randomIndexArr[index],
			};

			indexArray.push(obj);
			index++;
		}

		const searchIndex = client.initIndex('prod_NAME');
		if (force) {
			await searchIndex.replaceAllObjects(indexArray);
			console.log('Replaced Algolia index');
		} else {
			await searchIndex.saveObjects(indexArray);
			console.log('Updated Algolia index');
		}
	} catch (error) {
		console.error(error);
	}
};

await updateAlgoliaIndex();
