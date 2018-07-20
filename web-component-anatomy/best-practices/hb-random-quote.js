import { quotes } from './quotes.js';

(function () {
	const template = `
	<style>
		.hb-container {
			width: 500px;
			margin: auto;
			border: solid 1px #999;
			padding: 20px;
		}
		.rw-container h1 {
			font-size: 20px;
			margin: 0;
		}
	</style>
	<div class="hb-container">
		<h1>Random Quote:</h1>
		<p>"<span id="quote"></span>"</p>
	</div>
	`;

	class HbRandomQuote extends HTMLElement {
		_quotes = quotes;
		_$quote = null;
		_interval = null;

		constructor() {
			super();
		}

		connectedCallback() {
			this.innerHTML = template;
			this._$quote = this.querySelector('#quote');
			this._interval = setInterval(() => this._render(), 10000);

			this._render();
		}

		init

		disconnectedCallback() {
			window.clearInterval(this._interval);
		}

		_render() {
			if (this._$quote !== null) {
				this._$quote.innerHTML = this._randomQuote;
			}
		}

		get _randomQuote() {
			let randomIndex = Math.floor(Math.random() * this._quotes.length);
			return this._quotes[randomIndex];
		}
	}

	window.customElements.define('hb-random-quote', HbRandomQuote);
})();