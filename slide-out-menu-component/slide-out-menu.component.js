const style = `
:host {
	--menu-primary-color: #f8981c;
	--menu-text-color: #fff;
	--menu-width: 80%;
	--title-font-size: 1.5em;
	--menu-item-font-size: 1.2em;
}
.frame {
	position: fixed;
	top: 0;
	bottom: 0;
	width: 100%;
	overflow: hidden;
	pointer-events: none;
	z-index: 1000;
	transition: background-color 300ms ease-in;
}
.frame.open {
	pointer-events: auto;
	background-color: rgba(0,0,0,0.25);
}
.frame.open .container {
	transform: translate3d(0, 0, 0);
}
.container {
	width: var(--menu-width);
	background: #FFF;
	height: 100%;
	transform: translate3D(-100%, 0, 0);
	will-change: transform;
	transition: transform 300ms ease-in;
	box-shadow: 1px 0 3px rgba(51,51,51,0.25);
}
.title {
	display: flex;
	flex-direction: row;
	min-height: 3.2em;
	font-size: var(--title-font-size);
	background-color: var(--menu-primary-color);
	color: var(--menu-text-color);
}
.title .title-content {
	flex-grow: 1;
	display: flex;
	align-items: center;
	padding-left: 1em;
}
.close {
	align-items: center;
	flex-basis: 100px;
	flex-grow: 0;
	flex-shrink: 0;
	cursor: pointer;
	display: flex;
	justify-content: center;
	user-select: none;
}
.menu-items::slotted(a) {
	display: block;
	font-size: var(--menu-item-font-size);
	text-decoration: none;
	line-height: 2.5em;
	padding: 0.5em;
	border-bottom: solid 1px #F1F1F1;
	color: #665;
}
.menu-items::slotted(a:hover) {
	color: var(--menu-primary-color);
}
:host([backdrop="false"]) .frame.open {
	pointer-events: none;
	background-color: inherit;
}
:host([backdrop="false"]) .frame.open .container {
	pointer-events: auto;
}
`;
// #6f7dbc
const template = `
<style>${style}</style>
<div class="frame" data-close="true">
	<nav class="container">
		<div class="title">
			<div class="title-content">
				<slot name="menu-title">Menu</slot>
			</div>
			<a class="close" data-close="true">&#10006;</a>
		</div>
		<div class="content">
			<slot class="menu-items"></slot>
		</div>
	</nav>
</div>
`;

class SlideOutMenuComponent extends HTMLElement {
	constructor() {
		super();
		this._root = this.attachShadow({ mode: 'open' });
		this._$frame = null;
		this._open = false;
	}

	connectedCallback() {
		this._root.innerHTML = template;
		this._$frame = this._root.querySelector('.frame');
		this._$frame.addEventListener('click', (event) => this.onCloseClick(event));
	}

	set open(value) {
		const result = !!value;
		if (this._open === result) {
			return;
		}
		this._open = result;
		this._render();
	}

	get open() {
		return this._open;
	}

	onCloseClick(event) {
		if (event.target.dataset.close === 'true') {
			this.open = false;
		}
	}

	_render() {
		if (this._$frame) {
			if (this.open) {
				this._$frame.classList.add('open');
				this.dispatchEvent(new CustomEvent('menuopen'));
			} else {
				this._$frame.classList.remove('open');
				this.dispatchEvent(new CustomEvent('menuclose'));
			}
		}
	}
}

window.customElements.define('slide-out-menu', SlideOutMenuComponent);
