import gulp from 'gulp';

const { src, dest } = gulp;

export function copy () {
  return src('src/init.ts')
    .pipe(dest('output/'));
}

export * from './gulp-scripts/bundle.js';
