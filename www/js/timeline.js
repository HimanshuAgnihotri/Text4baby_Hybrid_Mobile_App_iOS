var currentSlideNum;
var mode;

var initialSliderNumber = initialSliderNumber();
var CollectionTimelinePregnancy={};
var CollectionTimelineNewbaby={};

var isCollectionPopulatedPregnancy=0;
var isCollectionPopulatedNewbaby=0;

var strSliderPregnancy='';
var strSliderNewbaby='';
var isFlipped=0;
var isSliderInitialize1=0;
var isSliderInitialize2=0;
var iphone4 = false;  


//------------------------------------------------- Initializing Device ------------------------------------------------	
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);

function TimelineReady() {
    onDeviceReady();
}
function onBackKeyDown(e) {
    history.go(-1);
} 

$(document).on("expand", "[data-role=collapsible]", function () {
    var topoffset = 50;
    var position = $(this).offset().top - topoffset;
    $.mobile.silentScroll(position);
	$.mobile.pageLoadErrorMessage = "";
});

// This function is called when the device is ready
function onDeviceReady() {
    //alert('device ready');
    if (window.localStorage.getItem("timelineUpdate") == "4") {
        startexecution();
    }
    else {
        window.setTimeout(function () {
            startexecution();
            $.mobile.hidePageLoadingMsg();
        }, 4000);
    }
}

function startexecution() {
    db = window.openDatabase("Text4BabyDB", "1.0", "PhoneGap Demo", 600000);
    mode = getUrlVars()["mode"];  // 1 for Pregnancy,2 for New baby
    if (typeof mode === "undefined") {
        mode = 1;
    }

    iphone4 = (window.screen.height == (960 / 2));
    BuildTimelineSlides();
    TimelineInitiate(mode);
}




function BuildTimelineSlides()
{
	  for(var i = 4; i < 43; i++)  
			 {			
				 strSliderPregnancy +="<div class = 'item' id = 'id-" + i + "'><div id='cf2' class='banner'><span class='banner-text' id='textid-" + i + "'></span><img class='top"+ i  +"' src='images/timeline/pregnancy/pregnancy-week" + i + ".jpg' onClick='toggleMoreInfo(" + i + ");' /></div><h4>Week " + i + "</h4></div>";	
			 }	
			 
	  for(var i = 1; i < 53; i++)
			 {		   
			    strSliderNewbaby +="<div class = 'item' id = 'id-" + i + "'><div id='cf2' class='banner'><span class='banner-text' id='nbtextid-" + i + "'></span><img class='top" + i + "' src='images/timeline/baby/baby-week" + i + ".jpg' onClick='toggleMoreInfo(" + i + ");' /></div><h4>Week " + i + "</h4></div>";
			 }
		 
}


// This function initialize the Timeline for the User based on mode
// where mode=1 is Pregnancy Timeline
// and mode=2 is New-Baby Timeline
function TimelineInitiate(mode) {

    window.localStorage.setItem("onchangeweek", null);
    window.localStorage.setItem("onchangeweeknb", null);	
	
    $("#firstname1").text(window.localStorage.getItem("firstname"));
	
    window.scrollTo(0, 0);
	var nameOfPage='pregnancy';
    if(mode==2)
     	  nameOfPage='newbaby';		  
	RegisterPagehit('timeline/'+nameOfPage);
	
	if(isFlipped==0)
		LoadSlider(mode);  // Load Slider with the Images	 
	else
		FlipTimeline(mode);
}

function FlipTimeline(mode)
{   	
	ChangeTimelineAccordion();
    InitializeSlider();		  
	ChangeNavigationButtonStatus(); 
	PreLoadData(currentSlideNum);	
	LoadData(currentSlideNum);
	isFlipped=0;
	$("#timeline2").removeClass("flipped");	
}

