'use strict';

/* 
[✓] 1) Повесить на кнопку обработчик события click и реализовать такой функционал:
В input[type=text] можно ввести цвет: red, green, blue и так далее.
По нажатию на кнопку необходимо брать этот цвет и добавлять его свойству style="backgroundColor: " квадрата
Работать должно так: ввели в input[type=text] yellow, по нажатию на кнопку значение input[type=text] попадает в свойство style="backgroundColor: yellow" и фон квадрата должен поменяться

[✓] 2) В кружке (который внутри квадрата) есть кнопка. Дать ей свойство style="display: none; " 

[✓] 3) Повесить на input[type=range] обработчик события input и реализовать такой функционал:
при каждом изменении положения ползунка значение input[type=range] необходимо заносить в свойства ширины и высоты кружка (который внутри квадрата) (height и width) (в процентах!!) 
*/

const btn = document.querySelector('#btn');
const input = document.querySelector('input[type=text]');
const range = document.querySelector('input[type=range]');
const square = document.querySelector('#square');
const secondBtn = square.querySelector('#e_btn');
const circle = square.querySelector('#circle');

// [1]
btn.addEventListener('click', () => square.style.backgroundColor = input.value);

// [2]
secondBtn.style.display = 'none';

// [3]
range.addEventListener('input', () => {
	const modifiedValue = range.value + '%';
	circle.style.cssText = `
		width: ${modifiedValue};
		height: ${modifiedValue};
	`;
})