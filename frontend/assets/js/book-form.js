document.addEventListener('DOMContentLoaded', () => {
    const bookId = getIdFromUrl();

    if (bookId) {
        document.getElementById('form-title').innerText = 'Editar livro';
        loadBook(bookId);
    }

    document.getElementById('book-form').addEventListener('submit', (event) => {
        event.preventDefault();
        bookId ? updateBook(bookId) : createBook();
    });
});

function getIdFromUrl() {
    const id = new URLSearchParams(window.location.search).get('id');
    return id ? Number.parseInt(id) : null;
}

function validateFields(title, author) {
    if (!title) {
        alert('⚠️ O campo título deve estar preenchido.');
        return false;
    }

    if (!author) {
        alert('⚠️ O campo autor deve estar preenchido.');
        return false;
    }

    return true;
}

function getFormData() {
    return {
        status: document.getElementById('status').checked,
        title: document.getElementById('title').value.trim(),
        author: document.getElementById('author').value.trim(),
        year: Number.parseInt(document.getElementById('year').value) || 0,
        genre: document.getElementById('genre').value.trim(),
        isbn: document.getElementById('isbn').value.trim(),
        publisher: document.getElementById('publisher').value.trim(),
        synopsis: document.getElementById('synopsis').value.trim(),
        notes: document.getElementById('notes').value.trim()
    };
}

async function loadBook(id) {
    try {
        const book = await apiRequest(ENDPOINTS.bookById(id));

        document.getElementById('status').checked = !!book.status;
        document.getElementById('title').value = book.title ?? '';
        document.getElementById('author').value = book.author ?? '';
        document.getElementById('year').value = book.year ?? '';
        document.getElementById('genre').value = book.genre ?? '';
        document.getElementById('isbn').value = book.isbn ?? '';
        document.getElementById('publisher').value = book.publisher ?? '';
        document.getElementById('synopsis').value = book.synopsis ?? '';
        document.getElementById('notes').value = book.notes ?? '';
    } catch (error) {
        console.error('Error loading book:', error);
        alert('❌ Não foi possível carregar o livro.');
    }
}

async function createBook() {
    const data = getFormData();
    if (!validateFields(data.title, data.author)) return;

    try {
        await apiRequest(ENDPOINTS.books, { method: 'POST', body: JSON.stringify(data) });
        window.location.href = 'books.html';
    } catch (error) {
        console.error('Error saving book:', error);
        alert('❌ Não foi possível gravar o livro.');
    }
}

async function updateBook(id) {
    const data = getFormData();
    if (!validateFields(data.title, data.author)) return;

    try {
        await apiRequest(ENDPOINTS.bookById(id), { method: 'PUT', body: JSON.stringify({ id, ...data }) });
        window.location.href = 'books.html';
    } catch (error) {
        console.error('Error updating book:', error);
        alert('❌ Não foi possível editar o livro.');
    }
}
