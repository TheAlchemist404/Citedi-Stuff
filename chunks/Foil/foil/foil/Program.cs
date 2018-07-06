using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace foil
{
    class Program
    {
        static void Main(string[] args)
        {
            int[,,] finalM;
            string dir = @"C:\Users\Catedras05\Desktop\TestTable.csv";
            string raw;
            using (var reader = new StreamReader(dir))
            {
                raw = reader.ReadToEnd();
            }
            //get the info for the tests as big Strings
            String[] TestsRaw = Regex.Split(raw, "\r\n,,\r\n");

            // NOTE: the last chunk will have a empty line this is to delete the line before proceeding
            TestsRaw[TestsRaw.Length - 1] = TestsRaw[TestsRaw.Length - 1].Remove(TestsRaw[TestsRaw.Length - 1].Length - 2);

            //get the coordinates as Strings as "x,y,time"
            var Coords = new List<String[]>();
            foreach (var Set in TestsRaw)
            {
                var V = Set;
                if (Set.Contains(",,")) { V = V.Substring(V.IndexOf(",,")+4); }
                Coords.Add(Regex.Split(Set, "\r\n"));   
            }
        }
    }
}
