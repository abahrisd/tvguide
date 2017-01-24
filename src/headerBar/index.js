import LogoTime from './logoTime';
import CenterBar from './centerBar';
import TVGuide from './tvguide';
import './headerbar.css';

export default class HeaderBar {

	constructor() {
		//this.isInited = false;
        //require("css!./headerbar.css");
        this.content = document.createElement('div');
		this.content.classList.add('header');
        //require("style-loader!css-loader!./headerbar.css");
		this.init();
	}

	init(){

        //create left logo + datetime
		const logoBlock = new LogoTime();
		if (logoBlock.content){
			this.content.appendChild(logoBlock.content);
		}

        //create center timeline
		const centerBar = new CenterBar();
		if (centerBar.content){
			this.content.appendChild(centerBar.content);
		}

        //create center timeline
		const tvGuide = new TVGuide();
		if (tvGuide.content){
			this.content.appendChild(tvGuide.content);
		}
	}

}