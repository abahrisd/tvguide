export default class BaseClass {

	makeDiv = (className) => {
		const div = document.createElement('div');
		div.classList.add(className);
		return div;
	}

}