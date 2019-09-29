import {src, dest, series} from 'gulp';

import {$, PRODUCTION, PATHS} from './config';

export function copy(done) {
    const tasks = PATHS.copy.map(conf => {
        return () => src(conf.src)
            .pipe(dest(conf.dest));
    });

    return series(...tasks, (seriesDone) => {
        seriesDone();
        done();
    })();
}

export function images() {
    return src('src/img/**/*')
        .pipe($.if(PRODUCTION, $.imagemin({
            progressive: true
        })))
        .pipe(dest(PATHS.dist + '/img'));
}
