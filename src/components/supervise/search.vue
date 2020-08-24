<style lang="less" module="a">
.personalOrDepartmental{
    height:31px;
    font-size:14px;
    font-weight:400;
    line-height:20px;
    border-bottom: solid 1px #D9D9D9;

    .personal{
        height:20px;
        padding-left:20px;
        position: relative;
        cursor:pointer;
    }
    .departmental{
        height:20px;
        padding-left:40px;
        position: relative;
        cursor:pointer;
    }
    .org{
        height:20px;
        padding-left:40px;
        position: relative;
        cursor:pointer;
    }
    .selected{
        color:rgba(238,34,51,1);
    }
    .selected::after{
        position: absolute;;
        bottom:-5px;
        right:14px;
        content:"";
        width:28px;
        height:4px;
        background:rgba(238,34,35,1);
        border-radius:2px;
    }
    
}
.operations{
    padding: 17px 20px 16px 20px;
    .leftSearchContainer{
        min-width: 280px;
    }
    .selectors{
        padding:0 16px 0 12px;
    }
    .advancedSearch{
        position: relative;
        bottom:2px;
    }
}
.twoButton{
    position: relative;
    width:119px;
    margin:0 8px;
}
.sendApprove{
    width:120px;
}
.threeButton{
    position:relative;
    width:179px;
}
.leftButton{
    box-sizing: border-box;
    padding:9px 12px;
    border-radius: 3px 0 0 3px;
    border:1px solid rgba(217,217,217,1);
    min-width:60px;
    height:34px;
    font-size:12px;
    line-height:14px;
    text-align: center;
    position: absolute;
    left:0;
    top:0;
    border-right:none;
}
.rightButton{
    box-sizing: border-box;
    padding:9px 12px;
    border:1px solid rgba(217,217,217,1);
    width:60px;
    height:34px;
    font-size:12px;
    line-height:14px;
    text-align: center;
    border-radius: 0 3px 3px 0;
    position:absolute;
    right:0;
    top: 0;
}
.leftButton:hover{
    cursor: pointer;
    color: #555;
    background-color: rgba(0, 0, 0, 0.1);
}
.leftButton:active{
    color: #555;
    background-color: #afb3b7;
    border-color: #afb3b7;
}
.rightButton:hover{
    cursor: pointer;
    color: #555;
    background-color: rgba(0, 0, 0, 0.1);
}
.rightButton:active{
    color: #555;
    background-color: #afb3b7;
    border-color: #afb3b7;
}
.centerButton{
    box-sizing:border-box;
    padding:9px 12px;
    border:1px solid rgba(217,217,217,1);
    width:60px;
    height:34px;
    font-size:12px;
    line-height:14px;
    text-align: center;
    border-right:none;
    border-radius:0;
    position:absolute;
    right:60px;
    top:0;
}
.centerButton:hover{
    cursor: pointer;
    color: #555;
    background-color: rgba(0, 0, 0, 0.1);
}
.centerButton:active{
    color: #555;
    background-color: #afb3b7;
    border-color: #afb3b7;
}
.dialogContent{
    width:auto;
    height:22px;
    font-size:14px;
    font-weight:400;
    color:rgba(136,136,136,1);
    line-height:22px;
    margin-top:15px;
}
.importFile {
    & > div {
        position: relative;
        padding-left: 24px;
        box-sizing: border-box;
    }
    .start,
    .uploadIndex {
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        background: url("../images/templateDownload.png") center center no-repeat;
        background-size: contain;
    }
    .uploadBtn {
        width: 90px;
        height: 32px;
        line-height: 32px;
        border-radius: 3px;
        box-sizing: border-box;
        padding-left: 30px;
        color: #333;
        font-size: 12px;
        text-align: left;
        border: 1px solid #D9D9D9;
        background: url("../images/upload.png") left center no-repeat;
        background-size: 14px 14px;
        background-position: 12px center;
    }
    .uploadIndex {
        top: 7px;
        text-align: center;
        line-height: 20px;
        color: white;
        border-radius: 50%;
        background: #80DACF;
    }
    .line {
        position: absolute;
        top: 23px;
        left: 8px;
        bottom: -20px;
        width: 4px;
        border-radius: 3px;
        background: #80DACF;
    }
    .title {
        height: 18px;
        font-size: 12px;
        line-height: 18px;
        div:first-of-type {
            margin-right: 8px;
            color: #333;
        }
        div:last-of-type {
            color: #666;
        }
    }
    .templateFile {
        margin-top: 7px;
        height: 32px;
        box-sizing: border-box;
        padding: 4px 20px 4px 7px;
        background: #F9FAFB;
        & > div {
            color: #666;
        }
        div:first-of-type {
            width: 20px;
            height: 23px;
            margin-right: 11px;
            background-size: contain;
        }
        div:last-of-type {
            width: 16px;
            height: 16px;
            background: url("../images/download.png") center center no-repeat;
            background-size: contain;
            cursor: pointer;
        }
    }
    .templateUpload {
        margin-top: 16px;
        .title {
            position: relative;
            & > div:first-of-type {
                margin-right: 0;
            }
            & > div:last-of-type {
                position: absolute;
                top: 7px;
                left: 102px;
            }
        }
    }
    
    
}
</style>
<template>
    <div class="superviseRegisterList">
        <div class="delaySearch mb-flex mb-flex-pack-justify">
        <div class="delayName">督办查询</div>
            <div class="search">
                <YYInput v-model="searchKeyword" @on-enter="searchChange" placeholder="请输入内容">
                    <div class="searchIcon" @click="searchChange" slot="suffix">
                        <YYIcon type="search"></YYIcon>
                    </div>
                </YYInput>
            </div>
        </div>
        <div :class="[a.personalOrDepartmental]" class="mb-flex">
            <div :class="[{[a.selected]:menuSelected == 'personal'},[a.personal]]" @click="tabSearch('personal')" v-if="authButtons.user">个人查询</div>
            <div :class="[{[a.selected]:menuSelected == 'departmental'},[a.departmental]]" @click="tabSearch('departmental')" v-if="authButtons.dept">部门查询</div>
            <div :class="[{[a.selected]:menuSelected == 'org'},[a.org]]" @click="tabSearch('org')" v-if="authButtons.org">组织查询</div>
        </div>
        <div :class="[a.operations]" class="mb-flex mb-flex-pack-justify">
            <div :class="[a.leftSearchContainer]">
                <div v-for="(item,index) in searchParams" :key="index">
                    <span>{{item.name}}</span>
                    <YYSelect
                        :class="[a.selectors]"
                        @on-change="handleStatusChange" style="width: 132px">
                        <YYOption v-for="list in item.value" :key="list.key" :value="JSON.stringify(list)">
                            {{list.value}}
                        </YYOption>
                    </YYSelect>
                    <YYButton type="default" @click.stop="advancedSearch" :class="[a.advancedSearch]">搜索</YYButton>
                </div>
            </div>
        </div>
        <div class="superviseManagerTable thFirstChildLeft" :class="{'nocontent-table':tableData==0}" v-if="!!tableHeader">
            <el-table
                border
                :data="tableData"
                @row-click="rowClick"
                :height="tableHeight"
            >
                <el-table-column
                    v-for="(item,index) in tableHeader"
                    :key="index"
                    :label="item.name"
                    :prop="item.key"> 
                </el-table-column>
            </el-table>
        </div>
        <YYEmpty v-if="showEmpty" text="暂无数据" type="data" class="superviseYYEmpty"></YYEmpty>
        <div class="delayPagination">
            <YYPagination
                v-if="tableData.length"
                @on-page-size-change="pageSizeChange"
                @on-change="pageNumChange"
                align="right"
                :current="pageNum"
                :border="true"
                :total="totalNum"
                :pageSize="pageSize"
                :showPagerContent="true"
                :show-sizer-input="true"
                :showTotal="true"
                :show-sizer="true"
                :showElevator="true">
            </YYPagination>
        </div>
    </div>
