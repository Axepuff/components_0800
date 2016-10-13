class Model {
	constructor ({resource, data = {}}) {
		this._resource = resource;
		this._data = data;
		this._eventsHandlers = {};
	}

	getData () {
		return this._data;
	}

	setData (data) {
		this._data = data;
		this.trigger('update');
	}

	trigger (name) {
		if (this._eventsHandlers[name]) {

			/*
				this._eventsHandlers
				{
					'eventName': [
						function handler1 () {},
						function handler1 () {},
						function handler1 () {},
						function handler1 () {}
					]
				}

			 */
			this._eventsHandlers[name].forEach(callback => callback());
		}
	}

	on (name, callback) {
		if (!this._eventsHandlers[name]) {
			this._eventsHandlers[name] = [];
		}

		this._eventsHandlers[name].push(callback);
	}

	fetch () {
		this._makeRequest('GET', this._resource, this.setData.bind(this));
	}

	save (data) {
		this.setData(data);
		this._makeRequest('PUT', this._resource, null);
	}


	_makeRequest (method, url, callback) {
		let xhr = new XMLHttpRequest();
		xhr.open(method, url, true);

		xhr.onreadystatechange = function () {

			if (xhr.readyState !== 4) {
				return;
			}

			if (xhr.status === 200 && callback !== null) {
				callback(JSON.parse(xhr.responseText));
			}

		}

		if (method === 'PUT') {
			xhr.send(JSON.stringify(this.getData()));
		} else {
			xhr.send();
		}
		
	}
}


export {Model};