const gulp = require('gulp');
const uglify = require('gulp-uglify');

gulp.task('build_task', function(){
    return gulp.src(['./app.js'])
               .pipe(uglify())
               .pipe(gulp.dest('./dist'));
});

/*
 *Obsevable
 * ver lista de tarefas : gulp --tasks
 * executar gulp observable
*/
// gulp.task('observable', function(){
//     return gulp.watch(['./app.js'], ['build_task']);
// })