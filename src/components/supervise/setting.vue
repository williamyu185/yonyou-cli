<style lang="less" module="a">
.button{
    margin:20px 20px 16px 4px;
}
.operate{
    text-align: left;
    color: #3B76DD;
}
.new{
    width:24px;
    height:18px;
    font-size:12px;
    font-weight:400;
    color:rgba(40,156,242,1);
    line-height:18px;
    margin-top:8px;
    cursor:pointer;
}
.inputLine{
    margin-top:8px;
}
.container{
    height:225px;
    .equal{
        box-sizing: border-box;
        width:50px;
        height:32px;
        background:rgba(255,255,255,1);
        border-radius:2px;
        border:1px solid rgba(204,204,204,1);
        font-size: 12px;
        line-height: 22px;
        color: #bfbfbf;
        text-align: center;
        margin: 0 8px;
        padding-top: 3px;
    }
    .dustbin{
        width:15px;
        height:15px;
        background:url('../images/dustbin.png') center no-repeat;
        background-size: 15px 15px;
        margin-left:37px;
        cursor: pointer;
    }
}
</style>
<style lang="less" scoped>
    .handle-drop-sort{
        box-sizing: border-box;
        width:470px;
        height:430px;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 8px 0px rgba(74,81,93,0.25);
        border-radius:3px;
        border:1px solid rgba(78,89,104,0.19);
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 999;
        padding: 0 20px;
        .head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 47px;
            .title{
                color: #333333;
                font-size: 14px;
                font-weight: bold;
            }
            img{
                width: 14px;
                height: 14px;
                cursor: pointer;
            }
        }
        .drop-wrapper{
            height: 312px;
            overflow-y: auto;
            overflow-x: hidden;
            box-sizing: border-box;
            .drop-item{
                width: 426px;
                height: 32px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: white;
                border-radius:3px;
                border:1px solid rgba(217,217,217,1);
                margin-bottom: 8px;
                p{
                    font-size: 12px;
                    color: #333333;
                    max-width: 320px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    padding-left: 12px;
                }
                img{
                    width: 12px;
                    height: 12px;
                    padding: 10px 4px;
                    cursor: pointer;
                }
            }
        }
        .footer{
            height: 58px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .foot-btn{
                margin-right: 10px;
            }
        }
    }
