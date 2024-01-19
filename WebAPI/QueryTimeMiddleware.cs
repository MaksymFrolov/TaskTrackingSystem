using System.Diagnostics;

namespace WebAPI;

public class QueryTimeMiddleware
{
    private readonly RequestDelegate _requestDelegate;
    private readonly ILogger<QueryTimeMiddleware> _logger;

    public QueryTimeMiddleware(RequestDelegate requestDelegate, ILogger<QueryTimeMiddleware> logger)
    {
        _requestDelegate = requestDelegate;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        var stopwatch = new Stopwatch();

        stopwatch.Start();

        await _requestDelegate(context);

        stopwatch.Stop();

        _logger.LogInformation($"The {context.Request.Method}/{context.Request.Path} request execution time is {stopwatch.ElapsedMilliseconds} ms.");
    }
}

