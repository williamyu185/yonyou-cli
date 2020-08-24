<style lang="less">
html,
body {
    width: 100%;
    height: 100%;
    font-size: 12px;
    background: white;
}
</style>
<template>
<!-- <keep-alive> -->
    <router-view></router-view>
<!-- </keep-alive> -->
</template>
<script>
window.allGlobalObj = window.globalYonyouCliTopLevelObj || {};
let allGlobalObj = window.allGlobalObj;
allGlobalObj.refreshList = function(event) {};
allGlobalObj.openWindow = function(data) {
    let subWindow = window.open(data.url, '_black', allGlobalObj.windowScreenMsg(data.minWidth));
    subWindow.onload = function(event) {
        subWindow.postMessage(data.sendData || '', window.location.origin);
    }
    window.removeEventListener('message', allGlobalObj.refreshList, false);
    window.addEventListener('message', allGlobalObj.refreshList, false);
    return subWindow;
};
allGlobalObj.windowScreenMsg = function(minWidth) {
    let screen = window.screen;
    let availWidth = screen.availWidth;
    minWidth = minWidth ? minWidth : availWidth*0.8;
    minWidth = (availWidth - minWidth >= 0) ? minWidth : availWidth;
    let left = (availWidth - minWidth >= 0) ? (availWidth - minWidth)/2 : 0;
    return (`width=${minWidth}, height=${screen.availHeight*0.8},top=${screen.availHeight*0.1},left=${left}`)
};
// http://test.chaoke.com:9000/?serviceCode=XTDUBAN001&refimestamp=1578448118898#/index/registerList
let paramsSplit = location.href.split('?');
allGlobalObj.locationHrefhostAndPath = paramsSplit[0];
allGlobalObj.locationHrefParams = (!!paramsSplit[1] && paramsSplit[1].split('#')[0]) || '';
allGlobalObj.callbackurl = allGlobalObj.locationHrefhostAndPath + '?' + allGlobalObj.locationHrefParams;
allGlobalObj.browserAddressUrlParams = {};
allGlobalObj.addCallbackurl = function(href) {
    let fromSource = '&fromSource=supervise';
    if (href.indexOf('?') > -1) {
        href += '&callbackurl=' + window.encodeURIComponent(allGlobalObj.callbackurl);
    } else {
        href += '?callbackurl=' + window.encodeURIComponent(allGlobalObj.callbackurl);
    }
    return (href + fromSource);
};
export default {
    created() {

    }
};
</script>