</style>
<template>
    <div>
        <div class="delaySearch mb-flex mb-flex-pack-justify">
            <div class="delayName">督办单设置</div>
            <div class="mb-flex">
                <div class="search">
                    <!-- <YYInput v-model="searchKeyword" @on-enter="searchChange(searchKeyword)" placeholder="请输入内容">
                        <div class="searchIcon" @click.stop="searchChange(searchKeyword)" slot="suffix">
                            <YYIcon type="search"></YYIcon>
                        </div>
                    </YYInput> -->
                </div>
                <YYButton :class="[a.button]" type="primary" @click="mappingUrl">数据对照</YYButton>
                <YYButton :class="[a.button]" type="primary" @click="mappingFlow">流程对照</YYButton>
            </div>
        </div>
        <div class="superviseManagerTable">
            <el-table
                v-if="pageData.length"
                border
                :data="pageData">
                <el-table-column
                    prop="formTempName"
                    :show-overflow-tooltip="true"
                    label="文单名称">
                </el-table-column>
                <el-table-column
                    prop="formatUpdateTime"
                    :show-overflow-tooltip="true"
                    label="修改时间">
                </el-table-column>
                <el-table-column
                :show-overflow-tooltip="true"
                label="操作"
                width="160">
                    <template slot-scope="scope">
                        <div :class="[a.operate]">
                            <span @click.stop="edit(scope.row.id)">编辑</span>
                            <span>&nbsp;&nbsp;</span>
                            <span v-if="!scope.row.formId" @click.stop="enable(scope.row.formTempId)">启用</span>
                            <span>&nbsp;&nbsp;</span>
                            <span @click.stop="openSortDialog(scope.$index,pageData)" :class="[a.operate]">排序</span>
                            <!-- <span @click.stop="disable(scope.row.id)">禁用</span> -->
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <YYEmpty v-if="showEmpty" text="暂无数据" type="data" class="superviseYYEmpty"></YYEmpty>
        </div>
        <!-- <div class="delayPagination">
            <YYPagination
                v-if="pageData.length"
                @on-page-size-change="pageSizeChange"
                @on-change="pageNumChange"
                align="right"
                :current="currentPage"
                :border="true"
                :total="totalNum"
                :pageSize="pageSize"
                :showPagerContent="true"
                :show-sizer-input="true"
                :showTotal="true"
                :show-sizer="true"
                :showElevator="true">
            </YYPagination>
        </div> -->
        <YYDialog 
          title="流程对照"  
          closeable
          v-model="showDialog"
          width="438px"
          height="324px"
          @on-cancel="closeDialog"
          @on-ok="confirmDialog">
          <div :class="[a.container]">
                <div v-for="(item,index) in myActivedStatus" :key="index"  :class="[a.inputLine]" class="mb-flex  mb-flex-align-center">
                    <YYSelect
                        style="width: 140px" v-model="item.formStatus">
                        <YYOption v-for="list in item.billStatus" :key="list.formStatus" :value="list.formStatus">
                            {{list.statusName}}
                        </YYOption>
                    </YYSelect>
                    <div :class="[a.equal]">=</div>
                    <YYSelect
                        style="width: 140px" v-model="item.activityId">
                        <YYOption v-for="list in item.activityStatus" :key="list.activityId" :value="list.activityId">
                            {{list.activityName}}
                        </YYOption>
                    </YYSelect>
                    <div :class="[a.dustbin]" @click="deleteOneItem(index)"></div>
                </div>
            <div v-show="addNewShow" :class="[a.new]" @click="addNew">新增</div>
          </div>
        </YYDialog>
        <div v-if="showSortDialog" class="handle-drop-sort">
            <div class="head">
                <p class="title">列表字段顺序</p>
                <img :src="closeIcon" @click="showSortDialog = false">
            </div>
            <div class="drop-wrapper">
                <draggable v-model="headSortArr" :options="{scroll: true,animation: 0}">
                    <div class="drop-item" v-for="(item,index) in headSortArr" :key="index">
                        <p>{{item.name}}</p>
                        <div class="right-menu">
                            <img v-if="index!=0" @click="sortUpDown('up',item)" :src="upArrow">
                            <img v-if="headSortArr.length>1 && index!=headSortArr.length-1" :src="downArrow" @click="sortUpDown('down',item)">
                            <img v-if="headSortArr.length>1" :src="dropMenu">
                        </div>
                    </div>
                </draggable>
            </div>
            <div class="footer">
                <YYButton 
                    class="foot-btn"
                    @click="showSortDialog = false">
                    取消
                </YYButton>
                <YYButton 
                    type="primary" 
                    @click="sortConfirm">
                    确定
                </YYButton>
            </div>
        </div>
    </div>
