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
6) Проверить, чтобы все работало и не было ошибок в консоли
*/

const rollback = 5;

let title = 'Glo Javascript Course Project';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 2000;
let adaptive = true;
let fullPrice = 50000;

let service1,
	servicePrice1,
	service2,
	servicePrice2,
	screensVariety,
	servicePercentPrice,
	allServicePrices;

const showTypeOf = function (variable) {
	console.log(typeof variable);
}

const confirmQuestion = function (question) {
	return confirm(question);
}

const promptQuestion = function (question, defaultVal) {
	return prompt(question, defaultVal);
}

const getAllServicePrices = function (servPrice1 = 0, servPrice2 = 0) {
	return servPrice1 + servPrice2;
}

const rollbackCount = function (fPrice, rb) {
	return fPrice * (rb / 100);
}

const calcRollback = function () {
	return Math.ceil(fullPrice - rollbackCount(fullPrice, rollback));
}

const getTitle = function () {
	if (!title) {
		return title;
	} else {
		title = title.trim().toLowerCase();
		const firstLetter = title[0].toUpperCase();
		title = firstLetter + title.slice(1);
		return title;
	}
}

const getServicePercentPrices = function () {
	return getFullPrice() - rollbackCount(fullPrice, rollback);
}

const getRollbackMessage = function () {
	switch (true) {
		case fullPrice >= 30000:
			console.log(`Поздравляем! Вы получили от нас скидку 10%! Ваша цена теперь составляет ${fullPrice - (fullPrice * 0.1)}₽!`);
			break;
		case fullPrice <= 30000 && fullPrice >= 15000:
			console.log(`Поздравляем! Вы получили от нас скидку 5%! Ваша цена теперь составляет ${fullPrice - (fullPrice * 0.05)}₽!`);
			break;
		case fullPrice <= 15000 && fullPrice >= 0:
			console.log(`Скидка не предусмотрена. Ваша цена ${fullPrice}₽.`);
			break;
		case fullPrice < 0:
			console.log('Что-то пошло не так...');
			break;
	}
}

function getFullPrice() {
	return screenPrice + getAllServicePrices(servicePrice1, servicePrice2);
}

title = promptQuestion('Как называется ваш проект?');
getTitle(title);

screens = promptQuestion('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
screensVariety = screens.toLowerCase().split(', ');

screenPrice = parseInt(promptQuestion('Сколько будет стоить данная работа?', '12000'));

adaptive = confirmQuestion('Нужен ли адаптив на сайте?');

service1 = confirmQuestion('Нужна ли вам SEO-оптимизация сайта?');
if (service1) servicePrice1 = parseInt(promptQuestion('Какой у вас бюджет для данной услуги?'));

service2 = confirmQuestion('Нужно вам наполнение и сопровождение сайта?');
if (service2) servicePrice2 = parseInt(promptQuestion('Какой у вас бюджет для данной услуги?'));

fullPrice = getFullPrice();

servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);

getRollbackMessage();

console.log(getServicePercentPrices());