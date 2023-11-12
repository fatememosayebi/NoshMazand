using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diamond.Common.Utilities
{
    public static class WriteOnImage
    {

        public static void writeAndSave(string source, string destination, List<ImageWritePoint> imageWriteInfos)
        {
            try
            {
                Bitmap bitmap = (Bitmap)Image.FromFile(source);
                foreach (var item in imageWriteInfos)
                {
                    PointF location = new PointF(item.xPosition, item.yPosition);
                    using (Graphics graphics = Graphics.FromImage(bitmap))
                    {
                        graphics.DrawString(item.text, item.font, item.getBrush(), location);
                    }
                }
                bitmap.Save(destination);//save the image file
            }
            catch 
            {
            }
        }
        public static Bitmap writeandReturn(string source, List<ImageWritePoint> imageWriteInfos)
        {
            Bitmap bitmap = (Bitmap)Image.FromFile(source);
            foreach (var item in imageWriteInfos)
            {
                PointF location = new PointF(item.xPosition, item.yPosition);
                using (Graphics graphics = Graphics.FromImage(bitmap))
                {
                    graphics.DrawString(item.text, item.font, item.getBrush(), location);

                }
            }
            return bitmap;
        }
    }
    public class ImageWritePoint
    {
        public float xPosition { get; set; }
        public float yPosition { get; set; }
        private string _hexColor;
        
        public string hexColor
        {
            get
            {
                if (_hexColor.Length < 6) return "000000";
                return _hexColor.Replace("#", String.Empty);
            }
            set { _hexColor = value; }
        }

        public string text { get; set; }
        public Font font { get; set; }
        public Brush getBrush()
        {
            var a = hexColor.Length == 8 ? hexColor.Substring(0, 2) : "255";
            var r = hexColor.Length == 8 ? hexColor.Substring(2, 2) : hexColor.Substring(0, 2);
            var g = hexColor.Length == 8 ? hexColor.Substring(4, 2) : hexColor.Substring(2, 2);
            var b = hexColor.Length == 8 ? hexColor.Substring(6, 2) : hexColor.Substring(4, 2);
            
            int red = byte.Parse(r, System.Globalization.NumberStyles.HexNumber);
            int green = byte.Parse(g, System.Globalization.NumberStyles.HexNumber);
            int blue = byte.Parse(b, System.Globalization.NumberStyles.HexNumber);
            return new SolidBrush(Color.FromArgb(red, green, blue));
        }
    }

}
