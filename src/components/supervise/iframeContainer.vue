<style lang="less" module="a">
.iframeSize {
    width: 100%;
    height: 100%;
}
</style>
<template>
<iframe :class="[a.iframeSize]" :src="iframeUrl"></iframe>
</template>
<script>

export default {
    data() {
        return {
            url: ''
        };
    },
    props: {
        detailMsg: {
            type: Object,
            default() {
                return {};
            }
        },
        iframeUrl: {
            type: String,
            default: ''
        }
    },
    computed: {

    },
    components: {

    }, 
    methods: {

    },
    created() {
        // this.url = this.$route.params.url;
    },
}
</script>