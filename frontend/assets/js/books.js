document.addEventListener('DOMContentLoaded', () => {
    loadBooks();

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            const term = searchInput.value.trim();
            term === '' ? loadBooks() : searchBooks(term);
        });
    }
});

async function loadBooks() {
    try {
        renderBooks(await apiRequest(ENDPOINTS.books));
    } catch (error) {
        console.error('Error loading books:', error);
        renderBooks([]);
    }
}

async function searchBooks(term) {
    try {
        renderBooks(await apiRequest(ENDPOINTS.booksSearch(term)));
    } catch (error) {
        console.error('Error searching books:', error);
    }
}

function renderBooks(books) {
    const list = document.getElementById('books-list');

    list.innerHTML = `
        <li class="list-header">
            <span>TÍTULO</span>
            <span>AUTOR</span>
            <span>STATUS</span>
            <span>AÇÕES</span>
        </li>
    `;

    books.forEach(book => {
        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `
            <span>${book.title}</span>
            <span>${book.author}</span>
            <span class="${book.status ? 'status-active' : 'status-inactive'}">${book.status ? 'Disponível' : 'Emprestado'}</span>
            <span class="actions">
                <span class="material-symbols-outlined" title="Editar">edit</span>
                <span class="material-symbols-outlined" title="Excluir">delete_forever</span>
            </span>
        `;

        const [editButton, deleteButton] = li.querySelectorAll('.actions .material-symbols-outlined');
        editButton.addEventListener('click', () => window.location.href = `book-form.html?id=${book.id}`);
        deleteButton.addEventListener('click', () => deleteBook(book.id));

        list.appendChild(li);
    });
}

async function deleteBook(id) {
    if (!confirm('Deseja realmente excluir este livro?')) {
        return;
    }

    try {
        await apiRequest(ENDPOINTS.bookById(id), { method: 'DELETE' });
        loadBooks();
    } catch (error) {
        console.error('Error deleting book:', error);
        alert('❌ Não foi possível excluir o livro.');
    }
}
