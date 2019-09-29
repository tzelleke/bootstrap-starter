import {src, dest} from 'gulp';
import panini from './panini';

import {PATHS} from './config';

export function pages() {
    return src('src/pages/**/*.{html,hbs,handlebars}')
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            data: 'src/data/',
            helpers: 'src/helpers/'
        }))
        .pipe(dest(PATHS.dist));
}

export function resetPages(done) {
    panini.refresh();
    done();
}
