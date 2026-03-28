var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// This tells the server to look for index.html in the "wwwroot" folder
app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();