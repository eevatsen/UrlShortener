using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using UrlShortener.Data;

[ApiController]
public class RedirectController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RedirectController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{shortCode}")] 
    public async Task<IActionResult> RedirectToUrl(string shortCode)
    {
        var url = await _context.ShortUrls
            .FirstOrDefaultAsync(u => u.ShortCode == shortCode);

        if (url == null)
        {
            return NotFound("Short URL not found.");
        }

        return Redirect(url.OriginalUrl);
    }
}