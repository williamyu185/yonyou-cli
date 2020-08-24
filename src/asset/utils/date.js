export default {
    timeTransform(val, vm) {
        let today = new Date();
        let todayYear = today.getFullYear();
        let todayMonth = today.getMonth() + 1;
        let todayDay = today.getDate();
        let todayWeek = today.getDay() || 7;
        //获取当天零时时间
        let todayTimeStamp = new Date(todayYear, todayMonth - 1, todayDay).getTime();
        //获取这一周周一的零时时间
        let weekMondayTimeStamp = new Date(todayYear, todayMonth - 1, todayDay + 1 - todayWeek).getTime();
        val = parseInt(val);
        let date = new Date(val);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let dayWeek = date.getDay() || 7;
        if(val >= todayTimeStamp) {
            return vm.$t('today');
        }else if (val < todayTimeStamp && val > weekMondayTimeStamp) {
            // 本周内的
            let str = '';
            switch (dayWeek) {
                case 1:
                    str = vm.$t('monday');
                    break;
                case 2:
                    str = vm.$t('tuesday');
                    break;
                case 3:
                    str = vm.$t('wednesday');
                    break;
                case 4:
                    str = vm.$t('thursday');
                    break;
                case 5:
                    str = vm.$t('friday');
                    break;
                case 6:
                    str = vm.$t('saturday');
                    break;
                default:
                    str = vm.$t('sunday');
            }
            return str;
        }
        month = month >= 10 ? month: '0' + month;
        day = day >= 10 ? day: '0' + day;
        return month + '-' + day;
    },
    timeConvert(date) {
        let year = date.getFullYear() + '';
        let month = date.getMonth() + 1 + '';
        let day = date.getDate() + '';
        return (year + '-' + (month.length == 1 ? (0 + month) : month) + '-' + (day.length == 1 ? (0 + day) : day));
    }
};
