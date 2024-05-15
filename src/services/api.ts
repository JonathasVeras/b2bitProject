import axios from "axios";
import debug from "axios-debug-log";
import { backend_url } from "../../utils/conf.ts";


const api = axios.create({
    baseURL: backend_url,
    headers: {
      'Accept': 'application/json;version=v1_web',
      'Content-Type': 'application/json'
    }
  });
  
  debug.addLogger(axios);


export default api;
