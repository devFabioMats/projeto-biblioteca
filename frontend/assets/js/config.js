/*
 * Configuração central de acesso à API (.NET + Swagger).
 * Ajuste API_BASE_URL conforme a porta do seu projeto dotnet.
 */

const API_BASE_URL = 'https://localhost:7180/lib-api';

const ENDPOINTS = {
    login: `${API_BASE_URL}/Librarian/Login`,

    librarians: `${API_BASE_URL}/Librarian`,
    librarianById: (id) => `${API_BASE_URL}/Librarian/${id}`,

    books: `${API_BASE_URL}/Book`,
    bookById: (id) => `${API_BASE_URL}/Book/${id}`,
    booksDashboard: `${API_BASE_URL}/Book/Dashboard`,
    booksSearch: (title) => `${API_BASE_URL}/Book/Search?title=${encodeURIComponent(title)}`
};

async function apiRequest(url, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {})
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const error = new Error(`Request failed (${response.status})`);
        error.status = response.status;
        throw error;
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}
