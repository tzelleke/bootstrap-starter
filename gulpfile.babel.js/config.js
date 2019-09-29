import fs from 'fs';
import plugins from 'gulp-load-plugins';
import yaml from 'js-yaml';
import yargs from 'yargs';

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}


// Load all Gulp plugins into one variable
export const $ = plugins();
export const PRODUCTION = !!(yargs.argv.production);
export const {COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS} = loadConfig();
