const id = localStorage.getItem('id');

const reqURL = new URL('http://localhost:5000/wallet');
if (document.forms[0] && window.FormData) {
    const form = document.forms[0];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const request = new XMLHttpRequest();
        const name = document.getElementById('name').value;
        const funds = document.getElementById('funds').value;
        // const reqURL = new URL('http://localhost:5000/user');

        reqURL.searchParams.append('name', name);
        reqURL.searchParams.append('owner_id', id);
        reqURL.searchParams.append('funds', funds);

        request.open('POST', reqURL.toString(), true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send();

        request.onreadystatechange = function fuct() {
            if (request.readyState === 4) {
                if (request.status === 200 && request.status < 300) window.location.href = 'wallets.html';
            }
        };
    });
}
