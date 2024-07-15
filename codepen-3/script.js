
'use strict';

/* 
https://www.youtube.com/watch?v=mG9D9KG96Jc
*/

const cityArr = {
	rus: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
	ukr: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
	bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
	jap: ['Токио', 'Киото', 'Осака', 'Иокогама']
}

const countrySelect = document.getElementById('country');
const countryOptions = countrySelect.querySelectorAll('option')
const citySelect = document.getElementById('city');
const result = document.querySelector('.result');

countrySelect.addEventListener('change', () => {
	citySelect.style.display = 'inline';
	citySelect.innerHTML = '';
	result.innerHTML = '';
	for (const key in cityArr) {
		if (countrySelect.value === key) {
			cityArr[key].forEach(option => {
				const elem = document.createElement('option');
				elem.textContent = option;
				elem.setAttribute('value', option);
				citySelect.insertAdjacentElement('beforeend', elem);
			});
		}
	}
})

citySelect.addEventListener('change', () => {
	result.innerHTML = '';
	countryOptions.forEach((option, index) => {
		if (countrySelect.selectedIndex === index) result.textContent = `${option.text} ${citySelect.value}`;
	});
})