
export default class logoTime {
	constructor(container){
		this.container = container;
		this.div = null;
		this.init();
	}

	init(){
		const mainDiv = this.createMainDiv();
		const logo = this.createLogo();
		mainDiv.appendChild(logo);
		const dateTimeBlock = this.createDateTimeBlock();
		mainDiv.appendChild(dateTimeBlock);
		this.div = mainDiv;
	}

	createMainDiv(){
		return document.createElement('div');
	}

	createLogo(){
		const imgSrc = require("file-loader!./domru_logo.png");
		const logo = document.createElement('img');
		logo.setAttribute('src', imgSrc);
		return logo;
	}

	createDateTimeBlock(){
		const div = document.createElement('div');
		const topSpan = document.createElement('span');
		const bottomSpan = document.createElement('span');
		div.appendChild(topSpan);
		div.appendChild(bottomSpan);

		setInterval(()=>{
			const now = new Date();
			const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
			const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
			const monthName = monthNames[now.getMonth()];
			const dayName = dayNames[now.getDay()];
			const date = now.getDate();
			const hours = now.getHours();
			const minutes = now.getMinutes();
			const seconds = now.getSeconds();

			topSpan.innerText = `${date} ${monthName}, ${dayName}`;
			bottomSpan.innerText = `${hours}:${minutes}:${seconds}`;
		}, 1000);

		return div;
	}
}