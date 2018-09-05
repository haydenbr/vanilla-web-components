'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = '\n\t:host {\n\t\theight: 1em;\n\t\tdisplay: inline-block;\n\t\tuser-select: none;\n\t\tvertical-align: middle;\n\t\tbox-sizing: border-box;\n\t\twidth: 180px;\n\t}\n\t.container {\n\t\tcolor: var(--star-default-color, #c5c5c5);\n\t\tfont-size: 1em;\n\t\tline-height: 1em;\n\t\tmargin: 0 auto;\n\t\tposition: relative;\n\t\tpadding: 0;\n\t\tcursor: pointer;\n\t}\n\t.container .top {\n\t\tcolor: var(--star-selected-color, #e7bd06);\n\t\tpadding: 0;\n\t\tposition: absolute;\n\t\tz-index: 1;\n\t\tdisplay: block;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\toverflow: hidden;\n\t\twidth: 0;       \n\t}\n\t.container:hover .top {\n\t\t\tdisplay: none;\n\t}\n\t.container .bottom {\n\t\tpadding: 0;\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tunicode-bidi: bidi-override;\n\t\tdirection: rtl;\n\t}\n\t.container .bottom > span:hover,\n\t.container .bottom > span:hover ~ span {\n\t\t color: var(--star-hover-color, var(--star-selected-color, #e7bd06));\n\t}\n\t:host([disabled]) .container {\n\t\tcursor: inherit;\n\t} \n\t:host([disabled]) .container .top {\n\t\tdisplay: block;\n\t}\n\t:host([disabled]) .container .bottom > span:hover,\n\t:host([disabled]) .container .bottom > span:hover ~ span {\n\t\tcolor: inherit;\n\t}\n';

var template = '\n\t<style>' + styles + '</style>\n\t<div class="container">\n\t\t<div class="top">\n\t\t\t\t<span>\u2605</span><span>\u2605</span><span>\u2605</span><span>\u2605</span><span>\u2605</span>\n\t\t</div>\n\t\t<div class="bottom">\n\t\t\t\t<span data-value="5">\u2605</span><span data-value="4">\u2605</span><span data-value="3">\u2605</span><span data-value="2">\u2605</span><span data-value="1">\u2605</span>                   \n\t\t</div>\n\t</div>\n';

var HbStarRating = function (_HTMLElement) {
	_inherits(HbStarRating, _HTMLElement);

	function HbStarRating() {
		_classCallCheck(this, HbStarRating);

		var _this = _possibleConstructorReturn(this, (HbStarRating.__proto__ || Object.getPrototypeOf(HbStarRating)).call(this));

		_this._root = _this.attachShadow({ mode: 'open' });
		_this._$top = null;
		_this._$bottom = null;
		_this._disabled = false;
		_this._value = 0;
		_this._touched = false;

		var $template = document.createElement('template');
		$template.innerHTML = template;

		if (window.ShadyCSS) {
			window.ShadyCSS.prepareTemplate($template, 'hb-star-rating');
			_this._$template = document.importNode($template.content, true);
		}
		return _this;
	}

	_createClass(HbStarRating, [{
		key: 'connectedCallback',
		value: function connectedCallback() {
			var _this2 = this;

			if (window.ShadyCSS) {
				ShadyCSS.styleElement(this);
			}

			this._root.appendChild(this._$template);
			this._disabled = !!this.getAttribute('disabled');
			this._$top = this._root.querySelector('.top');
			this._$bottom = this._root.querySelector('.bottom');
			this._$bottom.addEventListener('click', function (event) {
				return _this2.onStarClick(event);
			});

			var initialValue = this.getAttribute('value');
			if (!!initialValue) {
				this._value = initialValue;
				this._render();
			}
		}
	}, {
		key: 'onStarClick',
		value: function onStarClick(event) {
			if (!this._disabled && !!event.target.dataset.value) {
				if (this.value !== event.target.dataset.value) {
					this.dispatchEvent(new Event('change'));
					this.value = event.target.dataset.value;
				}
			}
		}
	}, {
		key: '_render',
		value: function _render() {
			if (this._$top) {
				this._$top.style.width = this.value * 10 * 2 + '%';
			}
		}
	}, {
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue !== newValue) {
				this.attributeChangeHandlers[name](oldValue, newValue);
			}
		}
	}, {
		key: 'value',
		set: function set(value) {
			if (this._value === value) {
				return;
			}

			this._touched = true;
			this._value = value;
			this._render();
		},
		get: function get() {
			return this._value;
		}
	}, {
		key: 'attributeChangeHandlers',
		get: function get() {
			var _this3 = this;

			return {
				disabled: function disabled(oldValue, newValue) {
					return _this3._disabled = !!newValue;
				},
				value: function value(oldValue, newValue) {
					if (!_this3._touched) {
						_this3._value = newValue;
						_this3._render();
					}
				}
			};
		}
	}], [{
		key: 'observedAttributes',
		get: function get() {
			return ['disabled', 'value'];
		}
	}]);

	return HbStarRating;
}(HTMLElement);

window.customElements.define('hb-star-rating', HbStarRating);
