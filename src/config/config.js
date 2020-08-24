
module.exports = {
  development: {
    host: 'http://test.openapi.chaoke.com:9000', //当前域名

    // apiHost: 'http://ys.imp-test.pub.caep', //后端接口域名  
    apiHost: 'http://ys.imp.pub.caep',
    location: 'http://test.openapi.chaoke.com:9000',
    previewImages: 'https://ec.diwork.com',
    headJump: 'http://web.chaoke.com:91', //跳转到友空间
    YYSpaceApiHost: 'http://web.api.chaoke.com:6062', //友空间接口
    javaHost: 'http://web.chaoke.com:6058', //JAVA接口域名
    YYSecurityUploadListHost: 'http://ezone.imp.pub.caep',
    fileExport:'http://openapi.chaoke.com:6059'
  },
  test: {
        host: 'https://mz-daily.yyuap.com',
        apiHost: 'https://ys-daily.yyuap.com',
        location: 'https://mz-daily.yyuap.com/static/templateCenter/index.html',
        previewImages: 'https://nec-daily.yyuap.com',
        headJump: 'http://web.chaoke.com:91',
        YYSpaceApiHost: 'http://web.api.chaoke.com:6062',
        javaHost: 'http://web.chaoke.com:6058',
        YYSecurityUploadListHost: 'http://ezone.imp.pub.caep',
        fileExport:'https://openapi-daily.yyuap.com'
  },
  daily: {
    host: 'http://172.20.1.177:93',
    apiHost: 'http://ys.chaoke.com:91',
    location: 'http://172.20.1.177:93/static/templateCenter/index.html',
    previewImages: 'https://ec.diwork.com',
    headJump: 'http://web.chaoke.com:91',
    YYSpaceApiHost: 'http://web.api.chaoke.com:6062',
    javaHost: 'http://web.chaoke.com:6058',
    YYSecurityUploadListHost: 'http://ezone.imp.pub.caep',
    fileExport:'http://172.20.1.177:6059'
  },
  prevProduction: {
    host: 'https://m-pub.esn.ren',
    apiHost: 'https://open.esn.ren',
    location: 'https://m-pub.esn.ren/static/templateCenter/index.html',
    previewImages: 'https://ec.diwork.com',
    headJump: 'https://pub.esn.ren',
    YYSpaceApiHost: 'https://web-api.esn.ren',
    javaHost: 'https://ezone.esn.ren',
    YYSecurityUploadListHost: 'http://ezone.imp.pub.caep',
    fileExport:'https://open.esn.ren'
  },
  production: {
    host: 'https://mz.diwork.com',
    apiHost: 'https://openapi.diwork.com',
    location: 'https://mz.diwork.com/static/templateCenter/index.html',
    previewImages: 'https://ec.diwork.com',
    headJump: 'https://ec.diwork.com',
    YYSpaceApiHost: 'https://web-api.diwork.com',
    javaHost: 'https://ezone.diwork.com',
    YYSecurityUploadListHost: 'http://ezone.imp.pub.caep',
    fileExport:'https://openapi.diwork.com'
  },
}
