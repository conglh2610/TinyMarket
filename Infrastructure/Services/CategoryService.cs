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
    public interface ICategoryService : IRepository<Category>
    {
        IQueryable<Category> GetCategories();
    }

    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> categoryRepository;
        public CategoryService(IRepository<Category> categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        public IQueryable<Category> Get { get; private set; }

        public void Insert(Category entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(Category entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Category> SearchFor(Expression<Func<Category, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Category GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Category> GetCategories()
        {
           return  categoryRepository.Get.Include(t => t.CategoresDetails);
        }
    }
}
