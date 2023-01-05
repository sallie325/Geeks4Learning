using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using Google.Apis.Calendar.v3.Data;
using System;
using static Google.Apis.Calendar.v3.Data.Event;

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

            CreateMap<Event, EventResponse>()
                .ForMember(destination => destination.StartDate, act => act.MapFrom(source => source.Start.Date))
                .ForMember(destination => destination.EndDate, act => act.MapFrom(source => source.End.Date))
                .ForMember(destination => destination.Title, act => act.MapFrom(source => source.Summary))
                .ForMember(destination => destination.Type, act => act.MapFrom(source => source.EventType))
                .ForMember(destination => destination.TimeSpan, act => act.MapFrom(source => DateTime.Parse(source.End.Date).Subtract(DateTime.Parse(source.Start.Date))))
                .ReverseMap();

            CreateMap<OrganizerData, OrganizerResponse>().ReverseMap();

        }
    }
}
