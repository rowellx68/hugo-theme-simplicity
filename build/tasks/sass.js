let gulp = require("gulp");
let paths = require("../paths");
let sass = require("gulp-sass");
let postCss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");

gulp.task("build-sass", () => {
    let plugins = [
        autoprefixer({ 
            browsers: [
              "chrome >= 12",
              "ff >= 16",
              "opera >= 15",
              "safari >= 4",
              "android >= 4",
              "ios_saf >= 6",
              "ie >= 10"
            ]
        })
    ];

    return gulp.src(paths.sass.src)
        .pipe(sass())
        .pipe(postCss(plugins))
        .pipe(gulp.dest(paths.sass.dist));
});