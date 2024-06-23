'use strict';

/* 
Используя только файл JS-скрипта выполнить такие действия:
[✓] 1) Восстановить порядок книг;
[✓] 2) Заменить картинку заднего фона на другую из папки image;
[✓] 3) Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов");
[✓] 4) Удалить рекламу со страницы;
[✓] 5) Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools);
[✓] 6) В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место.
*/

const booksList = document.querySelector('.books');
const booksArr = document.querySelectorAll('.book');

// [1]
booksList.append(booksArr[2]);
booksList.prepend(booksArr[1]);
booksArr[3].before(booksArr[4])

// [2]
document.body.style.backgroundImage = 'url("./images/you-dont-know-js.jpg")';

// [3]
const bookTitle = booksArr[4].querySelector('a');

bookTitle.textContent = 'Книга 3. this и Прототипы Объектов';

// [4]
const advert = document.querySelector('.adv');

advert.remove();

// [5] Восстановить порядок глав во второй и пятой книге
const secondBookTitlesArr = booksArr[0].querySelectorAll('ul > li');
const fifthBookTitlesArr = booksArr[5].querySelectorAll('ul > li');

secondBookTitlesArr[10].before(secondBookTitlesArr[2]);
secondBookTitlesArr[9].before(secondBookTitlesArr[7]);
secondBookTitlesArr[7].before(secondBookTitlesArr[5]);
secondBookTitlesArr[8].after(secondBookTitlesArr[4]);

fifthBookTitlesArr[10].before(fifthBookTitlesArr[5]);
fifthBookTitlesArr[5].after(fifthBookTitlesArr[8]);
fifthBookTitlesArr[4].after(fifthBookTitlesArr[2]);
fifthBookTitlesArr[3].before(fifthBookTitlesArr[9]);

// [6] В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место.
const sixthBookTitlesArr = booksArr[2].querySelectorAll('ul > li');

const title = document.createElement('li');

title.textContent = 'Глава 8: За пределами ES6';

sixthBookTitlesArr[9].insertAdjacentElement('beforebegin', title);