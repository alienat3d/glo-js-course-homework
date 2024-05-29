'use strict';
/* 
1) Сделать проверку при получении данных:
- ответ на вопрос "Как называется ваш проект?" - строка
- ответ на вопрос "Какие типы экранов нужно разработать?" - строка
- ответ на вопрос "Сколько будет стоить данная работа?" - число
- ответ на вопрос "Какой дополнительный тип услуги нужен?" - строка
- ответ на вопрос "Сколько это будет стоить?" - число
Что значит проверка данных: где должен быть текст там только текст(голые цифры не должно пропускать, а текст с цифрами - должно. Пример: "Купил ВАЗ 2108" - ок, "4567989" - нет), где цифры только цифры!
Если проверку не прошло, то переспрашивать
*/
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