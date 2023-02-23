using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace ConsoleApp2
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            using (var httpClient = new HttpClient())
            {
                HttpRequestMessage request = new HttpRequestMessage();
                request.RequestUri = new Uri("https://online.ikmnet.com/v1/testlisting");
                request.Method = HttpMethod.Post;
                request.Headers.Add("x-smarttoken", "1e38e580-fd88-437d-b322-62facf1b0edb");
                request.Content = JsonContent.Create(new { from_date = "1/30/2023", to_date = "2/2/2023" });
                HttpResponseMessage response = await httpClient.SendAsync(request);
                var responseString = await response.Content.ReadAsStringAsync();
                var statusCode = response.StatusCode;

                Console.WriteLine(responseString);
                Console.ReadLine();


                using (var client = newHttpClient())
                {
                    client.BaseAddress = newUri("http://localhost:55587/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(newMediaTypeWithQualityHeaderValue("application/json"));
                    //GET Method
                    HttpResponseMessage response = awaitclient.GetAsync("api/Department/1");
                    if (response.IsSuccessStatusCode)
                    {
                        Departmentdepartment = awaitresponse.Content.ReadAsAsync<Department>();
                        Console.WriteLine("Id:{0}\tName:{1}", department.DepartmentId, department.DepartmentName);
                        Console.WriteLine("No of Employee in Department: {0}", department.Employees.Count);
                    }
                    else
                    {
                        Console.WriteLine("Internal server Error");
                    }
                }
            }
        }
    }
}
