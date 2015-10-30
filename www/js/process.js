/*var username = "APIServiceAccountBI";
var password = "pyramid123";*/
//var password = "productconnect1496";
//var URL = "https://app001qalb.voxiva.net/connect4health/requestwebservice/getresponse.callback";
//var URL = "https://qalb003.in.voxiva.net/connect4health/requestwebservice/getresponse.callback";
//var URL = "http://192.168.35.104/connect4health/requestwebservice/getresponse.callback";
//var URL = "http://192.168.35.104/voxiva.apiv2/getresponse.callback";
//var URL = "https://qalb003.in.voxiva.net/voxiva.apiv2/getresponse.callback";
//var URL = "https://qalb001.in.voxiva.net/voxiva.apiv2/getresponse.callback"; //Testing

//var URL = "https://qalb003.in.voxiva.net/voxiva.apiv2/getresponse.callback";  //Live for QA

//var URL = "http://192.168.33.130/voxiva.apiv2/getresponse.callback";


//New Credentials From 8 May 2015: Details For Production
var username = "VoxivaText4babyiOSMobileApp";
var password = "api@123$%";

var URL      = "https://vste2.voxiva.net/voxiva.apiv2/getresponse.callback"; // For Produtcion

//Credentials For Development
/*var username = "APIServiceAccountBI";
var password = "pyramid123";
var URL = "https://dev.ches.ste.voxiva.net/voxiva.apiv2/getresponse.callback";*/

function transaction(str, action, subaction) {
    //    alert("transaction:" + str +"\naction:" + action + "\nsubaction:" + subaction);
    //    alert (str);
    navigateTo("DO.TX", "{\"str\": " + str + ", \"action\": \"" + action + "\", \"subaction\": \"" + subaction + "\"}");
}

function transaction2(str, action, subaction) {
     if (action == "login"|| action == "autologin"){
        VRSion = "2";
        un = username;
        pw = password;
    }
    else if (action == "subscribe" || action == "changepassword") {
        VRSion = "1";
        un = window.localStorage.getItem("uname");
        pw = window.localStorage.getItem("password");
    }
    else if (action == "getBasicParticipantProfile" || action == "submitSingleQuestionPollResponses" || action == "getParticipantAppointmentsByType" || action == "submitAppointment" || action == "deleteParticipantAppointments" || (action == "submitcontactus" && (window.localStorage.getItem("uname") != null && window.localStorage.getItem("uname") != "null" && window.localStorage.getItem("uname") != ""))) {
        VRSion = "2";
        un = window.localStorage.getItem("uname");
        // alert(username);
        pw = window.localStorage.getItem("password");
       // alert(password);
    }
    else {
        VRSion = "2";
        un = username;
        pw = password;
    }
//    $.post(URL, {
//        username: un,
//        password: pw,
//        ChannelId: "4",
//        LanguageId: "1",
//        Version: VRSion,
//        Request: str
//    },
//   			function (data) {
//   			    task(data, action, subaction);
    //   			});

    var jqxhr = $.post(URL, {
        username: un,
        password: pw,
        ChannelId: "5",
        ApplicationId: "1",
        LanguageId: "1",
        Version: VRSion,
        Request: str
    })
    .done(function (data) {
        //        alert("second success");
        task(data, action, subaction);
    })
    .fail(function () {
        showalert('We are unable to connect to the network at this time. Please try again.');
        ProgressBarHide();
    });
}