import browser from 'browser-sync';
import {src, dest} from 'gulp';

import {$, PRODUCTION, COMPATIBILITY, PATHS} from './config';

const entries = PATHS.styles.entries
    .map(entry => `src/scss/${entry}`);
export default function styles() {
    return src(entries)
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: PATHS.styles.includePaths
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: COMPATIBILITY
        }))
        .pipe($.if(PRODUCTION, $.cleanCss({compatibility: 'ie9'})))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(dest(`${PATHS.dist}/css`))
        .pipe(browser.reload({stream: true}));
}
