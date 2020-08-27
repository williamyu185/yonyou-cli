<style lang="less" module="a">
.entry {
    min-width: 1200px;
    height: 100%;
    font-size: 15px;
    overflow-y: auto;
    .mainContent {
        height: 100%;
        box-sizing: border-box;
        background: white;
    }
}
</style>
<style lang="less" module="b">
:global {
    html,
    body {
        width: 100%;
        height: 100%;
        font-size: 12px;
        background: white;
    }
}
</style>
<template>
<div :class="[a.entry]" class="mb-flex">
    <div :class="[a.mainContent]" class="mb-flex-1">
        <router-view></router-view>
    </div>
</div>
</template>
<script>
window.globalYonyouCoordinationCliTopLevelObj = window.globalYonyouCoordinationCliTopLevelObj || {};
let globalYonyouCoordinationCliTopLevelObj = window.globalYonyouCoordinationCliTopLevelObj;
// 任何全局变量在各文件中使用前，必须在此文件和globalYonyouCoordinationCliTopLevelObj进行初始化注册
// 严禁在未在此文件和globalYonyouCoordinationCliTopLevelObj对象注册的情况下，在其他文件中直接初始化并使用全局变量
globalYonyouCoordinationCliTopLevelObj = {
    ...globalYonyouCoordinationCliTopLevelObj,
    isSmallProgram: /smallProgram/ig.test(__ENV__)
};

export default {
    data() {
        return {

        };
    },
    methods: {

    },
    created() {

    },
    mounted() {

    },
};
</script>
        