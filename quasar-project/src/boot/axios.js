import axios from "axios";

//本地
const api = axios.create({ baseURL: "http://localhost:8080" });
const CodeServiceApi = axios.create({ baseURL: "http://localhost:8084" });
const gatewayCAS = axios.create({ baseURL: "http://localhost:8100/cas" });
const gatewayCodeService = axios.create({baseURL: "http://localhost:8100/code",});
const gatewayMessageService = axios.create({baseURL: "http://localhost:8100/message",});
const gatewayArticleService = axios.create({baseURL: "http://localhost:8100/article",});


/*
//联网
const api = axios.create({ baseURL: "https://test.opensun.asia" });
const CodeServiceApi = axios.create({ baseURL: "https://test.opensun.asia/code-service" });
const gatewayCAS = axios.create({ baseURL: "https://test.opensun.asia/cas" });
const gatewayCodeService = axios.create({ baseURL: "https://test.opensun.asia/code" });
const gatewayMessageService = axios.create({ baseURL: "https://test.opensun.asia/message" });
const gatewayArticleService = axios.create({ baseURL: "https://test.opensun.asia/article" });
*/

export {
  api,
  axios,
  CodeServiceApi,
  gatewayCAS,
  gatewayCodeService,
  gatewayMessageService,
  gatewayArticleService,
};
