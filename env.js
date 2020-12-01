module.exports = {
    // 配置需要打包的各环境
    bale: {
        // bale对象下的各key值，等价执行npm run test
        test: {},
        daily: {},
        smallProgramTest: {
            // 寻找webpack目录下的配置文件，等价执行webpack --progress --config ./webpack/test.js。默认值为bale对象下对应的key值
            webpackFile: 'test',
            // 如webpackFile、NODE_ENV等配置项无法满足实际业务需求，配置此字段将优先执行该配置项自定义shell语句，其他配置项将无效
            execShell: ''
        },
        dist: {
            // 环境变量，等价执行cross-env NODE_ENV=production。默认值为bale对象下对应的key值
            NODE_ENV: 'production',
            webpackFile: 'build'
        }
    },
    // 将bale字段配置的各环境打出来的输出包放入到此目录下，并对此目录做zip压缩，只限文件夹名称，不能加类似./等的文件路径符号
    ENV_dist: 'ENV_dist',
    // 例如执行npm run daily时，解压ENV_dist.zip压缩包后，将根据shell执行语句中的--copyOneOfENVToDist=daily配置项，从ENV_dist解压目录中，把daily目录下的所有文件复制到此配置文件目录下
    dist: './dist'
};