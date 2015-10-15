﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Infrastructure
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> Get { get; }
        void Insert(T entity);
        void Delete(T entity);
        IQueryable<T> SearchFor(Expression<Func<T, bool>> predicate);
        //IQueryable<T> GetAll();
        T GetById(int id);
        
    }
}
