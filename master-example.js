'use strict';
/* 
1) Объявить функцию getAllServicePrices. Функция возвращает сумму всех дополнительных услуг. Результат сохраняем в переменную allServicePrices. Тип - function expression
2) Объявить функцию getFullPrice. Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг (screenPrice + allServicePrices). Результат сохраняем в переменную fullPrice. Тип - function declaration
3) Объявить функцию getTitle. Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой". Учесть вариант что строка может начинаться с пустых символов. " КаЛьКулятор Верстки"
4) Объявить функцию getServicePercentPrices. Функция возвращает итоговую стоимость за вычетом процента отката. Результат сохраняем в переменную servicePercentPrice (итоговая стоимость минус сумма отката)
5) Почистить консоль логи и добавить недостающие, должны остаться:
- вызовы функции showTypeOf
- вывод строки с типами экранов для разработки screens
- сообщение о скидке пользователю (вызовы функции getRollbackMessage)
- стоимость за вычетом процента отката посреднику (вызовы функции getServicePercentPrices)
*/

const ROLLBACK = 5;

let title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const screenPrice = +prompt('Сколько будет стоить данная работа?', '20000');
const adaptive = confirm('Нужен ли адаптив на сайте?');

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько эта услуга будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько эта услуга будет стоить?');

let allServicePrices, fullPrice, servicePercentPrice;
// const servicePercentPrice = fullPrice - (fullPrice * (ROLLBACK / 100));
const screensVariety = screens.toLowerCase().split(', ');

const getAllServicePrices = function (servPrice1 = 0, servPrice2 = 0) {
	return servPrice1 + servPrice2;
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
/*	title = title.trim().toLowerCase();
		const firstLetter = title[0].toUpperCase();
		title = firstLetter + title.slice(1);
		return title; */
		return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
	}
}

/* const getRollbackMessage = function (price) {
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
} */
const getRollbackMessage = function (price) {
	if (price >= 30000) {
		return "Даем скидку в 10%";
	} else if (price >= 15000 && price < 30000) {
		return "Даем скидку в 5%";
	} else if (price >= 0 && price < 15000) {
		return "Скидка не предусмотрена";
	} else {
		return "Что-то пошло не так";
	}
}

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(screens.length);
console.log(servicePercentPrice);

console.log(
	'Стоимость верстки экранов ' + screenPrice + ' рублей. /n' +
	'Стоимость разработки сайта ' + fullPrice + ' рублей.'
);











// fullPrice = getFullPrice();

// servicePercentPrice = getServicePercentPrices();



// console.log(screens);

// getRollbackMessage();

// console.log(servicePercentPrice);