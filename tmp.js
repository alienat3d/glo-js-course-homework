'use strict';

// * === Список дел (ToDo List) === * \\

/* Что необходимо реализовать (первые 2 пункта делаем по видео (последние минуты 2-го видео 13-го урока)):

[✓] Отмечать выполненные дела, выполненные дела должны перемещаться в блок с выполненными делами
[✓] Поле ввода после добавления дела должно очищаться
[✓] Пустые дела добавляться не должны
[✓] Удаление дел на кнопку КОРЗИНА
[✓] Сохранять данные о делах в localStorage (советую в виде массива)
[✓] Дела из localStorage подгружаться должны автоматически при загрузки странице

внимание чтобы сохранить массив в localStorage необходимо его конвертировать в json формат (JSON.stringify)

внимание из localStorage мы всегда получаем json строку и её необходимо конвертировать обратно в формат javascript (JSON.parse)

 Проверить, чтобы все работало и не было ошибок в консоли (Учесть вариант отсутствия объекта в localStorage пользователя при первой загрузке страницы) */

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

if (localStorage.length > 0) {
	for (let index = 0; index < localStorage.length; index++) {
		toDoData.push(JSON.parse(localStorage.getItem('note #' + index)));
	}
}

const renewLocalStorage = () => {
	localStorage.clear();
	toDoData.forEach((obj, idx) => localStorage.setItem('note #' + idx, JSON.stringify(obj)));
}

const render = function () {
	todoList.innerHTML = '';
	todoCompleted.innerHTML = '';

	toDoData.forEach(function (item) {
		const li = document.createElement('li');

		li.classList.add('todo-item');
		li.dataset.num = item.id;
		li.innerHTML = `
			<span class="text-todo">${item.text}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
		`;

		item.completed ? todoCompleted.append(li) : todoList.append(li);

		li.querySelector('.todo-complete')
			.addEventListener('click', function () {
				item.completed = !item.completed;
				renewLocalStorage();
				render();
			});

		li.querySelector('.todo-remove')
			.addEventListener('click', function () {
				const itemIndex = toDoData.indexOf(item);
				toDoData.splice(itemIndex, 1);
				renewLocalStorage();
				render();
			});
	});
}

todoControl.addEventListener('submit', function (evt) {
	evt.preventDefault();

	if (headerInput.value) {
		const newToDo = {
			id: 0,
			text: headerInput.value,
			completed: false
		}
		if (toDoData.length > 0) {
			const idPlusOne = toDoData[toDoData.length - 1].id + 1;
			newToDo.id = idPlusOne;
		} else {
			newToDo.id = 0;
		}
		toDoData.push(newToDo);

		headerInput.value = '';
		renewLocalStorage();
		render();
	}
})

render();