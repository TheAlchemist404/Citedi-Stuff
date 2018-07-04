using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace foil
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> listA = new List<string>();
            List<string> listB = new List<string>();
            using (var reader = new StreamReader("C:\\Users\\Catedras05\\Desktop\\Foil\\foil\\foil\\Docs\\Libro1.csv"))
            {
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(',');

                    listA.Add(values[0]);
                    listB.Add(values[1]);
                }
            }
            //listA.ForEach(Console.WriteLine);
            listB.ForEach(Console.WriteLine);
            Console.ReadLine();
        }
    }
}
