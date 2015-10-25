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
    public interface IRegionService : IRepository<Region>
    {
        IQueryable<Region> GetRegions();
    }
    public class RegionService : IRegionService
    {

        private IRepository<Region> regionRepository = null;
        public RegionService(IRepository<Region> regionRepository)
        {
            this.regionRepository = regionRepository;
        }

        public IQueryable<Region> Get { get; private set; }

        public void Delete(Region entity)
        {
            throw new NotImplementedException();
        }

        public Region GetById(int id)
        {
            throw new NotImplementedException();
        }
        public IQueryable<Region> GetRegions()
        {
            return regionRepository.Get;
        }

        public void Insert(Region entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Region> SearchFor(Expression<Func<Region, bool>> predicate)
        {
            throw new NotImplementedException();
        }
    }
}
