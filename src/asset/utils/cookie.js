export default {
    /*
     功能：保存cookies函数
     参数：name，cookie名字；value，值
     */
    set: function (name, value) {
        var Days = 30 * 12;   //cookie 将被保存一年
        var exp = new Date();  //获得当前时间
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);  //换成毫秒
        window.document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    /*
     功能：获取cookies函数
     参数：name，cookie名字
     */
    get: function (name) {
        var arr = window.document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    /*
     功能：删除cookies函数
     参数：name，cookie名字
     */

    del: function (name) {
        var exp = new Date();  //当前时间
        exp.setTime(exp.getTime() - 1);
        var cval = this.get(name);
        if (cval != null) window.document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}