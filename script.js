'use strict';
/* 
1) Переписать получение значения переменной screenPrice циклом do while. Вопрос должен задаваться один раз обязательно, далее уже по условию
2) Добавить проверку что введённые данные являются числом, которые мы получаем на вопрос "Сколько это будет стоить" в функции getAllServicePrices
3) Поправить проект так, чтоб расчеты велись верно. Проверить типы получаемых переменных и привести их к нужным.
*/

const ROLLBACK = 5;

let title, 
		screens, 
		screenPrice, 
		adaptive, 
		allServicePrices, 
		fullPrice, 
		servicePercentPrice, 
		service1, 
		service2;

const isNumber = function (num) {
	return !isNaN(parseFloat(num) && isFinite(num));
}

const ask = function () {
	title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки');
	screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

	do {
		screenPrice = +prompt('Сколько будет стоить данная работа? (₽)')
	} while (!isNumber(screenPrice));

	adaptive = confirm('Нужен ли адаптив на сайте?');
}

const getAllServicePrices = function () {
	let servicePrice;
	let sum = 0;

	for (let index = 0; index < 2; index++) {
		if (index === 0) {
			service1 = prompt('Какой дополнительный тип услуги нужен?');
		} else if (index === 1) {
			service2 = prompt('Какой дополнительный тип услуги нужен?');
		}

		do {
			servicePrice = prompt('Сколько будет стоить данная работа? (₽)')
		} while (!isNumber(servicePrice));

		sum += +servicePrice;
	}

	return sum;
}

const showTypeOf = function (variable) {
	console.log(variable, typeof variable);
}

const getFullPrice = function () {
	return screenPrice + allServicePrices;
}

const getServicePercentPrice = function () {
	return fullPrice - (fullPrice * (ROLLBACK / 100));
}

const getTitle = function () {
	if (!title) {
		return console.log('Название проекта не было указано!');
	} else {
		return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
	}
}

const getRollbackMessage = function (price) {
		switch (true) {
			case price >= 30000:
				console.log(`Поздравляем! Вы получили от нас скидку 10%! Ваша цена теперь 	составляет ${price - (price * 0.1)}₽!`);
				break;
			case price <= 30000 && price >= 15000:
				console.log(`Поздравляем! Вы получили от нас скидку 5%! Ваша цена теперь 	составляет ${price - (price * 0.05)}₽!`);
				break;
			case price <= 15000 && price >= 0:
				console.log(`Скидка не предусмотрена. Ваша цена ${price}₽.`);
				break;
			case price < 0:
				console.log('Что-то пошло не так...');
				break;
	}
}

// screensVariety = screens.toLowerCase().split(', ');
/* const getRollbackMessage = function (price) {
	if (price >= 30000) {
		return "Даем скидку в 10%";
	} else if (price >= 15000 && price < 30000) {
		return "Даем скидку в 5%";
	} else if (price >= 0 && price < 15000) {
		return "Скидка не предусмотрена";
	} else {
		return "Что-то пошло не так";
	}
} */

ask();

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log('allServicePrices:', allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log(screens);
console.log(servicePercentPrice);

console.log(
	'Стоимость верстки экранов ' + screenPrice + ' рублей. \n' +
	'Стоимость разработки сайта ' + fullPrice + ' рублей.'
);