function InitializeSlider()
{	 
		if(mode==1)
		{
		  // $('#slider1').empty();
		  // $('#slider1').append(strSliderPregnancy);
		   $('#iosSlider1').iosSlider('destroy');
		   $('#iosSlider2').iosSlider('destroy');
		   $("#iosSlider2").hide();
		   $("#iosSlider1").show();
		   $('#iosSlider1').iosSlider({
															snapToChildren: true,																											
															scrollbar: false,
															desktopClickDrag: true,
															keyboardControls: false,
															responsiveSlideContainer: true,
															responsiveSlides: true,
															startAtSlide :currentSlideNum,
															navPrevSelector: $('#prevButton1'),
															navNextSelector: $('#nextButton1'),
															onSlideComplete: slideComplete,
															onSliderLoaded: sliderLoaded,
															onSlideChange: slideChange,
															onSlideStart :slideStart							
														});	
		}		
		else
		{
		 //  $('#slider2').empty();
		 //  $('#slider2').append(strSliderNewbaby);
		    $('#iosSlider1').iosSlider('destroy');
		   $('#iosSlider2').iosSlider('destroy');
		   $("#iosSlider1").hide();
		   $("#iosSlider2").show();
						$('#iosSlider2').iosSlider({
																						snapToChildren: true,																						
																						scrollbar: false,
																						desktopClickDrag: true,
																						keyboardControls: false,
																						responsiveSlideContainer: true,
																						responsiveSlides: true,
																						startAtSlide :currentSlideNum,
																						navPrevSelector: $('#prevButton2'),
																						navNextSelector: $('#nextButton2'),
																						onSlideComplete: slideComplete,
																						onSliderLoaded: sliderLoaded,
																						onSlideChange: slideChange,
																						onSlideStart :slideStart							
																					});	
		}
}

function ChangeTimelineAccordion()
{
   if(mode==1)
	 {	   
	     // Pregnancy Timeline		
		$("#baby_week_info").hide();
		$("#pregnancy-btn").hide();
			
		$("#baby-btn").show();
		$("#pregnancy_week_info").show();
	 }
	 else
	 {
	   
	      // New Baby Timeline
            $("#pregnancy_week_info").hide();
			$("#baby-btn").hide();
			
			$("#pregnancy-btn").show();
			$("#baby_week_info").show();			
		   
	 }
}


function ChangeNavigationButtonStatus()
{
      var maxNumberOfSlides;			
			
	    if(currentSlideNum>1)
		{
			$("#prevButton1").show();
			$("#prevButton2").show();
		}
		else
		{
			$("#prevButton1").hide();
			$("#prevButton2").hide();
		}
			
			
		  if(mode==1)
		  {
			  maxNumberOfSlides=39;
		  } 
		  else
		  {
			 maxNumberOfSlides=52;
		  }
		  
		   if(currentSlideNum==maxNumberOfSlides)
		   {
					$("#nextButton1").hide();
					$("#nextButton2").hide();
		   }					
		   else
		   {
					$("#nextButton1").show();
					$("#nextButton2").show();
		   }
}

// This function Load the slider with the slides that are to be used for respective timeline
function LoadSlider(mode)
{ 
		//$("#timeline2").addClass("hideSlider"); 
   //  $("#timeline2").show();
    // destroy and reinitialize the slider 
	// $('#iosSlider').iosSlider('destroy');
	if(isFlipped==0)
	{
		 $('#slider1').empty();
		 $('#slider2').empty();
	 
		 $('#slider1').append(strSliderPregnancy);
		 $('#slider2').append(strSliderNewbaby);
	 }
	 
      ChangeTimelineAccordion();
  
      var slideAtInitialize=initialSliderNumber
		
		if(isFlipped==1)
          {			 
			  $("#timeline2").removeClass("flipped");			  
		  }
		
	      currentSlideNum=slideAtInitialize;
			
			window.setTimeout(function(){ LoadAllInfo(mode);},1); 	
			
			$("#timeline2").show();
			// Initialize the Sliders			
			InitializeSlider();
		    isFlipped=0;		
}


// This function is called when the slider completed loading
function sliderLoaded(args) 
{	  
   
}

