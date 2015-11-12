using Google.Apis.Auth.OAuth2;
using TinyMarket.Web.GoogleApiHelper;
using Google.Apis.Drive.v2.Data;
using Google.Apis.Drive.v2;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Infrastructure.Constants;
using Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using Google.Apis;
using System.IO;
using System.Web;
using Newtonsoft.Json.Linq;

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

        [HttpPut]
        public async System.Threading.Tasks.Task<HttpResponseMessage> SavePost(JObject data)
        {
            
            string path = HttpContext.Current.Server.MapPath("~/"); ; 
            List<Google.Apis.Drive.v2.Data.File> files = null;
            if (!Request.Content.IsMimeMultipartContent())
            {
                return Request.CreateErrorResponse(HttpStatusCode.UnsupportedMediaType, "The request doesn't contain valid content!");
            }
            try
            {

                ClientSecrets secrets = new ClientSecrets
                {
                    ClientId = Constants.CLIENT_ID,
                    ClientSecret = Constants.CLIENT_SECRET
                };

                var fileDataStore = new FileDataStore(path + "Resources");
                path = fileDataStore.FolderPath;
                UserCredential credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                                            secrets,
                                            new[] { DriveService.Scope.Drive },
                                            "lhcongtk32@gmail.com",
                                            CancellationToken.None, fileDataStore
                                            );

                var service = new DriveService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = Constants.APP_USER_AGENT
                });


                HttpRequestMessage request = this.Request;
                if (!request.Content.IsMimeMultipartContent())
                {
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }

                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                string Q = "title = 'TinyMarket_Folder' and mimeType = 'application/vnd.google-apps.folder'";
                IList<Google.Apis.Drive.v2.Data.File> _Files = GoogleApiHelper.GoogleApiHelper.GetFiles(service, Q);
                // If there isn't a directory with this name lets create one.
                if (_Files.Count == 0)
                {
                    _Files.Add(GoogleApiHelper.GoogleApiHelper.createDirectory(service, "TinyMarket_Folder", "TinyMarket_Folder", "root"));
                }

                // We should have a directory now because we either had it to begin with or we just created one.
                if (_Files.Count != 0)
                {

                    // This is the ID of the directory 
                    string directoryId = _Files[0].Id;
                    //List<string> lst = new List<string> { "0B-xT1h5y02NaWGxsY09TLUhkZ2M" };
                    //var a = GoogleApiHelper.GoogleApiHelper.GetFileInfos(service, lst, directoryId);

                    files = GoogleApiHelper.GoogleApiHelper.UploadFileFromRequest(service, provider, directoryId);
                    var list = service.Files.Get(files[0].Id);

                }

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, path);
            }

            return Request.CreateResponse(HttpStatusCode.OK, files);
        }

    }
}
