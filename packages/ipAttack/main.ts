import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css";
import "./style/index.less";
import "./assets/font_icon/iconfont.css";
import "./assets/segmentFont/segmentFont.css";
const app = createApp(App);
app.use(router).mount("#app");
