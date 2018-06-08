
window.onload = SetUp;
var controller;
var logger;
var TTime=0,
Ctime=0,
index=0,
Xprediction=[],
Yprediction=[],
CurrentTimeStamp=[],
TimeStamp=[],
Stuff=[[]];
var test=[
    [0,1],
    [2,3],
    [4,1],
    [2,5],
    [6,7],
    [8,9],
    [10,11],
    [6,12],
    [13,11],
    [14,15],
    [16,17],
    [18,19],
    [20,21],
    [22,23],
    [24,15],
    [18,25],
    [26,27]
];/*add here the test sequence*/
var myPix = [
	["images/00.png","apple"],
    ["images/01.png","acorn"],
    ["images/02.png","carrot"],
    ["images/03.png","onion"],
    ["images/04.png","garlic"],
    ["images/05.png","wheat"],
    ["images/06.png","half-life"],
    ["images/07.png","infinity"],
    ["images/08.png","ribbon"],
    ["images/09.png","water"],
    ["images/10.png","half-lifeCombine"],
    ["images/11.png","symbol"],
    ["images/12.png","incorrect"],
    ["images/13.png","symbols"],
    ["images/14.png","rabbit"],
    ["images/15.png","cat"],
    ["images/16.png","hippopotamus"],
    ["images/17.png","horse"],
    ["images/18.png","flamingo"],
    ["images/19.png","ostrich"],
    ["images/20.png","bird"],
    ["images/21.png","duck"],
    ["images/22.png","sheep"],
    ["images/23.png","donkey"],
    ["images/24.png","dog"],
    ["images/25.png","kangaroo"],
    ["images/26.png","butterfly"],
    ["images/27.png","bat"]
];

var myDemoPix = [
    ["images/demo/01.png","FairyTale"],
    ["images/demo/02.png","eye"],
    ["images/demo/03.png","plane"],
    ["images/demo/04.png","sail"],
    ["images/demo/05.png","star"],
    ["images/demo/06.png","ligthing"],
    ["images/demo/07.png","tent"],
    ["images/demo/08.png","panda"],
    ["images/demo/09.png","axe"],
    ["images/demo/10.png","bell"],
    ["images/demo/11.png","dress"],
    ["images/demo/12.png","cone"]
];
var count=0

function choosePic() {//it will be secuential on all the tests
    console.log("key")
	if (document.getElementById('Step2').style.visibility=="hidden"){
		document.getElementById('frame1').style.visibility="initial"
		document.getElementById('frame2').style.visibility="initial"
		if(index==test.length){
            console.log("save")
			exportData();
		} else {
            console.log("pic")
			setpic(); 
		}
	}
}

function waitPic(){
    if (document.getElementById('Step2').style.visibility=="hidden"){
        document.getElementById('frame1').style.visibility="initial"
        document.getElementById('frame2').style.visibility="initial"
        if(!controller){
            controller = setInterval(function(){
            if(index==test.length){

                exportData();
            } else {
                setpic(); 
            }
            },5000);
        }
                
    }
}

function DemoChoose(){/*for the clicks */

    if (document.getElementById('Step2').style.visibility=="hidden"){
        document.getElementById('frame1').style.visibility="initial"
        document.getElementById('frame2').style.visibility="initial"
        if(count+1>=myDemoPix.length-1){
            ResetAll();
        } else {
            Pic1=document.getElementById("Pic1");
            Pic2=document.getElementById("Pic2");

            if(Pic1.style.visibility!='hidden'){
                Pic1.style.visibility='hidden';
                Pic2.style.visibility='hidden';
                Pic1.src = "images/spacer.png";
                Pic1.alt ='none';
                Pic2.src = "images/spacer.png";
                Pic2.alt = 'none';
                console.log(count);
                console.log(myDemoPix[count][0])
                var toggle= setTimeout(function() {
                    Pic1.src = myDemoPix[count][0];
                    Pic1.alt = myDemoPix[count][1];
                    Pic2.src = myDemoPix[count+1][0];
                    Pic2.alt = myDemoPix[count+1][1];
                    Pic1.style.visibility='initial';
                    Pic2.style.visibility='initial';
                    clearTimeout(toggle);
                    toggle=null;
                },1000);   
                count=count+2;
            }

        }
    }
}

