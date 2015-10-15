using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects.DataClasses;
using System.Linq;
using System.Text;
using System.Data.Entity;
using System.Data;


using System.Linq.Expressions;
using System.Data.Entity.Core;
using System.Configuration;
using System.Diagnostics;
using System.Data.Entity.Validation;
using Infrastructure;
using Infrastructure.Repository;

namespace Infrastructure
{
    public class Repository<T> : IRepository<T> where T : class
    {

        protected DbSet<T> DbSet;
        private DbContext _dataContext;

        public Repository()
        {
            _dataContext = new DatabaseContext();
            DbSet = _dataContext.Set<T>();
        }

        public Repository(DbContext context)
        {
            this._dataContext = context;
            DbSet = context.Set<T>();
        }
        #region IRepository<T> Members

        public void Insert(T entity)
        {
            DbSet.Add(entity);
        }

        public void Delete(T entity)
        {
            DbSet.Remove(entity);
        }

        public IQueryable<T> SearchFor(Expression<Func<T, bool>> predicate)
        {
            return DbSet.Where(predicate);
        }

        public IQueryable<T> Get
        {
            get { return DbSet; }
        }

        public T GetById(int id)
        {
            return DbSet.Find(id);
        }

        #endregion

    }
}
