'use strict';

/* 
[✓] 1) Создайте клиентскую часть веб - приложения для управления сущностями в соответствии с заданием :
Используйте наследование в процессе выполнения задания.
Каждый класс должен содержать конструктор, геттеры и сеттеры, а также другие необходимые методы.
Базовый класс должен состоять из минимум 4 свойств различных типов.
Каждый класс - наследник должен расширять базовый класс и включать два или более дополнительных свойства.
Использовать тематику на выбор или придумать свою. Примеры:
Класс «Растение». Наследуемые классы: папоротник и ель обыкновенная. Возможные поля: название, описание, вид, возраст, класс, размер соцветия, класс опасности, ареал произрастания, область применения (в пищевой промышленности, в получении лекарственных препаратов, в сельском хозяйстве...), первооткрыватель, место произрастания и т.д.
или
Класс «Работник». Наследуемые классы: слесарь и водитель. Возможные поля: имя, фамилия, возраст, должность, организация, разряд, наличие детей, дата принятия на работу т.д.
[✓] 2) Сверстать страницу (стили на свое усмотрение). На странице должна быть форма и таблица.
Форма: Поля ввода смысловые. Например: Фамилия и имя - type=text, наличие детей - type=checkbox. Обязательно один select с списком классов-наследников для выбора класса создателя сущности (объекта). Если используем родительский класс Работник то в select должны быть, к примеру, Слесарь и Водитель и на основе выбранного варианта новый объект будет создан на основе одного из классов-наследников. 
Под формой - кнопка "Сохранить". Поля формы должны быть обязательные для отправки.
Таблица: на каждое свойство по колонке, последняя дополнительная колонка имеет кнопку "Удалить" .
[✓] 3) При Сохранении данных из формы создаем объект на основе выбранного класса-наследника. Записываем каждую сущность в единый массив.
[✓] 4) Данные из объектов в массиве должны сохраняться в localStorage и выводиться на страницу в таблице
[✓] 5) При обновлении страницы данные должны сохраняться
[] 6) При нажатии кнопки "Удалить" данный объект должен быть удален из массива данных, со страницы и с localStorage. Для удаления использовать метод класса!
*/

const inputsCollection = document.querySelectorAll('input[type="text"]');
const selectEmployeePosition = document.getElementById('position');
const isMarriedCheckbox = document.getElementById('is-married');
const childrenLabel = document.querySelector('[for="children"]');
const driverGradeFieldset = document.getElementById('driver-grade');
const driverGrades = driverGradeFieldset.querySelectorAll('input[type="radio"]');
const driverFieldset = document.getElementById('driver-fieldset');
const driverExperienceInput = driverFieldset.querySelector('input[type="number"]');
const developerGradeFieldset = document.getElementById('developer-grade');
const developerGrades = developerGradeFieldset.querySelectorAll('input[type="radio"]');
const driverLicenseFieldset = document.getElementById('driver-licenses');
const driverLicenseCheckboxes = driverLicenseFieldset.querySelectorAll('input[type="checkbox"]');
const developerFieldset1 = document.querySelector('.programming-languages');
const developerFieldset2 = document.getElementById('developer-fieldset');
const employmentTypes = developerFieldset2.querySelectorAll('input[type="radio"]');
const hasOwnCarCheckbox = document.getElementById('has-own-car');
const ownCarsLabel = document.querySelector('[for="own-cars"]');
const saveBtn = document.querySelector('[type="submit"]');
const tableBody = document.querySelector('tbody');

let delBtns;
let employeesArray = [];

if (localStorage.length > 0) {
	for (let idx = 0; idx < localStorage.length; idx++) {
		employeesArray.push(JSON.parse(localStorage.getItem('employee #' + (idx + 1))));
	}
}
const renewLocalStorage = () => {
	localStorage.clear();
	employeesArray.forEach((obj, idx) => localStorage.setItem('employee #' + (idx + 1), JSON.stringify(obj)));
}

const clearInputs = () => {
	inputsCollection.forEach(input => input.value = '');
	driverExperienceInput.value = '';
	selectEmployeePosition.selectedIndex = 0;
	isMarriedCheckbox.checked = false;
	childrenLabel.querySelector('input').value = '';
	driverGrades.forEach(radio => {
		if (radio.checked) radio.checked = false;
	});
	driverLicenseCheckboxes.forEach(checkbox => {
		if (checkbox.checked) checkbox.checked = false;
	});
	hasOwnCarCheckbox.checked = false;
	developerGrades.forEach(radio => {
		if (radio.checked) radio.checked = false;
	});
	employmentTypes.forEach(radio => {
		if (radio.checked) radio.checked = false;
	});
	hideElem(driverGradeFieldset);
	hideElem(driverLicenseFieldset);
	hideElem(driverFieldset);
	hideElem(ownCarsLabel);
	hideElem(developerGradeFieldset);
	hideElem(developerFieldset1);
	hideElem(developerFieldset2);
}

