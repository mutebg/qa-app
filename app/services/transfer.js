function TransferService(config) {

	var data = JSON.parse(localStorage.getItem(config.LOCAL_STORAGE) || '{}');

	function set(key, item, tempSave) {
		data[key] = item;

		if (tempSave !== true) {
			localStorage.setItem(config.LOCAL_STORAGE, JSON.stringify(data));
		}
	}

	function get(key) {
		return data[key] || {};
	}

	return {
		set: set,
		get: get
	};
}

angular
	.module('QA')
	.service('TransferService', TransferService);