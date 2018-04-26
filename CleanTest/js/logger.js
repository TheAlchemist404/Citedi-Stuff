
var a=0,
Xprediction=[],
Yprediction=[],
TimeStamp=[];

function LogData(){
	a=a+1;
	Data=webgazer.getCurrentPrediction();
	Xprediction.push(Data.x);
	Yprediction.push(Data.y);
	TimeStamp.push(a);
	setTimeout('LogData()',20);
}

LogData();
