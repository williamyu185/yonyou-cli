<style lang="less" module="a">
.urgeRecord {
    font-size: 13px;
    color: #333;
    & > div {
        padding: 20px 20px 12px 20px;
        border-bottom: 1px solid #F0F0F0;
    }
    & > div:last-of-type {
        border-bottom: 0;
    }
    .urgeItem {
        position: relative;
        .introduce {
            margin: 0 60px 8px 0;
        }
        .reply {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #3B70CE;
            font-size: 12px;
            cursor: pointer;
        }
        .content {
            width: 100%;
        }
        .replyTextarea {
            width: 100%;
            margin-bottom: 8px;
        }
        button {
            float: right;
            margin-top: 8px;
        }
        .maxInputFontNum {
            position: relative;
            .limitFontNum {
                position: absolute;
                bottom: 8px;
                right: 16px;
                color: #999;
                font-size: 12px;
            }
        }
        .reply + .comment {
            margin-top: 6px;
            border-top: 1px dashed #D9D9D9;
        }
        .comment {
            padding-left: 20px;
            width: 100%;
        }
        .commentItem {
            font-size: 12px;
            margin-top: 16px;
            & > div {
                margin-bottom: 8px;
            }
            & > div:last-of-type {
                margin-bottom: 0;
            }
            span:first-of-type {
                color: #666;
            }
            span:last-of-type {
                color: #333;
            }
        }
    }
    .printing {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 14px 0 14px 16px;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
        background: white;
    }
    .printPaddingBottom {
        padding-bottom: 64px;
    }
}
</style>
<template>
<div :class="[a.urgeRecord, a.printPaddingBottom]">
    <div :key="item.id" :class="[a.urgeItem]" class="mb-flex mb-flex-wrap" v-for="(item, index) in ugerRecordList">
        <div :class="[a.introduce]">
            <span>催办人：</span>
            <span>{{item.fromUserName}}</span>
        </div>
        <div :class="[a.introduce]">
            <span>催办时间：</span>
            <span>{{timeFormat.convertDateToStr(item.createTime, 'yyyy-MM-dd hh:mm')}}</span>
        </div>
        <div :class="[a.introduce]">
            <span>被催办单位/人员：</span>
            <span v-for="(itemA, indexA) in item.targets">{{itemA.name + '(' + itemA.orgName + ')' + (indexA != (item.targets.length - 1) ? ', ' : '')}}</span>
        </div>
        <div :class="[a.introduce, a.content]">
            <span>催办内容：</span>
            <span>{{item.content}}</span>
        </div>
        <div :class="[a.reply]"  v-if="item.canReply" @click.stop="item.isReplyShow = !item.isReplyShow; item.replyText = ''">回复</div>
        <div :class="[a.replyTextarea]" v-show="item.isReplyShow">
            <div :class="[a.maxInputFontNum]">
                <YYInput
                    type="textarea"
                    :maxlength="200"
                    @on-change="textareaInputing(item)"
                    :autosize="{rows: 4, maxRows: 4}"
                    v-model="item.replyText">
                </YYInput>
                <div :class="[a.limitFontNum]">{{item.replyNum}}/200</div>
            </div>
            <YYButton
                type="primary"
                size="small"
                @click.stop="replyUger(item)"
                >
                <span>回复</span>
            </YYButton>
        </div>
        <div :class="[a.comment]">
            <div :class="[a.commentItem]" :key="itemA.id" v-for="(itemA, indexA) in item.replays">
                <div>
                    <span>回复人：</span>
                    <span>{{itemA.replayUserName}}</span>
                </div>
                <div>
                    <span>回复内容：</span>
                    <span>{{itemA.replayContent}}</span>
                </div>
                <div>
                    <span>回复时间：</span>
                    <span>{{timeFormat.convertDateToStr(itemA.createTime, 'yyyy-MM-dd hh:mm')}}</span>
                </div>
            </div>
        </div>
    </div>
    <YYEmpty v-if="isDataEmpty" text="暂无数据" type="data" class="superviseYYEmpty"></YYEmpty>
    <div :class="[a.printing]">
        <YYButton 
            type="primary"
            size="large"
            @click="printing">
            <span>打印</span>
        </YYButton>
    </div>
</div>
</template>
<script>
import timeFormat from '../../asset/utils/timeFormat.js';

let basePath = '/supervision';
export default {
    data() {
        return {
            ugerRecordList: [],
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
        textareaInputing(item) {
            item.replyNum = item.replyText.length;
        },
        ugerRecord() {
            this.$YYLoading.show();
            let detailMsg = this.detailMsg;
            let browserAddressUrlParams = window.allGlobalObj.browserAddressUrlParams;
            this.$http.get(basePath + '/rest/urge/query', {
                    params: {
                        formInstanceId: browserAddressUrlParams.formInstanceId || detailMsg.formInstanceId,
                        processInstanceId: browserAddressUrlParams.processInstanceId || detailMsg.processInstanceId
                    },
            }).then((response) => {
                this.$YYLoading.hide();
                if(response.flag != '0') {
                    this.$YYMessage.error(response.desc);
                    return;
                }
                let data = response.data;
                data.forEach((item, index) => {
                    item.isReplyShow = false;
                    item.replyText = '';
                    item.replyNum = 0;
                });
                this.ugerRecordList = data;
                this.isDataEmpty = !data.length;
                console.log('hhhh');
            });
        },
        replyUger(item) {
            let params = JSON.stringify({
                        urgeId: item.id,
                        replayContent: item.replyText,
                        secret: item.secret
                });
            this.$http.post(basePath + '/rest/urge/replay', params).then((response) => {
                if(response.flag != '0') {
                    this.$YYMessage.error(response.desc);
                    return;
                }
                this.ugerRecord();
            });
        },
        printing() {

        },
    },
    created() {
        this.ugerRecord();
    },
}
</script>