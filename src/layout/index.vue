<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
        <sidebar class="sidebar-container"/>
        <div class="main-container">
            <div :class="{'fixed-header':fixedHeader}">
                <navbar/>
            </div>
            <app-main/>
        </div>
    </div>
</template>

<script>
    import {Navbar, Sidebar, AppMain} from './components'
    import ResizeMixin from './mixin/ResizeHandler'
    import io from 'socket.io-client'
    import { mapGetters } from "vuex";

    export default {
        name: 'Layout',
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        mixins: [ResizeMixin],
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            fixedHeader() {
                return this.$store.state.settings.fixedHeader
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            },
            ...mapGetters(["admin_info"])
        },
        data(){
            return{
                type:1,
                id:1
            }
        },
        mounted() {
            let _this = this;
            let socket = io.connect('https://service.zhengyouke.com:8125'); //正式站
            //let socket = io.connect('ws://139.224.3.132:8125'); //测试站
            //连接成功，将当前openid发送给订阅者
            socket.on('connect_success', (data) => {
                var socket_id = data.socket_id;
                var postdata = {'admin_id':this.admin_info.id , 'socket_id': socket_id};
                //var postdata = {'admin_id': 1, 'socket_id': socket_id};
                socket.emit('login', postdata, (result) => {
                    console.log('发起登陆');
                });
            });
            socket.on('login_success', (data) => {
                console.log('登陆成功');
            });

            //实时消息提示
            socket.on('receive_msg', (data) => {
                this.type = data.type;
                this.id = data.type_id;
                if (data.type == 'sys') { //系统通知
                    _this.$notify({
                        title: "系统提示",
                        message: data.msg,
                        duration: 0
                    });
                }else{
                    _this.$notify({
                        title: "消息通知",
                        dangerouslyUseHTMLString: true,
                        message: '<p>"'+data.msg+'"</p>',
                        duration: 0,
                        onClick:this.goLink
                    });
                }
            })
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
            },
            goLink(){
                if(this.type == 'Unsale'){
                    this.$router.push({name:'SaleManage',query:{is_open:0,user_id:this.id}});
                }else if(this.type == 'sale'){
                    this.$router.push({name:'SaleManage',query:{is_open:1,user_id:this.id}});
                }else if(this.type == 'unCounselor'){
                    this.$router.push({name:'ConsultantManage',query:{is_open:1,user_id:this.id}});
                }else if(this.type == 'Counselor'){
                    this.$router.push({name:'ConsultantManage',query:{is_open:2,user_id:this.id}});
                }else if(this.type == 'order'){
                    this.$router.push({name:'OrderManage',query:{key_words:this.id,kind_type:1}});
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    @import "~@/styles/variables.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }

    .mobile .fixed-header {
        width: 100%;
    }
</style>
