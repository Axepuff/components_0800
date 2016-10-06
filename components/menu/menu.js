(function() {
	'use strict';

	// import
	let template = window.fest['menu/menu.tmpl'];

	/**
	 * @class Menu
	 * Компонента "Меню"
	 */
	class Menu {

		/**
		 * @constructor
		 * @param  {Object} opts
		 */
		constructor(opts) {
			this.el = opts.el;
			this.data = opts.data;
			this.onPick = opts.onPick;

			this.template = template;

			this.render();

			this.list = this.el.querySelector('.menu__list');
			this.title = this.el.querySelector('.menu__title');

			this._initEvents();
		}

		/**
		 * Добавляем элемент меню
		 * @param {Object} item
		 */
		addItem (item) {
			this.data.items.push(item);
			this.render();
		}

		/**
		 * Удаляем пункт меню из данных
		 * @param  {Object} removedItem
		 */
		removeItem (removedItem) {
			this.data.items = this.data.items.filter((item, index) => {
				return index !== removedItem.index;
			});
			this.render();
		}

		/**
		 * Создаем HTML
		 */
		render () {
			this.el.innerHTML = this.template(this.data);
		}

		/**
		* Удаления элемента меню
		* @param  {HTMLElement} item
		* @private
		*/
		_onRemoveClick(item) {
			let index = parseInt(item.parentNode.dataset.index, 10);

			this.removeItem({
				index
			});
		}

		/**
		* Выбор элемента меню
		* @param  {HTMLElement} item
		*/
		_onPickClick(item) {
			this.onPick(item);
		}

		/**
		* Развешиваем события
		*/
		_initEvents() {
			this.el.addEventListener('click', this._onClick.bind(this));
		}

		/**
		* Клик в любую область меню
		* @param {Event} event
		* @private
		*/
		_onClick(event) {
			event.preventDefault();
			let item = event.target;

			switch (item.dataset.action) {
				case 'remove':
				this._onRemoveClick(item);
				break;

				case 'pick':
				this._onPickClick(item);
				break;
			}
		}

	}

	// Export
	window.Menu = Menu;

})(window);