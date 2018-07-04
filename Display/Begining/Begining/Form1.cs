using System;
using System.Windows.Forms;

namespace Begining
{
    public partial class Test : Form
    {
        int cPoint = 0, cTest = 0;
        PictureBox[] Dots = new PictureBox[10];
        int[,,] Pdata = new int[2,10,3] {
            { 
                { 0, 20,12 },
                { 20, 20,5 },
                { 30, 20,1 },
                { 0, 27,3 },
                { 40, 20,20 },
                { 35, 20,10 },
                { 10, 20,7 },
                { 20, 15,1 },
                { 30, 40,2 },
                { 30, 45,10} },
            { 
                { 0, 20,12 },
                { 20, 20,5 },
                { 30, 20,1 },
                { 0, 27,3 },
                { 40, 20,20 },
                { 35, 20,10 },
                { 10, 20,7 },
                { 20, 15,1 },
                { 30, 40,2 },
                { 30, 45,10} }
        };


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
        }

        private void Test_Load(object sender, EventArgs e)
        {

        }

        public void wipePoints()
        {
            foreach (PictureBox item in Dots)
            {
                item.Visible = false;
                item.Left = 0;
                item.Top = 0;
            }
        }

        public void SetPoints(int[] coordsX, int[] coordsY)
        {
            for (int i = 0; i < coordsX.Length; i++)
            {
                Dots[i].Left = (coordsX[i] - (Dots[i].Width / 2))*10;
                Dots[i].Top = (coordsY[i] - (Dots[i].Height / 2))*10;
            }
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (cPoint<Dots.Length)
            {
                Dots[cPoint].Visible = true;
                timer1.Interval = Pdata[cTest,cPoint, 2] * 1000;
            }
            else
            {
                int[] X = new int[Pdata.GetLength(1)];
                int[] Y = new int[Pdata.GetLength(1)];
                cTest++;
                wipePoints();
                if (cTest<Pdata.GetLength(0))
                {
                    for (int i = 0; i < X.Length; i++)
                    {
                        X[i] = Pdata[cTest, i, 0];
                        Y[i] = Pdata[cTest, i, 1];
                    }
                    SetPoints(X, Y);
                    cPoint = -1;
                }
                else
                {
                    this.Close();
                }
                timer1.Interval = 10;
            }
            cPoint++;
        }
    }
}
