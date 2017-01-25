import {MONTH_NAMES, DAY_NAMES, TODAY, TOMORROW, CHANNELS_URL, PROGGRAMS_URL} from '../fixtures/constants';
import DataLoader from '../dataLoader'

//import channels from '../fixtures/channels.json';

export default class CenterBlock {
	constructor() {
		this.content = null;
		this.init();
	}

	init(){
		const mainDiv = this.createMainDiv();
		const dataLoader = new DataLoader();
		dataLoader.loadData(this.createChannelsList);
	}

	createMainDiv(){
		var div = document.createElement('div');
		div.classList.add('center-block');
		return div;
	}

	createChannelsList(data){
		console.log("hello from channels list", data);
	}
}
