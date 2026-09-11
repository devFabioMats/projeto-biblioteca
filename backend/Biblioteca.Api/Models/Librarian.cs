namespace Biblioteca.Models;

/// <summary>Bibliotecário (usuário administrador do sistema).</summary>
public class Librarian
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
