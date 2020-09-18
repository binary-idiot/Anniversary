class Calendar{

    static DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /**
     *  get the difference between two dates in hours, days, months, and years
     *  @param {date} firstDate  The first of the two dates
     *  @param {date} secondDate The second of the two dates
     *  @return {object} an object containing the diffrence between the two dates {hours, days, months, years}
     */
    static getDifference(firstDate, secondDate){
                
        // Ensure first date is before second date
        if((firstDate - secondDate) < 0){
            const d = firstDate;
            firstDate = secondDate;
            secondDate = d;
        }
        
        return {hours:this.calcHours(), days:this.calcDays(), months:this.calcMonths(), years:this.calcYears(firstDate, secondDate)};     
    }

    /**
     * calculate the number of hours between fDate and sDate
     * @param {date} fDate 
     * @param {date} sDate 
     */
    static calcHours(fDate, sDate){
        const fHour = fDate.getHours();
        const sHour = sDate.getHours();
        let hours = 0;

        if(fHour < sHour){
            hours = sHour - fHour;
        }else if(fHour > sHour){
            hours = 24 + sHour - fHour;
        }
    }

    /**
     * calculate the number of days between fDate and sDate
     * @param {date} fDate 
     * @param {date} sDate 
     */
    static calcDays(fDate, sDate){
        const fDay = fDate.getDate();
        const sDay = sDate.getDate();
        let days = 0;

        if(fDay < sDay){
            days = sDay - fDay;

            if((days === 1) && !this.componentsAreGreater(fDate, sDate, "hour")){
                days = 0;
            }
        }else if(fDay > sDay){
            if(this.leapYear() && fDate.getMonth() === 1){
                days = 29 + sDay - fDay;
            }else{
                days = this.DAYS_IN_MONTH[fDate.getMonth] + sDay - fDay;
            }
        }

        return days;
    }

    /**
     * calculate the number of months between fDate and sDate
     * @param {date} fDate
     * @param {date} sDate 
     */
    static calcMonths(fDate, sDate){

        // add one to each month to convert from 0-11 to 1-12
        const fMonth = fDate.getMonth() + 1;
        const sMonth = sMonth.getMonth() + 1;
        let months = 0;

        if(fMonth < sMonth){
            months = sMonth - fMonth;

            if((months === 1) && !this.componentsAreGreater(fDate, sDate, "day")){
                months = 0;
            }
        }else if(fMonth > sMonth){
            months = 12 + sMonth - fMonth;
        }

        return months;
    }

    /**
     * calculate number of years between fDate and sDate
     * @param {date} fDate
     * @param {date} sDate
     */
    static calcYears(fDate, sDate){
        const fYear = fDate.getFullYear();
        const sYear = sDate.getFullYear();
        let years = 0;

        if(fYear < sYear){
            years = fYear - sYear;
            
            if((years === 1) && !this.componentsAreGreater(fDate, sDate, "month")){
                years =0;
            }
        }

        return years;
    }

    /**
     * determine whether date components smaller than the specified components are greater in secondDate
     * @param {date} fDate  The first of two dates
     * @param {date} sDate The second of two dates
     */
    static componentsAreGreater(fDate, sDate, component){
        
        // components fall through to all smaller components
        switch(component){
            case "month" :
                if(fDate.getMonth() < sDate.getMonth()){
                    return true;
                }
            case "day" :
                if(fDate.getDate() < sDate.getDate()){
                    return true;
                }
            case "hour" :
                if(fDate.getHours() < sDate.getHours()){
                    return true;
                }
            return false;
        }
    }

    /**
     * returns true if year is a leap year otherwise returns false
     * @param {int} year 
     */
    static leapYear(year){
        return (year % 400 === 0 || year % 4 === 0 && year !== 100);
    }
}