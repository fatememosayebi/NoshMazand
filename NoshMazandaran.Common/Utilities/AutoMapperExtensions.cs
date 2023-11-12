using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Diamond.Common.Utilities
{
    public static class AutoMapperExtensions
    {
        //public static void NullSafeMapFrom<T, TResult>(this IMemberConfigurationExpression<T> opt, Expression<Func<T, TResult>> sourceMemberExpression)
        //{
        //    var sourceMember = sourceMemberExpression.Compile();

        //    opt.MapFrom(src =>
        //    {
        //        try
        //        {
        //            return sourceMember(src);
        //        }
        //        catch (NullReferenceException)
        //        { }

        //        return default(TResult);
        //    });
        //}
    }
}
