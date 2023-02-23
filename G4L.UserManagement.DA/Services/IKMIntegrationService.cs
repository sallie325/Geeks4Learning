using AutoMapper;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
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
    public class IKMIntegrationService : IIKMIntegrationService
    {
        private readonly IIKMIntegration _iikmIntegration;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;

        public IKMIntegrationService(IIKMIntegration iikmIntegration, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _iikmIntegration = iikmIntegration;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public Task<dynamic> GetResultsAsync(int skip, int take)
        {
            throw new NotImplementedException();
        }

        public async Task<IKMResponse> GetResultsForDateRangeAsync(DateTime startDate, DateTime endDate, IKMStatus status)
        {
            var response = await _iikmIntegration.GetResultsForDateRangeAsync(startDate, endDate);
            var filteredList = response.output.Where(x => x.test_status.CompareTo(status) == 0 && x.routing_code == "test124533").ToList();
            response.output = filteredList;

            return _mapper.Map<IKMResponse>(response);
        }
    }
}
