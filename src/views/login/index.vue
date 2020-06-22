<template>
    <div class="login-container">
        <div class="login-top clearfix">
            <h3 class="com-title">管理后台</h3>
            <h3 class="phone-title">服务支持：</h3>
        </div>
        <div class="login-form-warp">
            <div class="login-form-box">
                <el-form
                    ref="loginForm"
                    :model="loginForm"
                    :rules="loginRules"
                    class="login-form"
                    auto-complete="on"
                    label-position="left"
                >
                    <h2 class="loginForm-title">登录</h2>
                    <el-form-item prop="username">
                        <el-input
                            ref="username"
                            v-model="loginForm.username"
                            placeholder="请输入账号"
                            name="username"
                            type="text"
                            tabindex="1"
                            auto-complete="on"
                            maxlength="11"
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            :key="passwordType"
                            ref="password"
                            v-model="loginForm.password"
                            :type="passwordType"
                            placeholder="请输入密码"
                            name="password"
                            tabindex="2"
                            auto-complete="on"
                            @keyup.enter.native="handleLogin"
                        />
                        <span class="show-pwd" @click="showPwd">
                            <svg-icon
                                :icon-class="
                                    passwordType === 'password'
                                        ? 'eye'
                                        : 'eye-open'
                                "
                            />
                        </span>
                    </el-form-item>
                    <el-button
                        :loading="loading"
                        type="primary"
                        style="width:100%;margin-bottom:30px;"
                        @click.native.prevent="handleLogin"
                        >登录
                    </el-button>
                    <div class="tips">
                        <!-- <span style="margin-right:20px;">username: admin</span>
                        <span> password: any</span> -->
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error("密码不能少于6位"));
            } else {
                callback();
            }
        };
        return {
            //登录表单
            loginForm: {
                username: "", //用户名
                password: "", //密码
                geetest_challenge: "", //geetest验证成功返回值
                geetest_validate: "", //geetest验证成功返回值
                geetest_seccode: "" //geetest验证成功返回值
            },
            loginRules: {
                username: [
                    { required: true, trigger: "blur", message: "请输入账号" }
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePassword
                    }
                ]
            },
            loading: false,
            passwordType: "password", //密码类型
            redirect: undefined, //重定向

            captchaObj: null, //geetest实例 captchaObj
            hasGeetest: false //geetest验证
        };
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    methods: {
        //显示密码
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        //登录
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                setTimeout(() => {
                    if (valid) {
                        if (this.hasGeetest) {
                            this.loading = true;
                            this.$store
                                .dispatch(
                                    "user/LoginByUsername",
                                    this.loginForm
                                )
                                .then(res => {
                                    //this.$router.push({ path: this.redirect || '/' }) //退出登陆后跳转至历史页面
                                    this.$router.push({ path: "/" }); //退出登陆后跳转至首页
                                })
                                .catch(() => {
                                    this.loading = false;
                                    this.hasGeetest = false;
                                    this.captchaObj.reset(); // 调用该接口进行geetest重置
                                });
                        } else {
                            this.$message.error("请完成点击验证！");
                        }
                    } else {
                        this.$message.error("表单提交错误，检查表单校验！");
                        return false;
                    }
                }, 600);
            });
        }
    }
};
</script>

<style lang="scss" type="text/scss" scoped>
$bg: #131a2e;
$dark_gray: red;
$light_gray: #eee;

.login-container {
    height: 100%;
    width: 100%;

    background: #0F2027;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


    min-height: 700px;
    //overflow: hidden;

    .login-top {
        color: #333333;
        background: #ffffff;
        height: 64px;
        h3 {
            margin: 0;
            padding: 0;
        }

        .com-title {
            float: left;
            line-height: 64px;
            padding-left: 60px;
            font-size: 30px;
        }

        .phone-title {
            float: right;
            line-height: 64px;
            padding-right: 60px;
            font-size: 24px;
            font-weight: normal;
        }
    }

    .login-form-warp {
        height: calc(100% - 64px);
        .login-form-box {
            height: 100%;
            width: 1200px;
            margin: 0 auto;
            position: relative;
        }

        .login-img {
            height: 100%;
            width: 1235px;
            position: absolute;
            top: 0px;
            left: -300px;

            .login-img-text {
                position: absolute;
                top: 297px;
                left: 355px;
                color: #ffffff;
                h2 {
                    margin: 0;
                    padding: 0;
                    font-size: 44px;
                    font-family: MicrosoftYaHei-Bold;
                    font-weight: bold;
                    letter-spacing: 6px;
                    text-align: center;
                    margin-bottom: 12px;
                }
                h3 {
                    margin: 0;
                    padding: 0;
                    font-size: 24px;
                    font-family: MicrosoftYaHei;
                    font-weight: normal;
                    text-align: center;
                }
            }
        }

        .login-form {
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 50%;
            width: 400px;
            height: 363px;
            margin-left: -200px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 13px 21px 0 rgba(61, 48, 43, 0.15);
            margin-top: 235px;
            padding: 25px 26px;

            .loginForm-title {
                margin: 0;
                padding: 0;
                font-size: 24px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #010510;
                margin-bottom: 25px;
                text-align: center;
                letter-spacing: 10px;
            }

            .login-btn {
                width: 100%;
                background: #16b9f5;
                box-shadow: 0px 13px 21px 0px rgba(61, 48, 43, 0.15);
            }
        }
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 3px;
        font-size: 16px;
        color: #666666;
        cursor: pointer;
        user-select: none;
    }

    .el-button {
        border-radius: 0;
    }

    .el-input__inner {
        border-radius: 0;
    }

    .el-button--primary,
    .el-button--primary:focus,
    .el-button--primary:hover {
        border: none;
    }
    .container-bottom {
        position: absolute;
        text-align: center;
        bottom: 0;
        width: 100%;
        color: white;
    }
    .container-bottom img {
        vertical-align: text-bottom;
    }
}
</style>