</template>
<script>
import urlConfig from '../../config/config.js';
// import { Session } from 'inspector';

let basePath = '/supervision';
export default {
    data () {
    return {
            searchKeyword:'',
            tableData:[],
            pageNum: 1,
            pageSize: 20,
            totalNum: 0,
            apiHost: 'http://openapi.chaoke.com:6059',
            fileTypeIcon: '',
            fileList:[],
            fileName:'',
            tableHeader:[],
            tenantId:'',
            host:urlConfig[__ENV__].apiHost + '/custom-approve',
            searchParams:[],
            showEmpty : false,
            javaHost:urlConfig[__ENV__].javaHost,
            billStatus: [],
            menuSelected:'personal',
            authButtons:{
                org:false,
                dept:false,
                user:false
            },
            tableHeight:100,
            timer:null
        };
    },
    components: {
        
    },
    methods: {
        searchChange(){
            this.pageNum = 1;
            this.pageSize = 20;
            this.query();
        },
        pageSizeChange(pageSize){
            this.pageNum = 1;
            this.pageSize = pageSize;
            this.query();
        },
        pageNumChange(pageNum) {
            this.pageNum = pageNum;
            this.query();
        },
        handleStatusChange(value) {
            value = JSON.parse(value);
            this.billStatus[value.billStatusCategoryIndex] = value;
        },
        advancedSearch(){
            this.pageNum = 1;
            this.pageSize = 20;
            this.query();
        },
        headQuery(){
            this.$http.get(basePath + '/rest/register/form/head/query').then(response =>{
                if(response.flag != '0') {
                    this.$YYMessage.error(response.desc);
                    return;
                }
                this.tableHeader = response.data;
            })
        },
        query(){
            this.$YYLoading.show();
            let params = {
                    query: {},
                    keyword:this.searchKeyword,
                    index:this.pageNum,
                    size:this.pageSize,
            };
            this.billStatus.forEach((item, index) => {
                params.query[item.billStatusCategoryKey] = item.key;
            });
            let url = '';
            if(this.menuSelected == 'personal'){
                url = '/rest/empower/form/query'
            }else if(this.menuSelected == 'departmental'){
                url = '/rest/empower/form/dept/query'
            }else{
                url = '/rest/empower/form/org/query'
            }
            this.$http.post(basePath + url, JSON.stringify(params)).then(response =>{
                this.$YYLoading.hide();
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.desc);
                    return;
                }
                let responseData = response.data;
                this.tableData = responseData.data;
                this.totalNum = responseData.total;
                if(this.tableData.length) {
                    this.showEmpty = false;
                    this.tableHeight = document.body.clientHeight - 300;
                }else {
                    this.showEmpty = true;
                }
            }) 
        },
        paramsQuery(){
            this.$http.post(basePath + '/rest/register/search/params/query').then(response =>{
                if(response.flag != '0') {
                    this.$YYMessage.error(response.desc);
                    return;
                }
                response.data.forEach((itemA, indexA) => {
                    itemA.value.forEach((itemB, indexB) => {
                        (indexB === 0) && this.billStatus.push(itemB);
                        itemB.billStatusCategoryIndex = indexA;
                        itemB.billStatusCategoryKey = itemA.key;
                    });
                });
                this.searchParams = response.data;
            })
        },
        rowClick(row,event,column){
            let extendTabActiveIndex = '';
            if(event.label=='催办次数'){
                extendTabActiveIndex = 'urgeRecord';
            }
            if(event.type != 'selection'){
                this.$router.push({
                    name: 'registerDetail',
                    params: {
                        extendTabActiveIndex,
                        data: row,
                    }
                });
            }
        },
        tabSearch(tabName){
            switch(tabName){
                case 'personal':
                    this.menuSelected = 'personal';
                    this.query();
                    break;
                case 'departmental':
                    this.menuSelected = 'departmental';
                    this.query();
                    break;
                case 'org':
                    this.menuSelected = 'org';
                    this.query();
                    break;
            }
            this.checkMenuSelected("change")
        },
        getSessionInfo(){
            return new Promise((resolve,reject) => {
                this.$http.get(basePath + '/session/info').then(response => {
                    if(response.flag != '0') {
                        return;
                    }
                    response.data.authButtons.forEach(item=>{
                        if(item=='org'){
                             this.authButtons.org = true;
                        }else if(item == 'dept'){
                            this.authButtons.dept = true;
                        }else if(item == 'user'){
                            this.authButtons.user = true;
                        }
                    })
                })
            })
            
        },
        setTableHeight(){
            window.addEventListener("resize",()=>{
                if(!!this.timer){clearTimeout(this.timer)};
                if(!this.tableData.length){return};
                this.timer = setTimeout(()=>{
                    this.tableHeight = document.body.clientHeight - 300;
                },200);
            })
        },
        checkMenuSelected(type){//检查当前切换table所在栏
            if(type==='change'){
                window.sessionStorage.setItem("duban.menuSelected",this.menuSelected)
                return
            }
            let menuSelected = window.sessionStorage.getItem("duban.menuSelected")
            if(!!menuSelected){
                this.menuSelected = menuSelected
            }else{
                window.sessionStorage.setItem("duban.menuSelected",this.menuSelected)
            }
        }
    },
    mounted() {
        this.setTableHeight();
    },
    created(){
        this.checkMenuSelected();
        this.getSessionInfo();
        this.headQuery();
        this.query();
        this.paramsQuery();
    }
}
</script>