'use strict';
/* 
3) Спрашиваем у пользователя “Как называется ваш проект?” и результат сохраняем в переменную title
4) Спросить у пользователя “Какие типы экранов нужно разработать?” сохранить в переменную screens (пример: "Простые, Сложные, Интерактивные")
5) Спросить у пользователя “Сколько будет стоить данная работа?” и сохранить в переменную screenPrice (пример: 12000)
6) Спросить у пользователя “Нужен ли адаптив на сайте?” и сохранить данные в переменной adaptive (булево значение true/false)
7) Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 1. “Какой дополнительный тип услуги нужен?” (например service1, service2) 2. “Сколько это будет стоить?” (например servicePrice1, servicePrice2) в итоге 4 вопроса и 4 разные переменных, вопросы задаются в такой последовательности Название - Стоимость - Название - Стоимость
8) Вычислить итоговую стоимость работы учитывая стоимость верстки экранов и дополнительных услуг (screenPrice + servicePrice1 + servicePrice2) и результат занести в переменную fullPrice
9) Объявить переменную servicePercentPrice и занести в нее итоговую стоимость за вычетом отката посреднику (servicePercentPrice = fullPrice - Откат посреднику), округлив результат в большую сторону (методы объекта Math в помощь). Вывести servicePercentPrice в консоль.
10) Написать конструкцию условий (расчеты приведены в рублях) (вывести в консоль)
	- Если fullPrice больше 30000, то “Даем скидку в 10%” 
	- Если fullPrice больше 15000 и меньше 30000, то сообщение “Даем скидку в 5%” 
	- Если fullPrice меньше 15000 и больше 0 то в консоль вывести сообщение “Скидка не предусмотрена” 
	- Если отрицательное значение то вывести “Что то пошло не так” 
	- Учесть варианты 0, 15000 и 30000(к какому уровню не важно) 
*/

let title = 'Glo Javascript Course Project';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 2000;
let adaptive = true;
let fullPrice = 50000;
const rollback = 5;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('“Стоимость вёрстки экрана: ' + screenPrice + ' рублей.”\n' + '“Стоимость разработки сайта: ' + fullPrice + ' рублей.”');

const screensVariety = screens.toLowerCase().split(', ');

console.log(screensVariety);

let rollbackCount = fullPrice * (rollback / 100);

console.log(rollbackCount);

title = prompt('Как называется ваш проект?');
screens = prompt('Как называется ваш проект?', 'Простые, Сложные, Интерактивные');
screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
adaptive = confirm('Нужен ли адаптив на сайте?');

const service1 = confirm('Нужна ли вам SEO-оптимизация сайта?');
let servicePrice1;

if (service1) {
	servicePrice1 = +prompt('Какой у вас бюджет для данной услуги?');
}

const service2 = confirm('Нужно вам наполнение и сопровождение сайта?');
let servicePrice2;

if (service2) {
	servicePrice2 = +prompt('Какой у вас бюджет для данной услуги?');
}

if (servicePrice1 && servicePrice2) {
	fullPrice = screenPrice + servicePrice1 + servicePrice2;
} else if (servicePrice1 && (servicePrice2 === undefined || servicePrice2 === null)) {
	fullPrice = screenPrice + servicePrice1;
} else if ((servicePrice1  === undefined || servicePrice1  === null) && servicePrice2) {
	fullPrice = screenPrice + servicePrice2;
} else {
	fullPrice = screenPrice;
}

rollbackCount = fullPrice * (rollback / 100);

const servicePercentPrice = Math.ceil(fullPrice - rollbackCount);

console.log(servicePercentPrice);

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