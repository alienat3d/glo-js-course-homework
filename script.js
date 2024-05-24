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

const ROLLBACK = 5;

let title,
	screens,
	screenPrice,
	adaptive,
	fullPrice, 
	service1,
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

const calcPriceAfterRollback = function () {
	return Math.ceil(fullPrice - rollbackCount(fullPrice, ROLLBACK));
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
	return fullPrice - rollbackCount(fullPrice, ROLLBACK);
}

const getRollbackMessage = function (price) {
	switch (true) {
		case price >= 30000:
			return `Поздравляем! Вы получили от нас скидку 10%! Ваша цена теперь составляет ${price - (price * 0.1)}₽!`;
		case price <= 30000 && price >= 15000:
			return `Поздравляем! Вы получили от нас скидку 5%! Ваша цена теперь составляет ${price - (price * 0.05)}₽!`;
		case price <= 15000 && price >= 0:
			return `Скидка не предусмотрена. Ваша цена ${price}₽.`;
		case price < 0:
			return 'Что-то пошло не так...';
	}
}

function getFullPrice() {
	return screenPrice + allServicePrices;
}

do {
	title = promptQuestion('Как называется ваш проект?');
} while (!title);

getTitle(title);

do {
	screens = promptQuestion('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
} while (!screens);

screensVariety = screens.toLowerCase().split(', ');

do {
	screenPrice = parseInt(promptQuestion('Сколько будет стоить данная работа?', '12000'));
} while (!screenPrice);

adaptive = confirmQuestion('Нужен ли адаптив на сайте?');

service1 = confirmQuestion('Нужна ли вам SEO-оптимизация сайта?');
if (service1) {
	do {
		servicePrice1 = parseInt(promptQuestion('Какой у вас бюджет для данной услуги?'));
	} while (!servicePrice1);
}
	

service2 = confirmQuestion('Нужно вам наполнение и сопровождение сайта?');
if (service2) {
	do {
		servicePrice2 = parseInt(promptQuestion('Какой у вас бюджет для данной услуги?'));
	} while (!servicePrice2);
}

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);

console.log(getRollbackMessage(fullPrice));

console.log(getServicePercentPrices());