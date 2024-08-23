'use strict';

/* 1) Реализовать функционал выбора автомобилей и показа информации для каждого. Пример в видео Cars

2) Реализовать получение данных с помощью Promise/Fetch

3) Обязательно обработать ошибки */

const background = document.querySelector('.content');
const selector = document.querySelector('.car-selector');
const infoOutput = document.querySelector('.info-output');


const getData = (selectedCar) => {
	fetch('./db/cars.json')
		.then(res => {
			if (res.status === 200) {
				return res.json();
			} else {
				throw new Error("Произошла ошибка, данные не были найдены!");
			}
		})
		.then(data => render(data, selectedCar))
		.catch(error => {
			error => console.warn(error)
		});
}

const render = (data, selectedCar) => {
	data.cars.forEach(car => {		
		if (car.brand === selectedCar) {
			infoOutput.insertAdjacentHTML("afterbegin", `
				<p>Тачка ${car.brand} ${car.model}</p>
				<p>Цена: ${car.price}$</p>
			`);
		}
	});
}

selector.addEventListener('change', () => {
	infoOutput.innerHTML = '';
	
	getData(selector.value);
	
	if (selector.value === 'bmw') {
		background.style.backgroundImage = 'url("../images/bmw-m5.webp")';
	} else if (selector.value === 'volvo') {
		background.style.backgroundImage = 'url("../images/volvo-v90.webp")';
	} else {
		background.style.backgroundImage = '';
	}
});