using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

[ApiController]
[Route("api/[controller]")]
public class AboutController : ControllerBase
{
    private readonly string _filePath;

    public AboutController(IWebHostEnvironment env)
    {
        _filePath = Path.Combine(env.ContentRootPath, "about-content.txt");
    }

    // GET: api/about
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAboutContent()
    {
        if (!System.IO.File.Exists(_filePath))
        {
            // If the file doesn't exist, return a default message.
            return Ok("The about-content.txt file was not found on the server.");
        }

        var content = await System.IO.File.ReadAllTextAsync(_filePath);
        return Ok(content);
    }

    // POST: api/about
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateAboutContent([FromBody] string content)
    {
        await System.IO.File.WriteAllTextAsync(_filePath, content);
        return Ok(new { message = "About page content updated successfully." });
    }
}