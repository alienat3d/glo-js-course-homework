'use strict';

/* 
[] 1) Создайте клиентскую часть веб - приложения для управления сущностями в соответствии с заданием :
Используйте наследование в процессе выполнения задания.
Каждый класс должен содержать конструктор, геттеры и сеттеры, а также другие необходимые методы.
Базовый класс должен состоять из минимум 4 свойств различных типов.
Каждый класс - наследник должен расширять базовый класс и включать два или более дополнительных свойства.
Использовать тематику на выбор или придумать свою. Примеры:
Класс «Растение». Наследуемые классы: папоротник и ель обыкновенная. Возможные поля: название, описание, вид, возраст, класс, размер соцветия, класс опасности, ареал произрастания, область применения (в пищевой промышленности, в получении лекарственных препаратов, в сельском хозяйстве...), первооткрыватель, место произрастания и т.д.
или
Класс «Работник». Наследуемые классы: слесарь и водитель. Возможные поля: имя, фамилия, возраст, должность, организация, разряд, наличие детей, дата принятия на работу т.д.
[] 2) Сверстать страницу (стили на свое усмотрение). На странице должна быть форма и таблица.
Форма: Поля ввода смысловые. Например: Фамилия и имя - type=text, наличие детей - type=checkbox. Обязательно один select с списком классов-наследников для выбора класса создателя сущности (объекта). Если используем родительский класс Работник то в select должны быть, к примеру, Слесарь и Водитель и на основе выбранного варианта новый объект будет создан на основе одного из классов-наследников. 
Под формой - кнопка "Сохранить". Поля формы должны быть обязательные для отправки.
Таблица: на каждое свойство по колонке, последняя дополнительная колонка имеет кнопку "Удалить" .
[] 3) При Сохранении данных из формы создаем объект на основе выбранного класса-наследника. Записываем каждую сущность в единый массив.
[] 4) Данные из объектов в массиве должны сохраняться в localStorage и выводиться на страницу в таблице
[] 5) При обновлении страницы данные должны сохраняться
[] 6) При нажатии кнопки "Удалить" данный объект должен быть удален из массива данных, со страницы и с localStorage. Для удаления использовать метод класса!
*/

const selectEmployeePosition = document.getElementById('position');
const isMarriedCheckbox = document.getElementById('is-married');
const childrenLabel = document.querySelector('[for="children"]');
const driverFieldset = document.getElementById('driver-fieldset');
const developerLabel = document.querySelector('[for="programming-languages"]');
const developerFieldset = document.getElementById('developer-fieldset');
const hasOwnCarCheckbox = document.getElementById('has-own-car');
const ownCarsLabel = document.querySelector('[for="own-cars"]');

const createDelBtn = () => {
	const tableRows = document.querySelectorAll('tbody tr');
	const elem = document.createElement('button');
	elem.classList.add('del-btn');
	tableRows[tableRows.length - 1].append(elem);
}
const showElem = (elem, prop = 'inline') => elem.style.display = prop;
const hideElem = (elem) => elem.style.display = 'none';
const ifCheckedShow = (checkbox, elemToShow) => {
	checkbox.checked ?
		showElem(elemToShow) :
		hideElem(elemToShow);
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
	get grade() {
		return this._grade;
	}
	set grade(str) {
		this.grade = str;
	}
	get hiredDate() {
		return this._hiredDate;
	}
	set hiredDate(str) {
		this.hiredDate = str;
	}
	/* 	delete() {
	
		} */
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
	/* hello() {
		super.hello();
		console.log('А я наследуемый метод!');
	} */
}
isMarriedCheckbox.addEventListener('change', () =>
	ifCheckedShow(isMarriedCheckbox, childrenLabel));
hasOwnCarCheckbox.addEventListener('change', () =>
	ifCheckedShow(hasOwnCarCheckbox, ownCarsLabel));

selectEmployeePosition.addEventListener('change', () => {
	if (selectEmployeePosition.value === 'driver') {
		showElem(driverFieldset, 'block');
		hideElem(developerFieldset);
		hideElem(developerLabel);
	} else if (selectEmployeePosition.value === 'developer') {
		showElem(developerLabel);
		showElem(developerFieldset, 'block');
		hideElem(driverFieldset);
	}
})