const id = localStorage.getItem('id');
const request = new XMLHttpRequest();
const url = `http://localhost:5000/user/${id}`;
const reqURL = new URL(url);

request.open('GET', reqURL.toString(), false);
request.setRequestHeader('Content-Type', 'application/json');

const firstname = document.getElementById('first_name');
const lastname = document.getElementById('last_name');
const email = document.getElementById('email');
request.send();
firstname.insertAdjacentHTML('beforeend', JSON.parse(request.responseText).first_name);
lastname.insertAdjacentHTML('beforeend', JSON.parse(request.responseText).last_name);
email.insertAdjacentHTML('beforeend', JSON.parse(request.responseText).email);
