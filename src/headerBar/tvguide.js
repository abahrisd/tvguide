export default class TVGuide {

	constructor() {
		this.content = null;
		this.init();
	}

	init(){
		const mainDiv = this.createMainDiv();
		const guidDiv = this.createGuidDiv();
		mainDiv.appendChild(guidDiv);
		this.content = mainDiv;
	}

	createMainDiv(){
		const div = document.createElement('div');
		div.classList.add('header__tv-guide');
		return div;
	}

	createGuidDiv(){
		const div = document.createElement('div');
		div.innerText = 'ТВ ГИД';
		div.classList.add('header__tv-guide__logo');
		return div;
	}

}