const showElem = (elem, prop = 'inline') => elem.style.display = prop;
const hideElem = (elem) => elem.style.display = 'none';
const ifCheckedShow = (checkbox, elemToShow) => {
	checkbox.checked ?
		showElem(elemToShow) :
		hideElem(elemToShow);
}
const dateToLocaleFormat = (str) => new Date(str).toLocaleDateString('ru');
const booleanToWords = (prop) => prop ? 'да' : 'нет';

const renderTable = () => {
	tableBody.innerHTML = '';
	employeesArray.forEach(object => {
		if (object._position === 'Водитель') {
			tableBody.insertAdjacentHTML('beforeend', `
				<tr>
					<td>${object._position}</td>
					<td>${object._firstName !== '' ? object._firstName : '-'}</td>
					<td>${object._lastName !== '' ? object._lastName : '-'}</td>
					<td>${object._birthDate ? dateToLocaleFormat(object._birthDate) : '-'}</td>
					<td>${booleanToWords(object._isMarried)}</td>
					<td>${object._children[0] !== '' ? object._children.join(', ') : 'нет'}</td>
					<td>${object._grade !== '' ? object._grade : '-'}</td>
					<td>${object._hiredDate ? dateToLocaleFormat(object._hiredDate) : '-'}</td>
					<td class="table-driver">${object._driverLicenses !== '' ? object._driverLicenses.join(', ') : '-'}</td>
					<td class="table-driver">${object._driverExperience !== '' ? object._driverExperience : '-'}</td>
					<td class="table-driver">${object._workСarMake !== '' ? object._workСarMake : 'нет'}</td>
					<td class="table-driver">${object._ownCars[0] !== '' ? object._ownCars.join(', ') : 'нет'}</td>
					<td class="table-developer">-</td>
					<td class="table-developer">-</td>
					<td><button class="table-del-btn" type="button"></button></td>
				</tr>
			`);
		} else if (object._position === 'Разработчик') {
			tableBody.insertAdjacentHTML('beforeend', `
				<tr>
					<td>${object._position}</td>
					<td>${object._firstName !== '' ? object._firstName : '-'}</td>
					<td>${object._lastName !== '' ? object._lastName : '-'}</td>
					<td>${object._birthDate ? dateToLocaleFormat(object._birthDate) : '-'}</td>
					<td>${booleanToWords(object._isMarried)}</td>
					<td>${object._children[0] !== '' ? object._children.join(', ') : 'нет'}</td>
					<td>${object._grade !== '' ? object._grade : '-'}</td>
					<td>${object._hiredDate ? dateToLocaleFormat(object._hiredDate) : '-'}</td>
					<td class="table-driver">-</td>
					<td class="table-driver">-</td>
					<td class="table-driver">-</td>
					<td class="table-driver">-</td>
					<td class="table-developer">${object._programmingLanguages[0] !== '' ? object._programmingLanguages.join(', ') : '-'}</td>
					<td class="table-developer">${object._employmentType !== undefined ? object._employmentType : '-'}</td>
					<td><button class="table-del-btn" type="button"></button></td>
				</tr>
			`);
		}
		delBtns = tableBody.querySelectorAll('.table-del-btn');
		delBtns.forEach((btn, index) => {
			if (btn.getAttribute('listener') !== 'true') {
				btn.setAttribute('listener', 'true');
				btn.addEventListener('click', () => {
					employeesArray.splice(index, 1);
					renewLocalStorage();
					renderTable();
				});
			}
		})
	});
}

class Employee {
	constructor(firstName, lastName, birthDate, isMarried, children = [], grade, hiredDate) {
		this._firstName = firstName;
		this._lastName = lastName;
		this._birthDate = birthDate;
		this._isMarried = isMarried;
		this._children = children;
		this._grade = grade;
		this._hiredDate = hiredDate;
	}

	get firstName() {
		return this._firstName;
	}
	set firstName(str) {
		this.firstName = str;
	}
	get lastName() {
		return this._lastName;
	}
	set lastName(str) {
		this.lastName = str;
	}
	get birthDate() {
		return this._birthDate;
	}
	set birthDate(str) {
		this.birthDate = str;
	}
	get isMarried() {
		return this._isMarried;
	}
	set isMarried(str) {
		this.isMarried = str;
	}
	get children() {
		return this._children;
	}
	set children(str) {
		this.children.push(str);
	}
	get hiredDate() {
		return this._hiredDate;
	}
	set hiredDate(str) {
		this.hiredDate = str;
	}
	get grade() {
		return this._grade;
	}
	set grade(str) {
		this.grade = str;
	}
	delete() {
		this.employeesArray.splice(this.index, 1);
		this.renewLocalStorage();
		this.renderTable();
	}
}

