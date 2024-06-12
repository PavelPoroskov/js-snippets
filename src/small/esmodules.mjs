import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// node v20
const filename = import.meta.filename;
const dirname = import.meta.dirname;

// Running a .js file as an ES module by default
// node --experimental-default-type=module my-script.js