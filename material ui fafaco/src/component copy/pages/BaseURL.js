import axios from "axios";
const instance = axios.create({
  baseURL: "https://3120-49-204-143-128.in.ngrok.io",
});
export default instance;
