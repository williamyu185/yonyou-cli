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
        