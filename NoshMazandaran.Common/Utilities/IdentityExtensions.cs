using Diamond.Common.Utilities;
using System;
using System.Globalization;
using System.Security.Claims;
using System.Security.Principal;
using System.Collections.Generic;
using System.Linq;

namespace Diamond.Common.Utilities
{
    public static class IdentityExtensions
    {
        public static string FindFirstValue(this ClaimsIdentity identity, string claimType)
        {
            return identity?.FindFirst(claimType)?.Value;
        }

        public static string FindFirstValue(this IIdentity identity, string claimType)
        {
            var claimsIdentity = identity as ClaimsIdentity;
            return claimsIdentity?.FindFirstValue(claimType);
        }
        public static string GetUserId(this IIdentity identity)
        {
            return identity?.FindFirstValue(ClaimTypes.NameIdentifier);
        }
        public static T GetUserId<T>(this IIdentity identity) where T : IConvertible
        {
            var userId = identity?.GetUserId();
            return userId.HasValue()?
                (T)Convert.ChangeType(userId, typeof(T),CultureInfo.InvariantCulture)
                :default(T);
        }
        public static string GetSessionId(this IIdentity identity)
        {
            return identity?.FindFirstValue(ClaimTypes.NameIdentifier);
        }
        public static string GetSecurityStamp(this IIdentity identity)
        {
            return identity?.FindFirstValue("AspNet.Identity.SecurityStamp");
        }
        public static int ChartJobLevelOperation(this IIdentity identity)
        {
            var sid = identity?.FindFirstValue(ClaimTypes.Sid);
            if (sid is null || sid=="" ||sid=="0")
                return 999;
            return int.Parse(sid);
        }
        public static string GetTag(this IIdentity identity)
        {
            return identity?.FindFirstValue(ClaimTypes.GivenName);
        }
        public static string GetPernr(this IIdentity identity)
        {
            return identity?.FindFirstValue(ClaimTypes.PostalCode);
        }

        public static T GetSessionId<T>(this IIdentity identity) where T : IConvertible
        {
            var userId = identity?.GetSessionId();
            return userId.HasValue()
                ? (T)Convert.ChangeType(userId, typeof(T), CultureInfo.InvariantCulture)
                : default(T);
        }

        public static string GetUserName(this IIdentity identity)
        {///TODO:check name is null .throw not authenticated user
            return identity?.Name.ToLower().Trim();
        }
        public static string GetExternalUserDestinationRef(this IIdentity identity)
        {  var str= identity?.FindFirstValue(ClaimTypes.GivenName);
            return str;
        }
        public static List<string> GetActiveGroups(this IIdentity identity)
        {
            var systemsRaw=identity?.FindFirstValue(ClaimTypes.System);
            return systemsRaw.Split("#").ToList();
        }
        public static List<string> GetJobCodes(this IIdentity identity)
        {
            var jobCodesRaw = identity?.FindFirstValue(ClaimTypes.SerialNumber);
            return jobCodesRaw.Split("#").ToList();
        }
    }
}
