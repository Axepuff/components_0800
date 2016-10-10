(function () {
 	'use strict';

	//import
	let Menu = window.Menu;
	let Form = window.Form;
	let Model = window.Model;

	let menuModel = new Model({
		resource: '/data/menu.json'
	});

	let menu = new Menu({
		el: document.querySelector('.js-menu'),
		onPick (item) {
			console.log(item);
		},
		onRemove () {

		}
	});


	menuModel.on('update', () => {
		menu.setData(menuModel.getData());
		menu.render();
	});

	menuModel.fetch();

	let form = new Form({
		el: document.querySelector('.js-form')
	});

	form.on('add', event => {
		menu.addItem(event.detail);
	});

})();