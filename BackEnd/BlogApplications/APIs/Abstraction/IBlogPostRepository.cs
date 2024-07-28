using APIs.Models;

namespace APIs.Abstraction
{
    public interface IBlogPostRepository
    {
        Task<List<BlogPost>> GetAllAsync();
        Task<BlogPost> GetByIdAsync(int id);
        Task CreateAsync(BlogPost blogPost);
        Task UpdateAsync(BlogPost updatedBlogPost);
        Task DeleteAsync(int id);
    }
}
