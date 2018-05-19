
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
[4,5],
[6,7],
[8,1],
[9,10],
[11,12],
[2,13],
[14,15],
[16,17],
[18,15],
[19,20],
[21,22],
[23,10],
[24,8],
[25,22],
[26,27],
[26,28]
];/*add here the test sequence*/
var myPix = [
	["images/01.png","apple"],
	["images/02.png","acorn"],
	["images/03.png","half-lifeBlack-mesa"],
    ["images/04.png","infinity"],
    ["images/05.png","ribbon"],
    ["images/06.png","waves"],
    ["images/07.png","boat"],
    ["images/08.png","car"],
    ["images/09.png","garlic"],
    ["images/10.png","half-lifeCombine"],
    ["images/11.png","nirrti"],
    ["images/12.png","hippo"],
    ["images/13.png","flamingo"],
    ["images/14.png","cross"],
    ["images/15.png","fish"],
    ["images/16.png","cat"],
    ["images/17.png","horse"],
    ["images/18.png","rooster"],
    ["images/19.png","bat"],
    ["images/20.png","rocket"],
    ["images/21.png","planet"],
    ["images/22.png","onion"],
    ["images/23.png","carrot"],
    ["images/24.png","simbol"],
    ["images/25.png","truck"],
    ["images/26.png","wheat"],
    ["images/27.png","shield1"],
    ["images/28.png","shield2"],
    ["images/29.png","shield3"]
	];

function choosePic() {//it will be secuential on all the tests
	if (document.getElementById('Step2').style.visibility=="hidden"){
		document.getElementById('frame1').style.visibility="initial"
		document.getElementById('frame2').style.visibility="initial"
		if(index==test.length){
			exportData();
		} else {
			setpic(); 
		}
	}
}

function setpic(){
    if(index==0){
    logger=setInterval(logginData,50);
    }
    if(document.getElementById("Pic1").style.visibility!='hidden'){
    document.getElementById("Pic1").style.visibility='hidden';
    document.getElementById("Pic2").style.visibility='hidden';
    document.getElementById("Pic1").src = "images/spacer.png";
    document.getElementById("Pic1").alt ='none';
    document.getElementById("Pic2").src = "images/spacer.png";
    document.getElementById("Pic2").alt = 'none';
    var toggle= setTimeout(function() {
        document.getElementById("Pic1").src = myPix[test[index][0]][0];
        document.getElementById("Pic1").alt = myPix[test[index][0]][1];
        document.getElementById("Pic2").src = myPix[test[index][1]][0];
        document.getElementById("Pic2").alt = myPix[test[index][1]][1];
        document.getElementById("Pic1").style.visibility='initial';
        document.getElementById("Pic2").style.visibility='initial';
        Ctime=0;
        index++;
        clearTimeout(toggle);
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
            hiddenElement.download = 'myFile.csv';
            hiddenElement.click();
            document.getElementById('test').style.cursor="default"
            if(controller!=null){
                clearInterval(controller);
            }else{
                document.body.onkeyup=null;
            }
}

function SetUp(){
	webgazer.setRegression('threadedRidge') /* currently must set regression and tracker */
   		.setTracker('clmtrackr')
   		.begin()
   		.showPredictionPoints(true);/*debugging*/

	function checkIfReady() {
	    if (webgazer.isReady()) {
	        SetVideoOutput();
	    } else {
	        setTimeout(checkIfReady, 100);
	    }
    }
    setTimeout(checkIfReady,100);

   	document.getElementById('Pt5').style.display="none";
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
	if (PointCalibrate == 16){
		document.getElementById('Pt5').style.display="initial";
	}
	if (PointCalibrate >= 17){ // last point is calibrated
		document.getElementById('Step2').style.visibility="hidden";
	}
}

function toggleFunction(text){
    if(text=="click"){
        document.body.onkeyup=choosePic;
    }else{
        document.body.onkeyup=function(){
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
    }
    document.getElementById("Step1").style.visibility="hidden"

}