function LoadAllInfo(mode) {

    ChangeNavigationButtonStatus(); 
    var sqlLoadAllInfo;	
	var loadFromCache=0;
	if((mode==1 && isCollectionPopulatedPregnancy==1) || (mode==2 && isCollectionPopulatedNewbaby==1))
	{
	   loadFromCache=1;
	}	
	
	if(mode==1)
	 {	    
	     sqlLoadAllInfo = 'select ID,numWeek,Weight,height,title,content,radioTitle,pregRadioOneLabel,pregRadioTwoLabel,pregRadioThreeLabel,pregPollResultTitle,pregweekbar1label,pregweekbar2label,pregweekbar3label,pregweekbar1value,pregweekbar2value,pregweekbar3value,cboxOneTitle,cboxTwoTitle,photocontent,padding from TPregnancy';
	 }
	 else
	 {
	     sqlLoadAllInfo = 'select ID,Babyimg,picTxt,contentBaby,radioTitleBaby,babyRadioOneLabel,babyRadioTwoLabel,babyRadioThreeLabel,babyPollResultTitle,babyweekbar1label,babyweekbar2label,babyweekbar3label,babyweekbar1value,babyweekbar2value,babyweekbar3value,cboxBabyOneTitle,cboxBabyTwoTitle,photocontentbaby,padding from TNewBaby';
	 }
	
	if(loadFromCache==1)
		{
		    PreLoadData(currentSlideNum);
			LoadData(currentSlideNum);
		}
		else
		{	
			db.transaction(function (tx) {
						tx.executeSql(sqlLoadAllInfo, [], LoadAllInfo2_success);
					}
						 , transaction_error); 
		}		
		
}
function LoadAllInfo2_success(tx,results)
{
   var len = results.rows.length;	
   var sqlLoadAllInfo;	
 
   for (var i=0; i<len; i++) {
    	var weekData = results.rows.item(i);
		if(mode==1)
		   CollectionTimelinePregnancy[i+1]=weekData;
		else
		   CollectionTimelineNewbaby[i+1]=weekData;
   }
     // initialize with initial slide number
    if(mode==1)
		isCollectionPopulatedPregnancy=1;
	else
		isCollectionPopulatedNewbaby=1;
   
   if(mode!=1)
	 {	
		// Populate other timeline also  .. Preg	 
	     sqlLoadAllInfo = 'select ID,numWeek,Weight,height,title,content,radioTitle,pregRadioOneLabel,pregRadioTwoLabel,pregRadioThreeLabel,pregPollResultTitle,pregweekbar1label,pregweekbar2label,pregweekbar3label,pregweekbar1value,pregweekbar2value,pregweekbar3value,cboxOneTitle,cboxTwoTitle,photocontent,padding from TPregnancy'; 	 
      
	 }
	 else
	 {
	    // Populate other timeline also  .. Newbaby	 
	     sqlLoadAllInfo = 'select ID,Babyimg,picTxt,contentBaby,radioTitleBaby,babyRadioOneLabel,babyRadioTwoLabel,babyRadioThreeLabel,babyPollResultTitle,babyweekbar1label,babyweekbar2label,babyweekbar3label,babyweekbar1value,babyweekbar2value,babyweekbar3value,cboxBabyOneTitle,cboxBabyTwoTitle,photocontentbaby,padding from TNewBaby';	  
	 }
	 
	 db.transaction(function (tx) {
						tx.executeSql(sqlLoadAllInfo, [], LoadAllInfo_success);
					}
						 , transaction_error); 
	 
}

function LoadAllInfo_success(tx,results)
{
	var len = results.rows.length;	

   for (var i=0; i<len; i++) {
    	var weekData = results.rows.item(i);
		if(mode!=1)
		   CollectionTimelinePregnancy[i+1]=weekData;
		else
		   CollectionTimelineNewbaby[i+1]=weekData;
   }
     // initialize with initial slide number
    if(mode!=1)
		isCollectionPopulatedPregnancy=1;
	else
		isCollectionPopulatedNewbaby=1;
			
    PreLoadData(currentSlideNum);
  	LoadData(currentSlideNum);
}

function slideChange(args) {  
  
 currentSlideNum =args.currentSlideNumber;
  
 ChangeNavigationButtonStatus(); 
 PreLoadData(currentSlideNum);
  
  
		
    if (!args.slideChanged) 
	{ 
	   return false;
	}
}
 
