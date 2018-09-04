const style = `
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
	width: 80%;
	max-width: 400px;
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
	font-size: 1.5em;
	background-color: #F1F1F1;
	color: #665;
}
.title .title-content {
	flex-grow: 1;
	display: flex;
	align-items: center;
	padding-left: 1em;
}
.close {
	flex-basis: 100px;
	flex-grow: 0;
	flex-shrink: 0;
	cursor: pointer;
	display: flex;
	justify-content: center;
	user-select: none;
}
:host([theme="orange"]) .title {
	background-color: #f8981c;
	color: #fff;
}
:host([theme="purple"]) .title {
	background-color: #6f7dbc;
	color: #fff;
}
`;

const template = `
<style>${style}</style>
<div class="frame">
	<nav class="container">
		<div class="title">
			<div class="title-content">
				Menu
			</div>
			<a class="close">&#10006;</a>
		</div>
		<div class="content">
			<a href="#">Menu Item One</a>
		</div>
	</nav>
</div>
`;

class SlideOutMenuComponent extends HTMLElement {
	constructor() {
		super();
		this._root = this.attachShadow({ mode: 'open' });
		this._root.innerHTML = template;
		this._$frame = null;
		this._open = false;
	}
}

window.customElements.define('slide-out-menu', SlideOutMenuComponent);
