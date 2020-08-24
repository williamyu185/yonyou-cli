<style lang="less" module="a">
.operate{
    text-align: left;
    color: #3B76DD;
    .operateDetail{
        padding-left:16px;
    }
    .operateDetail:first-of-type{
        padding-left:2px;
    }
}
.operations{
    .leftSearchContainer{
        min-width: 280px;
    }
    padding: 0 20px 16px 20px;
    .selectors{
        padding:0 16px 0 12px;
    }
    .advancedSearch{
        position: relative;
        bottom:2px;
    }
}
.report{
    margin-right:8px;
}
.personalOrDepartmental{
    height:31px;
    font-size:14px;
    font-weight:400;
    line-height:20px;
    position: relative;
    top: 6px;
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
    .selected{
        color:rgba(238,34,51,1);
    }
    .selected::after{
        position: absolute;;
        bottom:-5px;
        right:0px;
        content:"";
        width:28px;
        height:4px;
        background:rgba(238,34,35,1);
        border-radius:2px;
    }
}
</style>
<template>
    <div>
        <div class="delaySearch mb-flex mb-flex-pack-justify">
        <div class="delayName">督办办理</div>
            <div class="search">
                <YYInput v-model="searchKeyword" @on-enter="searchChange" placeholder="请输入内容">
                    <div class="searchIcon" @click.stop="searchChange" slot="suffix">
                        <YYIcon type="search"></YYIcon>
                    </div>
                </YYInput>
            </div>
        </div>
        <div :class="[a.operations]" class="mb-flex mb-flex-pack-justify">
            <div :class="[a.personalOrDepartmental]" class="mb-flex">
                <div :class="[{[a.selected]:menuSelected == 'wait'},[a.personal]]" @click="tabSearch('wait')" >待办</div>
                <div :class="[{[a.selected]:menuSelected == 'already'},[a.departmental]]" @click="tabSearch('already')">已办</div>
            </div>
            <div class="mb-flex">
                 <!-- <YYButton :class="[a.report]" type="primary" @click="report">汇报</YYButton> -->
                 <!-- <YYButton :class="[a.report]" type="ghost" @click="handleShowSelectMember">授权</YYButton> -->
                 <YYButton :class="[a.report]" type="primary" @click="exportExcel">导出</YYButton>
                 <!-- <YYButton :class="[a.report]" type="ghost" @click="delay">延期</YYButton>
                 <YYButton type="ghost" @click="stop">终止</YYButton> -->
            </div>
        </div>
        <div class="superviseManagerTable thFirstChildLeft" :class="{'nocontent-table':tableData==0}" v-if="!!tableHeader">
            <el-table
                border
                :data="tableData"
                :height="tableHeight"
                @selection-change="handleSelectionChange"
                @row-click="rowClick"
            >
                <el-table-column
                    type="selection"> 
                </el-table-column>
                <el-table-column
                    v-for="(item,index) in tableHeader"
                    :key="index"
                    :label="item.name"
                    :prop="item.key"> 
                </el-table-column>
                <el-table-column
                    v-if="!!tableHeader"
                    label="操作"
                    width="198">
                    <template slot-scope="scope">
                        <div :class="[a.operate]">
                            <span :class="[a.operateDetail]" v-for="(item,index) in scope.row.buttonList" 
                                :key="index"
                                @click.stop="operate(scope.row,item.code)">
                                {{item.name}}
                            </span>
                        </div>
                    </template>
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
        <YYSelectMember
            v-if="qzId"
            :qzId="qzId"
            @on-ok="handleOk" 
            :host="YYSecurityUploadListHost"
            v-model="selectMemberShow">
        </YYSelectMember>
    </div>
</template>
<script>
import urlConfig from '../../config/config.js';

