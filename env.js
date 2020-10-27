module.exports = {
    bale: {
        test: {},
        daily: {},
        smallProgramTest: {
            webpackFile: 'test',
            execShell: ''
        },
        dist: {
            NODE_ENV: 'production',
            webpackFile: 'build'
        }
    },
    ENV_dist: 'ENV_dist',
    dist: './dist'
}