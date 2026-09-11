document.addEventListener('DOMContentLoaded', () => {
    const librarianId = getIdFromUrl();

    if (librarianId) {
        document.getElementById('form-title').innerText = 'Editar bibliotecário';
        loadLibrarian(librarianId);
    }

    document.getElementById('librarian-form').addEventListener('submit', (event) => {
        event.preventDefault();
        librarianId ? updateLibrarian(librarianId) : createLibrarian();
    });
});

function getIdFromUrl() {
    const id = new URLSearchParams(window.location.search).get('id');
    return id ? Number.parseInt(id) : null;
}

function validateFields(name, email, password) {
    if (!name) {
        alert('⚠️ O campo nome deve estar preenchido.');
        return false;
    }

    if (!email) {
        alert('⚠️ O campo email deve estar preenchido.');
        return false;
    } else if (!email.includes('@') || !email.includes('.')) {
        alert("⚠️ O campo de e-mail deve conter um '@' e um '.dominio'.");
        return false;
    }

    if (!password) {
        alert('⚠️ O campo senha deve estar preenchido.');
        return false;
    }

    return true;
}

async function loadLibrarian(id) {
    try {
        const librarian = await apiRequest(ENDPOINTS.librarianById(id));
        document.getElementById('name').value = librarian.name ?? '';
        document.getElementById('email').value = librarian.email ?? '';
    } catch (error) {
        console.error('Error loading librarian:', error);
        alert('❌ Não foi possível carregar o bibliotecário.');
    }
}

async function createLibrarian() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!validateFields(name, email, password)) return;

    try {
        await apiRequest(ENDPOINTS.librarians, { method: 'POST', body: JSON.stringify({ name, email, password }) });
        window.location.href = 'librarians.html';
    } catch (error) {
        console.error('Error saving librarian:', error);
        alert('❌ Não foi possível gravar o bibliotecário.');
    }
}

async function updateLibrarian(id) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!validateFields(name, email, password)) return;

    try {
        await apiRequest(ENDPOINTS.librarianById(id), { method: 'PUT', body: JSON.stringify({ id, name, email, password }) });
        window.location.href = 'librarians.html';
    } catch (error) {
        console.error('Error updating librarian:', error);
        alert('❌ Não foi possível editar o bibliotecário.');
    }
}
