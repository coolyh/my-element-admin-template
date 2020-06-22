import request from "@/utils/request";

// 获取code ---geetest
export function getCode() {
    return request({
        url: "/admin/getCode",
        method: "get"
    });
}