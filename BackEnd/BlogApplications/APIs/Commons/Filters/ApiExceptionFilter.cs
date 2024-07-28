using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace APIs.Commons.Filters
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        private readonly ILogger<ApiExceptionFilter> _logger;

        public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
        {
            _logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception, "An exception occurred.");

            var response = new
            {
                StatusCode = 500,
                Message = "An unexpected error occurred. Please try again later."
            };

            context.Result = new JsonResult(response)
            {
                StatusCode = 500
            };
        }
    }
}
