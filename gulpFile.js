/* Import gulp-friendly versions of libraries
   as well as the root gulp library
*/
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webpack = require('webpack-stream');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint-new');
const webpackConfig = require('./webpack.config.js');

// Task that compiles our sass into css
const sassTask = (done) => {
    gulp.src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./hosted'));

    done();
};

// Task to run webpack based on specs in webpackConfig
const jsTask = (done) => {
    webpack(webpackConfig)
        .pipe(gulp.dest('./hosted'));

    done();
};

// Task to run eslint on code
const lintTask = (done) => {
    gulp.src('./server/**/*.js')
        .pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

    done();
};

// Multithread tasks
const build = gulp.parallel(sassTask, jsTask, lintTask);
const herokuBuild = gulp.parallel(sassTask, jsTask);

// Runs tasks if changes have been made to files in the folders
const watch = (done) => {
    gulp.watch('./scss', sassTask);
    gulp.watch(['./client/*.js', './client/*.jsx'], jsTask);
    nodemon({
        script: './server/app.js',
        tasks: ['lintTask'],
        watch: ['./server'],
        done: done
    });
};

// Export tasks to be called in package.json
module.exports = {
    sassTask,
    build,
    jsTask,
    lintTask,
    watch,
    herokuBuild,
};