import browser from 'browser-sync';
import cssnano from 'cssnano';
import fs from 'fs';
import yaml from 'js-yaml';
import {src, dest} from 'gulp';

import {$, PATHS} from './config';

const SOURCE_DIR = 'node_modules/animate.css/';
const pkg = JSON.parse(fs.readFileSync(SOURCE_DIR + 'package.json'));
const banner = [
    '@charset "UTF-8";\n',
    '/*!',
    ' * <%= name %> -<%= homepage %>',
    ' * Version - <%= version %>',
    ' * Licensed under the MIT license - http://opensource.org/licenses/MIT',
    ' *',
    ' * Copyright (c) <%= new Date().getFullYear() %> <%= author.name %>',
    ' */\n\n'
]
    .join('\n');

// Read the config file and return an array of the animations to be activated
const activatedAnimations = (function activateAnimations() {
    let categories = yaml.load(fs.readFileSync('src/scss/animate-config.yml')),
        category,
        files,
        file,
        target = [],
        count = 0;

    for (category in categories) {
        if (categories.hasOwnProperty(category)) {
            files = categories[category];

            for (file in files) {
                if (files.hasOwnProperty(file) && files[file]) {
                    // marked as true
                    target.push(SOURCE_DIR + 'source/' + category + '/' + file + '.css');
                    count += 1;
                }
            }
        }
    }
    // prepend base CSS
    target.push(SOURCE_DIR + 'source/_base.css');

    $.util.log(count + (count > 1 ? ' animations' : ' animation') + ' activated.');
    return target;
})();

export default function animate() {
    return src(activatedAnimations)
        .pipe($.concat('animate.css'))
        .pipe($.autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
            cascade: false
        }))
        .pipe(dest(PATHS.dist + '/css'))
        .pipe($.postcss([cssnano({reduceIndents: {keyframes: false}})]))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.header(banner, pkg))
        .pipe(dest(PATHS.dist + '/css'))
        .pipe(browser.reload({stream: true}));
}
