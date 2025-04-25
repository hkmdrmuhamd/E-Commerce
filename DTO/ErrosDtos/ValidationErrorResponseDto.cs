namespace E_Commerce.DTO.ErrosDtos
{
    public class ValidationErrorResponseDto
    {
        public List<ValidationErrorDto> Errors { get; set; } = new();
    }
}
