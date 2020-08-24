<style lang="less" module="a">
.empower {
    .superviseManagerPageArea {
        margin-top: 30px;
    }
    .width96 {
        width: 96%;
    }
    .width100 {
        width: 100%;
    }
}
</style>
<template>
<div :class="[a.empower]">
    <div class="superviseManagerTable width96" id="templatePresetTable" :class="[{width100: isWidth100},{'nocontent-table':tableData==0}]">
        <el-table
            border
            :data="empowerList">
            <el-table-column
                prop="authorizedUserName"
                label="授权人">
            </el-table-column>
            <el-table-column
                prop="authorizedDeptName"
                :show-overflow-tooltip="true"
                label="所在部门">
            </el-table-column>
            <el-table-column
                prop="position"
                :show-overflow-tooltip="true"
                label="职务">
            </el-table-column>
            <el-table-column
                width="170"
                prop="authorizedDate"
                :show-overflow-tooltip="true"
                label="授权日期">
            </el-table-column>
        </el-table>
        <YYEmpty v-if="isDataEmpty" text="暂无数据" type="data" class="superviseYYEmpty"></YYEmpty>
    </div>
    <!-- <div :class="[a.superviseManagerPageArea]" v-if="empowerList.length">
        <YYPagination
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
    </div> -->
</div>
</template>
<script>
import timeFormat from '../../asset/utils/timeFormat.js';

let basePath = '/supervision';
export default {
    data() {
        return {
            pageNum: 1,
            totalNum: 1,
            pageSize: 10,
            empowerList: [],
            isWidth100: false,
            isDataEmpty: false,
            timeFormat
        };
    },
    computed: {

    },
    components: {

    },
    props: {
        detailMsg: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        empower() {
            this.$YYLoading.show();
            this.isWidth100 = false;
            this.$http.get(basePath + '/rest/empower/form/user', {
                params: {
                    formInsId: window.allGlobalObj.browserAddressUrlParams.formInstanceId || this.detailMsg.formInstanceId
                }
            }).then((response) => {
                this.$YYLoading.hide();
                if(response.flag != '0') {
                    this.$YYMessage.error(response.desc);
                    return;
                }
                let data = response.data;
                // data.forEach((item, index) => {
                //     item.createTime = this.timeFormat.convertDateToStr(item.createTime, 'yyyy-MM-dd hh:mm');
                // });
                this.empowerList = data;
                this.isDataEmpty = !data.length;
                this.isWidth100 = true;
                // this.pageNum = data.size;
                // this.totalNum = data.total;
            });
        },
        // pageSizeChange(pageSize) {
        //     this.pageNum = 1;
        //     this.pageSize = pageSize;
        //     this.empower();
        // },
        // pageNumChange(pageNum) {
        //     this.pageNum = pageNum;
        //     this.empower();
        // },
    },
    created() {
        this.empower();
    },
}
</script>