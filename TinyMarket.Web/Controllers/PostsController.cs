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
    }
}
