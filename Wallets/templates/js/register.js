// http://localhost:63342/Wallets/Wallets/templates/register.html
localStorage.setItem('id', null);

const reqURL = new URL('http://localhost:5000/user');
if (document.forms[0] && window.FormData) {
    const form = document.forms[0];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const request = new XMLHttpRequest();

        const firstname = document.getElementById('first_name').value;
        const lastname = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        reqURL.searchParams.append('email', email);
        reqURL.searchParams.append('first_name', firstname);
        reqURL.searchParams.append('last_name', lastname);
        reqURL.searchParams.append('password', password);

        request.open('POST', reqURL.toString(), false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send();

        localStorage.setItem('id', JSON.parse(request.responseText).id);
        request.onreadystatechange = function f() {
            if (request.readyState === 4) {
                if (request.status === 200 && request.status < 300) window.location.href = 'profile.html';
            }
        };
    });
}
