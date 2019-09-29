import {src, dest} from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import named from 'vinyl-named';

import {$, PRODUCTION, PATHS} from './config';
import WEBPACK_CONFIG from './webpack.config';

const entries = PATHS.scripts.entries
    .map(entry => `src/js/${entry}`);
export default function scripts() {
    return src(entries)
        .pipe(named())
        // .pipe($.sourcemaps.init())
        .pipe(webpackStream(WEBPACK_CONFIG, webpack))
        .pipe($.if(PRODUCTION, $.uglify()
            .on('error', e => {
                console.log(e);
            })
        ))
        // .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(dest(`${PATHS.dist}/js`));
}
