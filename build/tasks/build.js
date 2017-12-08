let gulp = require("gulp");
let runSequence = require("run-sequence");
let paths = require("../paths");

gulp.task("build", (callback) => {
    return runSequence(
        ["build-sass", "build-ts"],
        callback
    );
});

gulp.task("default", () => {
    gulp.watch([paths.sass.src, paths.ts.src], ["build"]);
});