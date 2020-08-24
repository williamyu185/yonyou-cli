<style lang="less" module="a">
.register {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    .back {
        padding-left: 20px;
        height: 20px;
        margin-top: 20px;
        cursor: pointer;
        div:first-of-type {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            background: url("../images/back.png") center center no-repeat;
            background-size: contain;
        }
        div:last-of-type {
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            color: #333;
        }
    }
    .tabs {
        margin-top: 22px;
        padding-bottom: 2px;
        border-bottom: 1px solid #D9D9D9;
        div {
            position: relative;
            height: 29px;
            padding: 0 20px;
            line-height: 20px;
            font-size: 14px;
            color: #333;
            font-weight: 400;
            cursor: pointer;
        }
        .selected {
            color: #EE2233;
            font-weight: 500;
        }
        .selected::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 28px;
            height: 4px;
            margin-left: -14px;
            border-radius: 2px;
            background: #EE2233;
        }
    }
}
</style>
<template>
<div :class="[a.register]" class="mb-flex mb-flex-v mb-flex-1">
    <div :class="[a.back]" class="mb-flex" v-if="!isInIframe">
        <div @click.stop="backToList"></div>
        <div @click.stop="backToList">返回</div>
    </div>
    <div :class="[a.tabs]" class="mb-flex" v-if="!isInIframe">
        <div @click.stop="tabChoosen(item, index)" v-for="(item, index) in tabs" :key="index" :class="[{[a.selected]: index === currentTabIndex}]">{{item.name}}</div>
    </div>
    <div class="mb-flex-1">
        <router-view :detailMsg="detailMsg" :iframeUrl="iframeUrl"></router-view>
    </div>
</div>
</template>
<script>

export default {
    data() {
        return {
            detailMsg: {},
            tabs: [{
                name: '办理表单',
            }, {
                name: '办理情况'
            }, {
                name: '进度汇报'
            }, {
                name: '催办记录'
            }, {
                name: '授权信息'
            }],
            currentTabIndex: 0,
            isInIframe: false,
            iframeUrl: '',
            isNoLeftArrowBack: false,
            extendTabActiveIndex:''
        };
    },
    computed: {

    },
    components: {

    }, 
    methods: {
        tabChoosen(item = {}, index) {
            this.tabs.forEach((itemA, indexA) => {
                itemA.isSelected = false;
            });
            item.isSelected = true;
            this.currentTabIndex = index;
            let detailMsg = this.detailMsg;
            switch(index) {
                // 办理表单
                case 0:
                    if(this.extendTabActiveIndex){
                        this.iframeUrl = window.allGlobalObj.addCallbackurl(`${detailMsg.detailUrl}&extendTabActiveIndex=${this.extendTabActiveIndex}`);
                    }else{
                        this.iframeUrl = window.allGlobalObj.addCallbackurl(detailMsg.detailUrl);
                    }
                    if(this.isInIframe) {
                        window.location.href = this.iframeUrl;
                    }else {
                        this.$router.replace({
                            name: 'iframeContainer',
                            query: {
                                ...item
                            }
                        });
                    }
                break;
                // 办理情况
                case 1:
                    this.iframeUrl = window.allGlobalObj.addCallbackurl(detailMsg.processDetailUrl);
                    if(this.isInIframe) {
                        window.location.href = this.iframeUrl;
                    }else {
                        this.$router.replace({
                            name: 'iframeContainer',
                            query: {
                                ...item
                            }
                        });
                    }
                break;
                // 进度汇报
                case 2:
                    this.$router.replace({
                        name: 'speedOfProgress',
                        query: {
                            ...item
                        }
                    });
                break;
                // 催办记录
                case 3:
                    this.$router.replace({
                        name: 'urgeRecord',
                        query: {
                            ...item
                        }
                    });
                break;
                // 授权信息
                case 4:
                    this.$router.replace({
                        name: 'empower',
                        query: {
                            ...item
                        }
                    });
                break;
            }
        },
        backToList() {
            window.history.go(-1);
            // this.$router.replace({
            //     name: 'registerList',
            // });
        }
    },
    created() {
        let isNoLeftArrowBack = window.allGlobalObj.browserAddressUrlParams.isNoLeftArrowBack;
        if(isNoLeftArrowBack) {
            this.isNoLeftArrowBack = isNoLeftArrowBack == 'true' ? true : false;
        }else {
            this.isNoLeftArrowBack = false;
        }
        if(window.frames.length != parent.frames.length) {
        　　this.isInIframe = true;
        }
        let detailMsg = this.$route.params.data;
        this.extendTabActiveIndex = this.$route.params.extendTabActiveIndex||'';
        if(detailMsg) {
            let superviseDetailMsg = window.sessionStorage.setItem('superviseDetailMsg', JSON.stringify(detailMsg));
            this.detailMsg = detailMsg;
        }else {
            this.detailMsg = JSON.parse(window.sessionStorage.getItem('superviseDetailMsg'));
        }
        let routeName = this.$route.name;
        let routeIndex = 0;
        switch(routeName) {
            case 'speedOfProgress':
                routeIndex = 2;
            break;
            case 'urgeRecord':
                routeIndex = 3;
            break;
            case 'empower':
                routeIndex = 4;
            break;
        }
        this.tabChoosen(this.tabs[routeIndex], routeIndex);
    },
}
</script>