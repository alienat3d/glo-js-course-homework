'use strict';

const SERVER_URL = 'https://jsonplaceholder.typicode.com/post';
// const SERVER_URL = 'http://localhost:3000/posts';
const LOCAL_DB = 'db/db.json';

const btn = document.querySelector('button');

const getData = (LOCAL_DB) =>
	fetch(LOCAL_DB)
		.then(res => {
			if (res.status === 200) {
				return res.json();
			} else {
				throw new Error("Произошла ошибка, данные не были найдены!");
			}
		})
		.then(data => sendData(SERVER_URL, data))
		.catch(err => console.warn(err));

function sendData(url, data) {
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then(res => {
		if (res.status === 201) {
			return res.json();
		} else {
			throw new Error("Произошла ошибка, данные не были сохранены!");
		}
	})
		.catch(err => console.warn(err));
}

btn.addEventListener('click', () => getData(LOCAL_DB));