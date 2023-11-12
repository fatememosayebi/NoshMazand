using System;
using System.Security.Cryptography;
using System.Text;
using System.IO;

namespace Diamond.Common.Utilities
{
    public static class SecurityHelper
    {
        public static string GetSha256Hash(string input)
        {
            //using (var sha256 = new SHA256CryptoServiceProvider())
            using (var sha256 = SHA256.Create())
            {
                var byteValue = Encoding.UTF8.GetBytes(input);
                var byteHash = sha256.ComputeHash(byteValue);
                return Convert.ToBase64String(byteHash);
                //return BitConverter.ToString(byteHash).Replace("-", "").ToLower();
            }
        }
        public static string GetSHA256Hash(string input, string key)
        {
            ASCIIEncoding encoding = new ASCIIEncoding();

            Byte[] textBytes = encoding.GetBytes(input);
            Byte[] keyBytes = encoding.GetBytes(key);

            Byte[] hashBytes;

            using (HMACSHA256 hash = new HMACSHA256(keyBytes))
                hashBytes = hash.ComputeHash(textBytes);

            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
        public static string Decrypt(string inputText, string key, string salt)
        {
            var inputBytes = Convert.FromBase64String(inputText);
            var pdb = new Rfc2898DeriveBytes(key, Encoding.UTF8.GetBytes(salt));

            using (var ms = new MemoryStream())
            {
                var alg = Aes.Create();

                alg.Key = pdb.GetBytes(32);
                alg.IV = pdb.GetBytes(16);
                alg.Padding = PaddingMode.None;

                using (var cs = new CryptoStream(ms, alg.CreateDecryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(inputBytes, 0, inputBytes.Length);
                }
                return Encoding.UTF8.GetString(ms.ToArray());
            }
        }

        public static string Encrypt(string inputText, string key, string salt)
        {

            var inputBytes = Encoding.UTF8.GetBytes(inputText);
            var pdb = new Rfc2898DeriveBytes(key, Encoding.UTF8.GetBytes(salt));
            using (var ms = new MemoryStream())
            {
                var alg = Aes.Create();

                alg.Key = pdb.GetBytes(32);
                alg.KeySize = 128/8;
                alg.IV = pdb.GetBytes(16);
                alg.Padding = PaddingMode.None;

                using (var cs = new CryptoStream(ms, alg.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(inputBytes, 0, inputBytes.Length);
                }
                return Convert.ToBase64String(ms.ToArray());
            }
        }
        public static string DecryptStringFromBytes(byte[] cipherText, byte[] key)
        {
            var iv = Encoding.UTF8.GetBytes("8080808080808080");
            string plaintext = null;
            using (var rijAlg = new RijndaelManaged())
            {
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;
                rijAlg.Key = key;
                rijAlg.IV = iv;
                var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);
                try
                {
                    using (var msDecrypt = new MemoryStream(cipherText))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                plaintext = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
                catch
                {
                    plaintext = "keyError";
                }
            }
            return plaintext;
        }
        public static string EncryptString(string plainText, string hash)
        {
            var key = Encoding.UTF8.GetBytes(hash);
            var iv = Encoding.UTF8.GetBytes("8080808080808080");
            
            byte[] encrypted;
            using (var rijAlg = new RijndaelManaged())
            {
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;
                rijAlg.Key = key;
                rijAlg.IV = iv;

                var encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);

                using (var msEncrypt = new MemoryStream())
                {
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                        {
                            swEncrypt.Write(plainText);
                        }
                        encrypted = msEncrypt.ToArray();
                    }
                }
            }
            return Convert.ToBase64String(encrypted);
        }
        public static string DecryptStringAES(string cipherText,string hash)
        {
            var keybytes = Encoding.UTF8.GetBytes(hash);
            var encrypted = Convert.FromBase64String(cipherText);
            var decriptedFromJavascript = DecryptStringFromBytes(encrypted, keybytes);
            return string.Format(decriptedFromJavascript);
        }

    }
}