function DemoWait(){/*for the wait*/
    if (document.getElementById('Step2').style.visibility=="hidden"){
        document.getElementById('frame1').style.visibility="initial"
        document.getElementById('frame2').style.visibility="initial"
        if(!controller){
            controller = setInterval(DemoChoose,4000);
        }
                
    }
}

function setpic(){
    Pic1=document.getElementById("Pic1");
    Pic2=document.getElementById("Pic2");
    if(index==0){
        logger=setInterval(logginData,50);
        console.log("Start log")
    }
    if(Pic1.style.visibility!='hidden'){
        console.log("new pic");
        Pic1.style.visibility='hidden';
        Pic2.style.visibility='hidden';
        Pic1.src = "images/spacer.png";
        Pic1.alt ='none';
        Pic2.src = "images/spacer.png";
        Pic2.alt = 'none';
        var toggle= setTimeout(function() {
            Pic1.src = myPix[test[index][0]][0];
            Pic1.alt = myPix[test[index][0]][1];
            Pic2.src = myPix[test[index][1]][0];
            Pic2.alt = myPix[test[index][1]][1];
            Pic1.style.visibility='initial';
            Pic2.style.visibility='initial';
            Ctime=0;
            index++;
            clearTimeout(toggle);
            toggle=null;
        },1000);   
    }
}

function exportData(){
    //export fixations
    csvStuff=Stuff
    clearInterval(logger)
    var csv = 'x fixations,y fixations,CurrentTimeStamp,TimeStamp'; //add the index or name of the pictures shown
    csvStuff.forEach(function(row) {
        csv += row.join(',');
        csv += "\n";
    });
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Test.csv';
    hiddenElement.click();
    document.getElementById('test').style.cursor="default"
    if(controller!=null){
        clearInterval(controller);
    }
    document.body.onkeyup=null;
}

function ResetAll(){
    document.getElementById('Step2').style.visibility="initial"
    document.getElementById('Step1').style.visibility="initial"
    document.body.onkeyup=null;
    count=0;
    toggle=null;
    if(controller!=null){
        clearInterval(controller);
        controller=null;
    }
    var buttons=document.getElementsByClassName("Calibration")
    for(var i = 0; i < buttons.length; i++){
        buttons[i].style.background = "red";
        buttons[i].style.opacity=0.2;
        buttons[i].disabled=false;
    }
    CalibrationPoints=[];
    PointCalibrate = 0;
    document.getElementById("DemoCheck").checked= !document.getElementById("DemoCheck").checked;
    document.getElementById("frame1").style.visibility='hidden';
    document.getElementById("frame2").style.visibility='hidden';
    document.getElementById("Pic1").src = "images/spacer.png";
    document.getElementById("Pic1").alt ='none';
    document.getElementById("Pic2").src = "images/spacer.png";
    document.getElementById("Pic2").alt = 'none';

}

function SetUp(){
	webgazer.setRegression('ridge') /* currently must set regression and tracker */
   		.setTracker('clmtrackr')
   		.begin()
   		.showPredictionPoints(false);/*debugging*/

	function checkIfReady() {
	    if (webgazer.isReady()) {
	        SetVideoOutput();
	    } else {
	        setTimeout(checkIfReady, 100);
	    }
    }
    setTimeout(checkIfReady,100);

}

var width = 320;
var height = 240;
var topDist = '0px';
var leftDist = '0px';

