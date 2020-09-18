import Calendar from "./calendar.js";

document.addEventListener('DOMContentLoaded', (event) => {
	addCounters();
});

const addCounters = () => {

	countFrom(new Date("September 23, 2017 00:00:00"));

	const nextAnniversary = findNextAnniversary();

	countTill(nextAnniversary)
}

const countFrom = (startDate) => {
	let now = new Date();
	const counter = document.getElementById('counter-from');

	updateCounter(startDate, now, counter);
	
	setInterval(() => {
		now = new Date()
		updateCounter(startDate, now, counter);

	}, 1000 * 60);

}

const countTill = (nextDate) => {
	//TODO: Day of anniversary
	let now = new Date();
	const counter = document.getElementById('counter-until');

	updateCounter(now, nextDate, counter);

	setInterval(() => {
		now = new Date();
		updateCounter(now, nextDate, counter);
	}, 1000 * 60);
}

const updateCounter = (startDate, endDate, counter) => {
	const time = Calendar.getDifference(startDate, endDate);

	counter.innerHTML = time.years + " year(s), " + time.months + " month(s), " + time.days + " day(s), and " + time.hours + " hour(s)";
}

const findNextAnniversary = () => {
	const dateNow = new Date();
	let next;


	if(dateNow.getMonth() < 9){
		next = new Date("September 23, " + dateNow.getFullYear() + " 00:00:00");
	} else if(dateNow.getMonth() > 9){
		next = new Date("Spetember 23, " + (dateNow.getFullYear() + 1) + " 00:00:00");
	} else {
		next = null;
	}

	return next;
} 