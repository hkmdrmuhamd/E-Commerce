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

builder.Services.AddApplicationDbContext(builder.Configuration); //Program.cs i�erisinde configuration'lar� SOLID ve Clean Architecture mant���nda tutmak i�in.

builder.Services.AddCors(); // CORS izinlerini vermek i�in
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

app.UseMiddleware<ExceptionHandlingMiddleware>(); // Middleware'i kullanabilmek i�in

// Configure the HTTP request pipeline.
app.UseFrameworkMiddlewares();

app.UseHttpsRedirection();

app.UseStaticFiles(); //wwwroot klas�r� alt�ndaki statik dosyalar�n d��ar� a��lmas�n� sa�lar

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
       .AllowAnyMethod()
       .AllowCredentials()//Server taraf�ndan gelen cookie'leri alabilmeye izin verir
       .WithOrigins("http://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

SeedDatabaseForIdentity.Initialize(app); //Identity i�in veritaban�n� seed etmek i�in

app.Run();
