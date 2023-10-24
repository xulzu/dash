// vue.config.js
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  pages: {
    index: {
      entry: "./main",
    },
  },
  publicPath: "/example/nids",
  chainWebpack(config) {
    config.resolve.alias.set("@", path.resolve("./"));
  },
  // 选项
  devServer: {
    port: "9000",
  },
});
