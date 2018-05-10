
window.onload = SetUp;
window.onresize = resize;

var logger;
var TTime=0,
Ctime=0,
index=0,
Xprediction=[],
Yprediction=[],
CurrentTimeStamp=[],
TimeStamp=[],
Stuff=[[]];
var picstoshow=[
[0],
[2],
[0],
[1],
[2],
[0],
[1],
[2],
[0],
[0]
];//put it empty if you are off debugging stage
var myPix = [
	["images/lion.jpg","lion"],
	["images/tiger.jpg","tiger"],
	["images/bear.jpg","bear"]
	];

function choosePic() {//it will be secuential on all the tests
	if (document.getElementById('Step2').style.visibility=="hidden"){
		document.getElementById('testins').style.visibility="hidden"
		document.getElementById('frame1').style.visibility="initial"
		document.getElementById('frame2').style.visibility="initial"
		if(index==picstoshow.length){
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
		} else {
			//new set, be sure to reset the timestamp
			Ctime=0;
			if(index==0){
				logger=setInterval(logginData,50);
			}
			document.getElementById("Pic1").src = myPix[picstoshow[index][0]][0];
		    document.getElementById("Pic1").alt = myPix[picstoshow[index][0]][1];
		    document.getElementById("Pic2").src = myPix[picstoshow[index][1]][0];
		    document.getElementById("Pic2").alt = myPix[picstoshow[index][1]][1];
		    index=index+1;

		}
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
	        resize();
	    } else {
	        setTimeout(checkIfReady, 100);
	    }
    }
    setTimeout(checkIfReady,100);

   	document.getElementById('Pt5').style.display="none";
//set up the list of pictures

}

var width = 320;
var height = 240;
var topDist = '0px';
var leftDist = '0px';

function SetVideoOutput(){
    //Set up video variable to store the camera feedback
    var video = document.getElementById('webgazerVideoFeed');

    //Position the camera feedback to the top left corner.
    video.style.display = 'block';
    video.style.position = 'fixed';
    video.style.top = topDist;
    video.style.left = leftDist;

    //Set up the video feedback box size
    video.style.maxWidth = width;
    video.style.maxHeight = height;
    video.style.margin = '0px';
    video.style.background = '#222222';
    webgazer.params.imgWidth = width;
    webgazer.params.imgHeight = height;
    video.className="VideoFeed"

    //Set up the main canvas. The main canvas is used to calibrate the webgazer.
    var overlay = document.createElement('canvas');
    overlay.id = 'overlay';

    //Setup the size of canvas
    overlay.style.position = 'fixed';
    overlay.style.maxWidth = width;
    overlay.style.maxHeight = height;
    overlay.style.top = topDist;
    overlay.style.left = leftDist;
    overlay.style.margin = '0px';
    overlay.className="VideoFeed"

    //Draw the face overlay on the camera video feedback
    var faceOverlay = document.createElement('face_overlay');
    faceOverlay.id = 'faceOverlay';
    faceOverlay.style.position = 'fixed';
    faceOverlay.style.top = '59px';
    faceOverlay.style.left = '107px';
    faceOverlay.style.border = 'solid';
    faceOverlay.className="VideoFeed"

    document.body.appendChild(overlay);
    document.body.appendChild(faceOverlay);

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

function resize() {
//fix this somehow and resize all objects related to video

    var img = document.getElementsByClassName('VideoFeed'); 

    var w = window.innerWidth;
    var h = window.innerHeight;
    //console.log(w);
    //console.log(h);

    for (i = 0; i < img.length; i++) { 
        var ratio = (img[i].clientHeight / img[i].clientWidth);
        if (img[i].clientHeight > h && img[i].clientWidth < w) {
            img[i].style.height = h + "px";
            img[i].style.width = (h / ratio) + "px";
        }
        if (img[i].clientHeight <= h && img[i].clientWidth < w && ratio > 1) {
            img[i].style.height = h + "px";
            img[i].style.width = (h / ratio) + "px";
        }
        if (img[i].clientWidth >= w) {
            img[i].style.width = w + "px";
        }
        if (img[i].clientHeight < h && img[i].clientWidth <= w  && ratio < 1) {
            img[i].style.width = w + "px";
        }
    }
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
	var CurrentButton=document.getElementById(ButtonClicked);
	if (!CalibrationPoints[ButtonClicked]){ // initialises if not done
		CalibrationPoints[ButtonClicked]=0;
	}
	CalibrationPoints[ButtonClicked]++; // increments values
	if (CalibrationPoints[ButtonClicked]==5){ //only turn to yellow after 5 clicks
		CurrentButton.style.background='yellow';
		CurrentButton.disabled = true; //disables the button
		PointCalibrate++;
	}else if (CalibrationPoints[ButtonClicked]<5){
		//Gradually increase the opacity of calibration points when click to give some indication to user.
		var opacity = 0.2*CalibrationPoints[ButtonClicked]+0.2;
		CurrentButton.style.opacity=opacity;
	}
	//Show the middle calibration point after all other points have been clicked.
	if (PointCalibrate == 8){
		document.getElementById('Pt5').style.display="initial";
	}
	if (PointCalibrate >= 9){ // last point is calibrated
		document.getElementById('Step2').style.visibility="hidden";
	}
}


