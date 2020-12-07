module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
   devServer: {
    proxy: {
      "/": {
        target: "https://hooks.zapier.com/",
        secure: false
      }
    }
  }
}