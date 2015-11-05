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

                ClientSecrets secrets = new ClientSecrets
                {
                    ClientId = Constants.CLIENT_ID,
                    ClientSecret = Constants.CLIENT_SECRET
                };

                UserCredential credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                                            secrets,
                                            new[] { DriveService.Scope.Drive },
                                            "lhcongtk32@gmail.com",
                                            CancellationToken.None,
                                            new FileDataStore("Books.ListMyLibrary"));

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

                Google.Apis.Drive.v2.Data.File body = new Google.Apis.Drive.v2.Data.File();
                body.Title = "TinyMarket_Folder";
                body.Description = "document description";
                body.MimeType = "application/vnd.google-apps.folder";

                GoogleApiHelper.GoogleApiHelper.UploadFile(service, "C:\\Users\\CongLH\\Desktop\\1445051059384_16690.jpg", "abc");
                //foreach (var file in provider.Contents)
                //{
                //    GoogleApiHelper.GoogleApiHelper.UploadFile(service, "C:\\Users\\CongLH\\Desktop\\1445051059384_16690.jpg", "abc");

                //    var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                //    var buffer = await file.ReadAsByteArrayAsync();
                //    //Do whatever you want with filename and its binaray data.
                //    MemoryStream stream = new MemoryStream(buffer);

                //    body.Title = new Guid().ToString();
                //    body.Description = filename;
                //    var mimeType = "abc";

                //    FilesResource.InsertMediaUpload requestDrive = service.Files.Insert(body, stream, mimeType);
                //    requestDrive.Upload();
                //    Google.Apis.Drive.v2.Data.File fileRespond = requestDrive.ResponseBody;
                //}

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            return null;
        }



    }
}