let basePath = '/supervision';
export default {
    data () {
    return {
           
            searchKeyword:'',
            pageNum: 1,
            pageSize: 20,
            totalNum: 0,
            tableHeader:[],
            multipleSelection:[],
            selectMemberShow:false,
            qzId:'',
            tableData:[],
            showEmpty:false,
            currentStatus:0,
            YYSecurityUploadListHost: urlConfig[__ENV__].YYSecurityUploadListHost,
            menuSelected:'wait',
            tableHeight:100,
            timer:null
        };
    },
    components: {},
    methods: {
        tabSearch(tabName){
            switch(tabName){
                case 'wait':
                    this.menuSelected = 'wait';
                    this.currentStatus = 0;
                    this.query();
                    break;
                case 'already':
                    this.menuSelected = 'already';
                    this.currentStatus = 1;
                    this.query();
                    break;
            }
        },
        searchChange() {
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
        // advancedSearch(){
        //     this.showEmpty = false;
        //     this.$YYLoading.show();
        //     let params = JSON.stringify({
        //         query:{},
        //         keyword:this.searchKeyword,
        //         index:this.pageNum,
        //         size:this.pageSize,
        //         status:this.currentStatus,
        //     });
        //     this.$http.post(basePath + '/rest/handle/form/query',params).then(response =>{
        //         this.$YYLoading.hide();
        //         if(response.flag != '0' ){
        //             this.$YYMessage.error(response.desc);
        //             return;
        //         }
        //         this.tableData = response.data.data;
        //         if(!this.tableData.length){
        //             this.showEmpty = true;
        //         }
        //         this.totalNum = response.data.total;
        //     })
        // },
        headQuery(){
            this.$http.get(basePath + '/rest/handle/head/query').then(response=>{
                this.tableHeader = response.data;
            })
        },
        query(){
            this.showEmpty = false;
            this.$YYLoading.show();
            let paramsObj = {
                    query:{},
                    keyword:this.searchKeyword,
                    index:this.pageNum,
                    status: this.currentStatus,
                    size:this.pageSize,
            };
            let params = JSON.stringify(paramsObj);
            this.$http.post(basePath + '/rest/handle/form/query',params).then(response =>{
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
                    this.tableHeight = document.body.clientHeight - 200;
                }else {
                    this.showEmpty = true;
                }
            });
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        checkOnlyOne() {
            if(this.multipleSelection.length == 0){
                this.$YYMessage.warning({
                    content: '请选择督办事项'
                });
                return false;
            }else if(this.multipleSelection.length > 1){
                this.$YYMessage.warning({
                    content: '只能选择一个督办事项'
                });
                return false;
            }
            return true;
        },
        reportNew(formInstanceId){
            this.$http.get(basePath + '/rest/handle/form/reportUrl',{params:{
                formInstanceId:formInstanceId
            }}).then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.desc);
                    return;
                }
                this.openWin(`${response.data.formUrl}&fromSource=supervise`,1081,600);
            })
        },
        openWin(url,newWinWidth,newWinHeight){
            let winWidth = screen.width;
            let winHeight = screen.heigth;
            let left = (winWidth - newWinWidth)/2;
            let top = (winHeight - newWinHeight)/2;
            window.allGlobalObj.openWindow({
                url
            });
        },
        handleShowSelectMember(){
            if(this.multipleSelection.length == 0){
                this.$YYMessage.warning({
                    content: '请选择督办事项'
                });
                return;
            }else{
                this.selectMemberShow = true;
            }
        },
        exportExcel(){
            window.open(`${urlConfig[__ENV__].apiHost}/supervision/rest/handle/form/export_excel?status=${this.currentStatus}&keyword=${this.searchKeyword}`);
        },
        handleOk({member}) {
            let forms = [];
            this.multipleSelection.forEach((item) =>{
                forms.push({
                    formInsId:item.formInstanceId,
                    formId:item.formId
                })
            })
            let users = [];
            for(let mem in member){
                users.push(mem);
            }
            let params = JSON.stringify({
                forms:forms,
                authorizedUsers:users
            })
            this.$http.post(basePath + '/rest/empower/form/saveInfo',params).then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error({
                        content: response.desc
                    });
                    return;
                }
                this.$YYMessage.success({
                    content:response.desc
                })
            })
            this.selectMemberShow = false;
        },
        getSessionInfo(){
            this.$http.get(basePath + '/session/info').then( response => {
                this.qzId = response.data.qzId;
            })
        },
        delayNew(formInstanceId){
            this.$http.get(basePath + '/rest/extension/form/url',{params:{
                formInsId:formInstanceId
            }}).then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.desc);
                    return;
                }
                let formUrl = response.data.formUrl;
                window.allGlobalObj.openWindow({
                    url: `${formUrl}&fromSource=supervise`
                });
            })
        },
        stopNew(formInstanceId){
            this.$http.get(basePath + '/rest/termination/form/url',{params:{
                formInsId:formInstanceId
            }}).then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.desc);
                    return;
                }
                let formUrl = response.data.formUrl;
                window.allGlobalObj.openWindow({
                    url: `${formUrl}&fromSource=supervise`
                });
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
        operate(row,code){
            switch(code){
                case 'postpone':
                    this.delayNew(row.formInstanceId);
                    break;
                case 'termination':
                    this.stopNew(row.formInstanceId);
                    break;
                case 'report':
                    this.reportNew(row.formInstanceId);
                    break;
            }
        },
        setTableHeight(){
            window.addEventListener("resize",()=>{
                if(!!this.timer){clearTimeout(this.timer)};
                if(!this.tableData.length){return};
                this.timer = setTimeout(()=>{
                    this.tableHeight = document.body.clientHeight - 200;
                },200);
            })
        }
    },
    mounted() {
        this.setTableHeight();
    },
    created(){
        this.headQuery();
        this.query();
        this.getSessionInfo();
        window.allGlobalObj.refreshList = (event) => {
            let response = event.data;
            if(response.type && response.type == 'supervise' && response.data && response.data.isRefresh) {
                this.query();
            }
        };
    }
}

</script>