/* 
Используйте функции alert, confirm, prompt для общения с пользователем.
Написать игровой бот.
"Загадывание случайного числа от 1 до 100"
Что должна делать программа:
— спрашивает пользователя: "Угадай число от 1 до 100".
— если пользовательское число больше, то бот выводит "Загаданное число меньше" и предлагает ввести новый вариант;
— если пользовательское число меньше, то бот выводит "Загаданное число больше" и предлагает ввести новый вариант;
— если пользователь ввел не число, то выводит сообщение "Введи число!" и предлагает ввести новый вариант;
— если пользователь нажимает "Отмена", то игра заканчивается и выводится сообщение "Игра окончена".
— если пользовательское число равно загаданному, то игра заканчивается и выводит сообщение "Поздравляю, Вы угадали!!!".
Программа должна быть выполнена с помощью рекурсии, без единого цикла.
Загаданное число должно храниться «в замыкании»
*/

const game = () => {
	const num = prompt('Угадайте число от 1 до 100');
	const isNan = function (num) {
		return !isNaN(parseFloat(num) && isFinite(num));
	}
	/* 	const regExp = /^-?\\d*(\\.\\d+)?$/;
		const isNumber = function(value) {
			return regExp.test(value);
		}
		return isNumber(num); */

	switch (true) {
		case (+num < 1 || +num > 100):
			alert('Загаданное число должно быть в диапазоне между 1 и 100 включительно. Попробуйте снова!');
			ask();
			break;
		case (+num === n):
			alert('Поздравляю, Вы угадали!!!\nОбновите страницу, чтобы сыграть еще раз. (F5 на клавиатуре)');
			break;
		case +num > n:
			alert('Загаданное число меньше предложенного вами числа. Попробуйте снова!');
			ask();
			break;
		case +num < n:
			alert('Загаданное число больше предложенного вами числа. Попробуйте снова!');
			ask();
			break;
		case num === null:
			alert('Игра окончена.\nОбновите страницу, чтобы сыграть еще раз. (F5 на клавиатуре)');
			break;
		case isNan():
			alert('Упс, кажется вы ввели вовсе не цифру! Попробуйте снова!');
			ask();
			break;
	}
}

console.log(game());