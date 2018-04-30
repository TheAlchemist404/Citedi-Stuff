onmessage= function(e){
	 webgazer = e.data[0]
	 webgazer.setRegression('threadedRidge') /* currently must set regression and tracker */
        		.setTracker('clmtrackr')
        		.begin()
        		.showPredictionPoints(true);
}

if (typeof(webgazer) =! "undefined") {
var a=0,
Xprediction=[],
Yprediction=[],
TimeStamp=[]
Stuff=[[]];

function LogData(){
	a=a+1;
	Data=webgazer.getCurrentPrediction();

	//why getter doesnt work

	Xprediction.push(Data.x);
	Yprediction.push(Data.y);
	TimeStamp.push(a);
	if (flag) {
		var dummy=[0,0,0];
		for (var i = Xprediction.length - 1; i >= 0; i--) {
			dummy=[Xprediction[i],Yprediction[i],TimeStamp[i]];
			Stuff.push(dummy);
		}
		postMessage(Stuff);
	}
	setTimeout('LogData()',1500);
}

LogData();
}

