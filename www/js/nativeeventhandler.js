
function navigateTo(commandName,jsonArgs)
{
  // alert(navigator.userAgent.toLowerCase());
   var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
   var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
   //alert(isAndroid);
    if(isAndroid)
    {
      // Android
        if (jsonArgs == "{true}") {
            Android.nativeFinish();
        }
        else {
            Android.nativeNavigateTo(commandName, jsonArgs);
        }
    }
    else if(isiPhone)
    { //iOS .
      //  window.location = 'js-call:' + commandName + ':' +encodeURIComponent(jsonArgs);
      
          window.location = 'js-call:///' + commandName + '#' +encodeURIComponent(jsonArgs);
    }
    else
    {
       window.location = commandName;
    }
}

function showalert(alertDescription)
{
  // alert(navigator.userAgent.toLowerCase());
   var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
   var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
   //alert(isAndroid);
    if(isAndroid)
    {
      // Android
       Android.nativeShowAlert(alertDescription);
    }
    else if(isiPhone)
    { //iOS .
        // iOS specific handling
        window.location = 'js-call:///error/' + alertDescription;
    }
    else
    {
       //window.location = commandName;
    }

}

function showErrorDialog(errorDescription, errorMessage)
{
// alert(navigator.userAgent.toLowerCase());
   var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
   var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
   //alert(isAndroid);
    if(isAndroid)
    {
      // Android
        Android.showErrorDialog(errorDescription, errorMessage);
    }
    else if(isiPhone)
    { //iOS .
        // iOS specific handling
        window.location = 'js-call:///error/' + errorDescription + '#' + errorMessage;
    }
    else
    {
       //window.location = commandName;
    }

}

function scrollNext(mode) {
    // alert(navigator.userAgent.toLowerCase());
    var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
    var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
    // alert(isAndroid);
    if (isAndroid) {
        // Android
        Android.nativeScrollNext(mode);
    }
    else if (isiPhone) { //iOS .
        window.location = 'js-call:' + mode;
    }
    else {
        window.location = commandName;
    }

}
function scrollPrevious(mode) {
    // alert(navigator.userAgent.toLowerCase());
    var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
    var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
    // alert(isAndroid);
    if (isAndroid) {
        // Android
        Android.nativeScrollPrevious(mode);
    }
    else if (isiPhone) { //iOS .
        window.location = 'js-call:' + mode;
    }
    else {
        window.location = commandName;
    }

}

 function logout()
  {
      // alert(window.localStorage.getItem('rememberpassword'));
       window.localStorage.setItem('session', 'false');
       window.localStorage.setItem("rememberpassword", "false");
       window.localStorage.setItem("password", "");
       window.localStorage.setItem("uname", null);
       window.localStorage.setItem("emailaddress", null);
      // alert(window.localStorage.getItem('rememberpassword'));
       navigateTo("sign-in.html","{}");
   }

   function SetPreference() {
       var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
       var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
       if (isAndroid) {
           // Android
           var mode = parseInt(window.localStorage.getItem("currenttext4babyprotocol"));
           var week = parseInt(window.localStorage.getItem("week"));
           var weeknb = parseInt(window.localStorage.getItem("weeknb"));
           if (mode == 1) {
               Android.nativeSetPreference(week, mode);
           }
           else {
               Android.nativeSetPreference(weeknb, mode);
           }
       }
       else if (isiPhone) { //iOS .
           // iOS specific handling
       }
       else {
           //window.location = commandName;
       }
   }


   function ProgressBarShow() {
       // alert("progress bar show");
       // alert(navigator.userAgent.toLowerCase());
       var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
       var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
       //alert(isAndroid);
       if (isAndroid) {
           // Android
           Android.nativeProgressBarShow();

       }
       else if (isiPhone) { //iOS .
           // iOS specific handling
       }
       else {
           //window.location = commandName;
       }

   }

   function ProgressBarHide() {     //  alert("progress bar hide");
       // alert(navigator.userAgent.toLowerCase());
       var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
       var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
       //alert(isAndroid);
       if (isAndroid) {
           // Android
           Android.nativeProgressBarHide();
       }
       else if (isiPhone) { //iOS .
           // iOS specific handling
       }
       else {
           //window.location = commandName;
       }


   }
function iOSProgressBarHide() {    

       var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
       var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
      
       if (isAndroid) {
           // Android
           
       }
       else if (isiPhone) { //iOS .
           // iOS specific handling..need to be implement here
 	   navigateTo("iOS.nativeProgressBarHide","{}");
       }
       else {
           
       }

   }