class Driver extends Employee {
	constructor(firstName, lastName, birthDate, isMarried, children, grade, hiredDate, driverLicenses = [], driverExperience, workСarMake, hasOwnCar, ownCars = []) {
		super(firstName, lastName, birthDate, isMarried, children, grade, hiredDate);
		this._position = 'Водитель';
		this._driverLicenses = driverLicenses;
		this._driverExperience = driverExperience;
		this._workСarMake = workСarMake;
		this._hasOwnCar = hasOwnCar;
		this._ownCars = ownCars;
	}
	get driverLicenses() {
		return this._driverLicenses;
	}
	set driverLicenses(str) {
		this.driverLicenses.push(str);
	}
	get driverExperience() {
		return this._driverExperience;
	}
	set driverExperience(str) {
		this.driverExperience = str;
	}
	get workСarMake() {
		return this._workСarMake;
	}
	set workСarMake(str) {
		this.workСarMake = str;
	}
	get hasOwnCar() {
		return this._hasOwnCar;
	}
	set hasOwnCar(str) {
		this.hasOwnCar = str;
	}
	get ownCars() {
		return this._ownCars;
	}
	set ownCars(str) {
		this.ownCars.push(str);
	}
}

class Developer extends Employee {
	constructor(firstName, lastName, birthDate, isMarried, children, grade, hiredDate, programmingLanguages = [], employmentType) {
		super(firstName, lastName, birthDate, isMarried, children, grade, hiredDate);
		this._position = 'Разработчик';
		this._programmingLanguages = programmingLanguages;
		this._employmentType = employmentType;
	}
	get programmingLanguages() {
		return this._programmingLanguages;
	}
	set programmingLanguages(str) {
		this.programmingLanguages.push(str);
	}
	get employmentType() {
		return this._employmentType;
	}
	set employmentType(str) {
		this.employmentType = str;
	}
}

hasOwnCarCheckbox.addEventListener('change', () =>
	ifCheckedShow(hasOwnCarCheckbox, ownCarsLabel));
selectEmployeePosition.addEventListener('change', () => {
	if (selectEmployeePosition.value === 'driver') {
		showElem(driverFieldset, 'block');
		showElem(driverGradeFieldset, 'block');
		showElem(driverLicenseFieldset, 'block');
		hideElem(developerGradeFieldset);
		hideElem(developerFieldset1);
		hideElem(developerFieldset2);
	} else if (selectEmployeePosition.value === 'developer') {
		showElem(developerGradeFieldset, 'block');
		showElem(developerFieldset1, 'block');
		showElem(developerFieldset2, 'block');
		hideElem(driverGradeFieldset);
		hideElem(driverLicenseFieldset);
		hideElem(driverFieldset);
	}
})

saveBtn.addEventListener('click', (evt) => {
	evt.preventDefault();
	if (selectEmployeePosition.value === 'driver') {
		const driver = new Driver(inputsCollection[0].value, inputsCollection[1].value, inputsCollection[2].value, isMarriedCheckbox.checked, [], '', inputsCollection[4].value, [], driverExperienceInput.value, inputsCollection[5].value, hasOwnCarCheckbox.checked, []);
		driver._children = inputsCollection[3].value.split(', ');
		driverGrades.forEach(option => {
			if (option.checked) driver._grade = option.labels[0].innerText.trim();
		});
		driverLicenseCheckboxes.forEach(checkbox => {
			if (checkbox.checked) {
				const checkBoxLabel = checkbox.labels[0].innerText;
				driver._driverLicenses.push(checkBoxLabel);
			}
		});
		driver._ownCars = inputsCollection[6].value.split(', ');
		employeesArray.push(driver);
	} else if (selectEmployeePosition.value === 'developer') {
		const developer = new Developer(inputsCollection[0].value, inputsCollection[1].value, inputsCollection[2].value, isMarriedCheckbox.checked, [], '', inputsCollection[4].value, []);
		if (developer._children[0] !== '') developer._children = inputsCollection[3].value.split(', ');
		if (developer._programmingLanguages[0] !== '') developer._programmingLanguages = inputsCollection[7].value.split(', ');
		developerGrades.forEach(option => {
			if (option.checked) developer._grade = option.labels[0].innerText.trim();
		});
		employmentTypes.forEach(option => {
			if (option.checked) developer._employmentType = option.labels[0].innerText.trim();
		});
		employeesArray.push(developer);
	}
	clearInputs();
	renewLocalStorage();
	renderTable();
})

renderTable();