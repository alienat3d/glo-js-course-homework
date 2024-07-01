'use strict';
/* 
1) Запретить нажатие кнопки Рассчитать если не выбран ни один тип экрана в выпадающем списке и не введено их количество. Учесть что блоков с типом экранов может быть несколько, но пустых (незаполненных) элементов быть не должно
2) Повесить на input[type=range] (в блоке с классом .rollback) обработчик события. При перемещении ползунка значение под ним (в элементе span) должно меняться. А так же это значение должно заноситься в свойство rollback нашего объекта для последующих расчетов!
3) В нашем объекте присутствует метод getServicePercentPrice. Данный метод рассчитывает доход с учетом отката посреднику. Перенести его логику в метод addPrices и выводить в поле с подписью "Стоимость с учетом отката"
4) В методе addScreens мы добавляем в свойство appData.screens новые объекты. Добавить свойство count в которое занести количество экранов из input. В методе addPrices посчитать общее количество экранов и вывести на страницу итоговое значение в поле с подписью "Количество экранов"
5) Удалить из проекта метод getRollbackMessage
*/

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const plusBtn = document.querySelector('.screen-btn');
const optionPercentCheckboxes = document.querySelectorAll('.other-items.percent');
const optionNumCheckboxes = document.querySelectorAll('.other-items.number');
const rollbackController = document.querySelector('.rollback input');
const rollbackControllerValue = document.querySelector('.rollback .range-value');
const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];
// * 2.0 Теперь нам нужно получить элементы выбора типа экрана и строку ввода. Их родительский блок мы уже получили по селектору ".screen". Теперь мы можем перебрать его содержимое и составить объект. ↓
let screens = document.querySelectorAll('.screen');

// const select = document.querySelector('.views-select');

// calcBtn.disabled = false;

// calcBtn.addEventListener('click', () => {
// 	console.log('clicked');
// })

