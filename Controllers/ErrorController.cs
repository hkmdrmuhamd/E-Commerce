using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [HttpGet("not-found")]
        public IActionResult NotFoundError()
        {
            return NotFound(/*new { message = "Resource not found"}*/); //404
        }

        [HttpGet("bad-request")]
        public IActionResult BadRequestError() //400
        {
            return BadRequest();
        }

        [HttpGet("unauthorized")]
        public IActionResult UnauthorizedError() //401
        {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public IActionResult ValidationError()
        {
            ModelState.AddModelError("error 1", "this is a validation error");
            ModelState.AddModelError("error 2", "this is a validation error");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public IActionResult ServerError()
        {
            throw new Exception("server error"); //500
        }
    }
}
