class MultiplyElement extends HTMLElement {
	constructor() {
		super();
	}

	multiplyByTen(value) {
		return value * 10;
	}
}
window.customElements.define('app-multiply', DivisionElement);

class DivisionElement extends MultiplyElement {
	constructor() {
		super();
	}

	divideByTen(value) {
		return value / 10;
	}
}
window.customElements.define('app-divide', DivisionElement);

// $multiply = document.querySelector('app-multiply');
// $multiply.multiplyByTen(4)