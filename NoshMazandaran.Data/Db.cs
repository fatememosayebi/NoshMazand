using Diamond.Common.Utilities;
using Microsoft.EntityFrameworkCore;
using NoshMazandaran.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace NoshMazandaran.Data
{
    public class Db:DbContext
    {
        public Db(DbContextOptions options)
           : base(options)
        {

        }
    //    protected override void OnConfiguring(DbContextOptionsBuilder optionsbuilder)
    //    {
    //        optionsbuilder.UseSqlServer("Data Source=.;Initial Catalog=NoshMazand;uid=sa;pwd=1qaz!QAZ;Encrypt=False");
    //        base.OnConfiguring(optionsbuilder);
    //}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            ///با این کار دیگه نیازی نیست به ازایی هر جدول DbSet تعریف بشه
            var entitiesAssembly = typeof(IEntity).Assembly;
            modelBuilder.RegisterAllEntities<IEntity>(entitiesAssembly);

            ////با این متد configuration های جداول و رجیستر میکنیم با توجه به اینکه از entity typeconfiguration ارث بری کردن
            modelBuilder.RegisterEntityTypeConfiguration(entitiesAssembly);
             ///برای مدیریت اینکه اگر جدولی وابستگی یا فرزندی داشت حذف نشه
            modelBuilder.AddRestrictDeleteBehaviorConvention();
            ///برای اینکه اسم entity ها که فرده به اسم جدول ها که جمعه تبدیل بشه 
            modelBuilder.AddPluralizingTableNameConvention();

        }
        public override int SaveChanges()
        {
            _cleanString();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            _cleanString();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            _cleanString();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            _cleanString();
            return base.SaveChangesAsync(cancellationToken);
        }

        /// <summary>
        /// این متد همه ی حروف مثل ی و ک عربی رو به فارسی بدیل میکنه
        /// </summary>
        private void _cleanString()
        {
            var changedEntities = ChangeTracker.Entries()
                .Where(x => x.State == EntityState.Added || x.State == EntityState.Modified);
            foreach (var item in changedEntities)
            {
                if (item.Entity == null)
                    continue;

                var properties = item.Entity.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance)
                    .Where(p => p.CanRead && p.CanWrite && p.PropertyType == typeof(string));

                foreach (var property in properties)
                {
                    var propName = property.Name;
                    var val = (string)property.GetValue(item.Entity, null);

                    if (val.HasValue())
                    {
                        var newVal = val.Fa2En().FixPersianChars();
                        if (newVal == val)
                            continue;
                        property.SetValue(item.Entity, newVal, null);
                    }
                }
            }
        }

    }
}
