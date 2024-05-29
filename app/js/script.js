'use strict';
/* 
1) Перенести все функции в объект (сделать их методами объекта)
2) Создать в объекте метод start и перенести в него вызов метода asking и переопределение свойств. Вне самого объекта запускаем только метод start который в нужном порядке выполнит все действия.
3) Создать в объекте метод logger который будет выводить в консоль необходимую информацию. Данный метод запускаем в самом конце метода start (после того как все расчеты уже были произведены)
4) Вывести в консоль из метода logger все свойства и методы объекта appData с помощью цикла for in
Таким образом вне объекта теперь должен быть только вызов метода start( )
*/

const appData = {
	ROLLBACK: 5,
	title: '',
	screens: '',
	screenPrice: 0,
	adaptive: true,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	service1: '',
	service2: '',
	ask: function () {
		appData.title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки');
		appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

		do {
			appData.screenPrice = prompt('Сколько будет стоить данная работа? (₽)')
		} while (!appData.isNumber(appData.screenPrice));

		appData.adaptive = confirm('Нужен ли адаптив на сайте?');
	},
	isNumber: function (num) {
		return !isNaN(parseFloat(num) && isFinite(num));
	},
	getAllServicePrices: function () {
		let sum = 0;

		for (let i = 0; i < 2; i++) {
			let price = 0;

			if (i === 0) {
				appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
			} else if (i === 1) {
				appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
			}

			do {
				price = prompt('Сколько будет стоить данная работа? (₽)')
			} while (!appData.isNumber(price));

			sum += +price;
		}

		return sum;
	},
	getFullPrice: function () {
		return +appData.screenPrice + appData.allServicePrices;
	},
	getTitle: function () {
		if (!appData.title) {
			return console.log('Название проекта не было указано!');
		} else {
			return appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
		}
	},
	getServicePercentPrice: function () {
		return appData.fullPrice - (appData.fullPrice * (appData.ROLLBACK / 100));
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
		appData.allServicePrices = appData.getAllServicePrices();
		appData.fullPrice = appData.getFullPrice();
		appData.servicePercentPrice = appData.getServicePercentPrice();
		appData.title = appData.getTitle();
		appData.logger();
	},
	logger: function () {
		console.log(appData.fullPrice);
		console.log(appData.servicePercentPrice);

		for (const key in appData) {
			console.log(key);
		}
	}
}

appData.start();