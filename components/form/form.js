(function () {
	'use strict';

	//import
	let _template = window.fest['form/form.tmpl'];


	/**
	 * @class Form
	 * Компонента "Форма"
	 */
	class Form {

		/**
		 * @constructor
		 * @param  {Object} opts
		 */
		constructor({el, data}) {
			this.el = el;
			this.data = data;

			this.render();
			this._initEvents();
		}

		/**
		 * Создаем HTML
		 */
		render () {
			this.el.innerHTML = _template(this.data);
		}


		/**
		 * Получение элемента формы по имени
		 * @param  {string} name
		 * @return {HTMLElement}
		 */
		getField (name) {
			return this.el.querySelector(`[name="${name}"]`);
		}


		/**
		* Развешиваем события
		*/
		_initEvents () {
			this.el.addEventListener('submit', this._onSubmit.bind(this));
		}


		/**
		 * Подписываемся
		 * @param  {string}   name
		 * @param  {Function} callback
		 */
		on (name, callback) {
			this.el.addEventListener(name, callback);
		}


		/**
		 * Создаем и диспатчим событие
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		trigger (name, data) {
			let widgetEvent = new CustomEvent(name, {
      			bubbles: true,
      			// detail - стандартное свойство CustomEvent для произвольных данных
      			detail: data
    		});

    		this.el.dispatchEvent(widgetEvent);
		}


		/**
		* Отправка данных формы
		* @param {Event} event
		* @private
		*/
		_onSubmit (event) {
			event.preventDefault();

			this.trigger('add', {
				href: this.getField('href').value,
				anchor: this.getField('anchor').value
			});

			event.target.reset();
		}

	}


	//export
	window.Form = Form;
})();