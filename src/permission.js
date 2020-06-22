import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    NProgress.start();

    // 设置页面标题
    document.title = getPageTitle(to.meta.title);

    // 确定用户是否已登录
    const hasToken = getToken();
    if (hasToken) {
        NProgress.done();
        // 如果已登录，请重定向到主页
        if (to.path === "/login") {
            next({ path: "/" });
        } else {
            const hasGetUserInfo = store.getters.admin_info;
            // 确定用户是否通过getinfo获取了登陆者的用户信息
            if (hasGetUserInfo) {
                next();
            } else {
                try {
                    // 获取基本信息
                    await store.dispatch("user/getInfo");

                    //根据权限获取路由
                    const accessRoutes = await store.dispatch(
                        "permission/generateRoutes",
                        store.getters.menu
                    );
                    //动态添加可访问路由
                    router.addRoutes(accessRoutes);
                    router.options.routes = store.getters.permission_routes;
                    // 设置replace:true，导航不会留下历史记录
                    next({ ...to, replace: true });
                } catch (error) {
                    // 删除令牌并转到登录页重新登录
                    await store.dispatch("user/resetToken");
                    Message.error(error || "Has Error");
                    next(`/login`);
                    NProgress.done();
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免费登录白名单中，直接进入
            next();
        } else {
            // 其他没有访问权限的页面将重定向到登录页面。
            next(`/login`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
