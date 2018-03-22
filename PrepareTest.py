#import pandas as pd
#import numpy as np
#import cmd_toolbox as messages
import test
#import os

t=int(input("how many tasks are going to be tested:"))
npeople=int(input("how many subjects are going to do the test?:"))
test.randomize(t,npeople)


#df = pd.DataFrame(arr)
#print(os.getcwd()+"\\samples.csv")
#df.to_csv(os.getcwd()+"\\samples.csv")