const appData = {
	ROLLBACK: 10,
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	servicesPercent: {},
	servicesNumber: {},
	init: function () {
		appData.addTitle();
		startBtn.addEventListener('click', appData.start);
		plusBtn.addEventListener('click', appData.addScreenBlock);
	},
	addTitle: function () {
		document.title = title.textContent; // * 1 Добавит заголовок вкладки браузера сайта (<title>)
	},
	start: function () {
		appData.addScreens();
		appData.addServices();
		appData.addPrices();
		// appData.ask();
		// appData.getFullPrice();
		// appData.getServicePercentPrice();
		// appData.getTitle();
		appData.logger();
		appData.showResult();
	},
	// * 7.0 Ну и в итоге нам ещё требуется метод, который будет выводить все эти расчёты в нужные места калькулятора, назовём его "showResult()". Всего у нас 5 полей, куда нужно выводить значения и все они уже получены выше, это: "total", "totalCount", "totalCountOther", "fullTotalCount", "totalCountRollback"
	showResult: function () {
		total.value = appData.screenPrice;
		totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
		fullTotalCount.value = appData.fullPrice;
	},
	// 2.2 Создадим новый метод, который будет заполнять объектами свойство "screens" и его же мы вызовем в методе "start()". Используя перебор forEach() мы получим дочерние select & input и занесём их в отдельные переменные.
	// 2.3 Далее мы получим их значение — "value"
	// 2.4 Объект "screens" состоял из свойств "id", "name" & "price". С "price" всё понятно, это кол-во экранов * на стоимость 1 экрана, id мы тоже легко находим через index. Но с "name" будет чуточку посложнее, он будет содержаться в текстовом содержимом опции, которую выбрал пользователь. Нас интересует свойство "selectedIndex", оно хранит index того элемента <option>, которое выбрал пользователь. А также есть свойство "options" с живой коллекцией элементов <option>, из которых мы можем извлечь textContent. Всё это мы занесём в отдельную переменную "selectName".
	// 2.5 Далее мы перенесём метод "push()" из цикла for, который мы использовали в старой версии приложения.
	// 3.3 Но для того, чтобы недавно добавленные новые экраны попадали в коллекцию надо её снова переопределить, найдя её с помощью "querySelectorAll()" вновь.
	addScreens: function () {
		screens = document.querySelectorAll('.screen');

		screens.forEach(function (screen, index) {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;

			appData.screens.push({
				id: index,
				name: selectName,
				price: select.value * +input.value
			});
			console.log(appData.screens);
		});
	},
	// * 3.0 Следующая задача это добавлять клон select'а с input'ом в блоке расчёта по типу экранов по клику на кнопку "+".
	// 3.1 Для клонирования блока select'а возьмём коллекцию "screens", обратимся к 0-му элементу (<select>) и применим метод "cloneNode()" и не забудем передать в него "true", чтобы скопировать все вложенные элементы вместе с ним.
	// 3.2 А после мы поместим этот новый элемент между последним блоком select'а и input'а и кнопкой "+".
	// 3.3 Получаем последний элемент коллекции с помощью индекса "length - 1". ↑
	addScreenBlock: function () {
		const cloneScreen = screens[0].cloneNode(true);
		plusBtn.insertAdjacentElement('beforebegin', cloneScreen);
		// screens[screens.length - 1].after(cloneScreen);
	},
	// * 4.0 Создадим новый метод "addServices", который будет работать с полями дополнительных стоимостей в %, таких как чекбоксы и инпуты адаптация под планшеты и под мобильные. И он будет собирать информацию и записывать в свойство "services". Здесь нам нужно будет перебрать обе коллекции для тех, что с % и тех, что со значениями и записать в объекты в свойство "services".
	// 4.1 Возьмём первую коллекцию и переберём её с помощью привычного метода forEach(), получим оба элемента со значениями в %. Здесь нам нужен чекбокс, который мы будем проверять, отмечен он или нет и добавлять в объект мы будем, только если он отмечен. Также нам понадобится label и input[type=text], где находится значение кол-ва % для расчётов.
	// 4.2 Теперь мы можем записывать в объект "services" необходимую информацию из этих переменных. Ключом у нас будет текстовый контент "label". А с расчётом стоимости чуть сложнее — дело в том, чтобы высчитать % от стоимости вёрстки, нам нужно знать стоимость вёрстки. Конечно, мы могли бы прямо в этом метода посчитать суммарную стоимость массива "screens", но это будет не совсем верно. Ведь каждый функциональный блок должен заниматься своим делом, а "addServices" у нас для того, чтобы отдавать объекту "services" нужную информацию, а расчётами должен заниматься отдельный метод. А также логичнее будет разделить свойство "services" на "servicesPercent" & "servicesNumber". В первом будут находиться данные в виде процентов, а во втором в виде числовых значений соответственно.
	addServices: function () {
		optionPercentCheckboxes.forEach(function (item) {
			const checkbox = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');

			// 4.3 Итак, мы обратимся к объекту "servicesPercent", в виде ключа у нас будет текстовый контент элемента label, а значением введённое значение инпута. Не забудем про унарный плюс, чтобы перевести строковое значение из строки ввода в числовое.
			// 4.4 Однако помним, что эти данные должны попадать в объект, только если чекбокс отмечен. Поэтому делаем проверку чекбокса, что его свойство "checked" имеет значение true, которое служит индикатором того, отмечен ли чекбокс или нет.
			if (checkbox.checked) appData.servicesPercent[label.textContent] = +input.value;
		});
		// 4.5 Всё тоже самое мы делаем и для другого объекта servicesNumber, только изменяя откуда мы берём данные и куда кладём.
		optionNumCheckboxes.forEach(function (item) {
			const checkbox = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');

			if (checkbox.checked) appData.servicesNumber[label.textContent] = +input.value;
		});
	},
	// Метод ask() больше нам не нужен
	// ask: function () {
	/* 		do {
				appData.title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки');
			} while (appData.isNumber(appData.title)); */

	// 2.1 До этого мы использовали цикл for для составления объекта, но теперь мы можем это делать прямо из живого элементы страницы. А старый цикл пока закомментируем, а потом и удалим. ↑
	/* for (let i = 0; i < 2; i++) {
		let name = '';
		let price = 0;

		do {
			name = prompt('Какие типы экранов нужно разработать?');
		} while (appData.isNumber(name));

		do {
			price = prompt('Сколько будет стоить данная работа? (₽)');
		} while (!appData.isNumber(price));

		appData.screens.push({ id: i, name, price });
	} */

	// for (let i = 1; i < 3; i++) {
	// 	let name = '';
	// 	let price = 0;

	// 	do {
	// 		const answer = prompt('Какой дополнительный тип услуги нужен?');
	// 		if (appData.services[answer]) {
	// 			name = answer + '-' + i;
	// 		} else {
	// 			name = answer;
	// 		}
	// 	} while (appData.isNumber(name));

	// 	do {
	// 		price = prompt('Сколько будет стоить данная работа? (₽)');
	// 	} while (!appData.isNumber(price));

	// 	appData.services[name] = +price;
	// }

	// appData.adaptive = confirm('Нужна ли мобильная версия сайта?');
	// },

	// * 5.0 Но т.к. мы изменили свойство "services", то и этот метод нахождения общей суммы стоимости нам следует переделать, ведь теперь у нас два объекта, а не 1. И нам также нужно разделить те свойства, которые мы будем класть в стоимость дополнительных услуг. Теперь, вместо "allServicePrices" у нас будут два объекта: "servicePricesPercent" & "servicePricesNumber" соответственно.
	addPrices: function () {
		// for (const screen of appData.screens) {
		// 	appData.screenPrice += +screen.price;
		// }
		appData.screenPrice = appData.screens.reduce(function (sum, item) {
			return sum + +item.price;
		}, 0)

		// for (const price in appData.services) {
		// 	appData.allServicePrices += appData.services[price];
		// }
		// 5.1 Итак, рассчитаем общую стоимость всех servicePercent для процентных значений
		for (const key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key];
		}

		// 5.2 А затем и для процентных значений берём сумму цен на экраны и умножаем на процентное соотношение делённое на 100
		for (const key in appData.servicesPercent) {
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
		}

		// [6.1] Но только, т.к. мы разделили объект "allServicePrices" на два других, то и прибавлять к "screenPrice" нам нужно их
		appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
	},
	// isNumber: function (num) {
	// 	return !isNaN(parseFloat(num)) && isFinite(num);
	// },
	// * 6.0 Осталось посчитать fullPrice, которую мы уже рассчитали здесь. Но мы лучше переместим содержимое этого метода в метод "addPrices()", где у нас происходят расчёты. ↑
	/* 	getFullPrice: function () {
			appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
		}, */
	// Также больше не нужен getTitle()
	/* 	getTitle: function () {
			appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
		}, */
	getServicePercentPrice: function () {
		appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.ROLLBACK / 100));
	},
	getRollbackMessage: function (price) {
		if (price >= 30000) {
			return "Даем скидку в 10%";
		} else if (price >= 15000 && price < 30000) {
			return "Даем скидку в 5%";
		} else if (price >= 0 && price < 15000) {
			return "Скидка не предусмотрена";
		} else {
			return "Что-то пошло не так";
		}
	},
	logger: function () {
		// console.log(appData.fullPrice);
		// console.log(appData.servicePercentPrice);
		// console.log(appData.screens);
		console.log(appData);
	}
}

appData.init();