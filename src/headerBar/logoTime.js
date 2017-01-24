import {MONTH_NAMES, DAY_NAMES} from '../fixtures/constants';

export default class LogoTime {
	constructor(){
		this.content = null;
		this.init();
	}

	init(){
		const mainDiv = this.createMainDiv();
		const logo = this.createLogo();
		mainDiv.appendChild(logo);
		const dateTimeBlock = this.createDateTimeBlock();
		mainDiv.appendChild(dateTimeBlock);
		this.content = mainDiv;
	}

	createMainDiv(){
        const div = document.createElement('div');
        div.classList.add('header__logo-div');
        return div;
	}

	createLogo(){
		//const imgSrc = require("file-loader!./black.png");
		const imgSrc = require("file-loader!./domru_logo.png");
		const logo = document.createElement('img');
		logo.setAttribute('src', imgSrc);
        logo.classList.add('header__logo-image');
		return logo;
	}

	createDateTimeBlock(){
		const div = document.createElement('div');
        div.classList.add('header__time-container');
        const baseDiv = document.createElement('div');
        baseDiv.classList.add('header__time-span');
		const topDiv = baseDiv.cloneNode(false);
        topDiv.classList.add('header__time-span--date');
		const bottomDiv = baseDiv.cloneNode(false);
        bottomDiv.classList.add('header__time-span--time');
		div.appendChild(topDiv);
		div.appendChild(bottomDiv);

		setInterval(()=>{
			const now = new Date();
			const monthName = MONTH_NAMES[now.getMonth()];
			const dayName = DAY_NAMES[now.getDay()];
			const date = now.getDate();
			const hours = now.getHours();
			const minutes = now.getMinutes()<10?`0${now.getMinutes()}`:now.getMinutes();
			const seconds = now.getSeconds();

			topDiv.innerText = `${date} ${monthName}, ${dayName}`;
			bottomDiv.innerText = `${hours}:${minutes}:${seconds}`;
		}, 1000);

		return div;
	}
}