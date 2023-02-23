using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    public class Program
    {
        static async Task Main(string[] args)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:55587/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //GET Method
                HttpResponseMessage response = await client.GetAsync("api/Department/1");

                if (response.IsSuccessStatusCode)
                {
                    var department = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(department);
                }
                else
                {
                    Console.WriteLine("Internal server Error");
                }
            }
        }
    }
}
