using NoshMazandaran.Common.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoshMazandaran.Common.Exceptions
{
    public class NotFoundException:AppException
    {
        public NotFoundException(string message)
            :base(message,ApiResultStatusCode.NotFound)
        {

        }
    }
}
