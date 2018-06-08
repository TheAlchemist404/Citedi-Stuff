import pandas
import numpy
import os
import matplotlib.pyplot as m

# get data
# FilePath=input("Write the path of the text file containing all the names: ")
FilePath="files.txt"
textFile=open(FilePath,'r')
lines=textFile.readlines()
mainPath=lines.pop(0)

for file in lines:
	
	path=(mainPath+file).replace("\n","")

	data=pandas.read_csv(path).values
	data=numpy.flipud(data)

	#get the harmonic median
	Xcoordinate=data[numpy.where(data[:,0]!=0),0] 
	Hx=len(Xcoordinate[0,:])/((1/Xcoordinate[0,:]).sum())
	Ycoordinate=data[numpy.where(data[:,1]!=0),1] 
	Hy=len(Ycoordinate[0,:])/((1/Ycoordinate[0,:]).sum())

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
		cursor=int((len(indexes))/2)
	# print(indexes)

	indexes=reversed(indexes)
	fileName=path[path.rfind("\\")+1:]
	Npath=os.getcwd()+"\\"+fileName[:-4]+"\\"

	if not os.path.exists(Npath):
	    os.makedirs(Npath+"Blank\\Graphic\\")
	    os.makedirs(Npath+"Blank\\Data\\")
	    os.makedirs(Npath+"Test\\Graphic\\")
	    os.makedirs(Npath+"Test\\Data\\")
	os.rename(path,Npath+"Complete"+fileName)

	Report=open(Npath+"result.txt","w")
	for x in indexes:

		buff=data[x:,:]
		leftBool=numpy.swapaxes([(buff[:,0]<Hx)*1],0,1)
		buff=numpy.hstack((buff,leftBool))
		rigthBool=numpy.swapaxes([(buff[:,0]>Hx)*1],0,1)
		buff=numpy.hstack((buff,rigthBool))
		lastLine=numpy.array([Hx,Hy,0,0,numpy.sum(leftBool),numpy.sum(rigthBool)])
		
		firstTime=True
		conteo=0
		c=buff[0,4]
		for leftdata in buff[:,4]:
			if (c!=leftdata):
		 		c=leftdata
		 		conteo=conteo+1

		buff=numpy.vstack((buff,lastLine))
		buff=numpy.vstack((buff,[Hx,Hy,0,0,0,conteo]))
		if(buff[0,2]==0):
			Report.write("Blank "+str(cursor)+":"+os.linesep+"    Left:"+str(numpy.sum(leftBool))+os.linesep+"    Rigth:"+str(numpy.sum(rigthBool))+os.linesep+"    Changes:"+str(conteo)+os.linesep)
		else:
			Report.write("Test "+str(cursor)+":"+os.linesep+"    Left:"+str(numpy.sum(leftBool))+os.linesep+"    Rigth:"+str(numpy.sum(rigthBool))+os.linesep+"    Changes:"+str(conteo)+os.linesep)

		#graph the fixations
		left=(buff[numpy.where(buff[:,0]<Hx),:])
		graph=m.scatter(left[:,:,0], left[:,:,1])

		right=(buff[numpy.where(buff[:,0]>Hx),:])
		graph=m.scatter(right[:,:,0], right[:,:,1])

		m.gca().set_xlim([0,Hx*2])
		m.gca().set_ylim([0,Hy*2])

		df=pandas.DataFrame(data=buff,columns=["x fixations","y fixations","Current Time","TimeStamp","left","right"])
		if (buff[0,2]==0):
			df.to_csv(Npath+"Blank\\Data\\Blank"+str(cursor)+".csv")
			m.savefig(Npath+"Blank\\Graphic\\Blank"+str(cursor)+".png")	
		else:
			df.to_csv(Npath+"Test\\Data\\Test"+str(cursor)+".csv")
			m.savefig(Npath+"Test\\Graphic\\Test"+str(cursor)+".png")
			cursor=cursor-1
		# print(df)
		m.clf()
		data=data[:x,:]

	Report.close()

	print(Npath)
		