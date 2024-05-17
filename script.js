'use strict';
/* 
1) Следующим переменным присвоить значения

	title- строка с названием проекта,
	screens - строка с названиями типов экранов через запятую ("Простые, Сложные, Интерактивные"),
	screenPrice- любое число,
	rollback - любое число от 1 до 100,
	fullPrice- любое число (сколько хотите заработать),
	adaptive- булево значение
*/
const title = 'Glo Javascript Course Project',
	screens = 'Простые, Сложные, Интерактивные',
	screenPrice = 2000,
	rollback = 5,
	fullPrice = 50000,
	adaptive = true;

/* 	
2) Используя методы и свойства:

	Вывести в консоль тип данных значений переменных title, fullPrice, adaptive;
	Вывести в консоль длину строки из переменной screens
	Вывести в консоль “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани” и “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани”
	Привести строку screens к нижнему регистру и разбить строку на массив, вывести массив в консоль
	Вывести в консоль Процент отката посреднику за работу (fullPrice * (rollback/100)) 
*/
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('“Стоимость вёрстки экрана: ' + screenPrice + ' рублей.”\n' + '“Стоимость разработки сайта: ' + fullPrice + ' рублей.”');

const screensVariety = screens.toLowerCase().split(', ');

console.log(screensVariety);

const rollbackCount = fullPrice * (rollback / 100);

console.log(rollbackCount);