function slideComplete(args) {
    
    currentSlideNum = args.currentSlideNumber;
	
    if (mode == 1) {
        window.localStorage.setItem("onchangeweek", args.currentSlideNumber);
    }
    else {
        window.localStorage.setItem("onchangeweeknb", args.currentSlideNumber);
    }

   LoadData(currentSlideNum);   
  
 }
 
 function ResetSlider()
 {    
	
 }
 
 function PreLoadData(id)
 {
    var week=parseInt(id) + 3;	
    var numBabyWeek=id;
    var profile ;
	
	if(mode==1)
	   profile= CollectionTimelinePregnancy[id];
	else	
	   profile= CollectionTimelineNewbaby[id];
	
	if(mode==1)
	{  
	    $('#textid-'+week).html("<h5>Mom this Week</h5><p>"+profile.photocontent+"</p>");   
	    
		var timelineimg="images/timeline/pregnancy-tab1/week" + week + ".jpg";
		 // Pregnancy Tab One Accordion
		$('div.timeline-grid-pregnancy-one').html("<h2 class='txt-center'>Week " + profile.numWeek + "</h2> <div class='timeline-block-one'> <div class='timeline-block-one-pic'><img src='" + timelineimg + "' alt=''></div> <ul> <li>Weight: " + profile.Weight + " </li> <li>Height: " + profile.height + " </li> </ul>  </div> <h2 class='margin-spacer txt-center'>" + profile.title + "</h2> <p>" + profile.content + "</p>").trigger('create');
		
	}
	else
	{	
	  $('#nbtextid-'+id).html("<h5>Mom this Week</h5><p>"+profile.photocontentbaby+"</p>");
	  var timelineBabyimg="images/timeline/baby-tab1/week"+profile.Babyimg+".jpg";
	   // Baby Tab One Accordion	
	   $('div.timeline-grid-baby-one').html("<div class='timeline-block-one top-margin20'> <div class='timeline-block-one-pic'><img src='" + timelineBabyimg + "' alt=''></div> <ul class='top-margin20'> <li class='no-border'> " + profile.picTxt + " </li> </ul> </div> <p>" + profile.contentBaby + "</p>");
    }

 }
 // it is currently using ID (not week number)
 function LoadData(id)
 {
    if(mode==1)
	{	
		// Load through collection
		GetTimelinePregData(id) ;
    }
   else
   {    
	  GetTimelineNewBabyData(id);
   }
		 
 }
 
 function GetTimelinePregData(id) {
  //  alert('hi');
	var week=parseInt(currentSlideNum) + 3;
   // var pregnancyweek = week;
    var timelineimg = "images/timeline/pregnancy-tab1/week" + week + ".jpg";
    var pollBlock = "poll-pregnancy-quiz" + week;
  //  var pollImg = "images/timeline/pregnancy-tab2/week" + week + ".jpg";
    var pregRadioOneFor = "radio-choice-pregnancy" + week + "-a";
    var pregRadioOneName = "radio-choice-pregnancy" + week;
    var pregRadioOneCall = "radio-choice-pregnancy" + week + "-a";
    var pregRadioTwoFor = "radio-choice-pregnancy" + week + "-b";
    var pregRadioTwoName = "radio-choice-pregnancy" + week;
    var pregRadioTwoCall = "radio-choice-pregnancy" + week + "-b";
    var pregRadioThreeFor = "radio-choice-pregnancy" + week + "-c";
    var pregRadioThreeName = "radio-choice-pregnancy" + week;
    var pregRadioThreeCall = "radio-choice-pregnancy" + week + "-c";
    var pregResultDisp = "PregAccorTwo(" + week + ")";
    var pregPollResultWrap = "poll-pregnancy-result" + week;
	var pregweekbar1="pregnancy-week"+week+"-bar-1";
	var pregweekbar2="pregnancy-week"+week+"-bar-2";
	var pregweekbar3="pregnancy-week"+week+"-bar-3";
   // var graphCall = "chartdiv" + week;
    var cboxOneName = "checkbox-week" + week + "-pregnancy-c1";
    var cboxOneCall = "checkbox-week" + week + "-pregnancy-c1";
    var cboxOneFor = "checkbox-week" + week + "-pregnancy-c1";
    var checkbox = "CheckboxSelect(" + week + ")";
    var cboxTwoName = "checkbox-week" + week + "-pregnancy-c2";
    var cboxTwoCall = "checkbox-week" + week + "-pregnancy-c2";
    var cboxTwoFor = "checkbox-week" + week + "-pregnancy-c2";
    var checkbox2 = "CheckboxSelect2(" + week + ")";
	

   
    var profile = CollectionTimelinePregnancy[id];
	var i=week;
	
     // Pregnancy Tab Two Accordion
	$('div.timeline-grid-pregnancy-two').html("<div id='" + pollBlock + "'> <h2 class='txt-center'>Take our poll and see what other Text4baby moms have to say!</h2> <div class='radio-grid'> <p class='survey-spacer title-fontSize'>" + profile.radioTitle + "</p> <label for='" + pregRadioOneFor + "'>" + profile.pregRadioOneLabel + "</label> <input name='" + pregRadioOneName + "' id='" + pregRadioOneCall + "' value='on' checked='checked' type='radio'> <label for='" + pregRadioTwoFor + "'>" + profile.pregRadioTwoLabel + "</label> <input name='" + pregRadioTwoName + "' id='" + pregRadioTwoCall + "' value='off' type='radio'> <label for='" + pregRadioThreeFor + "'>" + profile.pregRadioThreeLabel + "</label> <input name='" + pregRadioThreeName + "' id='" + pregRadioThreeCall + "' value='other' type='radio'> </div> <div class='ui-field-contain'> <input id='submit-radio' value='Submit' type='submit' onClick='" + pregResultDisp + "'> </div> </div> <div id='" + pregPollResultWrap + "' style='display: none;'> <p class='survey-spacer'>" + profile.pregPollResultTitle + "</p> <div class='graph-shadow'> <div class='custom-graph-grid'> <h3 class='graph-title'>Other Text4baby Moms Said:</h3><div class='graph' style='padding:" + profile.padding + "'><div class='graph-block'><div class='graph-bar-value-grid'> <div class='graph-bar1-value'>" + profile.pregweekbar1value + "</div> <div class='graph-bar2-value'>" + profile.pregweekbar2value + "</div> <div class='graph-bar3-value'>" + profile.pregweekbar3value + "</div> </div> <div class='bar1 " + pregweekbar1 + "'></div> <div class='bar2 " + pregweekbar2 + "'></div> <div class='bar3 " + pregweekbar3 + "'></div> <div class='labels'><ul> <li class='bar-one'>" + profile.pregweekbar1label + "</li> <li class='bar-two'>" + profile.pregweekbar2label + "</li> <li class='bar-three'>" + profile.pregweekbar3label + "</li> </ul></div></div></div> </div> </div> </div>").trigger('create');

	// Pregnancy Tab Three Accordion
    $('div.timeline-grid-pregnancy-three').html("<h2 class='txt-center'>Weekly Checklist</h2> <p class='bottom-margin20'>Get a star every time you complete a total of three tasks. When you collect 5 stars, you'll get a Text4baby badge</p> <p class='bottom-margin20'>In &quot;More&quot; you can see all your badges!</p> <div id='checklist-grid'> <input name='" + cboxOneName + "'id='" + cboxOneCall + "' type='checkbox' onClick='" + checkbox + "'> <label for='" + cboxOneFor + "'>" + profile.cboxOneTitle + "</label> <input name='" + cboxTwoName + "' id='" + cboxTwoCall + "' type='checkbox' onClick='" + checkbox2 + "'> <label for='" + cboxTwoFor + "'>" + profile.cboxTwoTitle + "</label> </div> <div class='star-badge-grid'> <div class='star-rating'> <span id='star1'>Star</span> <span id='star2'>Star</span> <span id='star3'>Star</span> <span id='star4'>Star</span> <span id='star5'>Star</span> </div> <div class='timeline-grid-one txt-center' id='badgediv'> <span id='badgespan' ></span> <span id='badgetext' class='badge-name'></span></div></div>").trigger('create');

    
	
 ShowResult();
 CheckboxChecked();
 CountCheck();

	
}

