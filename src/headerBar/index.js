import logoTime from './logoTime'

class headerBar {

	constructor(container) {
		//this.isInited = false;
		this.container = container;
		this.init()
	}

	init(){
		const logoBlock = new logoTime(this.container);
		if (logoBlock.div){
			this.container.appendChild(logoBlock.div);
		}
	}

}

export default headerBar