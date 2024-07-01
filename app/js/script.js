'use strict';
/* 
1) Запретить нажатие кнопки Рассчитать если не выбран ни один тип экрана в выпадающем списке и не введено их количество. Учесть что блоков с типом экранов может быть несколько, но пустых (незаполненных) элементов быть не должно
2) Повесить на input[type=range] (в блоке с классом .rollback) обработчик события. При перемещении ползунка значение под ним (в элементе span) должно меняться. А так же это значение должно заноситься в свойство rollback нашего объекта для последующих расчетов!
3) В нашем объекте присутствует метод getServicePercentPrice. Данный метод рассчитывает доход с учетом отката посреднику. Перенести его логику в метод addPrices и выводить в поле с подписью "Стоимость с учетом отката"
4) В методе addScreens мы добавляем в свойство appData.screens новые объекты. Добавить свойство count в которое занести количество экранов из input. В методе addPrices посчитать общее количество экранов и вывести на страницу итоговое значение в поле с подписью "Количество экранов"
5) Удалить из проекта метод getRollbackMessage
*/

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const plusBtn = document.querySelector('.screen-btn');
const optionPercentCheckboxes = document.querySelectorAll('.other-items.percent');
const optionNumCheckboxes = document.querySelectorAll('.other-items.number');
const rollbackController = document.querySelector('.rollback input');
const rollbackControllerValue = document.querySelector('.rollback .range-value');
const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];
const screenSelects = document.getElementsByClassName('views-select');
const screenInputs = document.getElementsByClassName('views-input');
const screens = document.getElementsByClassName('screen');

// [1]

const appData = {
	ROLLBACK: 10,
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	servicesPercent: {},
	servicesNumber: {},
	init: function () {
		appData.addTitle();
		startBtn.addEventListener('click', appData.start);
		plusBtn.addEventListener('click', appData.addScreenBlock);
		screenSelects[0].addEventListener('change', appData.enableBtn);
		screenInputs[0].addEventListener('input', appData.enableBtn);
	},
	addTitle: function () {
		document.title = title.textContent;
	},
	enableBtn: function () {
		let selectedIndexArray = [];
		let inputValuesArray = [];

		for (let index = 0; index < screens.length; index++) {
			const select = document.querySelector('.views-select');
			const input = document.querySelector('.views-input');
			const selectedIndex = select.selectedIndex;
			const inputValue = +input.value;
			
			if (selectedIndex) selectedIndexArray.push(selectedIndex);
			if (inputValue) inputValuesArray.push(inputValue);

			for (let index = 0; index < screenSelects.length; index++) {
				select.addEventListener('change', appData.enableBtn);
				input.addEventListener('input', appData.enableBtn);
			}

			console.log(selectedIndexArray, inputValuesArray);
		}

		if (selectedIndexArray.some(item => item === 0) || inputValuesArray.some(item => item === '')) {
			startBtn.disabled = true;
		} else {
			startBtn.disabled = false;
		}
	},
	start: function () {
		appData.addScreens();
		appData.addServices();
		appData.addPrices();
		appData.showResult();
		// appData.logger();
	},
	showResult: function () {
		total.value = appData.screenPrice;
		totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
		fullTotalCount.value = appData.fullPrice;
	},
	addScreens: function () {
		// screens = document.querySelectorAll('.screen');
		for (let index = 0; index < screens.length; index++) {
			const select = screens.querySelector('select');
			const input = screens.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;

			appData.screens.push({
				id: index,
				name: selectName,
				price: select.value * +input.value
			});
		}
		// screens.forEach(function (screen, index) {
		// 	const select = screen.querySelector('select');
		// 	const input = screen.querySelector('input');
		// 	const selectName = select.options[select.selectedIndex].textContent;

		// 	appData.screens.push({
		// 		id: index,
		// 		name: selectName,
		// 		price: select.value * +input.value
		// 	});
		// });
	},
	addScreenBlock: function () {
		const cloneScreen = screens[0].cloneNode(true);
		plusBtn.insertAdjacentElement('beforebegin', cloneScreen);
		screens[screens.length - 1].querySelector('select').addEventListener('change', appData.enableBtn);
		screens[screens.length - 1].querySelector('input').addEventListener('input', appData.enableBtn);
	},
	addServices: function () {
		optionPercentCheckboxes.forEach(function (item) {
			const checkbox = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');

			if (checkbox.checked) appData.servicesPercent[label.textContent] = +input.value;
		});

		optionNumCheckboxes.forEach(function (item) {
			const checkbox = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');

			if (checkbox.checked) appData.servicesNumber[label.textContent] = +input.value;
		});
	},
	addPrices: function () {
		appData.screenPrice = appData.screens.reduce(function (sum, item) {
			return sum + +item.price;
		}, 0)

		for (const key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key];
		}

		for (const key in appData.servicesPercent) {
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
		}

		appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
	},
	getServicePercentPrice: function () {
		appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.ROLLBACK / 100));
	},
	getRollbackMessage: function (price) {
		if (price >= 30000) {
			return "Даем скидку в 10%";
		} else if (price >= 15000 && price < 30000) {
			return "Даем скидку в 5%";
		} else if (price >= 0 && price < 15000) {
			return "Скидка не предусмотрена";
		} else {
			return "Что-то пошло не так";
		}
	},
	logger: function () {
		console.log(appData);
	}
}

appData.init();