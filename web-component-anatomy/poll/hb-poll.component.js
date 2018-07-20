const styles = `
	.rw-poll-container {
		background-color: #333;
	}
	.rw-poll-container h3 {
		margin: 0;
		padding: 0 20px;
		color: #FFF;
		line-height: 50px;
	}
	.rw-poll-container ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.rw-poll-container ul li {
		padding: 0 20px;
		line-height: 50px;
		background-color: #E1E1E1;
		border: solid 1px #CCC;
		border-top: none;
		cursor: pointer;
	}
	.rw-poll-container ul li:hover {
		background-color: #CCC;
	}
	.rw-poll-container ul li.selected {
		background-color: #5cb85c;
		color: #FFF;
	}
`;
const template = `
	<style>${styles}</style>
	<div class="rw-poll-container">
		<h3 id="question"></h3>
		<ul id="answers"></ul>
	</div>
`;

class HbPoll extends HTMLElement {
	_selected;
	$question;
	$answers;
	_data = {
		question: '',
		answers: [  ]
	};
	
	constructor() {
		super();
		this.root = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.root.innerHTML = template;
		this.$question = this.root.querySelector('#question');
		this.$answers = this.root.querySelector('#answers');

		this.$answers.addEventListener('click', (event) => {
			this.$answers.querySelectorAll('li').forEach(($li, index) => {
				if ($li === event.target) {
					this.selected = index;
				}
			});
		});

		this.render();
	}

	render() {
		if (this.isConnected) {
			this.$answers.innerHTML = '';
			this.$question.innerHTML = '';
			this.$question.innerHTML = this.data.question;
			this.data.answers.forEach((answer) => {
				const $li = document.createElement('li');
				$li.innerHTML = answer;
				this.$answers.appendChild($li);
			})
		}
	}

	set data(data) {
		if (this._data === data) {
			return;
		}

		this._data = data;
		this.render();
	}

	get data() {
		return this._data;
	}

	set selected(index) {
		const $answer = this.$answers.querySelector(`li:nth-child(${index + 1})`);
		if ($answer) {
			this.$answers.querySelectorAll('li').forEach(($li) => $li.classList.remove('selected'));
			$answer.classList.add('selected');
			this._selected = index;
		}
	}

	get selected() {
		return this._selected;
	}
}
window.customElements.define('hb-poll', HbPoll);
