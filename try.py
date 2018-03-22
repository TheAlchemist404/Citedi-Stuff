import numpy as np
import random as r
import pandas as pd
import os

x=2
y=3
d=5
while ((x%d != y%d) or d>y or not((x*d)%y==0)):
    #Later ask for the values
    x=r.randint(2,20)
    y=r.randint(2,20)
    d=r.randint(2,20)
print(x)
print(y)
print(d)
xArray=np.zeros(x)
yArray=np.zeros(y)
matrix=np.zeros((x,y))
xC=0
yC=0
minX=0.0
minY=0.0
Xplaces=[]
Yplaces=[]

for i in range(0,x*d):
    Xplaces=np.where(np.isin(xArray,[minX]))
    print(Xplaces)
    Yplaces=np.where(np.isin(yArray,[minY]))
    print(Yplaces)
    xC=Xplaces[0][r.randint(0,len(Xplaces[0])-1)]
    yC=Yplaces[0][r.randint(0,len(Yplaces[0])-1)]
    if matrix[xC,yC]!=0:
        #ditch the configuration or fix it
        pass

    #this was an atempt to fix the problem above but it didnt worked
    # while matrix[xC,yC]!=0:
    #     xC=xC+1
    #     if xC>=len(matrix[:,0]):
    #         xC=0
    #         yC=yC+1
    #         if yC>=len(matrix[0,:]):
    #             yC=0

    matrix[xC,yC]=1
    xArray[xC]=xArray[xC]+1
    yArray[yC]=yArray[yC]+1
    minX=min(xArray)
    minY=min(yArray)
    print("filling the table "+str(i))
    print(matrix)

print(matrix)
df = pd.DataFrame(matrix)
print(os.getcwd()+"\\test.csv")
df.to_csv(os.getcwd()+"\\test.csv")