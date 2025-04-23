using E_Commerce.Extensions.ServiceRegistrations;
using E_Commerce.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationDbContext(builder.Configuration); //Program.cs i�erisinde configuration'lar� SOLID ve Clean Architecture mant���nda tutmak i�in.

builder.Services.AddCors(); // CORS izinlerini vermek i�in

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>(); // Middleware'i kullanabilmek i�in

// Configure the HTTP request pipeline.
app.UseCustomSwagger();

app.UseHttpsRedirection();

app.UseStaticFiles(); //wwwroot klas�r� alt�ndaki statik dosyalar�n d��ar� a��lmas�n� sa�lar

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
       .AllowAnyMethod()
       .AllowCredentials()//Server taraf�ndan gelen cookie'leri alabilmeye izin verir
       .WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

app.Run();
