using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using System.IO;

namespace readerTest
{
    class Program
    {
        static void Main(string[] args)
        {
            string dir = @"C:\Users\Catedras05\Desktop\TestTable.csv";
            string raw;
            using (var reader = new StreamReader(dir))
            {
                raw = reader.ReadToEnd();
            }
            Console.WriteLine(returnNtest(raw).ToString());
            String[] Nraw = Regex.Split(raw, "\r\n,,\r\n");
            Nraw[Nraw.Length - 1] = Nraw[Nraw.Length - 1].Remove(Nraw[Nraw.Length - 1].Length - 2);
            Console.WriteLine(returnNcoords(Nraw[2]).ToString());
            Console.Read();

            
        }
        public static int returnNtest(string rawTable)
        {
            int N=0;

            N=Regex.Matches(rawTable, "\n,,\r").Count;

            return N+1;
        }
        public static int returnNcoords(string rawSet)
        {
            int N = 0;
            N= Regex.Matches(rawSet, "\n").Count;
            if (rawSet.Contains(",,"))
            {
                N--;
            }
            return N+1;
        }
        
    }
}
