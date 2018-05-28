import pandas
import numpy
import os

# get data
FilePath=input("Write the path of the text file containing all the names: ")
textFile=open(FilePath,'r')
lines=textFile.readlines()
mainPath=lines.pop(0)

for file in lines:
	
	path=(mainPath+file).replace("\n","")

	data=pandas.read_csv(path).values
	data=numpy.flipud(data)

	# print(data)
	firstTime=True
	indexes=[]
	cursor=0
	# find zeros and ones
	for time in data[:,2]:
		if (time==1) or (time==0 and firstTime):
			indexes.append(cursor)
			firstTime = not firstTime
		cursor=cursor+1
	else:
		cursor=(len(indexes))/2
	# print(indexes)

	indexes=reversed(indexes)
	Npath=path[:-4]+"\\"
	fileName=path[path.rfind("\\")+1:]

	if not os.path.exists(Npath):
	    os.makedirs(Npath)
	os.rename(path,Npath+"Complete"+fileName)

	for x in indexes:
		
		buff=data[x:,:]
		df=pandas.DataFrame(data=buff,columns=["x fixations","y fixations","Current Time","TimeStamp"])
		if (buff[0,2]==0):
			df.to_csv(Npath+"Blank "+str(cursor)+".csv")
		else:
			df.to_csv(Npath+"Test "+str(cursor)+".csv")
			cursor=cursor-1
		# print(df)
		data=data[:x,:]
		