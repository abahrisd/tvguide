import {CHANNELS_URL, PROGGRAMS_URL} from '../fixtures/constants';

export default class DataLoader {
	loadData = (callback) => {

		Promise.all([
			this.loadJSON(CHANNELS_URL),
			this.loadJSON(PROGGRAMS_URL)
		]).then(results => {
			const channels = JSON.parse(results[0]);
			const programms = JSON.parse(results[1]);
			return {channels, programms};
		}).then(tvdata => {
			callback(tvdata);
		});
	}

	loadJSON = (url) => {

		return new Promise(function(resolve, reject) {

			const xhr = new XMLHttpRequest();
			xhr.overrideMimeType("application/json");
			xhr.open('GET', url, true);
			xhr.onload = function() {
				if (this.status == 200) {
					resolve(this.response);
				} else {
					const error = new Error(this.statusText);
					error.code = this.status;
					reject(error);
				}
			};

			xhr.onerror = function() {
				reject(new Error("Network Error"));
			};

			xhr.send();
		});
	}
}