function GetTimelineNewBabyData(id) {
   
   var profile = CollectionTimelineNewbaby[id];
   var week=currentSlideNum;
 //  var numBabyWeek=week;
	var timelineBabyimg="images/timeline/baby-tab1/week"+profile.Babyimg+".jpg";
	var pollBlockBaby="poll-baby-quiz"+week;
	//var pollImgBaby="images/timeline/baby-tab2/"+week+".jpg";
	var babyRadioOneFor="radio-choice-baby-poll"+week+"-a";
	var babyRadioOneName="radio-choice-baby-poll"+week;
	var babyRadioOneCall="radio-choice-baby-poll"+week+"-a";
	var babyRadioTwoFor="radio-choice-baby-poll"+week+"-b";
	var babyRadioTwoName="radio-choice-baby-poll"+week;
	var babyRadioTwoCall="radio-choice-baby-poll"+week+"-b";
	var babyRadioThreeFor="radio-choice-baby-poll"+week+"-c";
	var babyRadioThreeName="radio-choice-baby-poll"+week;
	var babyRadioThreeCall="radio-choice-baby-poll"+week+"-c";
	var babyResultDisp = "NewBabyAccorTwo("+week+")";
	var babyPollResultWrap="poll-baby-result"+week;
	var babyweekbar1="baby-week"+week+"-bar-1";
	var babyweekbar2="baby-week"+week+"-bar-2";
	var babyweekbar3="baby-week"+week+"-bar-3";
	//var graphBabyCall="chartbaby"+week;
	var cboxBabyOneName="checkbox-week"+week+"-baby-c1";
	var cboxBabyOneCall="checkbox-week"+week+"-baby-c1";
	var cboxBabyOneFor="checkbox-week"+week+"-baby-c1";
	var checkboxBaby="CheckboxBabySelect("+week+")";
	var cboxBabyTwoName="checkbox-week"+week+"-baby-c2";
	var cboxBabyTwoCall="checkbox-week"+week+"-baby-c2";
	var cboxBabyTwoFor="checkbox-week"+week+"-baby-c2";
	var checkboxBaby2="CheckboxBabySelect2("+week+")";
  
    
// Baby Tab Two Accordion
	$('div.timeline-grid-baby-two').html("<div id='" + pollBlockBaby + "'> <h2 class='txt-center'>Take our poll and see what other Text4baby moms have to say!</h2> <div class='radio-grid'> <p class='survey-spacer title-fontSize'>" + profile.radioTitleBaby + "</p> <label for='" + babyRadioOneFor + "'>" + profile.babyRadioOneLabel + "</label> <input name='" + babyRadioOneName + "' id='" + babyRadioOneCall + "' value='on' checked='checked' type='radio'> <label for='" + babyRadioTwoFor + "'>" + profile.babyRadioTwoLabel + "</label> <input name='" + babyRadioTwoName + "' id='" + babyRadioTwoCall + "' value='off' type='radio'> <label for='" + babyRadioThreeFor + "'>" + profile.babyRadioThreeLabel + "</label> <input name='" + babyRadioThreeName + "' id='" + babyRadioThreeCall + "' value='other' type='radio'> </div> <div class='ui-field-contain'> <input id='submit-radio' value='Submit' type='submit' onClick='" + babyResultDisp + "'> </div> </div> <div id='" + babyPollResultWrap + "' style='display: none;'> <p class='survey-spacer'>" + profile.babyPollResultTitle + "</p> <div class='graph-shadow'> <div class='custom-graph-grid'> <h3 class='graph-title'>Other Text4baby Moms Said:</h3><div class='graph' style='padding:" + profile.padding + "'><div class='graph-block'> <div class='graph-bar-value-grid'> <div class='graph-bar1-value'>" + profile.babyweekbar1value + "</div> <div class='graph-bar2-value'>" + profile.babyweekbar2value + "</div> <div class='graph-bar3-value'>" + profile.babyweekbar3value + "</div> </div><div class='bar1 " + babyweekbar1 + "'></div> <div class='bar2 " + babyweekbar2 + "'></div> <div class='bar3 " + babyweekbar3 + "'></div>  <div class='labels'><ul> <li class='bar-one'>" + profile.babyweekbar1label + "</li> <li class='bar-two'>" + profile.babyweekbar2label + "</li> <li class='bar-three'>" + profile.babyweekbar3label + "</li> </ul></div></div></div></div> </div> </div>").trigger('create');

    // Baby Tab Three Accordion
    $('div.timeline-grid-baby-three').html("<h2 class='txt-center'>Weekly Checklist</h2> <p class='bottom-margin20'>Get a star every time you complete a total of three tasks. When you collect 5 stars, you'll get a Text4baby badge</p> <p class='bottom-margin20'>In &quot;More&quot; you can see all your badges!</p> <div id='checklist-grid'> <input name='" + cboxBabyOneName + "' id='" + cboxBabyOneCall + "' type='checkbox' onClick='" + checkboxBaby + "'> <label for='" + cboxBabyOneFor + "'>" + profile.cboxBabyOneTitle + "</label> <input name='" + cboxBabyTwoName + "' id='" + cboxBabyTwoCall + "' type='checkbox' onClick='" + checkboxBaby2 + "'> <label for='" + cboxBabyTwoFor + "'>" + profile.cboxBabyTwoTitle + "</label> </div> <div class='star-badge-grid'> <div class='star-rating'> <span id='star1nb'>Star</span> <span id='star2nb'>Star</span> <span id='star3nb'>Star</span> <span id='star4nb'>Star</span> <span id='star5nb'>Star</span> </div> <div class='timeline-grid-one txt-center' id='badgedivnb'> <span id='badgespannb'></span> <span id='badgetextnb' class='badge-name'></span></div></div>").trigger('create');


   
 
 ShowResultBaby();
 CheckboxCheckedBaby();
 CountCheck();
 
 
}

 
function slideStart(args) {
  
}
 function transaction_error(tx, error) {
   // alert("Database Error: " + error);
}
 
