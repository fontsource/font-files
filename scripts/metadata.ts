import { APIv1, APIv2, APIVariable, APILicense, APIRegistry } from '@fontsource-utils/cli'
import stringify from 'json-stringify-pretty-compact'
import fs from 'node:fs'

try {
	fs.mkdirSync('metadata')
} catch {
	// continue regardless of error
}

fs.writeFileSync('metadata/google-fonts-v1.json', stringify(APIv1));
fs.writeFileSync('metadata/google-fonts-v2.json', stringify(APIv2));
fs.writeFileSync('metadata/variable.json', stringify(APIVariable));
fs.writeFileSync('metadata/licenses.json', stringify(APILicense));
fs.writeFileSync('metadata/axis-registry.json', stringify(APIRegistry));