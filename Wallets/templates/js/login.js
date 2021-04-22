// http://localhost:63342/Wallets/Wallets/templates/login.html
localStorage.setItem('id', null);
if (document.forms[0] && window.FormData) {
    const form = document.forms[0];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const request = new XMLHttpRequest();
        // form.appendChild(statusMessage);

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const reqURL = new URL('http://localhost:5000/login');

        reqURL.searchParams.append('email', email);
        reqURL.searchParams.append('password', password);

        request.open('GET', reqURL.toString(), false);
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
