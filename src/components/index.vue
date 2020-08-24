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
    .superviseManagerTable {
        min-height: 350px;
        .el-table__empty-block{
            display: none;
        }
        .el-table .cell {
            padding-left: 16px;
            line-height: 14px;
        }
        .el-table .is-center .cell {
            padding-left: 10px;
        }
        .el-table td,
        .el-table th {
            // padding: 9px 0;
            font-size: 12px;
        }
        .el-table td,
        .el-table th.is-leaf {
            border-bottom: 1px solid #f0f0f0;
        }
        .el-table--border td,
        .el-table--border th,
        .el-table__body-wrapper
            .el-table--border.is-scrolling-left
            ~ .el-table__fixed {
            border-right: 1px solid #f0f0f0;
        }
        .el-table--border,
        .el-table--group {
            border-bottom: 0;
        }
        .el-table__header-wrapper table tr th {
            text-align: center;
            box-sizing: border-box;
            height: 34px;
            color: #333;
            font-weight: 400;
            background: #f7f9fd;
        }
        .el-table__body-wrapper table tr td {
            color: #333;
        }
        .el-table::before {
            display: none;
        }
        .el-table__row {
            cursor: pointer;
        }
        .el-table__row:hover {
            background: #f0f3f9;
        }
        .el-table--border,
        .el-table--group {
            border-top: 1px solid #aaa;
            border-left: 0;
            border-right: 0;
        }
        .el-checkbox__inner{
            border: 1px solid #111;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
            background: white;
        }
        .el-checkbox__inner::after {
            box-sizing: content-box;
            content: "";
            border: 2px solid #111;
            border-left: 0;
            border-top: 0;
            height: 7px;
            left: 4px;
            position: absolute;
            top: 1px;
            transform: rotate(45deg) scaleY(0);
            width: 3px;
            transition: transform 0.15s ease-in 0.05s;
            transform-origin: center;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
            border: 1px solid #111;
            border-radius: 3px;
        }
        .el-checkbox__input .el-checkbox__inner:hover {
            border: 1px solid #111;
        }
        .el-table__header-wrapper .is-indeterminate .el-checkbox__inner {
            border: 1px solid #111;
            background: #ee2223;
        }
    }
    .nocontent-table{
        min-height: 60px;
    }
    // 全局滚动条样式
    .superviseScrollBar::-webkit-scrollbar-track {
        background-color: #F9F9F9;
    }
    .superviseScrollBar::-webkit-scrollbar {
        width: 10px;
    }
    .superviseScrollBar::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 15%);
    }
    .superviseScrollBar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 30%);
    }
    .delaySearch {
        .delayName {
            height:16px;
            font-size:16px;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:16px;
            padding:28px 20px 24px;
        }
        .search {
            margin:20px 20px 16px;
        }
    }
    .delayPagination {
        padding:30px 22px 20px;
    }
    .delayEmpty {
        padding-top:150px;
    }
    //解决element-ui 表格头与内容列不对齐
    .el-table th.gutter{
        display: table-cell !important;
    }
    //表头checkbox左对齐
    .thFirstChildLeft {
        .el-table-column--selection{
            padding: 0;
        }
        .el-table__header-wrapper table tr th:first-child{
            text-align: left;   
        }
        .el-table__header-wrapper table tr th:first-child .cell{
            padding: 0;
        }
        .el-table__header-wrapper table tr th:first-child .el-checkbox{
            padding: 0;
            .el-checkbox__input{
                padding: 15px;
            }
        }
        .el-table-column--selection{
            text-align: left;   
        }
        .el-table-column--selection{
            .cell{
                padding: 0 !important;
            }
        }
        .el-table-column--selection .el-checkbox{
            padding: 0;
            .el-checkbox__input{
                padding: 15px;
            }
        }
    }
    .registerListUrgeDialog{
        .leftAreaVertical {
            padding-top: 10px;
            text-align: right;
        }
        .textArea{
            margin-left:12px;
        }
        .textAreaRow{
            margin-top:16px;
        }
    }
    .superviseRegisterListNoSlide {
        margin-left:12px;
    }
    .noSearchSelectMember{
        .yy-select-member-header-search{
            display: none;
        }
    }
    .superviseYYEmpty {
        margin-top: 130px;
    }
}
</style>
<style lang="less">
.mb-flex{
    
    .yy-input,.yy-select-selection{
        border:1px solid #111;
    }
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
        