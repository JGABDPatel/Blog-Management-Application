namespace APIs.Models
{
    public class PaginatedResponse<T>
    {
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}
