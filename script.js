'use strict';

/*
? [Остальные задания в https://github.com/alienat3d/3d-modeling/tree/lesson19/homework & https://github.com/alienat3d/glo-js-course-hard-homework/tree/lesson19]

[✓] 6) Вывести текущий день и время на страницу в таком формате:
"Добрый день (утро, вечер, ночь в зависимости от времени суток)

Сегодня: Понедельник

Текущее время: 12:05:15 PM

До нового года осталось 175 дней"
*/

const greetingWordsArr = ['Доброе утро!', 'Добрый день!', 'Добрый вечер!', 'Доброй ночи!'];
const dayNamesArr = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

let greetings;

const date = new Date();
const hours = date.getHours();
const time = date.toLocaleTimeString();
const now = Date.now();
const newYear = Date.parse('1 january 2025');
const daysTillNY = Math.floor((newYear - now) / 1000 / 60 / 60 / 24);

switch (true) {
	case hours >= 6 && hours < 12:
		greetings = greetingWordsArr[0];
		break;
	case hours >= 12 && hours < 18:
		greetings = greetingWordsArr[1];
		break;
	case hours >= 18 && hours < 0:
		greetings = greetingWordsArr[2];
		break;
	case hours >= 0 && hours < 6:
		greetings = greetingWordsArr[3];
		break;
}

const writeText = () => {
	const greetingsBlock = document.createElement('p');
	const nameOfDayBlock = document.createElement('p');
	const clockBlock = document.createElement('p');
	const daysTillNYBlock = document.createElement('p');
	
	greetingsBlock.textContent = greetings;
	nameOfDayBlock.textContent = `Сегодня ${dayNamesArr[date.getDay()]}.`;
	clockBlock.textContent = `Текущее время: ${time}`;
	daysTillNYBlock.textContent = `До нового года осталось ${daysTillNY} дней`;

	document.body.append(greetingsBlock, nameOfDayBlock, clockBlock, daysTillNYBlock);
}

writeText();