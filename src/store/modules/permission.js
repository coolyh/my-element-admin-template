import {asyncRoutes, constantRoutes} from '@/router'

/**
 * 使用meta.role确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(menu, route) {
    if (route.meta && route.meta.access) {
        return menu.some(item => route.meta.access.includes(item))
    } else {
        return true
    }
}

/**
 * 按递归筛选异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, menu) {
    const res = []

    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(menu, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, menu)
            }
            res.push(tmp)
        }
    })
    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({commit}, menu ) {
        return new Promise(resolve => {
            let accessedRoutes;
            accessedRoutes = filterAsyncRoutes(asyncRoutes, menu)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
