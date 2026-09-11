namespace Biblioteca.Models;

/// <summary>Cadastro principal: um livro do acervo.</summary>
public class Book
{
    public int Id { get; set; }
    public bool Status { get; set; } // true = Disponível, false = Emprestado
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public int Year { get; set; }
    public string Genre { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public string Isbn { get; set; } = string.Empty;
    public string Synopsis { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
