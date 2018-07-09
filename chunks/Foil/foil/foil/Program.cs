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
            string dir = @"C:\Users\Lenovo\Desktop\TestTable.csv";
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
                if (Set.Contains(",,")) { V = V.Substring(V.LastIndexOf(",,")+4); }
                Coords.Add(Regex.Split(V, "\r\n"));   
            }

            //get the max amount of points
            int Max=0;
            foreach (var C in Coords)
            {
                if (Max<C.Length)
                {
                    Max = C.Length;
                }
            }

            finalM = new int[TestsRaw.Length,Max,3];
            var Buff = new String[3];

            for (int i = 0; i < TestsRaw.Length; i++)
            {
                for (int i2 = 0; i2 < Coords[i].Length; i2++)
                {
                    Buff = Regex.Split(Coords[i][i2], ",");
                    finalM[i, i2, 0] = Convert.ToInt32(Buff[0]);
                    finalM[i, i2, 1] = Convert.ToInt32(Buff[1]);
                    finalM[i, i2, 2] = Convert.ToInt32(Buff[2]);
                }
            }
        }
    }
}
