document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    loadLatestBooks();
});

async function loadDashboard() {
    try {
        const cards = await apiRequest(ENDPOINTS.booksDashboard);
        document.getElementById('total-books').innerText = cards.total ?? 0;
        document.getElementById('books-month').innerText = cards.lastMonth ?? 0;
        document.getElementById('books-borrowed').innerText = cards.borrowed ?? 0;
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

async function loadLatestBooks() {
    try {
        const books = await apiRequest(ENDPOINTS.books);
        renderLatestBooks(books.slice(0, 5));
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

function renderLatestBooks(books) {
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
