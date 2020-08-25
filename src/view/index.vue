<style lang="less">
html,
body {
    width: 100%;
    height: 100%;
    font-size: 12px;
    background: white;
}
</style>
<template>
<!-- <keep-alive> -->
    <router-view></router-view>
<!-- </keep-alive> -->
</template>
<script>
window.globalYonyouCoordinationCliTopLevelObj = window.globalYonyouCoordinationCliTopLevelObj || {};
window.globalYonyouCoordinationCliTopLevelObj.isSmallProgram = /smallProgram/ig.test(__ENV__);

export default {

};
</script>
