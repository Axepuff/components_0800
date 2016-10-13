//import
import {Menu} from '../menu/menu.js';
import {Form} from '../form/form.js';
import {Model} from '../model/model.js';

let menuModel = new Model({
	resource: 'https://javascriptru.firebaseio.com/menu/-KTwZ6jxjeFF141AKtna.json'
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
	menuModel.save(menu.getData());
});