function SetVideoOutput(){
    var video = document.getElementById('webgazerVideoFeed');

        //Position the camera feedback to the top left corner.
        video.style.display = 'block';
        video.style.position = 'fixed';
        video.style.top = topDist;
        video.style.left = leftDist;
        video.style.zIndex=5;

        //Set up the video feedback box size
        video.width = width;
        video.height = height;
        video.style.margin = '0px';
        video.style.background = '#222222';
        webgazer.params.imgWidth = width;
        webgazer.params.imgHeight = height;

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';

        //Setup the size of canvas
        overlay.style.position = 'fixed';
        overlay.width = width;
        overlay.height = height;
        overlay.style.top = topDist;
        overlay.style.left = leftDist;
        overlay.style.margin = '0px';
        overlay.style.zIndex=7;

        //Draw the face overlay on the camera video feedback
        var faceOverlay = document.createElement('face_overlay');
        faceOverlay.id = 'faceOverlay';
        faceOverlay.style.position = 'fixed';
        faceOverlay.style.top = '59px';
        faceOverlay.style.left = '107px';
        faceOverlay.style.border = 'solid';
        

        document.getElementById('Step2').appendChild(video);
        document.getElementById('Step2').appendChild(overlay);
        document.getElementById('Step2').appendChild(faceOverlay);
        

        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';

        var cl = webgazer.getTracker().clm;

        //This function draw the face of the user frame.
        function drawLoop() {
            requestAnimFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,width,height);
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
            }
        }
        drawLoop();
}

function logginData(){
	TTime=TTime+1;
	Ctime=Ctime+1;
    if(document.getElementById("Pic1").alt=="none" || document.getElementById("Pic2").alt=="none"){
        Ctime=0
    }
	gazerdata=webgazer.getCurrentPrediction();
	Xprediction.push(gazerdata.x);
	Yprediction.push(gazerdata.y);
	TimeStamp.push(TTime);
	CurrentTimeStamp.push(Ctime);
	var dummy=[0,0,0,0];
	Stuff=[[]];
	for (var i = Xprediction.length - 1; i >= 0; i--) {
		dummy=[Xprediction[i],Yprediction[i],CurrentTimeStamp[i],TimeStamp[i]];
		Stuff.push(dummy);
		}
}

var CalibrationPoints=[];
var PointCalibrate = 0;
var TButtons=16

function CButtons(ButtonClicked) { // click event on the calibration buttons
  if (!CalibrationPoints[ButtonClicked]){ // initialises if not done
    CalibrationPoints[ButtonClicked]=0;
  }
  CalibrationPoints[ButtonClicked]++; // increments values
  
  if (CalibrationPoints[ButtonClicked]==5){ //only turn to yellow after 5 clicks
    document.getElementById(ButtonClicked).style.background='yellow';
    document.getElementById(ButtonClicked).disabled = true; //disables the button
    PointCalibrate++;
  }else if (CalibrationPoints[ButtonClicked]<5){
    //Gradually increase the opacity of calibration points when click to give some indication to user.
    var opacity = 0.2*CalibrationPoints[ButtonClicked]+0.2;
    document.getElementById(ButtonClicked).style.opacity=opacity;
  }
	//Show the middle calibration point after all other points have been clicked.
	if (PointCalibrate == TButtons){
		document.getElementById("Pt5").style.display="initial";
	}
	if (PointCalibrate >= TButtons+1){ // last point is calibrated
		document.getElementById('Step2').style.visibility="hidden";
	}
}

function toggleFunction(text){
    buttons=document.getElementsByClassName("Calibration")
    if (document.getElementById("DemoCheck").checked){
        count=0;
        TButtons=4;
        for(var i = 0; i < buttons.length; i++){
            buttons[i].style.display = "none";
        }
        document.getElementById("Pt4").style.display="initial";
        document.getElementById("Pt6").style.display="initial";
        document.getElementById("Pt13").style.display="initial";
        document.getElementById("Pt14").style.display="initial";
        if(text=="click"){
            document.body.onkeyup=DemoChoose;
        }else{
            document.body.onkeyup=DemoWait;
        }
    }else{
        TButtons=16;
        for(var i = 0; i < buttons.length; i++){
            buttons[i].style.display = "initial";
        }
        if(text=="click"){
            document.body.onkeyup=choosePic;
        }else{
            document.body.onkeyup=waitPic;
        }
    }
    document.getElementById("Pt5").style.display="none";
    document.getElementById("Step1").style.visibility="hidden"
}


