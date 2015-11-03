using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Domain;

namespace Infrastructure.Services
{
    public interface IPostService : IRepository<Posts>
    {
        IQueryable<Posts> GetPosts();
    }
    public class PostService : IPostService
    {

        private IRepository<Posts> postRepository = null;
        public PostService(IRepository<Posts> postRepository)
        {
            this.postRepository = postRepository;
        }

        public IQueryable<Posts> Get { get; private set; }

        public void Delete(Posts entity)
        {
            throw new NotImplementedException();
        }

        public Posts GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Posts> GetPosts()
        {
            return postRepository.Get.Include(t => t.CategoryDetail).Include(t=>t.Region);
        }

        public void Insert(Posts entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Posts> SearchFor(Expression<Func<Posts, bool>> predicate)
        {
            throw new NotImplementedException();
        }
    }
}
