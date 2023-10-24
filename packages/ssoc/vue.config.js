// vue.config.js
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  pages: {
    index: {
      entry: "./main",
    },
  },
  publicPath: "/dash/ssoc",
  // 选项
  devServer: {
    port: "9000",
  },
});
