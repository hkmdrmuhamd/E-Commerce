using E_Commerce.Extensions.ServiceRegistrations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationDbContext(builder.Configuration); //Program.cs i�erisinde configuration'lar� SOLID ve Clean Architecture mant���nda tutmak i�in.

builder.Services.AddCors(); // CORS izinlerini vermek i�in

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCustomSwagger();

app.UseHttpsRedirection();

app.UseStaticFiles(); //wwwroot klas�r� alt�ndaki statik dosyalar�n d��ar� a��lmas�n� sa�lar

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
       .AllowAnyMethod()
       .WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

app.Run();
