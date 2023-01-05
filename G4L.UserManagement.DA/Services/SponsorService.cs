using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using G4L.UserManagement.Shared;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class SponsorService : ISponsorService
    {
        private readonly ISponsorRepository _sponsorRepository;
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;

        public SponsorService(ISponsorRepository sponsorRepository, IUserRepository userRepository, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _sponsorRepository = sponsorRepository;
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public async Task AddSponsorAsync(SponsorRequest sponsorRequest)
        {
            var sponsor = _mapper.Map<Sponsor>(sponsorRequest);
            await _sponsorRepository.AddAsync(sponsor);
        }

        public async Task<SponsorResponse> GetByIdAsync(Guid sponsorId)
        {
            var sponsor = await _sponsorRepository.GetByIdAsync(sponsorId);
            var mappedSponsor = _mapper.Map<SponsorResponse>(sponsor);

            mappedSponsor.Trainer = _mapper.Map<TrainerResponse>(sponsor.Approvers.Where(x => x.Role == Role.Trainer).FirstOrDefault());
            mappedSponsor.Admin = _mapper.Map<UserResponse>(sponsor.Approvers.Where(x => x.Role == Role.Trainer).FirstOrDefault());

            return _mapper.Map<SponsorResponse>(sponsor);
        }

        public async Task UpdateApproversInformationAsync(SponsorResponse sponsorRequest)
        {
            var sponsor = _mapper.Map<Sponsor>(sponsorRequest);

            sponsor.Approvers.Add(await _userRepository.GetByIdAsync(sponsorRequest.TrainerId));
            sponsor.Approvers.Add(await _userRepository.GetByIdAsync(sponsorRequest.AdminId));
            
            await _sponsorRepository.UpdateTrainerAsync(sponsor);
        }

        public async Task<List<SponsorResponse>> GetPagedSponsorsAsync(int skip, int take)
        {
            var sponsors = _sponsorRepository.GetPagedSponsorsListAsync(skip, take).Result.ToList();
            var mappedSponsors = _mapper.Map<List<SponsorResponse>>(sponsors);

            mappedSponsors.ForEach(x =>
            {
                sponsors.ForEach(y =>
                {
                    if (x.Id == y.Id)
                    {
                        x.AdminId = y.Approvers.Where(x => x.Role == Role.Admin).First().Id;
                        x.TrainerId = y.Approvers.Where(x => x.Role == Role.Trainer).First().Id;

                        x.Admin = _mapper.Map<UserResponse>(y.Approvers.Where(x => x.Role == Role.Admin).FirstOrDefault());
                        x.Trainer = _mapper.Map<TrainerResponse>(y.Approvers.Where(x => x.Role == Role.Trainer).FirstOrDefault());
                    }
                });
            });

            return mappedSponsors;
        }

        public async Task<List<UserResponse>> GetApproversByIdAsync(Guid sponsorId)
        {
            var approvers = new List<UserResponse>(); 
            
            var sponsor = await _sponsorRepository.GetFullSponsorByIdAsync(sponsorId);
            sponsor.SponsoredUser.ForEach(x => {
                var user = _userRepository.GetByIdAsync(x.UserId).Result;

                if (user.Role == Role.Admin)
                    approvers.Add(_mapper.Map<UserResponse>(user));

                if (user.Role == Role.Trainer)
                    approvers.Add(_mapper.Map<UserResponse>(user));
            });


            return approvers;
        }

        public async Task UpdateTraineesInformationAsync(Guid sponsorId, List<Guid> traineesId)
        {
            var sponsor = await _sponsorRepository.GetFullSponsorByIdAsync(sponsorId);

            traineesId.ForEach(x => {
                sponsor.SponsoredUser.Add(new SponsoredUser
                {
                    SponsorId = sponsorId,
                    UserId = x,
                    Sponsor = sponsor,
                    User = _userRepository.GetByIdAsync(x).Result
                });
            });

            await _sponsorRepository.UpdateAsync(sponsor);
        }

        public async Task<SponsorResponse> GetSponsorByUserIdAsync(Guid userId)
        {
            var sponsor = await _sponsorRepository.GetByUserIdAsync(userId);
            return _mapper.Map<SponsorResponse>(sponsor);
        }

        public async Task<List<SponsorResponse>> GetAllAsync()
        {
            var sponsor = await _sponsorRepository.ListAsync();
            return _mapper.Map<List<SponsorResponse>>(sponsor);
        }
    }
}
