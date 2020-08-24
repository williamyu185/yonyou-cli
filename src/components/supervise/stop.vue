<style lang="less" module="a">
</style>
<template>
    <div>
    <div class="delaySearch mb-flex mb-flex-pack-justify">
        <div class="delayName">督办终止</div>
        <div class="search">
        <YYInput v-model="searchKeyword" @on-enter="searchChange" placeholder="请输入内容">
            <div class="searchIcon" @click.stop="searchChange" slot="suffix">
                <YYIcon type="search"></YYIcon>
            </div>
        </YYInput>
        </div>
    </div>
    <div class="superviseManagerTable" :class="{'nocontent-table':tableData==0}" v-if="tableHeader.length">
        <el-table
                border
                @row-click="rowClick"
                :height="tableHeight"
                :data="tableData">
                <el-table-column
                    type="index"
                    label="序号"> 
                </el-table-column>
                <el-table-column
                    v-for="(item,index) in tableHeader"
                    :key="index"
                    :label="item.name"
                    :prop="item.key"
                    :width="changeWidth(item.name)"> 
                    <template slot-scope="scope">
                        <span v-html="scope.row[item.key]"></span>
                    </template>
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
    components: {},
    computed: {},
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
            this.$http.get(basePath + '/rest/termination/form/head/query').then(response=>{
                this.tableHeader = response.data;
            })
        },
        query(){
            this.$YYLoading.show();
            this.$http.post(basePath + '/rest/termination/form/query',JSON.stringify({
                query: {},
                keyword:this.searchKeyword,
                index:this.pageNum,
                size:this.pageSize
            })).then(response => {
                this.$YYLoading.hide();
                if(response.flag != '0') {
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
            })
        },
        changeWidth(name){
            if(name == '领导审批意见'||name =='督办发起人意见' ){
                return '230px';
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
    }
}
</script>