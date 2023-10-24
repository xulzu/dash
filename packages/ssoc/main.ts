import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style/index.less";
import "element-plus/dist/index.css";
import "./assets/segmentFont/segmentFont.css";
import "./utils/axios";

const app = createApp(App);
app.use(router).mount("#app");
