using AutoMapper;
using E_Commerce.DTO.UserDtos;
using E_Commerce.Entity;

namespace E_Commerce.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<GetUserDto, AppUser>().ReverseMap();
            CreateMap<GetUserByUserNameDto, AppUser>().ReverseMap();
            CreateMap<UserRegisterDto, AppUser>().ReverseMap();
            CreateMap<UpdateUserDto, AppUser>().ReverseMap();
        }
    }
}
