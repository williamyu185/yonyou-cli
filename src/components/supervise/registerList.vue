<style lang="less" module="a">
.operations{
    padding: 0 20px 16px 20px;
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
.oneButton{
    position: relative;
    width: 60px;
    margin:0 8px;
}
.twoButton{
    position: relative;
    width:119px;
    margin:0 8px;
}
.sendApprove{
    width:67px;
}
.threeButton{
    position:relative;
    width:195px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.button{
    box-sizing: border-box;
    border:1px solid rgba(217,217,217,1);
    height:34px;
    font-size:12px;
    line-height:14px;
    text-align: center;
}
.leftButton{
    .button;
    padding:9px 12px;
    border-radius: 3px 0 0 3px;
    min-width:60px;
    margin: 0 4px;
}
.rightButton{
    .button;
    padding:9px 12px;
    width:60px;
    border-radius: 0 3px 3px 0;
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
    .button;
    padding:9px 12px;
    width:60px;
    border-radius:0;
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
        <div class="delayName">督办登记</div>
            <div class="search">
                <YYInput v-model="searchKeyword" @on-enter="searchChange" placeholder="请输入内容">
                    <div class="searchIcon" @click="searchChange" slot="suffix">
                        <YYIcon type="search"></YYIcon>
                    </div>
                </YYInput>
            </div>
        </div>
        <div :class="[a.operations]" class="mb-flex mb-flex-pack-justify">
            <div :class="[a.leftSearchContainer]">
                <span v-for="(item,index) in searchParams" :key="index">
                    <span>{{item.name}}</span>
                    <YYSelect
                        :class="[a.selectors]"
                        @on-change="handleStatusChange" style="width: 132px">
                        <YYOption v-for="(list,indexA) in item.value" :value="JSON.stringify(list)" :key="indexA">
                            {{list.value}}
                        </YYOption>
                    </YYSelect>
                </span>
                <YYButton type="default" @click.stop="advancedSearch" :class="[a.advancedSearch]">搜索</YYButton>
            </div>
            <div class="mb-flex">
                <YYButton type="primary" @click="add">新增</YYButton>
                <div :class="[a.leftButton]" @click="beforeDelete">删除</div>
                <div :class="[a.leftButton]" @click="stopApprove">终止</div>
                <!-- <div :class="[a.leftButton]" @click="beforeWithdraw">撤回</div> -->
                <div :class="[a.leftButton]" @click="urge">催办</div>
                <div :class="[a.leftButton]" @click="beforComplete">办结</div>
                <!-- <div :class="[a.leftButton]" @click="sendApprove">送批示</div> -->
                <div :class="[a.leftButton]" @click="handleShowSelectMember">授权</div>
                <div :class="[a.leftButton]" @click="exportExcel">导出</div>
                <!-- <div :class="[a.leftButton]" @click="isImportFileShow=true">导入</div> -->
            </div>
        </div>
        <div class="superviseManagerTable thFirstChildLeft" :class="{'nocontent-table':tableData==0}">
            <el-table
                v-show="!!tableHeader"
                border
                :height="tableHeight"
                @selection-change="handleSelectionChange"
                :data="tableData"
                ref = 'registerTable'
                @row-click="rowClick">
                <el-table-column
                    type="selection"> 
                </el-table-column>
                <el-table-column
                    v-for="(item,index) in tableHeader"
                    :key="index"
                    :label="item.name"
                    :prop="item.key"
                    :index="index"> 
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
        <YYDialog
            title="提示"
            closeable
            width="340px"
            height="180px"
            v-model="showDeleteDialog"
            @on-ok="confirmDelete">
                <div :class="[a.dialogContent]">您确定要删除该督办任务</div>
        </YYDialog>
        <YYDialog
            title="提示"
            closeable
            width="340px"
            height="180px"
            v-model="showTransferDialog"
            @on-ok="confirmComplete">
                <div :class="[a.dialogContent]">您确定要办结该督办任务</div>
        </YYDialog>
        <YYDialog
            title="提示"
            closeable
            width="340px"
            height="180px"
            v-model="showWithdrawDialog"
            @on-ok="confirmWithdraw">
                <div :class="[a.dialogContent]">您确定要撤回该督办任务</div>
        </YYDialog>
        <YYDialog
            class=""
            title="数据导入"
            closeable
            width="460px"
            height="274px"
            @on-ok="importFile('sure')"
            @on-cancel="importFile('cancel')"
            v-model="isImportFileShow">
            <div :class="[a.importFile]">
                <div :class="[a.templateDownload]">
                    <div :class="[a.start]"></div>
                    <div :class="[a.line]"></div>
                    <div :class="[a.title]" class="mb-flex mb-flex-align-center">
                        <div>模板下载</div>
                        <div>请先下载模板，填写后导入</div>
                    </div>
                    <div :class="[a.templateFile]" class="mb-flex mb-flex-align-center">
                        <!-- <div :style="{backgroundImage: 'url(' + require('../fileExtension/' + fileTypeIcon + '.png') + ')'}"></div> -->
                        <div class="mb-flex-1">{{fileName}}</div>
                        <div></div>
                    </div>
                </div>
                <div :class="[a.templateUpload]">
                    <div :class="[a.uploadIndex]">2</div>
                    <div :class="[a.title]" class="superviseManagerUpload">
                        <el-upload
                            ref="upload"
                            :on-preview="loaddownFile"
                            :action="apiHost + '/esn-template/rest/fileoper/upload'"
                            :with-credentials="true"
                            :show-file-list="true"
                            :multiple="true"
                            :on-remove="removeFile"
                            :before-upload="beforeUpload"
                            :on-success="uploadSuccess"
                            :file-list="fileList"
                            :auto-upload="true">
                            <div :class="[a.uploadBtn]">导入模版</div>
                        </el-upload>
                        <div>请上传数据模版</div>
                    </div>
                </div>
            </div>
        </YYDialog>
        <YYSelectMember
            :qzId="qzId"
            @on-ok="handleOk"
            :host="YYSecurityUploadListHost"
            :keep-alive="false"
            v-model="selectMemberShow"
            :haveSelected="haveAuthorized">
        </YYSelectMember>
        <YYSelectMember
            class="noSearchSelectMember"
            :defineTabs="[]"
            qzId="0"
            v-model="mySelectMemberShow"
            :enableResize="true"
            defaultActiveTab="defineMembers"
            :customTabs="customTabs"
            :keep-alive="false"
            @on-ok="selectMemberSure">
        </YYSelectMember>
        <YYDialog
            class="registerListUrgeDialog"
            title="新增催办"
            closeable
            width="470px"
            height="260px"
            v-model="showUrgeDialog"
            @on-ok="addUrgeSure">
            <el-row>
                <el-col :span="4" class="leftAreaVertical"><span style="color:#ee2223;">*</span>催办人员</el-col>
                <el-col :span="19">
                    <YYSelectMemberInput
                        class="superviseRegisterListNoSlide"
                        v-model="selectedMember"
                        @on-open-select-member="showSelectMemberDialog"
                        :clearable="true"
                        @on-change="handleMemberInputChange">
                    </YYSelectMemberInput>
                </el-col>
            </el-row>
            <el-row class="textAreaRow">
                <el-col :span="4" class="leftAreaVertical">催办内容</el-col>
                <el-col :span="19" class="textArea">
                    <div>
                        <YYInput
                            v-model="urgeContent"
                            type="textarea"
                            @input="suggestion">
                        </YYInput>
                    </div>
                </el-col>
            </el-row>
            
        </YYDialog>
    </div>
</template>
<script>
let basePath = '/supervision';
let diffFileTypeReg = /^(ai|doc|docx|etc|exl|folder|mp3|mp4|pdf|pic|ppt|pptx|psd|sketch|txt|word|xls|xlsx|zip)$/i;
import urlConfig from '../../config/config.js'
export default {
    data () {
    return {
            searchKeyword:'',
            tableData:[],
            pageNum: 1,
            pageSize: 20,
            totalNum: 0,
            formData: {
                single: [{
                    value: '0',
                    label: '全部'
                }]
            },
            showDeleteDialog:false,
            showTransferDialog:false,
            showWithdrawDialog:false,
            multipleSelection:[],
            isImportFileShow: false,
            apiHost: urlConfig[__ENV__].fileExport,
            fileTypeIcon: '',
            // fileList: [{name: 'jay.mp3', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            fileList:[],
            fileName:'',
            tableHeader:[],
            selectMemberShow:false,
            qzId:'0',
            host:urlConfig[__ENV__].apiHost + '/custom-approve',
            searchParams:[],
            showUrgeDialog:false,
            mySelectMemberShow:false,
            customTabs: [
                {
                    title: '选择人员',
                    key:'defineMembers',
                    type: 'member',
                    onLoad: this.loadMoreMembers,
                    hasMore: true
                }
            ],
            memberData:[],
            selectedMember:[],
            urgeContent:'',
            showEmpty : false,
            javaHost:urlConfig[__ENV__].javaHost,
            billStatus: [],
            YYSecurityUploadListHost: urlConfig[__ENV__].YYSecurityUploadListHost,
            haveAuthorized:{},
            // haveAuthorized:{member:{0:{name:'aaa',memberId:'0',},1:{name:'bbb',memberId:'1'}}}
            tableHeight:100,
            timer:null
        };
    },
    components: {},
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
        handleSelectionChange(val){
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        loaddownFile() {

        },
        removeFile() {

        },
        beforeUpload() {

        },
        uploadSuccess() {
            
        },
        importFile(){

        },
        headQuery(){
            this.$http.get(basePath + '/rest/register/form/head/query').then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.exception);
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
            this.$http.post(basePath + '/rest/register/form/query', JSON.stringify(params)).then(response =>{
                this.$YYLoading.hide();
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.exception);
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
            })
        },
        paramsQuery(){
            this.$http.post(basePath + '/rest/register/search/params/query').then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.exception);
                    return;
                }
                response.data.forEach((itemA, indexA) => {
                    itemA.value.forEach((itemB, indexB) => {
                        // (indexB === 0) && this.billStatus.push(itemB);
                        itemB.billStatusCategoryIndex = indexA;
                        itemB.billStatusCategoryKey = itemA.key;
                    });
                });
                this.searchParams = response.data;
            })

        },
        add(){
            this.$http.post(basePath + '/rest/register/form/url').then(response => {
                if(response.flag != '0') {
                    this.$YYMessage.error(response.exception);
                    return;
                }
                let formUrl = response.data.formUrl;
                window.allGlobalObj.openWindow({
                    url: formUrl
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
        checkOnlyOne(){
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
            }else{
                return true;
            }
        },
        update(){
            if(this.checkOnlyOne()){
                this.$http.post(basePath + '/rest/register/form/update',JSON.stringify({
                    processInstanceId:this.multipleSelection[0].formInstanceId
                })).then(response =>{
                    if(response.flag != '0' ){
                        this.$YYMessage.error(response.exception);
                        return;
                    }
                    let formUrl = response.data.formUrl;
                    window.allGlobalObj.openWindow({
                        url: formUrl
                    });
                })
            }
        },
        beforeDelete(){
            if(this.multipleSelection.length == 0){
                this.$YYMessage.warning({
                    content: '请选择督办事项'
                });
                return;
            }else{
                this.showDeleteDialog = true;
            }
        },
        confirmDelete(){
            let params = this.multipleSelection.map((item) => {
                return {
                    formInstanceId: item.formInstanceId,
                    processInstanceId: item.processInstanceId
                };
            })
            this.$http.post(basePath + '/rest/register/form/delete',JSON.stringify(params)).then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.desc);
                    return;
                }
                for(let item in response.data){
                    if(response.data[item].success == false){
                        this.$YYMessage.error({
                            content:response.data[item].errmsg
                        })
                    }
                }
                this.query();
            })
        },
        beforeWithdraw(){
            if(this.checkOnlyOne()){
                this.showWithdrawDialog = true;
            }
        },
        confirmWithdraw(){
            this.$http.post(basePath + '/rest/register/form/withdraw',JSON.stringify({
                formInstanceId:this.multipleSelection[0].formInstanceId,
                formId:this.multipleSelection[0].formId
            })).then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error({
                        content: response.desc
                    });
                    return;
                }
                this.$YYMessage.success({
                    content: response.desc
                });
                this.query();
            })
        },
        exportExcel(){
            let param = {};
            this.billStatus.forEach((item, index) => {
                param[item.billStatusCategoryKey] = item.key;
            });
            let query = window.encodeURIComponent(JSON.stringify(param));
            window.open(`${urlConfig[__ENV__].apiHost}/supervision/rest/register/export_excel?query=${query}&keyword=${this.searchKeyword}`);

        },
        handleShowSelectMember() {
            if(this.multipleSelection.length == 0){
                this.$YYMessage.warning({
                    content: '请选择督办事项'
                });
                return;
            }else{
                this.haveAuthorized.member = {};
                if(this.multipleSelection.length == 1){
                    this.$http.get(basePath + '/rest/empower/form/user',{params:{
                        formInsId:this.multipleSelection[0].formInstanceId
                    }}).then(response => {
                        if(response.flag==0){
                            this.selectMemberShow = true;
                            let members = [];
                            response.data.forEach((item,index)=>{
                                members.push({name:item.authorizedUserName,yhtUserId:item.yhtUserId,memberId:index});
                            })
                            let member = {...members};
                            this.haveAuthorized.member = {...members};
                            console.log(this.haveAuthorized,'haveAuthorized');
                        }
                    })
                }else{
                    this.selectMemberShow = true;
                }
            }
        },
        stopApprove(){
            if(this.multipleSelection.length == 0){
                this.$YYMessage.warning({
                    content: '请选择终止事项'
                });
                return;
            }else if(this.multipleSelection.length>1){
                this.$YYMessage.warning({
                    content: '不能大批量终止事项，请选择单项'
                });
                return;
            }else{
                let {formInstanceId = '0', processInstanceId = '0'} = this.multipleSelection[0],
                    url = basePath + '/rest/register/form/terminal' // wiki: https://wiki.upesn.com/pages/viewpage.action?pageId=9045741
                let params = JSON.stringify({
                    processInstanceId,
                    formInsId: formInstanceId,
                })
                this.$http.post(url, params).then(response => {
                    if(response.flag==0){
                        this.tableData.forEach((val,i)=>{
                            if(val.formInstanceId == formInstanceId){
                                this.tableData[i].formStatus = '已终止';
                                this.$refs.registerTable.clearSelection();
                            }
                        });
                        this.$YYMessage.success(response.desc);
                    }else{
                        this.$YYMessage.error(response.desc);
                    };
                })
            }
        },
        handleOk({member}) {
            console.log(member,'member');
            let forms = [];
            this.multipleSelection.forEach((item) =>{
                forms.push({
                    formInsId:item.formInstanceId,
                    formId:item.formId
                })
            })
            let users = [];
            for(let mem in member){
                users.push(member[mem].yhtUserId);
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
            this.$http.get(basePath + '/session/info').then(response => {
                if(response.flag == 0){
                    this.qzId = response.data.qzId;
                }
            })
        },
        beforComplete(){
            if(this.checkOnlyOne()){
                this.showTransferDialog = true;
            }
        },
        confirmComplete(){
            this.$http.post(basePath + '/rest/register/form/finish',JSON.stringify({
                processInstanceId:this.multipleSelection[0].processInstanceId,
                formInsId:this.multipleSelection[0].formInstanceId
            })).then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.desc);
                    return;
                }
                this.$YYMessage.success({
                    content:response.desc
                })
                this.query();
            })
        },
        showSelectMemberDialog(){
            this.selectedMember = [];
            this.mySelectMemberShow = true;
        },
        selectMemberSure(data){
            let member = data.member;
            this.member = member;
            for(let mem in member){
                let sm = {};
                sm.value = member[mem].id;
                sm.label = member[mem].name;
                this.selectedMember.push(sm);
            }
        },
        urge(){
            this.selectedMember = [];
            this.urgeContent = '';
            if(this.checkOnlyOne()){
                this.$http.get(basePath + '/rest/urge/target',{params:{
                    processInstanceId:this.multipleSelection[0].processInstanceId
                }}).then(response => {
                    if(response.flag != '0') {
                        this.$YYMessage.error(response.desc);
                        return;
                    }
                    this.memberData = response.data;
                    this.showUrgeDialog = true;
                })
            }
        },
        loadMoreMembers(renderLeftAreaMemberListFn){
            let data = this.memberData;
            data.forEach(item => {
                item.memberId = item.id;
                item.name = item.name;
                item.checked = false;
            });
            renderLeftAreaMemberListFn(data,false);
        },
        suggestion(inputText){
            this.urgeContent = inputText;
        },
        addUrgeSure(){
            if(!this.selectedMember.length){
                this.$YYMessage.error({
                    content:'请选择催办人员'
                })
                return;
            }
            let targets = [];
            let member = this.member;

            for(let item in member){
                let target = {};
                target.id = member[item].id;
                target.name = member[item].name;
                target.activityName = member[item].activityName;
                target.orgId = member[item].orgId;
                target.orgName = member[item].orgName;
                targets.push(target);
            }
            let params = {};
            params.formInstanceId = this.multipleSelection[0].formInstanceId;
            params.processInstanceId =this.multipleSelection[0].processInstanceId;
            params.content = this.urgeContent;
            params.targets = targets;
            this.$http.post(basePath + '/rest/urge/add',JSON.stringify(params)).then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error({
                        content:response.desc
                    })
                    return;
                }
                this.$YYMessage.success({
                    content:response.desc
                })
            })
        },
        handleMemberInputChange(){
            let selectedMemberObejct = {};
            this.selectedMember.forEach(item =>{
                selectedMemberObejct[item.value] = item.label;
            })
            for(let index in this.member){
                if(selectedMemberObejct.hasOwnProperty(index)){
                    continue;
                }else{
                    delete this.member[index];
                }
            }
        },
        sendApprove(){
            if(this.checkOnlyOne()){
                this.$http.get(basePath+'/rest/register/form/instructions',{params:{
                    formInsId:this.multipleSelection[0].formInstanceId
                }}).then(response => {
                    if(response.flag != '0' ){
                        this.$YYMessage.error(response.desc);
                        return;
                    }
                    window.open(response.data.formUrl);
                })
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
    created() {
        let arr = this.fileName.split('.');
        let fileType = arr[arr.length - 1];
        if((diffFileTypeReg).test(fileType)){
            this.fileTypeIcon = fileType;
        }
        this.headQuery();
        this.query();
        this.paramsQuery();
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