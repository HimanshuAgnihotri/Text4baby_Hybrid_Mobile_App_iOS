// *********************************** Banner Curl *********************************** //

// Pregnancy Week Banner Curl

function addCurlPregnancy(val){
	$("img.pregnancy-curl"+val).addClass('curl-active');
	$("div.pregnancy-code"+val).addClass('code-active');
	//$("a.remove-curl").addClass('show');
};
			
function removeCurlPregnancy(val){
	//alert();
	$("img.pregnancy-curl"+val).removeClass('curl-active');
	$("div.pregnancy-code"+val).removeClass('code-active');
	//$("a.remove-curl").removeClass('show');
	//$("a.remove-curl").addClass('hide');
};

// Baby Week Banner Curl
function addCurlBaby(val){
	$("img.baby-curl"+val).addClass('curl-active');
	$("div.baby-code"+val).addClass('code-active');
};
			
function removeCurlBaby(val){
	$("img.baby-curl"+val).removeClass('curl-active');
	$("div.baby-code"+val).removeClass('code-active');
};

// *********************************** Second Tab Form Weeks Result *********************************** //

// Pregnancy Weeks Result
function disp_pregnancy_result(val){
  //  alert("hi");
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
