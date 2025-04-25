using E_Commerce.DTO.ErrosDtos;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.ErrorHandlers
{
    public static class ValidationErrorHandler
    {
        public static IActionResult HandleInvalidModelState(ActionContext context)
        {
            var errors = context.ModelState
                .Where(e => e.Value.Errors.Count > 0)
                .SelectMany(kvp => kvp.Value.Errors.Select(error => new ValidationErrorDto
                {
                    Field = kvp.Key,
                    Message = error.ErrorMessage
                }))
                .ToList();

            var errorResponse = new ValidationErrorResponseDto
            {
                Errors = errors
            };

            return new BadRequestObjectResult(errorResponse);
        }
    }
}
