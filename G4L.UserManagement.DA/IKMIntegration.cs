using AutoMapper;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.Shared;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA
{
    public class IKMIntegration : IIKMIntegration
    {

        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;
        private readonly HttpRequestMessage _request;

        public IKMIntegration(IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _appSettings = appSettings.Value;
            _mapper = mapper;
            _request = new HttpRequestMessage();
            SetAPIKeyClient();

        }

        private void SetAPIKeyClient()
        {
            _request.Headers.Add("x-smarttoken", "1e38e580-fd88-437d-b322-62facf1b0edb");
        }

        public async Task<IKM> GetResultsForDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            using (var httpClient = new HttpClient())
            {
                //_request.RequestUri = new Uri($"{_appSettings.IKMUri}/status");
                _request.RequestUri = new Uri($"{_appSettings.IKMUri}/testlisting");
                _request.Method = HttpMethod.Post;

                //_request.Content = JsonContent.Create(new { test_session_id = 7 }); // completed ikm
                _request.Content = JsonContent.Create(new { from_date = startDate.ToString("M/d/yyyy"), to_date = endDate.ToString("M/d/yyyy") });

                HttpResponseMessage response = await httpClient.SendAsync(_request);

                var mappedResponse = JsonConvert.DeserializeObject<IKM>(await response.Content.ReadAsStringAsync());

                return mappedResponse;
            }
        }
    }
}
