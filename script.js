'use strict';

const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';
const LOCAL_DB = 'db.json';

const obj = {
  name: 'John',
  email: 'john@example.com',
  password: 'password@example.com',
  gender: 'male',
}

const getData = (LOCAL_DB) => {
  fetch(LOCAL_DB)
    .then(res => res.json());
}

function sendData(url, data) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json;charset=UTF-8'
    },
  })
    .then(res => res.json())
}

getData(LOCAL_DB);
sendData('db.json[posts]', obj);