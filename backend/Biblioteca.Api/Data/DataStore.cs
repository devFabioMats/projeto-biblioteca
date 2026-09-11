using System.Text.Json;
using Biblioteca.Models;

namespace Biblioteca.Data;

/// <summary>"Banco de dados" em arquivos JSON (Data/Storage), sem banco relacional ainda.</summary>
public static class DataStore
{
    private static readonly object FileLock = new();
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };

    private static string StorageFolder => Path.Combine(Directory.GetCurrentDirectory(), "Data", "Storage");
    private static string BooksFilePath => Path.Combine(StorageFolder, "books.json");
    private static string LibrariansFilePath => Path.Combine(StorageFolder, "librarians.json");

    public static List<Book> Books { get; } = Load<Book>(BooksFilePath, DefaultBooks);
    public static List<Librarian> Librarians { get; } = Load<Librarian>(LibrariansFilePath, DefaultLibrarians);

    public static int NextBookId = Books.Count == 0 ? 1 : Books.Max(b => b.Id) + 1;
    public static int NextLibrarianId = Librarians.Count == 0 ? 1 : Librarians.Max(l => l.Id) + 1;

    public static void SaveBooks() => Save(BooksFilePath, Books);
    public static void SaveLibrarians() => Save(LibrariansFilePath, Librarians);

    private static List<T> Load<T>(string path, Func<List<T>> seedFactory)
    {
        Directory.CreateDirectory(StorageFolder);

        if (File.Exists(path))
        {
            var json = File.ReadAllText(path);
            return JsonSerializer.Deserialize<List<T>>(json) ?? new List<T>();
        }

        var seed = seedFactory();
        File.WriteAllText(path, JsonSerializer.Serialize(seed, JsonOptions));
        return seed;
    }

    private static void Save<T>(string path, List<T> items)
    {
        lock (FileLock)
        {
            Directory.CreateDirectory(StorageFolder);
            File.WriteAllText(path, JsonSerializer.Serialize(items, JsonOptions));
        }
    }

    private static List<Book> DefaultBooks() => new()
    {
        new() { Id = 1, Status = true, Title = "Dom Casmurro", Author = "Machado de Assis", Year = 1899, Genre = "Romance", Publisher = "Garnier", Isbn = "978-85-000-0001", Synopsis = "Bentinho relembra a infância e o ciúme de Capitu.", CreatedAt = DateTime.Now.AddDays(-5) },
        new() { Id = 2, Status = false, Title = "1984", Author = "George Orwell", Year = 1949, Genre = "Ficção científica", Publisher = "Companhia das Letras", Isbn = "978-85-000-0002", Synopsis = "Distopia totalitária vigiada pelo Grande Irmão.", CreatedAt = DateTime.Now.AddDays(-12) },
    };

    private static List<Librarian> DefaultLibrarians() => new()
    {
        new() { Id = 1, Name = "Fabio Eizo Matsumoto", Email = "fabio@gmail.com", Password = "123" }
    };
}
