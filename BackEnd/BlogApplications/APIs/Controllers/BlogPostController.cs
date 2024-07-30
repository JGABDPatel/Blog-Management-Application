using APIs.Abstraction;
using APIs.Models;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogPostRepository _repository;

        public BlogPostController(IBlogPostRepository repository)
        {
            _repository = repository;
        } 

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPost>>> Get([FromQuery] string search = "", [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        { 
            var blogPosts = await _repository.GetAllAsync();
            if (blogPosts == null)
                return NotFound();
            if (!string.IsNullOrEmpty(search))
            {
                blogPosts = blogPosts.Where(post => post.Username.ToLower().Contains(search) || post.Text.ToLower().Contains(search)).ToList();
            }

            var totalItems = blogPosts.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
             
            var response = new PaginatedResponse<BlogPost>
            {
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = blogPosts.Skip((page - 1) * pageSize).Take(pageSize)
            };

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPost>> Get(int id)
        {
            var blogPost = await _repository.GetByIdAsync(id);
            if (blogPost == null)
                return NotFound();
            return Ok(blogPost);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BlogPost blogPost)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _repository.CreateAsync(blogPost);
                return CreatedAtAction(nameof(Get), new { id = blogPost.Id }, blogPost);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] BlogPost blogPost)
        {
            if (!ModelState.IsValid || blogPost.Id != id)
                return BadRequest(ModelState);

            try
            {
                await _repository.UpdateAsync(blogPost);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _repository.DeleteAsync(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}

