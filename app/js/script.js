'use strict';
/* 
1) Создать функцию-конструктор DomElement, который

[✓] содержит свойства:
  - selector,
  - height,
  - width,
  - bg,
  - fontSize

[✓] содержит метод, который создает элемент на странице в зависимости от условия:

	- если строка selector начинается с точки, создаем div с классом
	- если строка selector начинается с решетки # то создаем параграф с id

[✓] пример:

	- если передана строка '.block', то функция конструктор создает элемент с class="block"
	- если передана строка '#best', то функция конструктор создает элемент с id =best"

[✓] с помощью cssText задавать стили:
  - высотой - height,
  - шириной - width,
  - background - bg
  - размер текста fontSize

[✓] Внутрь созданного блока записывать любой текст. Метод записи может быть любым.
[✓] 2) Создать новый объект на основе класса DomElement
[✓] 3) Вызвать его метод чтобы создать элемент на странице
*/

const DomElement = function (selector, height, width, bg, fontSize, text) {
	this.selector = selector;
	this.height = height;
	this.width = width;
	this.bg = bg;
	this.fontSize = fontSize;
	this.text = text;

	this.createElem = function () {
		const prefixSelector = this.selector.slice(0, 1);
		let element;

		if (prefixSelector === '.') {
			element = document.createElement('div');
			element.classList.add(this.selector.substring(1));
		} else if (prefixSelector === '#') {
			element = document.createElement('p');
			element.setAttribute('id', this.selector.substring(1));
		} else {
			console.error('Проверьте селектор, разрешены для ввода только класс (".") и id ("#")');
		}

		element.style.cssText = `
			height: ${this.height};
			width: ${this.width};
			background: ${this.bg};
			font-size: ${this.fontSize};
		`;

		element.textContent = this.text;
		
		document.body.append(element);
	}
}

const newDivElement = new DomElement('.some-block', '200px', '400px', '#ccc', '20px', 'The quick brown fox jumps over the lazy dog');
const newParagraphElement = new DomElement('#something-important', '300px', '500px', '#b92f2f', '40px', 'Lorem ipsum');

newDivElement.createElem();
newParagraphElement.createElem();