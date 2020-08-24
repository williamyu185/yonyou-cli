<style lang="less" module="a">
.entry {
    min-width: 1200px;
    height: 100%;
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
    <div :class="[a.mainContent]" class="superviseScrollBar mb-flex-1">
        <router-view v-if="isRouterViewShow"></router-view>
    </div>
</div>
</template>
<script>
let basePath = '/supervision';
export default {
    data() {
        return {
            urlParams: {},
            isRouterViewShow: false,
            
        };
    },
    methods: {
  
        getParams(str) {
            // 获取地址栏信息
            let obj = {};
            let arr = str.split('&');
            arr.forEach((item, index) => {
                let tempt = item.split('=');
                obj[tempt[0]] = tempt[1];
            });
            return obj;
        },
    },
    created() {
        let hostAndParams = window.location.href.split('?');
        if(hostAndParams.length == 2) {
            this.urlParams = this.getParams(hostAndParams[1].replace(/#\/.*$/g, ''));
        }else {
            this.urlParams = {};
        }
        window.allGlobalObj.browserAddressUrlParams = this.urlParams;
        let urlParamsCode = this.urlParams.code;
        let sessionStorage = window.sessionStorage;
        let superviseUrlParamsCode = sessionStorage.getItem('superviseUrlParamsCode');
        let serviceCode = this.urlParams.serviceCode;
        if(urlParamsCode && superviseUrlParamsCode != urlParamsCode) {
            this.$http.get(basePath + `/sso/authCode?code=${urlParamsCode}`, {}).then((response) => {
                if(response.flag == '0') {
                    sessionStorage.setItem('superviseUrlParamsCode', urlParamsCode);
                    this.isRouterViewShow = true;
                }
            });
        }else if(serviceCode) {
            this.isRouterViewShow = true;
            switch(serviceCode) {
                case 'XTDUBAN001':
                    this.$router.push({
                        name: 'registerList'
                    });
                break;
                case 'XTDUBAN002':
                    this.$router.push({
                        name: 'handle'
                    });
                break;
                case 'XTDUBAN003':
                    this.$router.push({
                        name: 'delay'
                    });
                break;
                case 'XTDUBAN004':
                    this.$router.push({
                        name: 'stop'
                    });
                break;
                case 'XTDUBAN005':
                    this.$router.push({
                        name: 'setting'
                    });
                break;
                case 'XTDUBAN006':
                    this.$router.push({
                        name: 'search'
                    });
                break;
            }
        }else {
            this.isRouterViewShow = true;
        }
    },
    mounted() {
        document.querySelector(".superviseScrollBar").oncontextmenu = function(e){return false};//屏蔽所有右键菜单
    },
};
</script>
        