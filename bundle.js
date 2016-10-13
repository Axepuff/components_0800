/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _menu = __webpack_require__(1);

	var _form = __webpack_require__(2);

	var _model = __webpack_require__(3);

	var menuModel = new _model.Model({
		resource: 'https://javascriptru.firebaseio.com/menu/-KTwZ6jxjeFF141AKtna.json'
	}); //import


	var menu = new _menu.Menu({
		el: document.querySelector('.js-menu'),
		onPick: function onPick(item) {
			console.log(item);
		},
		onRemove: function onRemove() {}
	});

	menuModel.on('update', function () {
		menu.setData(menuModel.getData());
		menu.render();
	});

	menuModel.fetch();

	var form = new _form.Form({
		el: document.querySelector('.js-form')
	});

	form.on('add', function (event) {
		menu.addItem(event.detail);
		menuModel.save(menu.getData());
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//import
	var _template = window.fest['menu/menu.tmpl'];

	/**
	 * @class Menu
	 * Компонента "Меню"
	 */

	var Menu = function () {

		/**
	  * @constructor
	  * @param  {Object} opts
	  */
		function Menu(_ref) {
			var el = _ref.el;
			var data = _ref.data;
			var onPick = _ref.onPick;

			_classCallCheck(this, Menu);

			// деструктуризация объекта
			this.el = el;
			this.data = data;
			this.onPick = onPick;

			if (data) {
				this.render();
			}

			this._initEvents();
		}

		_createClass(Menu, [{
			key: 'setData',
			value: function setData(data) {
				this.data = data;
			}
		}, {
			key: 'getData',
			value: function getData() {
				return this.data;
			}

			/**
	   * Добавляем элемент меню
	   * @param {Object} item
	   */

		}, {
			key: 'addItem',
			value: function addItem(item) {
				this.data.items.push(item);
				this.render();
			}

			/**
	   * Удаляем пункт меню из данных
	   * @param  {Object} removedItem
	   */

		}, {
			key: 'removeItem',
			value: function removeItem(removedItem) {
				this.data.items = this.data.items.filter(function (item, index) {
					return index !== removedItem.index;
				});
				this.render();
			}

			/**
	   * Создаем HTML
	   */

		}, {
			key: 'render',
			value: function render() {
				this.el.innerHTML = _template(this.data);
			}

			/**
	  * Удаления элемента меню
	  * @param  {HTMLElement} item
	  * @private
	  */

		}, {
			key: '_onremove',
			value: function _onremove(item) {
				var index = parseInt(item.parentNode.dataset.index, 10);

				this.removeItem({
					index: index
				});
			}

			/**
	  * Выбор элемента меню
	  * @param  {HTMLElement} item
	  */

		}, {
			key: '_onpick',
			value: function _onpick(item) {
				this.onPick(item);
			}

			/**
	  * Развешиваем события
	  */

		}, {
			key: '_initEvents',
			value: function _initEvents() {
				this.el.addEventListener('click', this._onClick.bind(this));
			}

			/**
	  * Клик в любую область меню
	  * @param {Event} event
	  * @private
	  */

		}, {
			key: '_onClick',
			value: function _onClick(event) {
				event.preventDefault();
				var item = event.target;

				try {
					this['_on' + item.dataset.action](item);
				} catch (e) {
					throw new Error('\u041C\u0435\u0442\u043E\u0434 ' + item.dataset.action + ' \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D!');
				}
			}
		}]);

		return Menu;
	}();

	// Export


	exports.Menu = Menu;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//import
	var _template = window.fest['form/form.tmpl'];

	/**
	 * @class Form
	 * Компонента "Форма"
	 */

	var Form = function () {

		/**
	  * @constructor
	  * @param  {Object} opts
	  */
		function Form(_ref) {
			var el = _ref.el;
			var data = _ref.data;

			_classCallCheck(this, Form);

			this.el = el;
			this.data = data;

			this.render();
			this._initEvents();
		}

		/**
	  * Создаем HTML
	  */


		_createClass(Form, [{
			key: 'render',
			value: function render() {
				this.el.innerHTML = _template(this.data);
			}

			/**
	   * Получение элемента формы по имени
	   * @param  {string} name
	   * @return {HTMLElement}
	   */

		}, {
			key: 'getField',
			value: function getField(name) {
				return this.el.querySelector('[name="' + name + '"]');
			}

			/**
	  * Развешиваем события
	  */

		}, {
			key: '_initEvents',
			value: function _initEvents() {
				this.el.addEventListener('submit', this._onSubmit.bind(this));
			}

			/**
	   * Подписываемся
	   * @param  {string}   name
	   * @param  {Function} callback
	   */

		}, {
			key: 'on',
			value: function on(name, callback) {
				this.el.addEventListener(name, callback);
			}

			/**
	   * Создаем и диспатчим событие
	   * @param  {[type]} data [description]
	   * @return {[type]}      [description]
	   */

		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				var widgetEvent = new CustomEvent(name, {
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

		}, {
			key: '_onSubmit',
			value: function _onSubmit(event) {
				event.preventDefault();

				this.trigger('add', {
					href: this.getField('href').value,
					anchor: this.getField('anchor').value
				});

				event.target.reset();
			}
		}]);

		return Form;
	}();

	exports.Form = Form;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = function () {
		function Model(_ref) {
			var resource = _ref.resource;
			var _ref$data = _ref.data;
			var data = _ref$data === undefined ? {} : _ref$data;

			_classCallCheck(this, Model);

			this._resource = resource;
			this._data = data;
			this._eventsHandlers = {};
		}

		_createClass(Model, [{
			key: 'getData',
			value: function getData() {
				return this._data;
			}
		}, {
			key: 'setData',
			value: function setData(data) {
				this._data = data;
				this.trigger('update');
			}
		}, {
			key: 'trigger',
			value: function trigger(name) {
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
					this._eventsHandlers[name].forEach(function (callback) {
						return callback();
					});
				}
			}
		}, {
			key: 'on',
			value: function on(name, callback) {
				if (!this._eventsHandlers[name]) {
					this._eventsHandlers[name] = [];
				}

				this._eventsHandlers[name].push(callback);
			}
		}, {
			key: 'fetch',
			value: function fetch() {
				this._makeRequest('GET', this._resource, this.setData.bind(this));
			}
		}, {
			key: 'save',
			value: function save(data) {
				this.setData(data);
				this._makeRequest('PUT', this._resource, null);
			}
		}, {
			key: '_makeRequest',
			value: function _makeRequest(method, url, callback) {
				var xhr = new XMLHttpRequest();
				xhr.open(method, url, true);

				xhr.onreadystatechange = function () {

					if (xhr.readyState !== 4) {
						return;
					}

					if (xhr.status === 200 && callback !== null) {
						callback(JSON.parse(xhr.responseText));
					}
				};

				if (method === 'PUT') {
					xhr.send(JSON.stringify(this.getData()));
				} else {
					xhr.send();
				}
			}
		}]);

		return Model;
	}();

	exports.Model = Model;

/***/ }
/******/ ]);