import { APIv1, APIv2, APIVariable, APILicense, APIRegistry, APIIconStatic, APIIconVariable } from '@fontsource-utils/cli'
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
fs.writeFileSync('metadata/icons-static.json', stringify(APIIconStatic));
fs.writeFileSync('metadata/icons-variable.json', stringify(APIIconVariable));
fs.writeFileSync('metadata/licenses.json', stringify(APILicense));
fs.writeFileSync('metadata/axis-registry.json', stringify(APIRegistry));