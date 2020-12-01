# 一、安装与使用
### 1.全局安装：npm install -g coordination-cli
### 2.全局指令使用：coordination-cli \<yourProjectName\>。如果不传入自定义项目名，默认项目名称为coordination-cli
### 3.指令集说明（将根据项目实际开发需求，陆续扩展指令集）
#### 3.1）使用：coordination-cli \<yourProjectName\> [options]
#### 3.2）第一个参数如果不以 - 符开头，将认为是即将创建项目的项目名，否则将采用coordination-cli作为默认项目名。
#### 3.3）选项：
##### 3.3.1）-i，--install：创建完项目后将执行npm install为该项目安装node_modules包。
##### 3.3.1）--env：将env.js中bale字段配置的所有环境打包到一个zip压缩包中(npm run publishAll在本机环境中把env.js配置的各环境打包到本地，防止在运维环境或其他环境由于node版本等原因导致打包过程中发生各种异常)。
#### 3.4）如因网络原因，执行指令后项目长时间未创建，请直接下载源码zip包。
#### 3.5）env.js各配置项解释：
```
{
    // 配置需要打包的各环境
    bale: {
        // 等价执行npm run test
        test: {},
        daily: {},
        smallProgramTest: {
            // 寻找webpack目录下的配置文件，等价执行webpack --progress --config ./webpack/test.js
            webpackFile: 'test',
            // 如webpackFile、NODE_ENV如法满足需求，配置此字段将执行自定义shell执行语句。
            execShell: ''
        },
        dist: {
            // 环境变量，等价执行cross-env NODE_ENV=production
            NODE_ENV: 'production',
            webpackFile: 'build'
        }
    },
    // 将bale字段配置的各环境打出来的输出包放入到此目录下，并对此目录做zip压缩，只限文件夹名称，不能加类似./等的文件路径符号
    ENV_dist: 'ENV_dist',
    // 例如执行npm run daily时，解压ENV_dist.zip压缩包后，将根据shell执行语句中的--copyOneOfENVToDist=daily配置项，从ENV_dist解压目录中，把daily目录下的所有文件复制到此配置文件目录下
    dist: './dist'
}
```
#### 3.6）--copyOneOfENVToDist：一般运维服务器执行此配置项对应的脚本执行语句(例如npm run daily)，从解压的目录中把daily目录下的所有文件复制到dist文件目录下
# 二、相关规范与配置项解读
### 1.全局变量
#### 1.1）项目中唯一的顶级全局对象是window.globalUniquenessCoordinationCliTopLevelObj，严禁在window下再添加其他全局对象，所有需要暴露的全局对象全部添加到window.globalUniquenessCoordinationCliTopLevelObj对象下。
#### 1.2）由于历史原因，保留window.WEB_DIWORK_GLOBAL_CONFIG全局对象，禁止对该对象做任何操作。
#### 1.3）为了防止乱用全局变量和全局变量相互冲突，在各文件使用任何全局变量前，必须在src/components/index文件中的globalUniquenessCoordinationCliTopLevelObj对象上进行初始化注册，严禁在没有注册的情况下，在其他文件中直接定义并使用全局变量。
##
### 2.package.json中的环境变量
#### 2.1）小程序包环境变量以smallProgram开头，全局变量window.globalUniquenessCoordinationCliTopLevelObj.isSmallProgram用来标识当前开发包是否是小程序输出包，依据此全局变量，可作出相应的条件判断，实现H5和小程序开发在业务逻辑和调用桥接时的区别化处理，同时实现H5和小程序共用一套代码。
##
### 3.关于element-ui的使用
#### 3.1）element-ui是饿了么开发的web端ui库，如想使用该组件库，可在src/main.js文件中取消掉相关代码注释，即可开箱使用。
##
### 4.html布局性结构
#### 4.1）src/components/index.vue文件用于html结构化布局，为了实现路由的扩展性，严禁对src/view/index.vue文件做任何改动。
##
### 5.css样式规范
#### 5.1）全局样式统一写在src/components/index.vue文件的:global {}中，必须做好css命名空间，特别是覆盖其他ui库组件的样式。
##
### 6.私有化部署前端解决方案
#### 6.1）src/config/configReplace.js是接口域名替换文件，在项目私有化部署的过程中，需在后台开发人员配合下，在执行npm run private指令时，加入勾子函数，在打包结束后替换此文件。该解决方案的目的在于只维护一套代码就能实现公网与不同客户私有化服务器的代码部署。
#### 6.2）任何需要使用url或接口，必须统一写到src/config/configReplace.js文件文件中，通过import/require引入src/config/config.js进行使用，不得将url或接口硬编码写死写到各vue文件中。
##
### 7.脚手架风险提示
#### 7.1）此脚手架工具在本地环境测试通过后，会陆续应用在新项目中用以获得更加充分的测试，不断更新与丰富，希望能够与大家一同携手让它更加完善与易用。
##
### 8.其他
#### 8.1）代码书写规范、脚手架目录结构、项目开发规范，略。
#### 8.2）限于作者技术水平，难免有错误和考虑不周的地方，如发现相关错误和优化点，请给我提issue，我将尽快解决。