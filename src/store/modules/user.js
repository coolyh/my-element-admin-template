import { login, logout, getUserInfo, unreadnum ,getadminauthdata} from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";

const state = {
    token: getToken(),
    admin_info: null, //登录用户信息
    menu: "", //菜单
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ADMIN_INFO: (state, admin_info) => {
        state.admin_info = admin_info;
    },
    SET_MENU: (state, menu) => {
        state.menu = menu;
    },
    SET_NOTICE_NUMBER: (state, noticeNumber) => {
        state.noticeNumber = noticeNumber;
    },
};

const actions = {
    // 用户登录
    LoginByUsername({ commit }, userInfo) {
        const {
            username,
            password,
            geetest_challenge,
            geetest_validate,
            geetest_seccode
        } = userInfo;
        return new Promise((resolve, reject) => {
            login({
                user_name: username.trim(),
                password: password,
                geetest_challenge: geetest_challenge,
                geetest_validate: geetest_validate,
                geetest_seccode: geetest_seccode
            })
                .then(response => {
                    const { data } = response;
                    commit("SET_TOKEN", data);
                    setToken(data);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 获取基本信息
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo()
                .then(response => {
                    const { data } = response;

                    if (!data) {
                        reject("验证失败，请重新登录。");
                    }
                    commit("SET_MENU", data.menu);
                    commit("SET_ADMIN_INFO", data.info);
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 用户登出
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout()
                .then(() => {
                    commit("SET_TOKEN", "");
                    commit("SET_ADMIN_INFO", null);
                    removeToken();
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit("SET_TOKEN", "");
            removeToken();
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
