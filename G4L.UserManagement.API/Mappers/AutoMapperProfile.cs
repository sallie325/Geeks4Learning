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

            CreateMap<AttendanceRegister, Attendance>()
                //.ForMember(destination => destination.ClockIn, act => act.MapFrom(source => DateTime.Now))
                //.ForMember(destination => destination.Date, act => act.MapFrom(source => DateTime.Now.Date))
                .ReverseMap();

            CreateMap<GoalRequest, Goal>()
                .ReverseMap();            
            
            CreateMap<IKMResponse, IKM>()
                .ForMember(destination => destination.status, act => act.MapFrom(source => source.Status))
                .ForMember(destination => destination.status_text, act => act.MapFrom(source => source.StatusText))
                .ForMember(destination => destination.output, act => act.MapFrom(source => source.Output))
                .ReverseMap(); 
            
            CreateMap<IKMTestSummaryResponse, IKMTestSummary>()
                .ForMember(destination => destination.routing_code, act => act.MapFrom(source => source.RoutingCode))
                .ForMember(destination => destination.recruiter_email, act => act.MapFrom(source => source.RecruiterEmail))
                .ForMember(destination => destination.recruiter_name, act => act.MapFrom(source => source.RecruiterName))
                .ForMember(destination => destination.department, act => act.MapFrom(source => source.Department))
                .ForMember(destination => destination.scheduled_date, act => act.MapFrom(source => source.ScheduledDate))
                .ForMember(destination => destination.scoring_date, act => act.MapFrom(source => source.ScoringDate))
                .ForMember(destination => destination.scoring, act => act.MapFrom(source => source.Scoring))
                .ForMember(destination => destination.test_title, act => act.MapFrom(source => source.TestTitle))
                .ForMember(destination => destination.test_type, act => act.MapFrom(source => source.TestType))
                .ForMember(destination => destination.test_status, act => act.MapFrom(source => source.TestStatus))
                .ForMember(destination => destination.test_taker_name, act => act.MapFrom(source => source.TestTakerName))
                .ForMember(destination => destination.test_taker_id, act => act.MapFrom(source => source.TestTakerId))
                .ForMember(destination => destination.test_taker_email, act => act.MapFrom(source => source.TestTakerEmail))
                .ForMember(destination => destination.last_activity_date, act => act.MapFrom(source => source.LastActivityDate))
                .ForMember(destination => destination.ip, act => act.MapFrom(source => source.Ip))
                .ForMember(destination => destination.country, act => act.MapFrom(source => source.Country))
                .ForMember(destination => destination.elapsed_time, act => act.MapFrom(source => source.ElapsedTime))
                .ReverseMap();

    }
    }
}
