using System;
using System.Windows.Forms;
using System.IO;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Drawing;
using System.Threading;

namespace Begining
{
    public partial class Test : Form //add diferent cuantities for the dots display
    {
        int cPoint = 0, cTest = 0;
        PictureBox[] Dots = new PictureBox[10];
        int[,,] Pdata;
        string[] picsroute;


        public Test()
        {
            InitializeComponent();
            Dots[0] = Box1;
            Dots[1] = Box2;
            Dots[2] = Box3;
            Dots[3] = Box4;
            Dots[4] = Box5;
            Dots[5] = Box6;
            Dots[6] = Box7;
            Dots[7] = Box8;
            Dots[8] = Box9;
            Dots[9] = Box10;
            openFileDialog1.ShowDialog();
            DoubleBuffered = true;

        }

        private void Test_Load(object sender, EventArgs e)
        {
            var Stuff = getcoords(openFileDialog1.FileName);

            Pdata = Stuff.Item1;
            picsroute = Stuff.Item2;
            var X = new List<int>();
            var Y = new List<int>();
            for (int i = 0; i < Pdata.GetLength(1); i++)
            {
                X.Add(Pdata[cTest, i, 0]);
                Y.Add(Pdata[cTest, i, 1]);
                //Dots.Add(InitializePictureBox());
            }
            SetPoints(X.ToArray(), Y.ToArray());
            
            button1.Left = (this.Width / 2) - (button1.Width / 2);
            button1.Top = (this.Height / 2) - (button1.Height / 2);
            foreach (var item in Dots)
            {
                item.Height = this.Height / 40;
                item.Width = item.Height;
                
            }
        }

        private PictureBox InitializePictureBox()
        {
            var PictureBox1 = new PictureBox();

            // Set the location and size of the PictureBox control.
            PictureBox1.Location = new System.Drawing.Point(0, 0);
            PictureBox1.Size = new System.Drawing.Size(10, 10);
            PictureBox1.TabStop = false;


            // Set the SizeMode property to the StretchImage value.  This
            // will shrink or enlarge the image as needed to fit into
            // the PictureBox.
            PictureBox1.SizeMode = PictureBoxSizeMode.StretchImage;
            PictureBox1.BackgroundImage = Begining.Properties.Resources.dot;

            // Set the border style to a three-dimensional border.
            PictureBox1.BorderStyle = BorderStyle.None;
            PictureBox1.Visible = false;
            PictureBox1.Enabled = true;

            // Add the PictureBox to the form.
            this.Controls.Add(PictureBox1);

            return PictureBox1;
        }//edit this part to add more points

        public Tuple<int[,,], string[]> getcoords(string FileDir)
        {
            Tuple < int[,,],string[]> R;
            int[,,] finalM;
            string[] pics;
            //string dir = @"C:\Users\Lenovo\Desktop\TestTable.csv";
            string raw;
            try
            {
                using (var reader = new StreamReader(FileDir))
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
                    if (Set.Contains(",,")) { V = V.Substring(V.LastIndexOf(",,") + 4); }
                    Coords.Add(Regex.Split(V, "\r\n"));
                }

                //get the max amount of points
                int Max = 0;
                foreach (var C in Coords)
                {
                    if (Max < C.Length)
                    {
                        Max = C.Length;
                    }
                }

                finalM = new int[TestsRaw.Length, Max, 3];
                pics = new string[TestsRaw.Length];
                var Buff = new String[3];

                for (int i = 0; i < TestsRaw.Length; i++)
                {
                    if (TestsRaw[i].Contains(",,")) {
                        pics[i] = TestsRaw[i].Substring(0,TestsRaw[i].LastIndexOf(",,"));
                    }
                    for (int i2 = 0; i2 < Coords[i].Length; i2++)
                    {
                        Buff = Regex.Split(Coords[i][i2], ",");
                        finalM[i, i2, 0] = Convert.ToInt32(Buff[0]);
                        finalM[i, i2, 1] = Convert.ToInt32(Buff[1]);
                        finalM[i, i2, 2] = Convert.ToInt32(Buff[2]);
                    }
                }
                R = Tuple.Create(finalM, pics);
                return R;
            }
            catch (FileNotFoundException)
            {
                Application.Exit();
                return null;
            }
        }

        public void wipePoints()
        {
            foreach (PictureBox item in Dots)
            {
                item.Visible = false;
                //item.Left = 0;
                //item.Top = 0;
            }
        }

        public void SetPoints(int[] coordsX, int[] coordsY)
        {
            for (int i = 0; i < coordsX.Length; i++)
            {
                Dots[i].Left = (((this.Width - Dots[i].Width) / 100) * coordsX[i]) - (Dots[i].Width / 2);
                Dots[i].Top = (((this.Height - Dots[i].Height) / 100) * coordsY[i])-(Dots[i].Height/2);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            timer1.Enabled = true;
            button1.Visible = false;
            button1.Enabled = false;
            button2.Visible = false;
            button2.Enabled = false;
            setBackground(cTest);
            Cursor.Hide();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (cPoint < Pdata.GetLength(1) && Pdata[cTest, cPoint, 2] > 0)
            {
                wipePoints();
                Dots[cPoint].BackColor = Color.Transparent;
                Dots[cPoint].Visible = true;
                timer1.Interval = Pdata[cTest, cPoint, 2]*1000;
                cPoint++;
            }
            else
            {
                cTest++;
                cPoint = 0;
                timer1.Interval = 5000;
                wipePoints();
                try
                {
                    setBackground(cTest);
                    var X= new List<int>();
                    var Y= new List<int>();
                    for (int i = 0; i < Pdata.GetLength(1); i++)
                    {
                        X.Add(Pdata[cTest, i, 0]);
                        Y.Add(Pdata[cTest, i, 1]);
                    }
                    SetPoints(X.ToArray(), Y.ToArray());
                }
                catch (IndexOutOfRangeException)
                {
                    timer1.Enabled = false;
                    cTest = 0;
                    cPoint = 0;
                    button1.Enabled = true;
                    button1.Visible = true;
                    this.BackgroundImage = null;
                    button2.Visible = true;
                    button2.Enabled = true;
                    Cursor.Show();
                }
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        public void setBackground(int index)
        {
            try
            {
                var dir = Image.FromFile((openFileDialog1.FileName.Remove(openFileDialog1.FileName.Length - openFileDialog1.SafeFileName.Length)) + picsroute[index]);
                this.BackgroundImage = Image.FromFile((openFileDialog1.FileName.Remove(openFileDialog1.FileName.Length - openFileDialog1.SafeFileName.Length))+picsroute[index]);
            }
            catch (FileNotFoundException)
            {
                this.BackgroundImage = null;
            }
            
        }
    }
}
