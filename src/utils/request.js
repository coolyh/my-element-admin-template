import axios from "axios";
import { MessageBox, Message, Form } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
// import {getUploadToken} from '@/api/public'
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    withCredentials: false, // send cookies when cross-domain requests
    timeout: 60000 // request timeout
});
service.interceptors.request.use(
    config => {
            config.headers["Content-Type"] = "application/json";
        if (store.getters.token) {
            config.headers["Authorization"] = getToken();
        }
        return config;
    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        // return res
        if (res.code !== 200) {
            Message({
                message: res.msg || "error(请求接口拦截器发出)",
                type: "error",
                duration: 5 * 1000
            });

            // -1:Token 过期了
            if (res.code === -1) {
                Message({
                    message: "登陆过期了，将返回登陆！",
                    type: "error",
                    duration: 5 * 1000
                });
                location.reload(); // 为了重新实例化vue-router对象 避免bug
            }

            // 2011:查询信息为空
            if (res.code === 2011) {
                return res;
            }
            return Promise.reject("error");
        } else {
            return res;
        }
    },
    error => {
        console.log("err=====" + error); // for debug
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
