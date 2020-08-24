export default {
    _processtime(num) {
        var numStr = num < 10 ? ("0"+num) : num;
        return numStr;
    },
    getWeekthInMonth(date) {
        //获取当前日期在当前月份是第几周
        date = this.convertToDate(date);
        var preMonth  = new Date(date.getFullYear(), date.getMonth(), 0);
        var week = preMonth.getDay();   //上个月最后一天周几
        // week += 1;    //加上这段则是从周日开始，否则从周一开始
        week = week === 7 ? 0:week;     //本月一号在一周中连着上个月多少天，从周日开始算
        var days = date.getDate();  //当前是几号
        days += week;  //用于计算完整周期内是第几天
        var weekth = Math.ceil((days)/7);
        return weekth;
    },
    getDateInfo(date) {
        date = this.convertToDate(date);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var second = date.getSeconds();
        var week = date.getDay();
        var timestamp = date.getTime();
        var weekStr = "";
        var monthStr = this._processtime(month);
        var dayStr = this._processtime(day);
        switch(week){
            case 1: weekStr = "星期一"; break;
            case 2: weekStr = "星期二"; break;
            case 3: weekStr = "星期三"; break;
            case 4: weekStr = "星期四"; break;
            case 5: weekStr = "星期五"; break;
            case 6: weekStr = "星期六"; break;
            case 0: weekStr = "星期日"; break;
        }
        return {
            year: date.getFullYear(),
            month: month,
            monthStr: monthStr,
            day: day,
            dayStr: dayStr,
            hour: hour,
            hourStr: this._processtime(hour),
            min: min,
            minStr: this._processtime(min),
            second: second,
            secondStr: this._processtime(second),
            week: week,
            weekStr: weekStr,
            timestamp:timestamp,
            DateStr: date.getFullYear()+'-'+monthStr+'-'+dayStr,
            weekth: this.getWeekthInMonth(date)
        };
    },
    convertDateToStr(date, formart) {
        date = this.convertToDate(date);
        var info = this.getDateInfo(date);
        info.month = info.month < 10 ? "0" + info.month : info.month;
        info.day = info.day < 10 ? "0" + info.day : info.day;
        info.min = info.min < 10 ? "0" + info.min : info.min;
        info.second = info.second < 10 ? "0" + info.second : info.second;
        info.hour = info.hour < 10 ? "0" + info.hour : info.hour;
        if (formart == "yyyy-MM-dd") {
            return info.year + "-" + info.month + "-" + info.day;
        } else if (formart == "yyyy-MM") {
            return info.year + "-" + info.month;
        } else if (formart == "yyyy-MM-dd hh:mm:ss") {
            return info.year + "-" + info.month + "-" + info.day + " " + info.hour + ":" + info.min + ":" + info.second;
        } else if (formart == "MM-dd hh:mm") {
            return info.month + "-" + info.day + " " + info.hour + ":" + info.min;
        } else if (formart == "hh:mm") {
            return info.hour + ":" + info.min;
        } else if (formart == "MM-dd week") {
            return info.month + "-" + info.day + " " + info.week;
        } else if (formart == "yyyy-MM-dd week") {
            return info.year + "-" + info.month + "-" + info.day + " " + info.week;
        } else if (formart == "yyyy-MM-dd hh:mm") {
            return info.year + "-" + info.month + "-" + info.day + " " + info.hour + ":" + info.min;
        }else if(formart == "yyyyMMdd week hh:mm"){
            return info.year + "/" + info.month + "/" + info.day + info.week + " " + info.hour + ":" + info.min;
        }else if(formart == "yyyyMMdd hh:mm"){
            return info.year + "/" + info.month + "/" + info.day + " " + info.hour + ":" + info.min;
        }else if(formart == "yyyyMMdd"){
            return info.year + "/" + info.month + "/" + info.day;
        }else if(formart == "MM-dd"){
            return info.month + "-" + info.day;
        }
        return info.year + "-" + info.month + "-" + info.day;
    },
    timestampToTimeStr(timestamp) {
        var Re = "";
        try {
            var timestampStr = timestamp + "";
            timestamp = timestampStr.length == 13 ? timestamp : timestamp*1000;
            var date = new Date(timestamp);
            var now = new Date();
            var time = now.getTime();
            var dateInfo = this.getDateInfo(date);
            var nowDateInfo = this.getDateInfo(now);
            time = parseInt((time - timestamp)/1000);
            var s;
            if (time < 60 * 1) {
                Re = '刚刚';
            } else if ((time < 60 * 60) && (time >= 60 * 1)) {
                s = Math.floor(time / 60);
                Re = s + "分钟前";
            } else if (nowDateInfo.year === dateInfo.year && nowDateInfo.day === dateInfo.day && nowDateInfo.month === dateInfo.month) {
                Re = "今天 " + dateInfo.hourStr + ":" + dateInfo.minStr;
            } else if (nowDateInfo.year === dateInfo.year) {
                Re = dateInfo.monthStr + "-" + dateInfo.dayStr + " " + dateInfo.hourStr + ":" + dateInfo.minStr;
            } else {
                Re = dateInfo.year + "-" + dateInfo.monthStr + "-" + dateInfo.dayStr + " " + dateInfo.hourStr + ":" + dateInfo.minStr;
            }
        } catch (e) {
        }
        return Re;
    },
    getNextMonth(date) {
        var dateInfo = this.getDateInfo(date);
        var nextMonth = new Date(dateInfo.year, dateInfo.month + 1, 0);
        return nextMonth;
    },
    getPreMonth(date) {
        var dateInfo = this.getDateInfo(date);
        var preMonth = new Date(dateInfo.year, dateInfo.month - 1, 0);
        return preMonth;
    },
    getDaysInMonth(date) {
        //返回当前月份总天数
        var dateInfo = this.getDateInfo(date);
        return this.getDateInfo(new Date(dateInfo.year, dateInfo.month, 0)).day;
    },
    timestampToDate(timestamp) {
        if (!timestamp) return new Date();
        // 特殊处理php时间戳
        if ((timestamp + '').length === 10) {
            timestamp = timestamp * 1000;
        }
        return new Date(parseInt(timestamp));
    },
    //返回标准时区时间
    convertStrToDate(str) {
        if (!str) {
            return new Date();
        }
        var str_arr = str.split(" ");
        var yearmonthday = str_arr[0];
        var hourminsecond = str_arr[1] || "";
        var hourminsecond_arr = hourminsecond.split(":");
        var yearmonthday_arr = yearmonthday.split("-");
        if (yearmonthday_arr.length != 3) {
            yearmonthday_arr = yearmonthday.split("/");
        }
        if (yearmonthday_arr.length != 3) {
            return new Date();
        }
        if (!hourminsecond) {
            return new Date(yearmonthday_arr[0], parseInt(yearmonthday_arr[1]) - 1, yearmonthday_arr[2]);
        }
        return new Date(yearmonthday_arr[0], parseInt(yearmonthday_arr[1]) - 1, yearmonthday_arr[2], hourminsecond_arr[0] || 0, hourminsecond_arr[1] || 0, hourminsecond_arr[2] || 0);
    },
    convertToDate(date) {
        try {
            if (date instanceof Date) {
                return date;
            } else if (!isNaN(date)) {
                return this.timestampToDate(date);
            } else if (typeof(date) == "string") {
                return this.convertStrToDate(date);
            }
        } catch (e) {
            return new Date();
        }
        return new Date();
    }
}
