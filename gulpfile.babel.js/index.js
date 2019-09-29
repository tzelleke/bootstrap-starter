import browser from 'browser-sync';
import {series, parallel, watch} from 'gulp';
import rimraf from 'rimraf';

import {PORT, PATHS} from './config';
import {pages, resetPages} from './pages';
import styles from './styles';
import scripts from './scripts';
import {copy, images} from './assets';
import animate from './animate';

function clean(done) {
    rimraf(PATHS.dist, done);
}

function server(done) {
    browser.init({
        server: PATHS.dist,
        port: PORT,
        ghostMode: {
          scroll: false
        },
        open: false
    });
    done();
}

function watchAll() {
    watch(PATHS.copy.map(({src}) => src), copy);
    watch('src/pages/**/*.html').on('all', series(pages, browser.reload));
    watch('src/partials/**/*.{html,hbs}').on('all', series(resetPages, pages, browser.reload));
    watch('src/layouts/**/*.{html,hbs}').on('all', series(resetPages, pages, browser.reload));
    watch('src/data/**/*.{js,json,yml,md}').on('all', series(resetPages, pages, browser.reload));
    watch('src/helpers/**/*.js').on('all', series(resetPages, pages, browser.reload));
    watch('src/scss/**/*.scss').on('all', styles);
    watch('src/js/**/*.js').on('all', series(scripts, browser.reload));
    watch('src/img/**/*').on('all', series(images, browser.reload));
    watch('src/scss/styles.yml').on('all', series(resetPages, pages, browser.reload));
    watch('src/scss/animate-config.yml').on('all', animate);
}

export const build = series(clean, parallel(pages, styles, scripts, images, copy, animate));
export default series(build, server, watchAll);
