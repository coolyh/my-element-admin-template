<template>
    <div class="app-container">
        <h1>欢迎来到APP后台管理系统</h1>
    </div>
</template>
<script>
import defaultSettings from "@/settings";
export default {
    name: "Home",
    data() {
        return {
            title: defaultSettings.title || "欢迎登录"
        };
    },
    mounted() {},
    methods: {}
};
</script>

<style lang="scss">
.wrap {
    margin: 30px 0 100px;
}
</style>
