const styles = `
	:host {
		height: 1em;
		display: inline-block;
		user-select: none;
		vertical-align: middle;
		box-sizing: border-box;
		width: 180px;
	}
	.container {
		color: var(--star-default-color, #c5c5c5);
		font-size: 1em;
		line-height: 1em;
		margin: 0 auto;
		position: relative;
		padding: 0;
		cursor: pointer;
	}
	.container .top {
		color: var(--star-selected-color, #e7bd06);
		padding: 0;
		position: absolute;
		z-index: 1;
		display: block;
		top: 0;
		left: 0;
		overflow: hidden;
		width: 0;       
	}
	.container:hover .top {
			display: none;
	}
	.container .bottom {
		padding: 0;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		unicode-bidi: bidi-override;
		direction: rtl;
	}
	.container .bottom > span:hover,
	.container .bottom > span:hover ~ span {
		 color: var(--star-hover-color, var(--star-selected-color, #e7bd06));
	}
	:host([disabled]) .container {
		cursor: inherit;
	} 
	:host([disabled]) .container .top {
		display: block;
	}
	:host([disabled]) .container .bottom > span:hover,
	:host([disabled]) .container .bottom > span:hover ~ span {
		color: inherit;
	}
`;

const template = `
	<style>${styles}</style>
	<div class="container">
		<div class="top">
				<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
		</div>
		<div class="bottom">
				<span data-value="5">★</span><span data-value="4">★</span><span data-value="3">★</span><span data-value="2">★</span><span data-value="1">★</span>                   
		</div>
	</div>
`;

class HbStarRating extends HTMLElement {
	constructor() {
		super();
		this._root = this.attachShadow({ mode: 'open' });
		this._$top = null;
		this._$bottom = null;
		this._disabled = false;
		this._value = 0;
		this._touched = false;
	}

	set value(value) {
		console.log('value', value);
		if (this._value === value) {
			return;
		}

		this._touched = true;
		this._value = value;
		this._render();
	}

	get value() {
		return this._value;
	}

	connectedCallback() {
		this._root.innerHTML = template;
		this._disabled = !!this.getAttribute('disabled');
		this._$top = this._root.querySelector('.top');
		this._$bottom = this._root.querySelector('.bottom');
		this._$bottom.addEventListener('click', (event) => this.onStarClick(event));

		const initialValue = this.getAttribute('value');
		if (!!initialValue) {
			this._value = initialValue;
			this._render();
		}
	}

	onStarClick(event) {
		if (!this._disabled && !!event.target.dataset.value) {
			if (this.value !== event.target.dataset.value) {
				this.dispatchEvent(new Event('change'));
				this.value = event.target.dataset.value;
			}
		}
	}

	_render() {
		if (this._$top) {
			this._$top.style.width = ((this.value * 10) * 2) + '%';
		}
	}

	static get observedAttributes() {
		return ['disabled', 'value'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.attributeChangeHandlers[name](oldValue, newValue);
		}
	}

	get attributeChangeHandlers() {
		return {
			disabled: (oldValue, newValue) => this._disabled = !!newValue,
			value: (oldValue, newValue) => {
				if (!this._touched) {
					this._value = newValue;
					this._render();
				}
			}
		}
	}
}

window.customElements.define('hb-star-rating', HbStarRating);