function toggleMoreInfo(val){
     var elementId="#cf2 img.top"+(val);    
	 //toggleMoveInFront();
	 $(elementId).toggleClass("transparent");
}

function TimelineChange(changemode)
{  
    mode = changemode;
	
    if(mode==1) {       
		$("#pregnancy-btn").hide();
		$("#baby-btn").show();
		$('#preg1,#preg2,#preg3').trigger('collapse');
	}
	else {
	    
		$("#pregnancy-btn").show();
		$("#baby-btn").hide();
		$('#baby1,#baby2,#baby3').trigger('collapse');
	}
	
    $("#timeline2").addClass("flipped");	
	
	 if (window.localStorage.getItem("currenttext4babyprotocol") == "1" && mode == 2) {
        currentSlideNum = 1;
        window.localStorage.setItem("weeknb", 1);
    }
    else if (window.localStorage.getItem("currenttext4babyprotocol") == "1" && mode == 1) {
        currentSlideNum = window.localStorage.getItem("weekpreg");
    }
    else if (window.localStorage.getItem("currenttext4babyprotocol") == "2" && mode == 1) {
        currentSlideNum = 37;
        window.localStorage.setItem("week", 40);
    }
    else if (window.localStorage.getItem("currenttext4babyprotocol") == "2" && mode == 2) {
		currentSlideNum = window.localStorage.getItem("weeknb");
    }	
	
	isFlipped=1;
	var delayTime=500;
	
	if(iphone4==true)
	  delayTime=100;
																
	window.setTimeout(function(){ TimelineInitiate(mode); },delayTime); 
}

