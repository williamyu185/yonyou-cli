<style lang="less" module="a">
.speedOfProgress {
    & > div {
        padding: 20px;
        border-bottom: 1px solid #F0F0F0;
    }
    & > div:last-of-type {
        border-bottom: 0;
    }
    .speedOfProgressItem {
        & > div {
            min-height: 17px;
            line-height: 17px;
            margin-bottom: 8px;
            font-size: 12px;
            span:first-of-type {
                color: #333;
            }
            span:last-of-type {
                color: #333;
            }
        }
        iframe {
            width: 100%;
            height: 300px;
        }
    }
}
</style>
<template>
<div :class="[a.speedOfProgress]">
    <div :class="[a.speedOfProgressItem]" v-for="(item, index) in progressReportList" :key="index">
        <div>
            <span>汇报人：</span>
            <span>{{item.user.userName}}</span>
        </div>
        <div>
            <span>汇报单位：</span>
            <span>{{item.user.orgName}}</span>
        </div>
        <div>
            <span>汇报部门：</span>
            <span>{{item.user.deptName}}</span>
        </div>
        <div v-for="(itemA, i) in item.formData" :key="i">
            <div v-show="itemA.name && itemA.value && itemA.type != 'SecretFile'">
                <span>{{itemA.name}}：</span>
                <span>{{itemA.value}}</span>
            </div>
            <!-- <div v-if="itemA.type == 'Progress'">
                <YYProgress></YYProgress>
            </div> -->
            <div v-show="itemA.type == 'SecretFile'">
                <YYSecurityUploadList
                    :host="YYSecurityUploadListHost"
                    objectName="upesn_approve"
                    :objectId="itemA.value">
                </YYSecurityUploadList>
            </div>
        </div>
    </div>
    <YYEmpty v-if="isDataEmpty" text="暂无数据" type="data" class="superviseYYEmpty"></YYEmpty>
</div>
</template>
<script>
import configUrl from '../../config/config.js';
import timeFormat from '../../asset/utils/timeFormat.js';

let basePath = '/supervision';
export default {
    data() {
        return {
            progressReportList: [],
            YYSecurityUploadListHost: configUrl[__ENV__].YYSecurityUploadListHost,
            timeFormat,
            isDataEmpty: false
        };
    },
    props: {
        detailMsg: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    computed: {

    },
    components: {

    }, 
    methods: {
        progressReport() {
            this.$YYLoading.show();
            this.$http.get(basePath + '/rest/handle/form/reported', {
                    params: {
                        formInstanceId: window.allGlobalObj.browserAddressUrlParams.formInstanceId || this.detailMsg.formInstanceId
                    },
            }).then((response) => {
                this.$YYLoading.hide();
                if(response.flag != '0') {
                    this.$YYMessage.error(response.desc);
                    return;
                }
                let data = response.data;
                this.progressReportList = data;
                this.isDataEmpty = !data.length;
            });
        },
    },
    created() {
        this.progressReport();
    },
}
</script>