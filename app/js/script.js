'use strict';
/* 
[] 1) Перевести весь проект на стрелочные функции (кроме методов объекта)
[] 2) В нашем объекте везде использовать this как ссылку на объект appData. Если какой то обработчик ломает контекст - привязать нужный контекст в виде объекта appData.
[] 3) Блокировать (свойство disabled) все input[type=text] и select с левой стороны после нажатия кнопки Рассчитать, после этого кнопка Рассчитать пропадает и появляется кнопка Сброс (id=reset)
[] 4) В объекте реализовать метод reset(), срабатывающий по нажатию на кнопку Сброс. Метод reset() должен привести объект к исходному состоянию:
[] Кнопка Сброс должна замениться на кнопку Рассчитать
[] Должны быть убраны все дополнительные элементы (которые добавлялись динамически) и значения полей ввода
[] Все input[type=text] и select должны быть разблокированы
[] Метод reset должен всю программу возвращать в исходное состояние
[] Метод reset() пишем самостоятельно, никаких перезагрузок страницы. Метод должен быть расписан наподобие start().
*/

const title = document.getElementsByTagName('h1')[0];
const calcResetBtns = document.getElementsByClassName('handler_btn');
const plusBtn = document.querySelector('.screen-btn');
const optionPercentCheckboxes = document.querySelectorAll('.other-items.percent');
const optionNumCheckboxes = document.querySelectorAll('.other-items.number');
const rollbackController = document.querySelector('.rollback span.range-value');
const priceInputsCollection = document.getElementsByClassName('total-input');
let screenTypes = document.querySelectorAll('.screen');
let priceInputs = [];

for (let index = 0; index < priceInputsCollection.length; index++) {
	priceInputs.push(priceInputsCollection[index]);
}

console.log(screenTypes);

const appData = {
	ROLLBACK: 5,
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	services: {},
	ask: function () {
		do {
			appData.title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки');
		} while (appData.isNumber(appData.title));


		for (let i = 0; i < 2; i++) {
			let name = '';
			let price = 0;

			do {
				name = prompt('Какие типы экранов нужно разработать?');
			} while (appData.isNumber(name));

			do {
				price = prompt('Сколько будет стоить данная работа? (₽)');
			} while (!appData.isNumber(price));

			appData.screens.push({ id: i, name, price });
		}

		for (let i = 0; i < 2; i++) {
			let name = '';
			let price = 0;

			do {
				name = prompt('Какой дополнительный тип услуги нужен?');
			} while (appData.isNumber(name));

			do {
				price = prompt('Сколько будет стоить данная работа? (₽)');
			} while (!appData.isNumber(price));

			appData.services[name] = +price;
		}
	},
	addPrices: function () {
		for (const screen of appData.screens) {
			appData.screenPrice += +screen.price;
		}

		for (const price in appData.services) {
			appData.allServicePrices += appData.services[price];
		}
	},
	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},
	getFullPrice: function () {
		appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
	},
	getTitle: function () {
		appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
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
	start: function () {
		appData.ask();
		appData.addPrices();
		appData.getFullPrice();
		appData.getServicePercentPrice();
		appData.getTitle();
		appData.logger();
	},
	logger: function () {
		console.log(appData.fullPrice);
		console.log(appData.servicePercentPrice);
		console.log(appData.screens);
	}
}

appData.start();