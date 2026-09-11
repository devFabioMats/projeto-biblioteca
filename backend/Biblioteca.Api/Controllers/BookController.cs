using Microsoft.AspNetCore.Mvc;
using Biblioteca.Data;
using Biblioteca.Models;

namespace Biblioteca.Controllers;

[ApiController]
[Route("lib-api/[controller]")]
public class BookController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Book>> GetAll() => Ok(DataStore.Books);

    [HttpGet("Dashboard")]
    public ActionResult<DashboardResponse> GetDashboard()
    {
        var umMesAtras = DateTime.Now.AddMonths(-1);

        return Ok(new DashboardResponse
        {
            Total = DataStore.Books.Count,
            LastMonth = DataStore.Books.Count(b => b.CreatedAt >= umMesAtras),
            Borrowed = DataStore.Books.Count(b => !b.Status)
        });
    }

    [HttpGet("Search")]
    public ActionResult<List<Book>> Search([FromQuery] string title)
    {
        return Ok(DataStore.Books
            .Where(b => b.Title.Contains(title, StringComparison.OrdinalIgnoreCase))
            .ToList());
    }

    [HttpGet("{id:int}")]
    public ActionResult<Book> GetById(int id)
    {
        var book = DataStore.Books.FirstOrDefault(b => b.Id == id);
        return book is null ? NotFound() : Ok(book);
    }

    [HttpPost]
    public ActionResult<Book> Create([FromBody] Book book)
    {
        book.Id = DataStore.NextBookId++;
        book.CreatedAt = DateTime.Now;

        DataStore.Books.Add(book);
        DataStore.SaveBooks();

        return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] Book book)
    {
        var existente = DataStore.Books.FirstOrDefault(b => b.Id == id);
        if (existente is null)
        {
            return NotFound();
        }

        existente.Status = book.Status;
        existente.Title = book.Title;
        existente.Author = book.Author;
        existente.Year = book.Year;
        existente.Genre = book.Genre;
        existente.Publisher = book.Publisher;
        existente.Isbn = book.Isbn;
        existente.Synopsis = book.Synopsis;
        existente.Notes = book.Notes;

        DataStore.SaveBooks();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var existente = DataStore.Books.FirstOrDefault(b => b.Id == id);
        if (existente is null)
        {
            return NotFound();
        }

        DataStore.Books.Remove(existente);
        DataStore.SaveBooks();

        return NoContent();
    }
}
