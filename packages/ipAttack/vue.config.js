// vue.config.js
const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  pages: {
    index: {
      entry: "./main",
    },
  },
  publicPath: "/example/ip",
  chainWebpack(config) {
    config.resolve.alias.set("@soc", path.resolve("./"));
  },
  // 选项
  devServer: {
    port: "9000",
  },
});
