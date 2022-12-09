using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;

namespace G4L.UserManagement.API.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, AuthenticateResponse>().ReverseMap();
            CreateMap<User, UserResponse>().ReverseMap();
            CreateMap<User, TraineeResponse>().ReverseMap();
            CreateMap<User, TrainerResponse>().ReverseMap();

            CreateMap<RegisterRequest, User>().ReverseMap();
            CreateMap<LeaveRequest, Leave>().ReverseMap();
            CreateMap<ApproverRequest, Approver>().ReverseMap();
            CreateMap<DocumentRequest, Document>().ReverseMap();
            CreateMap<LeaveScheduleRequest, LeaveSchedule>().ReverseMap();

            CreateMap<Sponsor, SponsorRequest>().ReverseMap();
            CreateMap<Sponsor, SponsorResponse>().ReverseMap();
            CreateMap<SponsorRequest, SponsorResponse>().ReverseMap();
        }
    }
}
