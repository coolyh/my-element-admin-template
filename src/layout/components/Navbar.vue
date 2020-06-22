<template>
    <!--页面头部-->
    <div class="navbar" v-if="admin_info">
        <!--头部的菜单展开/收起按钮-->
        <hamburger
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
        />

        <!--头部（个人信息）-->
        <div class="right-menu clearFix">
            <el-dropdown class="avatar-container right-menu" trigger="click">
                <div class="avatar-wrapper">
                    你好，{{ admin_info.nickname }}
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item>
                        <span
                            style="display:block;"
                            @click="changePasswordVisible = true"
                            >修改密码</span
                        >
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span style="display:block;" @click="logout"
                            >退出登录</span
                        >
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!--/头部（个人信息）-->
        <!--  功能图标-->
        <div class="avatar-wrapper right-menu" style="margin-right:30px;">
            <el-badge
                :value="noticeNumber"
                :max="99"
                :hidden="noticeNumber <= 0"
                class="item"
                style="vertical-align: initial;"
            >
                <el-button
                    type="text"
                    icon="el-icon-bell"
                    style="color:#606266;font-size: 16px;"
                    @click="_go_notice"
                ></el-button>
            </el-badge>
        </div>
        <!--  功能图标-->
        <!-- 修改密码模态框 -->
        <el-dialog
            title="修改密码"
            :visible.sync="changePasswordVisible"
            width="600px"
        >
            <el-form
                :model="changePasswordForm"
                status-icon
                :rules="changePasswordRules"
                ref="changePasswordForm"
                label-width="100px"
            >
                <el-form-item label="原密码" prop="ypassword">
                    <el-input
                        v-model="changePasswordForm.ypassword"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input
                        v-model="changePasswordForm.password"
                        autocomplete="off"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="npassword">
                    <el-input
                        v-model="changePasswordForm.npassword"
                        autocomplete="off"
                        type="password"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button
                    type="primary"
                    @click="onChangePassword"
                    :disabled="passwordDis"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <!-- /修改密码 -->
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import { updatePwd } from "@/api/user";

export default {
    data() {
        var validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入原密码"));
            } else {
                callback();
            }
        };

        var validatePassword_new = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入新密码"));
            } else {
                if (this.changePasswordForm.npassword !== "") {
                    this.$refs.changePasswordForm.validateField("npassword");
                }
                callback();
            }
        };

        var validatePassword_re = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.changePasswordForm.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };

        return {
            changePasswordVisible: false,
            changePasswordForm: {
                ypassword: "",
                password: "",
                npassword: ""
            },
            changePasswordRules: {
                ypassword: [
                    {
                        required: true,
                        validator: validatePassword,
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        validator: validatePassword_new,
                        trigger: "blur"
                    }
                ],
                npassword: [
                    {
                        required: true,
                        validator: validatePassword_re,
                        trigger: "blur"
                    }
                ]
            },
            passwordDis: false //修改密码弹层的表单提交按钮是否禁用
        };
    },
    components: {
        Hamburger
    },
    computed: {
        ...mapGetters(["sidebar", "admin_info", "noticeNumber"])
    },
    mounted() {},
    methods: {
        toggleSideBar() {
            this.$store.dispatch("app/toggleSideBar");
        },

        // 退出登录
        async logout() {
            await this.$store.dispatch("user/logout");
            this.$router.push(`/login`);
        },

        // 修改密码
        onChangePassword() {
            // 添加用户名的值
            this.$refs["changePasswordForm"].validate(valid => {
                if (valid) {
                    this.passwordDis = true;
                    let data = Object.assign({}, this.changePasswordForm, {
                        id: this.admin_info.id
                    });
                    updatePwd(data)
                        .then(res => {
                            if (res && res.code === 1) {
                                this.$message({
                                    title: "成功",
                                    message: res.msg,
                                    type: "success"
                                });
                                // 重置密码修改
                                this.$refs["changePasswordForm"].resetFields();
                                // 关闭弹层
                                this.changePasswordVisible = false;
                            }
                            setTimeout(() => {
                                this.passwordDis = false;
                            }, 1000);
                        })
                        .catch(() => {
                            this.passwordDis = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //取消按钮
        onCancel() {
            // 重置密码修改
            this.$refs["changePasswordForm"].resetFields();
            // 关闭弹层
            this.changePasswordVisible = false;
        },
        //跳转到消息列表
        _go_notice() {
            this.$router.push("/noticeManage/noticeList");
        }
    }
};
</script>

<style lang="scss" type="text/scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }
    .breadcrumb-container {
        float: left;
    }
    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }
        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;
            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;
                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }
        .avatar-container {
            margin-right: 30px;
            .avatar-wrapper {
                position: relative;
                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 20px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
