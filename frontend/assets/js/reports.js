document.addEventListener('DOMContentLoaded', () => {
    loadBooksList();
});

async function loadBooksList() {
    try {
        renderBooksList(await apiRequest(ENDPOINTS.books));
    } catch (error) {
        console.error('Error loading books list:', error);
        renderBooksList([]);
    }
}

function renderBooksList(books) {
    const list = document.getElementById('books-list');

    list.innerHTML = `
        <li class="list-header no-actions">
            <span>TÍTULO</span>
            <span>AUTOR</span>
            <span>STATUS</span>
        </li>
    `;

    books.forEach(book => {
        const li = document.createElement('li');
        li.className = 'list-item no-actions';
        li.innerHTML = `
            <span>${book.title}</span>
            <span>${book.author}</span>
            <span class="${book.status ? 'status-active' : 'status-inactive'}">${book.status ? 'Disponível' : 'Emprestado'}</span>
        `;
        list.appendChild(li);
    });
}
