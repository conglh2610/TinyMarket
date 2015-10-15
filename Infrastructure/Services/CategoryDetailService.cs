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

    public interface ICategoryDetailService : IRepository<CategoryDetail>
    {
        IQueryable<CategoryDetail> GetCategoriesDetail();
    }

    public class CategoryDetailService : ICategoryDetailService
    {
        private IRepository<CategoryDetail> categoryDetailRepository = null;
        public CategoryDetailService(IRepository<CategoryDetail> categoryDetailRepository)
        {
            this.categoryDetailRepository = categoryDetailRepository;
        }
        public IQueryable<CategoryDetail> Get { get; private set; }
        public void Insert(CategoryDetail entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(CategoryDetail entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<CategoryDetail> SearchFor(Expression<Func<CategoryDetail, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public CategoryDetail GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<CategoryDetail> GetCategoriesDetail()
        {
            return categoryDetailRepository.Get.Include(t=>t.Category).OrderBy(t=>t.Category.Name);
        }
    }
}
