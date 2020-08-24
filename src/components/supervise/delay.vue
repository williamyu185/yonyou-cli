<style lang="less" module="a">
</style>
<template>
    <div>
        <div class="delaySearch mb-flex mb-flex-pack-justify">
        <div class="delayName">督办延期</div>
            <div class="search">
                <YYInput v-model="searchKeyword" @on-enter="searchChange" placeholder="请输入内容">
                    <div class="searchIcon" @click.stop="searchChange" slot="suffix">
                        <YYIcon type="search"></YYIcon>
                    </div>
                </YYInput>
            </div>
        </div>
        <div class="superviseManagerTable" :class="{'nocontent-table':tableData==0}" v-if="!!tableHeader">
            <el-table
                border
                :data="tableData"
                @row-click="rowClick"
                :height="tableHeight"
            >
                <el-table-column
                    type="index"
                    label="序号"> 
                </el-table-column>
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
                v-if="tableData.length&&tableHeader.length"
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
let basePath = '/supervision';
export default {
    data () {
        return {
            searchKeyword:'',
            tableData:[],
            pageNum: 1,
            pageSize: 20,
            totalNum: 0,
            tableHeader:[],
            showEmpty:false,
            tableHeight:100,
            timer:null
        };
    },
    components: {
    },
    methods: {
        rowClick(row) {
            this.$router.push({
                name: 'registerDetail',
                params: {
                    data: row
                }
            });
        },
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
        headQuery(){
            this.$http.post(basePath + '/rest/extension/form/head/query').then(response=>{
                this.tableHeader = response.data;
            })
        },
        query(){
            this.$YYLoading.show();
            let params = JSON.stringify({
                query:{},
                keyword:this.searchKeyword,
                index:this.pageNum,
                size:this.pageSize,
            });
            this.$http.post(basePath + '/rest/extension/form/query',params).then(response=>{
                this.$YYLoading.hide();
                if(response.flag != '0' ){
                    this.$YYMessage.error(response.desc);
                    return;
                }
                this.tableData = response.data.data;
                if(!this.tableData.length){
                    this.showEmpty = true;
                }else{
                    this.tableHeight = document.body.clientHeight - 200;
                };
                this.totalNum = response.data.total;
            })
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
    }
}

</script>