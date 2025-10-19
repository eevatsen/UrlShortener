// Controllers/UrlsController.cs

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using UrlShortener.Data;
using UrlShortener.Dtos;
using UrlShortener.Entities;

[ApiController]
[Route("api/[controller]")]
public class UrlsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UrlShorteningService _urlShorteningService;

    public UrlsController(ApplicationDbContext context, UrlShorteningService urlShorteningService)
    {
        _context = context;
        _urlShorteningService = urlShorteningService;
    }

    [HttpGet]
    [AllowAnonymous]
    //[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)] // Keep this for good measure
    public async Task<IActionResult> GetUrls()
    {
        var urls = await _context.ShortUrls
            .AsNoTracking() // <-- ADD THIS LINE
            .OrderByDescending(u => u.CreatedAt)
            .Select(u => new UrlDetailsDto
            {
                Id = u.Id,
                OriginalUrl = u.OriginalUrl,
                ShortCode = u.ShortCode,
                CreatedAt = u.CreatedAt,
                CreatedByUsername = u.CreatedBy.Username
            })
            .ToListAsync();

        return Ok(urls);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddUrl([FromBody] UrlCreateDto urlCreateDto)
    {
        if (!Uri.IsWellFormedUriString(urlCreateDto.OriginalUrl, UriKind.Absolute))
        {
            return BadRequest("A valid URL must be provided.");
        }

        var existingUrl = await _context.ShortUrls.FirstOrDefaultAsync(u => u.OriginalUrl == urlCreateDto.OriginalUrl);
        if (existingUrl != null)
        {
            return BadRequest("This URL has already been shortened.");
        }

        // Get both ID and Username from the token claims
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var username = User.FindFirstValue(ClaimTypes.Name); // Get the username

        var newUrl = new ShortUrl
        {
            OriginalUrl = urlCreateDto.OriginalUrl,
            ShortCode = string.Empty,
            CreatedAt = DateTime.UtcNow,
            CreatedById = userId
        };

        await _context.ShortUrls.AddAsync(newUrl);
        await _context.SaveChangesAsync();

        newUrl.ShortCode = _urlShorteningService.Encode(newUrl.Id);
        await _context.SaveChangesAsync();

        var responseDto = new UrlDetailsDto
        {
            Id = newUrl.Id,
            OriginalUrl = newUrl.OriginalUrl,
            ShortCode = newUrl.ShortCode,
            CreatedAt = newUrl.CreatedAt,
            CreatedByUsername = username // Use the username we got from the token
        };

        return Ok(responseDto);
    }

    [HttpDelete("{id}")]
    [Authorize] // only authenticated users can delete
    public async Task<IActionResult> DeleteUrl(int id)
    {
        var urlToDelete = await _context.ShortUrls.FindAsync(id);

        if (urlToDelete == null)
        {
            return NotFound();
        }

        // get the current user's ID and role from their token.
        var currentUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var isUserAdmin = User.IsInRole("Admin");

        // authorization check
        if (!isUserAdmin && urlToDelete.CreatedById != currentUserId)
        {
            return Forbid();
        }

        _context.ShortUrls.Remove(urlToDelete);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}