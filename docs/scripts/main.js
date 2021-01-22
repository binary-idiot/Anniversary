import * as dateFns from 'https://esm.run/date-fns';

document.addEventListener('DOMContentLoaded', event =>{
    addCounters();
});

const anniversaryDate = {
    year: 2017,
    month: 8,
    day: 23
}

const addCounters = () => {
    const upCounter = document.getElementById('counter-from');
    const downCounter = document.getElementById('counter-until');

    countUp(upCounter);
    countDown(downCounter);

    setInterval(() => {
        countUp(upCounter);
        countDown(downCounter);
    }, 1000 * 60);
}

const countUp = counter => {
    const anniversary = new Date(anniversaryDate.year, anniversaryDate.month, anniversaryDate.day);
    const now = new Date();
    
    const time = dateDifference(now, anniversary);
    updateCounter(time, counter);
}

const countDown = counter => {
    const next = findNextAnniversary();
    const now = new Date();

    const time = dateDifference(next, now);
    updateCounter(time, counter);
}

const updateCounter = (time, counter) => {
    let countStr = ""
    time.forEach(part => {
        console.log(part.unit + ": " + part.value);
        let str = part.value + " " + part.unit + ((part.value != 1)? "s " : " ");
        countStr += str;
    });

	counter.innerHTML = countStr;
}

const dateDifference = (endDate, startDate) => {
    const result = [];
    const parts = ['year', 'month', 'day', 'hour'];

    parts.forEach((part, i) => {
        let p = part.charAt(0).toUpperCase() + part.slice(1);
        let t = dateFns[`differenceIn${p}s`](endDate, startDate);
        if(t){
            result.push({unit: part, value: t});
            if(i < parts.length){
                endDate = dateFns[`sub${p}s`](endDate, t);
            }
        }
    });
    return result;
}

const findNextAnniversary = () => {
    let next = new Date(new Date().getFullYear(), anniversaryDate.month, anniversaryDate.day);
    const diff = dateFns.differenceInDays(next, new Date());
    
    if(diff > 0){
        return next;
    }else if(diff < 0){
        return dateFns.addYears(next, 1);
    }else{
        return null;
    }
}