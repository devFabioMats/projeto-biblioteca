using Microsoft.AspNetCore.Mvc;
using Biblioteca.Data;
using Biblioteca.Models;

namespace Biblioteca.Controllers;

[ApiController]
[Route("lib-api/[controller]")]
public class LibrarianController : ControllerBase
{
    [HttpPost("Login")]
    public ActionResult<LoginResponse> Login([FromBody] LoginRequest login)
    {
        var librarian = DataStore.Librarians.FirstOrDefault(l =>
            l.Email.Equals(login.Email, StringComparison.OrdinalIgnoreCase) &&
            l.Password == login.Password);

        if (librarian is null)
        {
            return Unauthorized();
        }

        return Ok(new LoginResponse { Token = Guid.NewGuid().ToString(), Name = librarian.Name });
    }

    [HttpGet]
    public ActionResult<List<Librarian>> GetAll() => Ok(DataStore.Librarians);

    [HttpGet("{id:int}")]
    public ActionResult<Librarian> GetById(int id)
    {
        var librarian = DataStore.Librarians.FirstOrDefault(l => l.Id == id);
        return librarian is null ? NotFound() : Ok(librarian);
    }

    [HttpPost]
    public ActionResult<Librarian> Create([FromBody] Librarian librarian)
    {
        librarian.Id = DataStore.NextLibrarianId++;
        DataStore.Librarians.Add(librarian);
        DataStore.SaveLibrarians();

        return CreatedAtAction(nameof(GetById), new { id = librarian.Id }, librarian);
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] Librarian librarian)
    {
        var existente = DataStore.Librarians.FirstOrDefault(l => l.Id == id);
        if (existente is null)
        {
            return NotFound();
        }

        existente.Name = librarian.Name;
        existente.Email = librarian.Email;
        existente.Password = librarian.Password;

        DataStore.SaveLibrarians();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var existente = DataStore.Librarians.FirstOrDefault(l => l.Id == id);
        if (existente is null)
        {
            return NotFound();
        }

        DataStore.Librarians.Remove(existente);
        DataStore.SaveLibrarians();

        return NoContent();
    }
}
