module.exports = {
    // 日常操作时，是禁止将测试环境分支代码合并进任何非测试环境分支的
    // 此字段为各测试环境分支名，比如测试环境分支名为test，配置字段为['test']后
    // 当在任何非测试分支（比如master）执行git pull origin test或git merge test时，都会给出醒目的提示警告
    testBranch: ['test']
};