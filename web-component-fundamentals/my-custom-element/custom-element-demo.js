class MyCustomElement extends HTMLElement {
	constructor() {
		super(); // constructs parent HTMLElement interface
		console.log('My custom element');
	}

	connectedCallback() {
		console.log('connected');
	}

	static get observedAttributes() {
		return ['demo'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log('attribute changed', name, oldValue, newValue);
	}

	disconnectedCallback() {
		console.log('disconnected');
	}
}
window.customElements.define('my-custom-element', MyCustomElement);