// *********************************** Second Tab Form Weeks Result *********************************** //

// Pregnancy Weeks Result
function disp_pregnancy_result(val){

	document.getElementById("poll-pregnancy-quiz"+val).style.display="none";
	document.getElementById("poll-pregnancy-result"+val).style.display="block";
	window.setTimeout(function () {
		$("div.pregnancy-week"+val+"-bar-1").addClass("preganim-week"+val+"-bar-1");
		$("div.pregnancy-week"+val+"-bar-2").addClass("preganim-week"+val+"-bar-2");
		$("div.pregnancy-week"+val+"-bar-3").addClass("preganim-week"+val+"-bar-3");
	}, 1000);

};


// Baby Weeks Result
function disp_baby_result(val){
	document.getElementById("poll-baby-quiz"+val).style.display="none";
	document.getElementById("poll-baby-result"+val).style.display="block";
	window.setTimeout(function () {
		//$("div.babyweek'+val+'-bar1").addClass('baby-week"+val+"-bar-1');
		//$("div.babyweek'+val+'-bar2").addClass('baby-week"+val+"-bar-2');
		//$("div.babyweek'+val+'-bar3").addClass('baby-week"+val+"-bar-3');
		$("div.baby-week"+val+"-bar-1").addClass("babyanim-week"+val+"-bar-1");
		$("div.baby-week"+val+"-bar-2").addClass("babyanim-week"+val+"-bar-2");
		$("div.baby-week"+val+"-bar-3").addClass("babyanim-week"+val+"-bar-3");
	}, 1000);
};
