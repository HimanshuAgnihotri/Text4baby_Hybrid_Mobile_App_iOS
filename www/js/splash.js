//RegisterPagehit('splash');

$( document ).ready(function() {
   // console.log( "ready!" );
	BeginSplashPage();
});

function BeginSplashPage()
 {
   //alert('Begin Splash');
    $("#t4b-splashgrid").show();
    $("div#txt-logo").addClass('hide');
    $("div#t4b-logo").addClass('t4b-logo-initial');
   $("img#logo-glow").addClass('hide');
   
    window.setTimeout(function () {
        $("img#logo-glow").addClass('hide');
        $("div#txt-logo").removeClass('hide');
        $("div#txt-logo").addClass('txt-logo-initial');
        window.setTimeout(function () {
            $("img#logo-glow").removeClass('hide');
            $("img#logo-glow").addClass('t4b-glow-initial');
            window.setTimeout(function () {
                //window.location.assign("sign-in.html");
				 // Directly redirect to timeline...
				// RedirectToPage('timeline.html'); 
                window.localStorage.setItem("previousscreen", "splash");
                // if user already signup from mobile app is yes
                var alreadysignup = window.localStorage.getItem("PhoneNumber");
                var signupComplete = window.localStorage.getItem("signupprocesscomplete");
                //  alert(alreadysignup);
                //   alert(signupComplete);
                if (alreadysignup != "" && alreadysignup != "undefined" && alreadysignup != null && signupComplete == "true") {
                    var autologged = window.localStorage.getItem("rememberpassword");
                    // alert(autologged);
                    if (autologged == "true") {
//                        var LoginRequest = '{"request": {"type": "login","data": {"username": "1' + window.localStorage.getItem("username") + '","password": "' + window.localStorage.getItem("password") + '"}}}';
                        //                        transaction(LoginRequest, "autologin");
                       // window.location.assign("timeline.html?mode=" + window.localStorage.getItem("currenttext4babyprotocol"));
                         var LoginRequest = '{"request": {"action": "login","type": "login","data": {"username": "1' + window.localStorage.getItem("PhoneNumber") + '","password": "' + window.localStorage.getItem("password") + '"}}}';
                           transaction(LoginRequest,"autologin");
                       //navigateTo("timeline.html", "{\"week\":" + initialSliderNumber() + ",\"mode\":" + window.localStorage.getItem("currenttext4babyprotocol") + ",\"firstname\":\"" + window.localStorage.getItem("firstname") + "\"}");
                    }
                    else {
                      //  window.location.assign("sign-in.html");
                        navigateTo("sign-in.html","{}");
                    }
                }            
                else {
                    window.localStorage.setItem("previousscreen", "splash");
                    var PrivacyCodePending = window.localStorage.getItem("privacycodepending");
                    var partialcompleteprofile = window.localStorage.getItem("partialcompleteprofile");
                    if (partialcompleteprofile == "true") {
                        // dispdiv_4();
                        //window.location = "signup-tell-us.html";
                         navigateTo("signup-tell-us.html","{}");
                    }
                    else if (PrivacyCodePending == "true") {
                        // dispdiv_2();
                        //window.location = "signup-link.html";
                        navigateTo("signup-link.html","{}");
                    }
                    else {
                       // window.location = "sign-up.html";
                       // Making the navigation Native
                       navigateTo("sign-up.html","{}");
                    }
                } 
            }, 2000);
        }, 2000);
    }, 100);
}







































