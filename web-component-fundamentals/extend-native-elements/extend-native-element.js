class CustomAnchor extends HTMLAnchorElement {
	connectedCallback() {
		this.addEventListener('click', e => {
			e.preventDefault();
			const result = confirm('Are you sure?');
			if (result) {
				window.location.href = e.target.href;
			}
		});
	}
}

window.customElements.define('my-anchor', CustomAnchor, { extends: 'a' });