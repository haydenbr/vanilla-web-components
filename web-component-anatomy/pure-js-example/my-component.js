class MyComponent extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<style>p { color: red }</style>
			<p>My Web Component!</p>
		`;
	}
}
window.customElements.define('my-component', MyComponent);
