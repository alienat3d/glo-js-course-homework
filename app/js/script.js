'use strict';
/* 
[✓] 1) Перевести весь проект на стрелочные функции (кроме методов объекта)
[✓] 2) В нашем объекте везде использовать this как ссылку на объект appData. Если какой то обработчик ломает контекст - привязать нужный контекст в виде объекта appData.
[✓] 3) Блокировать (свойство disabled) все input[type=text] и select с левой стороны после нажатия кнопки Рассчитать, после этого кнопка Рассчитать пропадает и появляется кнопка Сброс (id=reset)
[✓] 4) В объекте реализовать метод reset(), срабатывающий по нажатию на кнопку Сброс. Метод reset() должен привести объект к исходному состоянию:
Кнопка Сброс должна замениться на кнопку Рассчитать
Должны быть убраны все дополнительные элементы (которые добавлялись динамически) и значения полей ввода
Все input[type=text] и select должны быть разблокированы
Метод reset должен всю программу возвращать в исходное состояние
Метод reset() пишем самостоятельно, никаких перезагрузок страницы. Метод должен быть расписан наподобие start().
*/

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const plusBtn = document.querySelector('.screen-btn');
const optionPercentCheckboxes = document.querySelectorAll('.other-items.percent');
const optionNumCheckboxes = document.querySelectorAll('.other-items.number');
const optionCheckboxes = document.querySelectorAll('.main-controls__checkbox .custom-checkbox');
const rollbackController = document.querySelector('.rollback input');
const rollbackControllerValue = document.querySelector('.rollback .range-value');
const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');
let screenSelects = screens[0].querySelectorAll('select');
let screenInputs = screens[0].querySelectorAll('input');

const appData = {
	title: '',
	screens: [],
	screensCount: 0,
	screenPrice: 0,
	adaptive: true,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	rollback: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	servicesPercent: {},
	servicesNumber: {},
	init() {
		this.addTitle();
		startBtn.addEventListener('click', () => {
			if (this.checkFields(screenSelects, screenInputs)) {
				startBtn.style.display = 'none';
				resetBtn.style.display = 'block';
				this.start();
				this.disableEnableInputs(true);
			}
		});
		resetBtn.addEventListener('click', () => {
			startBtn.style.display = 'block';
			resetBtn.style.display = 'none';
			this.reset();
			this.disableEnableInputs(false);
		});
		plusBtn.addEventListener('click', () => this.addScreenBlock());
		rollbackController.addEventListener('input', () => this.operateRangeInput());
	},
	start() {
		this.addScreens();
		this.addServices();
		this.addPrices();
		this.showResult();
		// this.logger();
	},
	reset() {
		this.clearVariables();
		this.clearTagValues();
		this.removeScreenBlocks();
		this.showResult();
	},
	addTitle() {
		document.title = title.textContent;
	},
	isNumber(num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},
	disableEnableInputs (value) {
		screenSelects.forEach(select => select.disabled = value);
		screenInputs.forEach(input => input.disabled = value);
		optionCheckboxes.forEach(checkbox => checkbox.disabled = value);
		plusBtn.disabled = value;
		rollbackController.disabled = value;
	},
	checkFields(selects, inputs) {
		let error = false;

		inputs.forEach(input => {
			if (input.value === '' || input.value <= 0 || !this.isNumber(input.value)) error = true;
		});

		selects.forEach(select => {
			if (select.selectedIndex === 0) error = true;
		});

		return !error;
	},
	operateRangeInput() {
		rollbackControllerValue.textContent = rollbackController.value + ' %';
		this.rollback = +rollbackController.value;
		this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
		totalCountRollback.value = this.servicePercentPrice;
	},
	showResult() {
		total.value = this.screenPrice;
		totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
		fullTotalCount.value = this.fullPrice;
		totalCountRollback.value = Math.round(this.servicePercentPrice);
		totalCount.value = this.screensCount;
	},
	addScreens() {
		screens = document.querySelectorAll('.screen');
		screens.forEach(function (screen, index) {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;
			appData.screens.push({
				id: index,
				name: selectName,
				price: select.value * +input.value,
				count: +input.value
			});
		});
	},
	addScreenBlock() {
		const cloneScreen = screens[0].cloneNode(true);
		cloneScreen.querySelector('input').value = '';
		plusBtn.insertAdjacentElement('beforebegin', cloneScreen);
		screens = document.querySelectorAll('.screen');
		screenSelects = document.querySelectorAll('.screen select');
		screenInputs = document.querySelectorAll('.screen input');
	},
	removeScreenBlocks() {
		this.screens = [];
		screens.forEach((screen, index) => {
			if (index > 0) screen.remove();
		});
	},
	addServices() {
		optionPercentCheckboxes.forEach(item => {
			const checkbox = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');
			if (checkbox.checked) this.servicesPercent[label.textContent] = +input.value;
		});

		optionNumCheckboxes.forEach(item => {
			const checkbox = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');
			if (checkbox.checked) this.servicesNumber[label.textContent] = +input.value;
		});
	},
	addPrices() {
		this.screenPrice = this.screens.reduce(function (sum, item) {
			return sum + +item.price;
		}, 0)

		this.screensCount = this.screens.reduce(function (sum, item) {
			return sum + +item.count;
		}, 0)

		for (const key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key];
		}

		for (const key in this.servicesPercent) {
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
		}

		this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

		this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
	},
	clearVariables() {
		this.screenPrice = 0;
		this.screensCount = 0;
		this.screenPrice = 0;
		this.servicePricesPercent = 0;
		this.servicePricesNumber = 0;
		this.rollback = 0;
		this.fullPrice = 0;
		this.servicePercentPrice = 0;
		this.servicesPercent = {};
		this.servicesNumber = {};
	},
	clearTagValues() {
		rollbackController.value = 0;
		rollbackControllerValue.textContent = '0%';
		screens[0].querySelector('input').value = 0;
		screens[0].querySelector('select').selectedIndex = 0;
		optionCheckboxes.forEach(checkbox => checkbox.checked = false);
	},
	logger() {
		console.log(this.screens);
	}
}

appData.init();