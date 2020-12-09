const target = process.env.NODE_ENV === "production"
  ? "https://hooks.zapier.com/"
  : "/"


module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
    devServer: {
      proxy: {
        'https://hooks.zapier.com': {
          target: target
        }
      }
    }
}