module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "@/styles/styles.scss";`
      }
    }
  }
}