</template>
<script>
import timeFormat from '../../asset/utils/timeFormat.js';
import upArrow from '../images/top-arrow.png';
import downArrow from '../images/down-arrow.png';
import dropMenu from '../images/drop-menu.png';
import closeIcon from '../images/close.png'
import draggable from 'vuedraggable'
let basePath = '/supervision';
export default {
    data () {
        return {
            searchKeyword:'',
            currentPage: 1,
            pageSize: 20,
            totalNum: 0,
            pageData:[],
            pageDataSearch:[],
            showDialog:false,
            paramsList:'',
            billStatus:[],
            activityStatus:[],
            myActivedStatus:[],
            showEmpty:false,
            addNewShow:false,
            showSortDialog:false,
            headSortArr:[],
            upArrow:upArrow,
            downArrow:downArrow,
            dropMenu:dropMenu,
            closeIcon:closeIcon
        };
    },
    components: {draggable},
    methods: {
        pageSizeChange(pageSize) {
            this.currentPage = 1;
            this.pageSize = pageSize;
        },
        pageNumChange(currentPage) {
            this.currentPage = currentPage;
        },
        queryAll(){
            this.$YYLoading.show();
            this.$http.get(basePath + '/set/form/query').then(response => {
                this.$YYLoading.hide();
                if(response.flag != '0') {
                    this.$YYMessage.error(response.desc);
                    return;
                }
                let data = response.data;
                data.forEach((item,index) => {
                    // let updateTimeConverted = timeConvert.convertDateToStr(item.updateTime,'yyyy-MM-dd hh:mm');
                    // this.pageDataSearch.push(Object.assign({},item,{updateTimeConverted : updateTimeConverted}));
                    item.formatUpdateTime = timeFormat.convertDateToStr(item.createTime, 'yyyy-MM-dd hh:mm');;
                });
                this.pageData = data;
                if(this.pageData.length){
                    this.showEmpty = false;
                }else {
                    this.showEmpty = true;
                }
            })
        },
        enable(index){
            this.$http.get(basePath + '/set/form/enable',{params:{templateId:index}}).then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.desc);
                    return;
                }
                let formUrl = response.data.formUrl;
                window.allGlobalObj.openWindow({
                    url: formUrl
                });
            })
        },
        disable(index){
            this.$http.get(basePath + '/set/form/disable',{params:{id:index}}).then(response =>{
                if(response.flag != '0'){
                    this.$YYMessage.error(response.desc);
                    return;
                }
            })
        },
        edit(index){
            this.$http.get(basePath + '/set/form/edit',{params:{id:index}}).then(response =>{
                if(response.flag != '0') {
                    this.$YYMessage.error(response.desc);
                    return;
                }
                let formUrl = response.data.formUrl;
                window.allGlobalObj.openWindow({
                    url: formUrl
                });
            })
        },
        mappingUrl(){
            this.$http.get(basePath + '/set/form/mappingUrl').then(response =>{
                let formUrl = response.data.formUrl;
                window.allGlobalObj.openWindow({
                    url: formUrl
                });
            })
        },
        getAll(){
            return new Promise((resolve,reject) => {
                this.$http.get(basePath + '/rest/activity/all').then(response =>{
                    if(response.flag != '0'){
                        this.$YYMessage.error(response.desc);
                        return;
                    }
                    resolve(response.data);
                })
            })
        },
        getValiable(){
            return new Promise((resolve,reject) => {
                this.$http.get(basePath + '/rest/activity/vailable').then(response =>{
                    if(response.flag != '0'){
                        this.$YYMessage.error(response.desc);
                        return;
                    }
                    this.addNewShow = true;
                    resolve(response.data);
                })
            })
        },
        mappingFlow(){
            //两个请求合并为一个，用于YYSelect展示
            this.showDialog = true;
            Promise.all([this.getAll(),this.getValiable()]).then(result => {
                let activedStatus = [];
                this.billStatus = result[0].billStatus;
                this.activityStatus = result[0].activityStatus;
                activedStatus = result[1];
                if(activedStatus){
                    activedStatus.forEach((item) => {
                        let formStatus = item.formStatus;
                        let statusName = item.statusName;
                        item.activityVOList.forEach((itemA) => {
                            let activityId = itemA.activityId;
                            let activityName = itemA.activityName;
                            this.myActivedStatus.push({
                                activityId:activityId,
                                activityName:activityName,
                                formStatus:formStatus,
                                statusName:statusName,
                                billStatus:this.billStatus,
                                activityStatus:this.activityStatus
                            })
                        })
                    })
                }
            })
        },
        addNew(){
            this.myActivedStatus.push({
                billStatus:this.billStatus,
                activityStatus:this.activityStatus,
                activityId:'',
                formStatus:'',
            });
        },
        deleteOneItem(index){
            this.myActivedStatus.splice(index,1);
        },
        closeDialog(){
            this.myActivedStatus = [];
            this.addNewShow = false;
        },
        //保存流程映射
        confirmDialog(){
            this.addNewShow = false;
            //把YYSelect中数据保存到params中
            let params = [];
            let myActivedStatusCopy = this.myActivedStatus;
            this.myActivedStatus = [];
            myActivedStatusCopy.forEach((item,index) => {
                let formStatus = item.formStatus;
                let statusName = '';
                item.billStatus.forEach(key => {
                    if(key.formStatus == formStatus){
                        statusName = key.statusName;
                    }
                })
                params.push({
                    formStatus,
                    statusName,
                })
                params[index].activityVOList = [];
                let activityId = item.activityId;
                let activityName = '';
                item.activityStatus.forEach(value => {
                    if(value.activityId == activityId){
                        activityName = value.activityName;
                    }
                })
                params[index].activityVOList.push({
                    activityId,
                    activityName
                })
            })
            //用temp对象把params数组转为需要的格式
            let temp = {};
            params.forEach((item) => {
                let tempFormStatus = String(item.formStatus);

                if(temp.hasOwnProperty(tempFormStatus)){
                    temp[tempFormStatus] = temp[tempFormStatus].concat(item.activityVOList);
                }else{
                    temp[tempFormStatus] = item.activityVOList;
                }
            })
            
            let newParams = [];
            for(let key in temp){
                let formStatus = '';
                formStatus = parseInt(key);
                let statusName = '';
                if(formStatus){
                    this.billStatus.forEach((item) => {
                        if(item.formStatus == formStatus){
                            statusName = item.statusName;
                        }
                    })
                    // statusName = this.billStatus[formStatus].statusName;
                }
                
                let activityVOList = temp[key];
                newParams.push({
                    formStatus,
                    statusName,
                    activityVOList,
                })
            }
            
            this.$http.post(basePath + '/rest/activity/save',JSON.stringify(newParams)).then(response =>{
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.desc);
                    return;
                }
                this.$YYMessage.success({
                    content:response.desc
                })
            })
        },
        openSortDialog(index,data){
            this.$YYLoading.show();
            this.$http.get(basePath + '/set/form/head/info',{params:{
                formTempId:data[index].formTempId
            }}).then((res)=>{
                if(res.flag == 0){
                    this.headSortArr = res.data;
                    this.$YYLoading.hide();
                    this.showSortDialog = true;
                }else{
                    this.showSortDialog = false;
                    this.$YYLoading.hide();
                    this.$YYMessage.error("获取数据失败!")
                }
            })
        },
        sortUpDown(type,item){//向上向下排序
            let current,
                pre,
                after,
                index,
                itemIndex;
            this.headSortArr.forEach((val,i)=>{
                if(item.key == val.key){
                    pre = this.headSortArr[i-1];
                    current = this.headSortArr[i];
                    after = this.headSortArr[i+1];
                    index = i;
                }
            });
            if(type=='up'){
                this.headSortArr.splice(index,1,pre);
                this.headSortArr.splice(index-1,1,current);
            }else{
                this.headSortArr.splice(index,1,after);
                this.headSortArr.splice(index+1,1,current);
            };
        },
        sortConfirm(){
            this.$YYLoading.show();
            this.headSortArr.forEach((val,i)=>{
                val.order = i;
            });
            this.$http.post(basePath + '/set/form/head/info',JSON.stringify(this.headSortArr)).then((res)=>{
                if(res.flag == 0){
                    this.$YYLoading.hide();
                    this.$YYMessage.success("修改成功!")
                }else{
                    this.$YYLoading.hide();
                    this.$YYMessage.error("修改失败!")
                };
                this.showSortDialog = false;
            })
        }
    },
    created(){
        this.queryAll();
        window.allGlobalObj.refreshList = (event) => {
            let response = event.data;
            if(response.type && response.type == 'supervise' && response.data && response.data.isRefresh) {
                this.queryAll();
            }
        };
    }
}
</script>