(function () {
 	'use strict';

	//import
	let Menu = window.Menu;
	let Form = window.Form;

	let menu = new Menu({
		el: document.querySelector('.js-menu'),
		onPick (item) {
			console.log(item);
		},
		onRemove () {

		},
		data: {
			title: 'SINGLE PAGE APPLICATION',
			items: [
				{
					href: 'https://vk.com',
					anchor: 'vk.com'
				},
				{
					href: 'https://ok.ru',
					anchor: 'ok.ru'
				},
				{
					href: 'https://yahoo.com',
					anchor: 'yahoo.com'
				},
				{
					href: 'https://yandex.ru',
					anchor: 'yandex.ru'
				}
			]
		}
	});

	let form = new Form({
		el: document.querySelector('.js-form')
	});

	form.on('add', event => {
		menu.addItem(event.detail);
	});

})();