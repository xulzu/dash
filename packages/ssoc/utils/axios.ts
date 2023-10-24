import axios from "axios";
// axios默认配置
axios.defaults.timeout = 5 * 60 * 1000; // 超时时间
axios.defaults.baseURL = process.env.VUE_APP_BaseApi;
export default axios;
