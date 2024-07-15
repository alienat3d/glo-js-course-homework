'use strict';

/* 
Решить задачу где возможно используй this
В объект можно добавлять свои свойства
Есть объект calculator с тремя методами:
sum() возвращает сумму этих двух значений
mult() возвращает произведение этих двух значений
show() выводит результат вычислений в инпут ".res" объекта
*/

const inputA = document.getElementById('a');
const inputB = document.getElementById('b');
const sumBtn = document.getElementById('sum');
const multBtn = document.getElementById('mult');
const inputRes = document.getElementById('res');

const calculator = {
	res: 0,
	sum(a, b) {
		this.res = a + b;
		this.show();
	},
	mult(a, b) {
		this.res = a * b;
		this.show();
	},
	show() {
		inputRes.value = this.res;
	}
}

sumBtn.addEventListener('click', () => calculator.sum(+inputA.value, +inputB.value));
multBtn.addEventListener('click', () => calculator.mult(+inputA.value, +inputB.value));