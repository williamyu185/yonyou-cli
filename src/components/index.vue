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
window.globalYonyouCoordinationCliTopLevelObj.isSmallProgram = /smallProgram/ig.test(__ENV__);

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
        