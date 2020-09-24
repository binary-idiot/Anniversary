export default class Calendar{

    static DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /**
     *  get the difference between two dates in hours, days, months, and years
     *  @param {date} firstDate  The first of the two dates
     *  @param {date} secondDate The second of the two dates
     *  @return {object} an object containing the diffrence between the two dates {hours, days, months, years}
     */
    static getDifference(firstDate, secondDate){
                
        if(firstDate.getTime() < secondDate.getTime()){
            return {hours:this.calcHours(firstDate, secondDate),
                days:this.calcDays(firstDate, secondDate),
                months:this.calcMonths(firstDate, secondDate),
                years:this.calcYears(firstDate, secondDate)};     
        }
        
        return {hours:null,
            days:this.elapsedDays(secondDate, firstDate),
            months:this.elapsedMonths(secondDate, firstDate),
            years:this.calcYears(firstDate, secondDate)};
        
    }

    /**
     * calculate the number of hours between fDate and sDate
     * @param {date} fDate 
     * @param {date} sDate 
     * @return {int} number of hours 
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

        return hours;
    }

    /**
     * calculate the number of days between fDate and sDate
     * @param {date} fDate 
     * @param {date} sDate 
     * @return {int} number of days
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
            if(this.leapYear(fDate.getFullYear()) && fDate.getMonth() === 1){
                days = 29 + sDay - fDay;
            }else{
                days = this.DAYS_IN_MONTH[fDate.getMonth()] + sDay - fDay; // How long until sDay in next month
            }
        }

        return days;
    }

    /**
     * calculate the number of days elapsed from fDate
     * @param {date} fDate 
     * @param {date} sDate 
     * @return {int} the number of elapsed days
     */
    static elapsedDays(fDate, sDate){
        const fDay = fDate.getDate();
        const sDay = sDate.getDate();
        let days = 0;

        if(fDay < sDay){
            days = sDay - fDay;

            
        }else if(fDay > sDay){
            if(this.leapYear(fDate.getFullYear()) && fDate.getMonth() - 1 === 1){
                days = 29 - sDay + fDay;
            }else{
                const prevMonth = fDate.getMonth();
                days = this.DAYS_IN_MONTH[(prevMonth >= 0)? prevMonth : 11] - sDay + fDay; // How long has passed since sDay last month
            }
        }
        
        return days;
    }

    /**
     * calculate the number of months between fDate and sDate
     * @param {date} fDate
     * @param {date} sDate 
     * @return {int} number of months
     */
    static calcMonths(fDate, sDate){

        // add one to each month to convert from 0-11 to 1-12
        const fMonth = fDate.getMonth() + 1;
        const sMonth = sDate.getMonth() + 1;
        let months = 0;

        if(fMonth < sMonth){ //todo fix days
            months = sMonth - fMonth;

            if(!this.componentsAreGreater(fDate, sDate, "day")){
                months--;
            }
        }else if(fMonth > sMonth){
            months = 12 + sMonth - fMonth;

            if(!this.componentsAreGreater(fDate, sDate, "day")){
                months--;
            }
        }else{
            if(this.componentsAreGreater(fDate, sDate, "day")){
                months = 0;
            }else{
                months = 11
            }
        }

        return months;
    }

    /**
     * calculate the number of months elapsed from fDate
     * @param {date} fDate 
     * @param {date} sDate 
     * @return {int} the number of elapsed months
     */
    static elapsedMonths(fDate, sDate){
        // add one to each month to convert from 0-11 to 1-12
        const fMonth = fDate.getMonth() + 1;
        const sMonth = sDate.getMonth() + 1;
        let months = 0;

        if(fMonth < sMonth){ //TODO fix months
            months = sMonth - fMonth;

            if(this.componentsAreGreater(fDate, sDate, "day")){
                months--;
            }
        }else if(fMonth > sMonth){
            months = 12 - sMonth + fMonth;
        }

        return months;
    }

    /**
     * calculate number of years between fDate and sDate
     * @param {date} fDate
     * @param {date} sDate
     * @return {int} number of years 
     */
    static calcYears(fDate, sDate){
        const fYear = fDate.getFullYear();
        const sYear = sDate.getFullYear();
        let years = 0;

        if(fYear < sYear){
            years = sYear - fYear;
            
            if(!this.componentsAreGreater(fDate, sDate, "month")){
                years--;
            }
        } else if(fYear > sYear){
            years = fYear - sYear;
            
            if(this.componentsAreGreater(fDate, sDate, "month")){
                years--;
            }
        }

        return years;
    }

    /**
     * determine whether date components smaller than the specified components are greater in secondDate
     * @param {date} fDate  The first of two dates
     * @param {date} sDate The second of two dates
     * @param {string} component The name of the component to start from
     * @return {boolean}  true if component or smaller are greater in the first date otherwise false
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
     * determine if year is a leap year
     * @param {int} year 
     * @return {boolean}  true if year is a leap year otherwise returns false
     */
    static leapYear(year){
        return (year % 400 === 0 || year % 4 === 0 && year !== 100);
    }
}