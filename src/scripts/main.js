import Calendar from "./calendar.js";

document.addEventListener('DOMContentLoaded', (event) => {
	addCounters();
});

const addCounters = () => {

	countFrom(new Date("August 23, 2017 00:00:00"));

	countTill()
}

const countFrom = (startDate) => {
	let now = new Date();
	
	const counter = document.getElementById('counter-from');

	updateCounter(now, startDate, counter);
	
	
	setInterval(() => {
		now = new Date()
		updateCounter(now, startDate, counter);

	}, 1000 * 60);

}

const countTill = () => {
	//TODO: Day of anniversary
	let now = new Date();
	let nextDate = findNextAnniversary();
	const counter = document.getElementById('counter-until');

	if(nextDate === null){
		counter.innerHTML = "Happy Anniversary!"
	}else{
		updateCounter(now, nextDate, counter);
	}
	
	setInterval(() => {
		now = new Date();
		nextDate = findNextAnniversary();

		if(nextDate === null){
			counter.innerHTML = "Happy Anniversary!"
		}else{
			updateCounter(now, nextDate, counter);
		}
	}, 1000 * 60);
}

const updateCounter = (startDate, endDate, counter) => {
	const time = Calendar.getDifference(startDate, endDate);

	counter.innerHTML = time.years + " year(s), " + time.months + " month(s), " + time.days + " day(s), and " + time.hours + " hour(s)";
}

const findNextAnniversary = () => {
	const dateNow = new Date();
	let next;

	if(dateNow.getMonth() < 8){
		next = new Date("September 23, " + dateNow.getFullYear() + " 00:00:00");
	}else if(dateNow.getMonth() == 8 && dateNow.getDate() <= 23){
		if(dateNow.getDate() != 23){
			next = new Date("September 23, " + dateNow.getFullYear() + " 00:00:00");
		}else{
			next = null;
		}
	}else{
		next = new Date("September 23, " + (dateNow.getFullYear() + 1) + " 00:00:00");
	}

	return next;
	
} 