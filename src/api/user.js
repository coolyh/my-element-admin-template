import request from "@/utils/request";

// 用户登录
export function login(data) {
    return request({
        url: "/admin/login",
        method: "post",
        data
    });
}

// 用户登出
export function logout() {
    return request({
        url: "/admin/loginout",
        method: "post"
    });
}

// 修改密码
export function updatePwd(data) {
    return request({
        url: "/admin/pwdedit",
        method: "post",
        data
    });
}

// 获取基本信息
export function getUserInfo() {
    return request({
        url: "/admin/getAdminInfo",
        method: "post"
    });
}
