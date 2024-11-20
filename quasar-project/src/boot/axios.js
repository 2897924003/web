import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080" });
const CodeServiceApi = axios.create({ baseURL: "http://localhost:8084" });
const gatewayCAS = axios.create({ baseURL: "http://localhost:8100/cas" });
const gatewayCodeService = axios.create({ baseURL: "http://localhost:8100/code" });
const gatewayMessageService = axios.create({ baseURL: "http://localhost:8100/message" });
const gatewayArticleService = axios.create({ baseURL: "http://localhost:8100/article" });


export { api, axios, CodeServiceApi,gatewayCAS,gatewayCodeService,gatewayMessageService,gatewayArticleService };
