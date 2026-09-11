/*
 * Authentication and session control.
 * While the back-end doesn't exist yet, login() is already wired to the
 * API call (see TODO below), but it will fail normally until the
 * endpoint exists.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            login();
        });
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    }

    checkSession();
    fillUserName();
});

async function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('⚠️ Preencha email e senha.');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert("⚠️ O campo de e-mail deve conter um '@' e um '.dominio'.");
        return;
    }

    try {
        // TODO: replace/validate once the back-end login endpoint is ready
        const result = await apiRequest(ENDPOINTS.login, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        localStorage.setItem('token', result.token);
        localStorage.setItem('userName', result.name ?? '');
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Login error:', error);
        alert('❌ Email ou senha inválidos.');
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

function checkSession() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'login.html' || currentPage === '') {
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
}

function fillUserName() {
    const name = localStorage.getItem('userName');
    const userNameSpan = document.getElementById('user-name');
    if (userNameSpan) {
        userNameSpan.innerText = name && name !== 'null' ? name : 'Usuário';
    }
}
