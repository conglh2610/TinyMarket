using Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TinyMarket.Web.Controllers
{
    public class PostsController : ApiController
    {
        private readonly IPostService postService = null;

        public PostsController(IPostService postService)
        {
            this.postService = postService;
        }

        [HttpGet]
        public HttpResponseMessage GetAllPosts()
        {
            var posts = postService.GetPosts();
            return Request.CreateResponse(HttpStatusCode.OK, posts.ToList());
        }

        [HttpPost]
        public async System.Threading.Tasks.Task<HttpResponseMessage> SavePost()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return Request.CreateErrorResponse(HttpStatusCode.UnsupportedMediaType, "The request doesn't contain valid content!");
            }
            try
            {
                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);
                foreach (var file in provider.Contents)
                {
                    var dataStream = await file.ReadAsStreamAsync();
                    // use the data stream to persist the data to the server (file system etc)

                    var response = Request.CreateResponse(HttpStatusCode.OK);
                    //response.Content = new StringContent("Successful upload", Encoding.UTF8, "text/plain");
                    //response.Content.Headers.ContentType = new MediaTypeWithQualityHeaderValue(@"text/html");
                    return response;
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            return null;
        }
    }
}
