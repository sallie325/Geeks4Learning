using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;

namespace G4L.UserManagement.API.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // User -> AuthenticateResponse
            CreateMap<User, AuthenticateResponse>().ReverseMap();

            // RegisterRequest -> User
            CreateMap<RegisterRequest, User>().ReverseMap();
        }
    }
}
