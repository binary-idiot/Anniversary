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

        // Extract date components for ease
        const fYear = firstDate.getFullYear();
        const sYear = secondDate.getFullYear();
        const fMonth = firstDate.getMonth();
        const sMonth = secondDate.getMonth();
        const fDay = firstDate.getDate();
        const sDay = secondDate.getDate();
        const fHour = firstDate.getHours();
        const sHour = secondDate.getHours();

        // Stores the difference as its calculated
        let diff = {hours:0, days:0, months:0, years:0};

        if(fYear < sYear){
            let years = fYear - sYear;
            
            if((years === 1) && (fMonth <= sMonth))
        }
    }

    /**
     * determine whether date components smaller than the specified components are greater in secondDate
     * @param {date} firstDate  The first of two dates
     * @param {date} secondDate The second of two dates
     */
    static componentsAreGreater(firstDate, secondDate, component){
        
        // components fall through to all smaller components
        switch(component){

        }
    }
}