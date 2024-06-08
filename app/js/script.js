'use strict';
/* 
Необходимо выполнить данное задание в скрипт-файле из прошлых уроков (перенести его в проект из файлов для урока, заменить уже имеющийся пустой script.js)
Не забывайте, все элементы со страницы мы получаем в самом верху кода. (в самую первую очередь)
1) Задание по проекту, получить каждый элемент в отдельную переменную:
=>> Получить заголовок "Калькулятор верстки" через метод getElementsByTagName. (тэг h1, получить именно элемент, а не коллекцию)
=>> Получить кнопки "Рассчитать" и "Сброс" через метод getElementsByClassName. (класс handler_btn)
=>> Получить кнопку "+" под выпадающим списком через метод querySelector. (класс screen-btn)
=>> Получить все элементы с классом other-items в две разные переменные. В первую элементы у которых так же присутствует класс percent, во вторую элементы у которых так же присутствует класс number через метод querySelectorAll.
=>> Получить input type=range через его родителя с классом rollback одним запросом через метод querySelector.
=>> Получить span с классом range-value через его родителя с классом rollback одним запросом через метод querySelector.
=>> Получить все инпуты с классом total-input справа через метод getElementsByClassName. (класс total-input, получить именно элементы, а не коллекции)
=>> Получить все блоки с классом screen в изменяемую переменную ( let ) через метод querySelectorAll (далее мы будем переопределять ее значение)
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

/* const appData = {
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
} */

// appData.start();