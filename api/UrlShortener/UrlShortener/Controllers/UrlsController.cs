using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UrlShortener.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlsController : ControllerBase
    {
        private readonly Data.ApplicationDbContext _context;

        public UrlsController(Data.ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Urls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entities.ShortUrl>>> GetShortUrls()
        {
            var urls = await _context.ShortUrls.ToListAsync();
            return Ok(urls);
        }
    }
}
