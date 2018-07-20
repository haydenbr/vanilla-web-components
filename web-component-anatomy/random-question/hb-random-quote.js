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

	function getRandomQuote() {
		let index = Math.floor(Math.random() * quotes.length);
		return { index, quote: quotes[index] };
	}

	class HbRandomQuote extends HTMLElement {
		$quote = null;
		interval = null;

		constructor() {
			super();
		}

		connectedCallback() {
			this.innerHTML = template;
			this.$quote = this.querySelector('#quote');
			this.setInterval(this.getAttribute('interval'));

			this.render();
		}

		disconnectedCallback() {
			this.clearInterval();
		}

		render() {
			if (this.$quote !== null) {
				let { index, quote } = getRandomQuote();
				this.setAttribute('current-index', index);
				this.$quote.innerHTML = quote;
			}
		}

		setInterval(interval) {
			if (this.interval !== null) {
				this.clearInterval();
			}
			if (interval > 0) {
				this.interval = setInterval(() => this.render(), interval);
			}
		}

		static get observedAttributes() {
			return ['interval'];
		}

		attributeChangedCallback(name, oldValue, newValue) {
			this.setInterval(newValue)
		}

		clearInterval() {
			window.clearInterval(this.interval);
		}
	}

	window.customElements.define('hb-random-quote', HbRandomQuote);
})();