let src = "src/";
let dist = "static/";

module.exports = {
  root: src,
  sass: {
    src: src + "scss/**/*.scss",
    dist: dist + "css"
  },
  ts: {
    src: src + "ts/*.ts",
    dist: dist + "js"
  }
};
