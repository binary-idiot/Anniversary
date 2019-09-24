

document.addEventListener('DOMContentLoaded', (event) => {
	addCounters();
});

addCounters = () => {

	countFrom(new Date("September 23, 2017 00:00:00"));

	const nextAnniversary = findNextAnniversary();

	//countTill(nextAnniversary)
}

countFrom = (startDate) => {

const counterF = document.getElementById('counter-from');
	
setInterval(() => {
	let now = new Date().getTime();
	let time = now - startDate.getTime();

	let year = Math.floor(time / (1000 * 60 * 60 *365))
	let month = Math.floor((time % (1000 * 60 * 60 *365)) / (1000 * 60 * 60 * 24 * 30));
	let day = Math.floor((time % 1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24));

	counterF.innerHTML = year + " years, " + month + " months, and " + day + " day(s)";

}, 1000 * 60);

}

countTill = (nextDate) => {

	const counterU = document.getElementById('counter-until');

	setInterval(() => {
		let now = new Date().getTime()
		let time = nextDate.getTime() - now;

		if(time > 0){

			let year = Math.floor(time / (1000 * 60 * 60 *365))
			let month = Math.floor((time % (1000 * 60 * 60 *365)) / (1000 * 60 * 60 * 24 * 30));
			let day = Math.floor((time % 1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24));

			counterU.innerHTML = year + " years, " + month + " months, and " + day + " day(s)";
		} else if(time < 0) {

		}

	})
}

findNextAnniversary = () => {
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