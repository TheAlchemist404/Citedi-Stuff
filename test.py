import pandas as pd
import numpy as np 
import random
import os

def randomize(t: int, n: int) :
    while ((n%t)!=0):
        n = input("please enter a valid number of participants (a multiple of the number of tasks):")
        n=int(n)
    nmax=int(n/t)
    test=[]
    for x in range(0,n):
        test.append(t)
    Task=0
    #print(len(test))
    while Task!=t:
        cont=0
    #    print("entering first loop"
        while cont<nmax:
    #        print("entering second loop")
            i=0
            while test[i]!=t:
                i=random.randint(0,n-1)
            test[i]=Task
            cont=cont+1
        Task=Task+1
    #    print("exiting second loop")
    #print("exiting first loop")
    arr=np.array(test)
    df = pd.DataFrame(arr)
    print(os.getcwd()+"\\test.csv")
    df.to_csv(os.getcwd()+"\\test.csv")
    print("finished")
