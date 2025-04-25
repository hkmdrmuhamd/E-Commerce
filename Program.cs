using E_Commerce.Data;
using E_Commerce.ErrorHandlers;
using E_Commerce.Extensions.AuthenticationServiceRegistrations;
using E_Commerce.Extensions.FrameworkRegistration;
using E_Commerce.Extensions.IdentityRegistrations;
using E_Commerce.Extensions.ServiceRegistrations;
using E_Commerce.Middlewares;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationDbContext(builder.Configuration); //Program.cs içerisinde configuration'larý SOLID ve Clean Architecture mantýðýnda tutmak için.

builder.Services.AddCors(); // CORS izinlerini vermek için
builder.Services.AddIdentityServices();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddFrameworkServices();
builder.Services.ConfigureIdentityOptions();
builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddScopedRegistrations();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = ValidationErrorHandler.HandleInvalidModelState;
});

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>(); // Middleware'i kullanabilmek için

// Configure the HTTP request pipeline.
app.UseFrameworkMiddlewares();

app.UseHttpsRedirection();

app.UseStaticFiles(); //wwwroot klasörü altýndaki statik dosyalarýn dýþarý açýlmasýný saðlar

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
       .AllowAnyMethod()
       .AllowCredentials()//Server tarafýndan gelen cookie'leri alabilmeye izin verir
       .WithOrigins("http://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

SeedDatabaseForIdentity.Initialize(app); //Identity için veritabanýný seed etmek için

app.Run();
