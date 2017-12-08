let gulp = require("gulp");
let ts = require("gulp-typescript");
let paths = require("../paths");

gulp.task("build-ts", () => {
    let project = ts.createProject("tsconfig.json");
    let result = gulp.src(paths.ts.src)
        .pipe(project());

    return result.js.pipe(gulp.dest(paths.ts.dist));
});