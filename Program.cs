using E_Commerce.Extensions.ServiceRegistrations;
using E_Commerce.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationDbContext(builder.Configuration); //Program.cs içerisinde configuration'larý SOLID ve Clean Architecture mantýðýnda tutmak için.

builder.Services.AddCors(); // CORS izinlerini vermek için

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>(); // Middleware'i kullanabilmek için

// Configure the HTTP request pipeline.
app.UseCustomSwagger();

app.UseHttpsRedirection();

app.UseStaticFiles(); //wwwroot klasörü altýndaki statik dosyalarýn dýþarý açýlmasýný saðlar

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
       .AllowAnyMethod()
       .AllowCredentials()//Server tarafýndan gelen cookie'leri alabilmeye izin verir
       .WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

app.Run();
