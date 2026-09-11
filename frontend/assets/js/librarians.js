document.addEventListener('DOMContentLoaded', () => {
    loadLibrarians();
});

async function loadLibrarians() {
    try {
        renderLibrarians(await apiRequest(ENDPOINTS.librarians));
    } catch (error) {
        console.error('Error loading librarians:', error);
        renderLibrarians([]);
    }
}

function renderLibrarians(librarians) {
    const list = document.getElementById('librarians-list');

    list.innerHTML = `
        <li class="list-header no-actions" style="grid-template-columns: 2fr 2fr 1fr;">
            <span>NOME</span>
            <span>E-MAIL</span>
            <span>AÇÕES</span>
        </li>
    `;

    librarians.forEach(librarian => {
        const li = document.createElement('li');
        li.className = 'list-item no-actions';
        li.style.gridTemplateColumns = '2fr 2fr 1fr';
        li.innerHTML = `
            <span>${librarian.name}</span>
            <span>${librarian.email}</span>
            <span class="actions">
                <span class="material-symbols-outlined" title="Editar">edit</span>
                <span class="material-symbols-outlined" title="Excluir">delete_forever</span>
            </span>
        `;

        const [editButton, deleteButton] = li.querySelectorAll('.actions .material-symbols-outlined');
        editButton.addEventListener('click', () => window.location.href = `librarian-form.html?id=${librarian.id}`);
        deleteButton.addEventListener('click', () => deleteLibrarian(librarian.id));

        list.appendChild(li);
    });
}

async function deleteLibrarian(id) {
    if (!confirm('Deseja realmente excluir este bibliotecário?')) {
        return;
    }

    try {
        await apiRequest(ENDPOINTS.librarianById(id), { method: 'DELETE' });
        loadLibrarians();
    } catch (error) {
        console.error('Error deleting librarian:', error);
        alert('❌ Não foi possível excluir o bibliotecário.');
    }
}
