import * as path from "@/utils/path";
const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,

    // user
    token: state => state.user.token,
    user_name: state => state.user.admin_info.user_name,
    // 角色
    admin_info: state => state.user.admin_info,
    user_id: state => state.user.admin_info.id,
    nickname: state => state.user.admin_info.nickname,
    //路由菜单
    menu: state => state.user.menu,
    permission_routes: state => state.permission.routes,

    //获取页面按钮权限实例：
    menu_button: state => {
        return {
            is_add: state.user.menu.includes(path.menu_add),
            is_edit: state.user.menu.includes(path.menu_edit),
            is_del: state.user.menu.includes(path.menu_del)
        };
    },
   
};
export default getters;
