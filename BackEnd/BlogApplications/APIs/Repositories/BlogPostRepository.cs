using APIs.Abstraction;
using APIs.Models;
using System.Text.Json;

namespace APIs.Repositories
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly string _filePath;

        public BlogPostRepository(string filePath)
        {
            _filePath = filePath;
        }

        private List<BlogPost> LoadData()
        {
            if (!File.Exists(_filePath))
                return new List<BlogPost>();

            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<BlogPost>>(json) ?? new List<BlogPost>();
        }

        private void SaveData(List<BlogPost> blogPosts)
        {
            var json = JsonSerializer.Serialize(blogPosts, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }

        public Task<List<BlogPost>> GetAllAsync()
        {
            return Task.FromResult(LoadData());
        }

        public Task<BlogPost> GetByIdAsync(int id)
        {
            var blogPosts = LoadData();
            var blogPost = blogPosts.FirstOrDefault(x => x.Id == id);
            return Task.FromResult(blogPost);
        }

        public Task CreateAsync(BlogPost blogPost)
        {
            var blogPosts = LoadData();
            if (blogPosts.Any(x => x.Username == blogPost.Username))
                throw new InvalidOperationException("A blog post with the same username already exists.");

            blogPost.Id = blogPosts.Any() ? blogPosts.Max(x => x.Id) + 1 : 1;
            blogPosts.Add(blogPost);
            SaveData(blogPosts);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(BlogPost updatedBlogPost)
        {
            var blogPosts = LoadData();
            var index = blogPosts.FindIndex(x => x.Id == updatedBlogPost.Id);
            if (index == -1)
                throw new InvalidOperationException("Blog post not found.");

            if (blogPosts.Any(x => x.Id != updatedBlogPost.Id && x.Username == updatedBlogPost.Username))
                throw new InvalidOperationException("A blog post with the same username already exists.");

            blogPosts[index] = updatedBlogPost;
            SaveData(blogPosts);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(int id)
        {
            var blogPosts = LoadData();
            var blogPost = blogPosts.FirstOrDefault(x => x.Id == id);
            if (blogPost == null)
                throw new InvalidOperationException("Blog post not found.");

            blogPosts.Remove(blogPost);
            SaveData(blogPosts);
            return Task.CompletedTask;
        }
    }
}
