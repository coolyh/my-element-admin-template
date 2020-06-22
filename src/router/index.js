import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * constantRoutes
 */
export const constantRoutes = [
    {
        path: "/login",
        component: () => import("@/views/login/index"),
        hidden: true
    },

    {
        path: "/404",
        component: () => import("@/views/404"),
        hidden: true
    },

    {
        path: "/",
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: "home",
                name: "Home",
                component: () => import("@/views/home/index"),
                meta: { title: "首页", icon: "home" }
            }
        ]
    }
];

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */

export const asyncRoutes = [
           {
               path: "/sale",
               component: Layout,
               meta: {
                   title: "会员管理",
                   icon: "sale",
                   access: [
                       "sale/getsalelist",
                       "sale/getsaleinfo",
                       "comcase/caselist"
                   ]
               },
               alwaysShow: true,
               children: [
                   {
                       path: "saleManage",
                       name: "SaleManage",
                       component: () =>
                           import("@/views/home/index"),
                       meta: {
                           title: "会员列表",
                           access: ["sale/getsalelist"]
                       }
                   }
               ]
           }
       ];

const createRouter = () =>
    new Router({
        mode: "history", // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router    router.matcher = newRouter.matcher; // reset router
}

export default router;
