using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Realms.Sync.Exceptions;

namespace Diamond.Common.Utilities
{
    public static class StringExtensions
    {
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public static bool HasValue(this string value, bool ignoreWhiteSpace = true)
        {
            return ignoreWhiteSpace ? !string.IsNullOrWhiteSpace(value) : !string.IsNullOrEmpty(value);
        }
        public static int ToInt(this string value)
        {
            return Convert.ToInt32(value);
        }
        public static string Dump(this object obj)
        {
            return JsonConvert.SerializeObject(obj, Formatting.Indented,
                new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                }
            );
        }
        public static T CreateCommandInstance<T>(this string name, Assembly assembly) where T : class
        {
            Type type = assembly.GetType(name);
            return Activator.CreateInstance(type) as T;
        }

        public static object GetInstance<T>(this string strFullyQualifiedName)
        {

            Type type = Type.GetType(strFullyQualifiedName);
            if (type != null)
                return Activator.CreateInstance(type);
            foreach (var asm in AppDomain.CurrentDomain.GetAssemblies())
            {
                type = asm.GetType(strFullyQualifiedName);
                if (type != null)
                    return Activator.CreateInstance(type);
            }
            return null;
        }
        public static decimal ToDecimal(this string value)
        {
            return Convert.ToDecimal(value);
        }
        //public static string tojalalidate(this string value)
        //{
        //    try
        //    {
        //        var dt = datetime.parse(value);
        //        return dt.topersian();
        //    }
        //    catch
        //    {
        //        throw new AppException("خظا در تبديل تاريخ");
        //    }
        //}

        public static string ToNumeric(this int value)
        {
            return value.ToString("N0"); //"123,456"
        }
        public static string ToToman(this int value)
        {
            return value.ToString("N0") + " تومان";
        }

        public static string ToNumeric(this decimal value)
        {
            return value.ToString("N0");
        }

        public static string ToCurrency(this int value)
        {
            //fa-IR => current culture currency symbol => ریال
            //123456 => "123,123ریال"
            return value.ToString("C0");
        }

        public static string ToCurrency(this decimal value)
        {
            return value.ToString("C0");
        }

        public static string En2Fa(this string str)
        {
            if (str == null) return null;
            return str.Replace("0", "۰")
                .Replace("1", "۱")
                .Replace("2", "۲")
                .Replace("3", "۳")
                .Replace("4", "۴")
                .Replace("5", "۵")
                .Replace("6", "۶")
                .Replace("7", "۷")
                .Replace("8", "۸")
                .Replace("9", "۹");
        }

        public static string Fa2En(this string str)
        {
            if (str == null) return null;
            return str.Replace("۰", "0")
                .Replace("۱", "1")
                .Replace("۲", "2")
                .Replace("۳", "3")
                .Replace("۴", "4")
                .Replace("۵", "5")
                .Replace("۶", "6")
                .Replace("۷", "7")
                .Replace("۸", "8")
                .Replace("۹", "9")
                //iphone numeric
                .Replace("٠", "0")
                .Replace("١", "1")
                .Replace("٢", "2")
                .Replace("٣", "3")
                .Replace("٤", "4")
                .Replace("٥", "5")
                .Replace("٦", "6")
                .Replace("٧", "7")
                .Replace("٨", "8")
                .Replace("٩", "9");
        }

        public static string FixPersianChars(this string str)
        {
            if (str == null) return null;
            return str.Replace("ﮎ", "ک")
                .Replace("ﮏ", "ک")
                .Replace("ﮐ", "ک")
                .Replace("ﮑ", "ک")
                .Replace("ك", "ک")
                .Replace("ي", "ی")
                .Replace(" ", " ")
                .Replace("‌", " ")
                .Replace("ھ", "ه");//.Replace("ئ", "ی");

        }
        public static string FixPersianCharsTuga(this string str)
        {
            if (str == null) return null;
            return str.Replace("ک", "ﮎ")
                .Replace("ک", "ﮏ")
                .Replace("ک", "ﮐ")
                .Replace("ک", "ﮑ")
                .Replace("ک", "ك")
                .Replace("ی", "ي")
                .Replace(" ", " ")
                .Replace(" ", "‌")
                .Replace("ه", "ھ");//.Replace("ئ", "ی");
        }

        public static string CleanString(this string str)
        {
            return str.Trim().FixPersianChars().Fa2En().NullIfEmpty();
        }
        public static string NullIfEmpty(this string str)
        {
            return str?.Length == 0 ? null : str;
        }
        public static List<string> GetNgrams(this string text, int size, bool distinct)
        {
            var letters = text.Split(' ');
            List<string> vs = new List<string>();
            if (string.IsNullOrEmpty(text))
                return new List<string>();
            foreach (var word in letters)
            {
                if (word.Length == 1 || word.Length == 2)
                {
                    vs.Add(word);
                }
                else
                    for (int i = 1; i < word.Length - 1; i++)
                    {
                        char before = word[i - 1];
                        char after = word[i + 1];
                        char current = word[i];
                        vs.Add(before.ToString() + current.ToString());
                        if (i == word.Length - 2)
                        {
                            vs.Add(current.ToString() + word[i + 1]);
                        }
                    }
            }
            if (distinct)
                return vs.Distinct().ToList();
            else
                return vs;
        }


        public static string GenerateId(int length = 50)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
