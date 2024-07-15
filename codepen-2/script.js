'use strict';

/* 
Написать функцию которая принимает 2 целых числа x и y
Функция должна вычислять сумму цифр результата x в степени y.
Например вызов
getResult(4, 8) -->> 25
48 = 65536, а сумма его цифр составляет 6 + 5 + 5 + 3 + 6 = 25.
*/

function getResult(x, y) {
	let result;
	const pow = Math.pow(x, y);
	return result = getNumbersSum(pow);
};

function getNumbersSum(num) {
	return num.toString().split('').reduce(function (a, b) {
		return +a + +b;
	});
};

console.log(getResult(4, 8))