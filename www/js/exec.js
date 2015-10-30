function task(response, action, subaction) {
   // alert(response);
    var n = response.search("Exception");
    if (n == -1) {
        if (response == "") {
            errormessage("splash-network-error.html");
        }
        else {
            jsonObject = JSON.parse(response);
            
            if (action == "login") {
                var code = jsonObject.response.error["@code"];
               // alert(jsonObject.response.data.logininfo.username);
               // var uname = response.split('logininfo":');
               // uname = uname[1].split('}}}');
               // if (uname[0] != "null") {
                // obj = JSON.parse(uname[0] + "}");
                if (code == "") {
                    window.localStorage.setItem("contactusFrom", null);
                    window.localStorage.setItem("uname", jsonObject.response.result.username);
                }
              //  }
               // var responseattr = response.split('@code":"');
              //  var responseattr1 = responseattr[1].split('"}},"');
                
                if (subaction == "signuplogin") {
                   // if (responseattr1[0] == "") {
                    if (code == "") {
                        window.localStorage.setItem("username", window.localStorage.getItem("PhoneNumber"));
                        // window.localStorage.setItem("password", $("#pwhidden").val());
                        var password = window.localStorage.getItem("pw");
                        window.localStorage.setItem("pw", null);
                        window.localStorage.setItem("password", password);
                        var PartApiRequest0004 = '{"request": {"action": "getBasicParticipantProfile"}}';
                        transaction(PartApiRequest0004, "getBasicParticipantProfile", "signuppage4");
                    }
                    else {
                        ProgressBarHide();
                       // window.location.assign("sign-in.html");
                        navigateTo("sign-in.html","{}");
                    }
                }
                else if (subaction == "signuplogin2") {
                  //  if (responseattr1[0] == "") {
                    if (code == "") {
                        window.localStorage.setItem("username", window.localStorage.getItem("PhoneNumber"));
                        // window.localStorage.setItem("password", $("#pwhidden").val());
                        var password = window.localStorage.getItem("pw");
                        window.localStorage.setItem("pw", null);
                        window.localStorage.setItem("password", password);
                       // ProgressBarHide();
                        //  window.location = "timeline.html?mode=" + window.localStorage.getItem("currenttext4babyprotocol");
                        var PartApiRequest0004 = '{"request": {"action": "getBasicParticipantProfile"}}';
                        transaction(PartApiRequest0004, "getBasicParticipantProfile", "signuppage3");
                    }
                    else {
                        ProgressBarHide();
                       // window.location.assign("sign-in.html");
                        navigateTo("sign-in.html","{}");
                    }
                }
                else if (subaction == "login") {
                  //  if (responseattr1[0] == "") {
                    if (code == "") {
                        window.localStorage.setItem("username", $("input#username123").val());
                        window.localStorage.setItem("password", $("input#password123").val());
                        var changepassword = window.localStorage.getItem("changepassword");

                        window.localStorage.setItem("count_baby1", 0);
                        window.localStorage.setItem("count_baby2", 0);
                        window.localStorage.setItem("count_baby3", 0);

                        window.localStorage.setItem("count_pregnancy1", 0);
                        window.localStorage.setItem("count_pregnancy2", 0);
                        window.localStorage.setItem("count_pregnancy3", 0);

                        if (changepassword == "true") {
                            // dispdiv_4();
                            // window.location = "signin-changepw.html";
                           ProgressBarHide();
                           navigateTo("signin-changepw.html",{});
                        }
                        else {                   
                                signinprocess();
                        }
                    }
                    else {
                       // var error = responseattr1[0].split('","#');
                       // if (error[0] == "505") {
                       // if (code == "30000") {
                        if (code == "30313" || code == "505") {
                            errormessage("signin-screen1-phnnum-pwd.html");
                            //  $("input#username123").val("");

                           // $("input#password123").val("");
                            return false;
                        }
                        else if (code == "30323") {
                            errormessage("signin-account-lock.html");
                        }
                        else {
                            errormessage("splash-communication-error.html");
                           // $("input#username123").val("");
                            //$("input#password123").val("");
                            return false;
                        }
                    }
                }
            }

            if (action == "getBasicParticipantProfileByMobilePhoneNumber" || action == "getBasicParticipantProfile") {
               // var getprofile = response.split('result":');
               // getprofile = getprofile[1].split('}}');
               // obj = JSON.parse(getprofile[0] + "}")
               // if (obj.status == "1") {
                if (jsonObject.response.result.status == "1") {
                    window.localStorage.setItem("currenttext4babyprotocol", jsonObject.response.result.currenttext4babyprotocol);
                    window.localStorage.setItem("pregnancyduedate", jsonObject.response.result.pregnancyduedate);
                    window.localStorage.setItem("babydateofbirth", jsonObject.response.result.babydateofbirth);
                    window.localStorage.setItem("firstname", jsonObject.response.result.firstname);
                    window.localStorage.setItem("emailaddress", jsonObject.response.result.emailaddress);
                    window.localStorage.setItem("text4babysmsstatus", jsonObject.response.result.text4babysmsstatus);
                    window.localStorage.setItem("participantid", jsonObject.response.result.participantid);

                    if (subaction == "signuppage3") {
                        window.localStorage.setItem("welcome", "true");
                        window.localStorage.setItem("privacycodepending", "false");
                        window.localStorage.setItem("signupprocesscomplete", "true");
                        ClearStorage("signup2");
                        ProgressBarHide();
                       // commented.. window.location = "timeline.html?mode=" + window.localStorage.getItem("currenttext4babyprotocol") + "&welcome=true";
                        navigateTo("timeline.html", "{\"week\":" + initialSliderNumber() + ",\"mode\":" + window.localStorage.getItem("currenttext4babyprotocol") + ",\"firstname\":\"" + window.localStorage.getItem("firstname") + "\"}");
                        // var LoginRequest = '{"request": {"type": "login","data": {"username": "1' + window.localStorage.getItem("PhoneNumber") + '","password": "' + $("#pwhidden").val() + '"}}}';
                        // transaction(LoginRequest, "login", "signuplogin2");
                    }

                      else if (subaction == "signuppage4") {
                          window.localStorage.setItem("welcome", "true");
                      // commented..  window.location = "timeline.html?mode=" + window.localStorage.getItem("currenttext4babyprotocol") + "&welcome=true";
                        ProgressBarHide();
                        //  navigateTo("timeline.html","36");
                        navigateTo("timeline.html", "{\"week\":" + initialSliderNumber() + ",\"mode\":" + window.localStorage.getItem("currenttext4babyprotocol") + ",\"firstname\":\"" + window.localStorage.getItem("firstname") + "\"}");
                    }
                    else {
                          // window.location = "timeline.html?mode=" + window.localStorage.getItem("currenttext4babyprotocol");
                        ProgressBarHide();
                         // navigateTo("timeline.html",initialSliderNumber());
                        navigateTo("timeline.html", "{\"week\":" + initialSliderNumber() + ",\"mode\":" + window.localStorage.getItem("currenttext4babyprotocol") + ",\"firstname\":\"" + window.localStorage.getItem("firstname") + "\"}");
                      //  "{\"week\":"+ week +",\"mode\":"+2+"}"
                    }
                }
                else {
                    errormessage("signin-screen1-phnnum-pwd.html");
                  //  $("input#username123").val("");
                    //$("input#password123").val("");
                    return false;
                }
            }

            if (action == "isParticipantEnrolledAndRegisteredInText4baby") {
              //  var getregistration = response.split('result":');
              //  getregistration = getregistration[1].split('}}');
              //  obj = JSON.parse(getregistration[0] + "}")
                if (subaction == "signupchk") {
                    if (jsonObject.response.result.status == "1" && (jsonObject.response.result.text4babysmsstatus == "2" || jsonObject.response.result.text4babysmsstatus == "3")) {
                        if (jsonObject.response.result.text4babyprofilestatus == "1") {
                            ProgressBarHide();
                            window.localStorage.setItem("signupprocesscomplete", "true");
                            // window.location.assign("sign-in.html?welcome=true");
                            window.localStorage.setItem("welcome", "true");
                            navigateTo("sign-in.html","{}");

                        }
                        else {
                            if (window.localStorage.getItem("oldphnnum") != window.localStorage.getItem("PhoneNumber")) {
                                ClearStorage('signup4');
                            }
                            window.localStorage.setItem("currenttext4babyprotocol", jsonObject.response.result.currenttext4babyprotocol);
                            navigateTo("signup-link.html", "{}");
                            ProgressBarHide();
                        }
                    }
                    else if (jsonObject.response.result.status == "0" || jsonObject.response.result.text4babysmsstatus == "1") {
                        if (window.localStorage.getItem("oldphnnum") != window.localStorage.getItem("PhoneNumber")) {
                            ClearStorage('signup4');
                        }
                        ProgressBarHide();
                        //   dispdiv_4();
                       // window.location = "signup-tell-us.html";
                        navigateTo("signup-tell-us.html","{}");
                    }
                    else {
                        errormessage('signup-screen1-phn.html');
                      //  $("input#mobile-number").val("");
                        return false;
                    }
                }
                else {
                    if (jsonObject.response.result.status == "1" && (jsonObject.response.result.text4babysmsstatus == "2" || jsonObject.response.result.text4babysmsstatus == "3")) {
                        var AuthApiRequest0001 = '{"request": {"action": "setRandomPassword","mobilenumber": "' + $("input#reset-mobile-number").val() + '","programid": "2"}}';
                    //    alert(AuthApiRequest0001);
                        transaction(AuthApiRequest0001, "setRandomPassword");
                    }
                    else if (jsonObject.response.result.status == "0") {
                        errormessage('signin-screen2-no-phnnum.html');
                        //$("input#reset-mobile-number").val("");
                        return false;
                    }
                    else {
                        errormessage("splash-communication-error.html");
                        //$("input#reset-mobile-number").val("");
                        return false;
                    }
                }
            }

            //generic error
            if (action == "setRandomPassword") {
                ProgressBarHide();
               // var getprofile = response.split('result":');
               // getprofile = getprofile[1].split('}}');
               // obj = JSON.parse(getprofile[0] + "}")
                if (jsonObject.response.result.status == "1") {
                    window.localStorage.setItem("username", $("input#reset-mobile-number").val());
                    window.localStorage.setItem("changepassword", "true");
                    window.localStorage.setItem("password", "");
                    window.localStorage.setItem("rememberpassword", "false");
                   // dispdiv_3();
                    navigateTo("signin-reset.html","{}");
                }
                else {
                    errormessage('splash-communication-error.html');
                    //$("input#reset-mobile-number").val("");
                    return false;
                }
            }

            if (action == "changepassword") {
               // response = response.replace("@code\":\"\"", "@code\":\"monica\"");
              //  jsonObject = JSON.parse(response);           
              //  var n = response.search("Exception");
              //  if (n == -1) {
                   // var changepw = response.split('@code":"');
                  //  changepw = changepw[1].split('"},"success');
               //  if (changepw[0] == "") {
               // alert(jsonObject.response.result.status["@code"]);
             //   if (jsonObject.response.result.status[0]["@code"] == "") {
					 if (jsonObject.response.error["@code"] == "") {
                        window.localStorage.setItem("changepassword", "false");
                        window.localStorage.setItem("password", window.localStorage.getItem("newpassword"));
                        signinprocess();
                    }
                    else {
                        errormessage('signin-screen4-pwd.html');
                        //$("input#password-4").val("");
                        //$("input#password-5").val("");
                        return false;
                    }
//                }
//                else {
//                    errormessage('splash-communication-error.html');
//                    $("input#password-4").val("");
//                    $("input#password-5").val("");
//                    return false;
//                }
            }

 		if (action == "autologin") {
                           //var responseattr = response.split('@code":"');
               // var responseattr1 = responseattr[1].split('"}},"');
              //  if (responseattr1[0] == "") {

                  if (jsonObject.response.error["@code"] == "") {
               var PartApiRequest0004 = '{"request": {"action": "getBasicParticipantProfile"}}';
                   transaction(PartApiRequest0004, "getBasicParticipantProfile");
                }
                else {
                   // window.location = "sign-in.html";
                     navigateTo("sign-in.html","{}");
                  }
        	}

                if (action == "enrollParticipantInText4baby") {
                    //  var getresponse = response.split('error":');
                    // getresponse = getresponse[1].split(',"');
                    //  if (getresponse[0] == "null") {
                   // alert(jsonObject.response.error);
                    if (jsonObject.response.error == null) {
                        window.localStorage.setItem("signupprocesscomplete", "true");
                        ClearStorage("signup4aftersignin");
                        //var LoginRequest = '{"request": {"type": "login","data": {"username": "1' + window.localStorage.getItem("PhoneNumber") + '","password": "' + $("#pwhidden").val() + '"}}}';
                        var LoginRequest = '{"request": {"action": "login","type": "login","data": {"username": "1' + window.localStorage.getItem("PhoneNumber") + '","password": "' + window.localStorage.getItem("pw") + '"}}}';
                        transaction(LoginRequest, "login", "signuplogin");
                    }
                    else {
                        // var errorcode = response.split('code":"');
                        // errorcode = errorcode[1].split('","#text');
                        // if (errorcode[0] == "30263") {
                        var code = jsonObject.response.error["@code"];
                        if (code == "30263") {
                            errormessage('signup-screen4-email.html');
                            //$("#email-2").val("");

                        }
                        else if (code == "30287") {
                            errormessage('signup-screen4-duplicate-email.html');

                        }
                        else if (code == "30028" || code == "30011") {
                            errormessage('signup-screen4-zcode.html');
                            //$("#zip-code").val("");

                        }
                        else if (code == "30029") {
                            errormessage('user-dont-exist.htm');
                            return false;
                        }
                        else {
                            errormessage('splash-communication-error.html');
                            return false;
                        }
                    }
                }

            if (action == "getValidationCode") {
              //  var code = response.split('@code":"');
               // code = code[1].split('"},"');
                //if (code[0] == "") {
                if (jsonObject.response.error["@code"] == "") {
                  //  var status = response.split('status":"');
                  //  status = status[1].split('"}');
                    if (jsonObject.response.result.status == "1") {
                        ProgressBarHide();
                        //   dispdiv_3();
                       // window.location = "signup-code.html";
                        if (subaction == "resend") {
                            errormessage('signup-resend-code.html');
                        }
                        else {
                            navigateTo("signup-code.html", "{}");
                        }
                    }
                }
                else {
                  //  var error = code[0].split('text":"');
                    if (jsonObject.response.error["@code"] == "30263") {
                        errormessage('signup-screen2-email.html');
                        return false;
                    }
                    else if (jsonObject.response.error["@code"] == "30287") {
                        errormessage('signup-screen2-duplicate-email.html');
                    }
                    else if (jsonObject.response.error["@code"] == "30009") {
                        errormessage('signup-phoneNum-limit.html');
                    }
                    else if (jsonObject.response.error["@code"] == "30280") {
                        errormessage('signup-message-notsend.html');
                    }
                    else if (jsonObject.response.error["@code"] == "30265") {
                        errormessage('signup-prgid-invalid.html');
                    }
                    else if (jsonObject.response.error["@code"] == "30270") {
                        errormessage('signup-invalid-pw.html');
                    }
                    else {
                        errormessage('splash-communication-error.html');
//                        $("input#password-1").val("");
//                        $("input#password-2").val("");
                        return false;
                    }
                    ProgressBarHide();
                }
            }

            if (action == "validateValidationCode") {
               // var code = response.split('@code":"');
              //  code = code[1].split('"},"');
                if (jsonObject.response.error["@code"] == "") {
                   // var status = response.split('status":"');
                   // status = status[1].split('"}');
                    if (jsonObject.response.result.status == "1" || jsonObject.response.result.status == "2" || jsonObject.response.result.status == "3" || jsonObject.response.result.status == "4") {
                        errormessage('signup-screen3-code.html');
                        //$("#code-1").val("");
                        return false;
                    }
                    else {
                      //  var PartApiRequest0004 = '{"request": {"action": "getBasicParticipantProfile"}}';
                        // transaction(PartApiRequest0004, "getBasicParticipantProfile", "signuppage3");
                        //var LoginRequest = '{"request": {"type": "login","data": {"username": "1' + window.localStorage.getItem("PhoneNumber") + '","password": "' + $("#pwhidden").val() + '"}}}';
                        var LoginRequest = '{"request": {"action": "login","type": "login","data": {"username": "1' + window.localStorage.getItem("PhoneNumber") + '","password": "' + window.localStorage.getItem("pw") + '"}}}';
                        transaction(LoginRequest, "login", "signuplogin2");
                    }
                }
                else {
                    errormessage('splash-communication-error.html');
                    //$("#code-1").val("");
                    return false;
                }
            }

            if (action == "submitSingleQuestionPollResponses") {
              //  var n = response.search("result");
               // if (n != -1) {
                   // var getprofile = response.split('result":');
                   // getprofile = getprofile[1].split('}}');
                   // obj = JSON.parse(getprofile[0] + "}")
                if (jsonObject.response.result.status == "1") {
                        if (window.localStorage.getItem("pollid") >= "1" && window.localStorage.getItem("pollid") <= 39) {
                            window.localStorage.setItem("poll" + subaction, "true");
                            disp_pregnancy_result(subaction);
                        }
                        else {
                            window.localStorage.setItem("pollnb" + subaction, "true");
                            disp_baby_result(subaction);
                        }
                        window.localStorage.setItem("pollid", "");
                    }
                    else {
                        errormessage('splash-communication-error.html');
                        return false;
                    }
                    ProgressBarHide();
		    iOSProgressBarHide();
//                }
//                else {
//                    errormessage('splash-communication-error.html');
//                    return false;
//                }
            }

            if (action == "setParticipantDueDateBabyDateOfBirth") {
              //  var getprofile = response.split('result":');
              //  getprofile = getprofile[1].split('}}');
              //  obj = JSON.parse(getprofile[0] + "}")
                if (jsonObject.response.result.status == "1") {
                    window.localStorage.setItem("date", window.localStorage.getItem("moredate"));
                    window.localStorage.setItem("protocolnew", jsonObject.response.result.text4babyprotocol);
                    IsDataCleared();
                }
                else {
                    errormessage('splash-communication-error.html');
                    return false;
                }
                ProgressBarHide();
            }

            if (action == "deleteParticipantAppointments") {
                var code = jsonObject.response.error["@code"];
                if (code == "") {
                    ProgressBarShow();
                    ClearStorage('more-clear');
                }
            }

            if (action == "getParticipantAppointmentsByType") {
                if (jsonObject.response.error["@code"] == "") {
                    // alert(jsonObject.response.result.appointments["@id"]);
                    updateCalendarTable(jsonObject);
                }
                
                        ProgressBarHide();
                
            }

            if (action == "submitAppointment") {
   
                if (jsonObject.response.error["@code"] == "") {
                    if (typeof jsonObject.response.result.id == undefined || jsonObject.response.result.id == "") {
                        errormessage('splash-communication-error.html');
                        return false;
                    }
                    else {
                        if (subaction == "pregnancy") {
                            UpdateTAppointmentAfterSubmit(jsonObject.response.result.id);
                        }
                        else {
                            UpdateTAppointmentAfterSubmitNB(jsonObject.response.result.id);
                        }
                    }
                }
                ProgressBarHide();
            }

            if (action == "isLatestVersion") {
                if (jsonObject.response.error["@code"] == "") {
                    var result = jsonObject.response.result;
                   // result = "1"; // temporarily added
                    if (result == "0") {
                        errormessage('initial-alert-message.html');
                        return false;
                    }
                    else if (subaction == "signup" || subaction == "signin") {
                        window.localStorage.setItem("previousscreen", "");
                        ProgressBarHide();   
                    }
                }                
            }

            if (action == "submitcontactus") {
                var code = jsonObject.response.error["@code"];
                if (code == "") {
                    // to do on success

                    errormessage('contact-us-confirmation-message.html');
                    return false;

//                    window.setTimeout(function () {
//                        location.reload();
//                    }, 1000);
                    
                }
                else if (code == "30263") {
                    // invalid email address
                window.localStorage.setItem("error", "Invalid email address.");
                errormessage('contactus-invalid-email.html');
                }
                ProgressBarHide();
            }

            if (action == "subscribe") {
           // var code = response.split('@code":"');
                //  code = code[1].split('"}},');
                var code = jsonObject.response.error["@code"];
                if (code == "") {
                    //ProgressBarHide();
                    if (subaction == "1") {
                        ProgressBarHide();
                        $("#flip-select-text-message").val("on");
                        $('#flip-select-text-message').slider("refresh");
                        window.localStorage.setItem("text4babysmsstatus", "3");
                        $('#flip-select-text-message').slider('enable');
                    }
                    else {
                        ProgressBarHide();
                        $("#flip-select-text-message").val("off");
                        $('#flip-select-text-message').slider("refresh");
                        window.localStorage.setItem("text4babysmsstatus", "2");
                        $('#flip-select-text-message').slider('enable');
                    }
                }
                else {
                    errormessage('splash-communication-error.html');
                    return false;
                }
            }
        }
    }
    else {
        errormessage('splash-communication-error.html');
        return false;
    }
}

    function isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && ((charCode < 48 && charCode == 46) || charCode > 57)) {
            return false;
        }
        return true;
    }

    function backonok(str) {
        //$('#dialogbox').dialog('close');
        // ProgressBarShow();
        if (str == 'cleardata') {
            $('#dialogbox').dialog('close');
            ClearData();
            window.location.href = window.location.href;
        }

        else if (str == 'messagsettingchange') {
            messagsettingchange();
            $('#dialogbox').dialog('open');
            window.location.href = window.location.href;
        }

        else if (str == 'nochange') {
            nochange();
            $('#dialogbox').dialog('open');
            window.location.href = window.location.href;

//            $("#flip-select-text-message").val("on");
//            $('#flip-select-text-message').slider("refresh");
//            window.location.href = window.location.href;
        }
        else if (str == 'messagsettingnochange') {
            messagsettingnochange();
            $('#dialogbox').dialog('open');
            window.location.href = window.location.href;
        }
        else if (str == 'calendarmsgsettings') {
            $('#dialogbox').dialog('close');
            window.location.href = "../more.html?page=ms";
        }
        else if (str == 'contact-us-confirmation') {
            $('#dialogbox').dialog('close');
            ContactUsOnBack();
        } else if (str == 'signuptellus') {
            $('#dialogbox').dialog('close');
             navigateTo("signup-tell-us.html","{}");
        }
         else {
             $('#dialogbox').dialog('close');
            window.location.href = window.location.href;
        }
    }

    function errormessage(page) {
        var multipleError = window.localStorage.getItem("error");
        window.localStorage.setItem("error", null);
        ProgressBarHide();
        showErrorDialog(page, multipleError); 
		}

		function signinprocess() {
		    //  thisCheck = $("#checkbox-0");
		    if (window.localStorage.getItem("rpwflag") == "true") {
		        window.localStorage.setItem("rememberpassword", "true");
		    }
		    else {
		        window.localStorage.setItem("rememberpassword", "false");
		    }
		    var PartApiRequest0004 = '{"request": {"action": "getBasicParticipantProfile"}}';
		    //  var welcome = getUrlVars()["welcome"];
		    var welcome = window.localStorage.getItem("welcome");
		    var welcomechangepw = window.localStorage.getItem("welcomechangepw");
		    if (welcome == "true" || welcomechangepw == "true") {
		        window.localStorage.setItem("welcomechangepw", null);
		        transaction(PartApiRequest0004, "getBasicParticipantProfile", "signuppage4");
		    }
		    else {
		        window.localStorage.setItem("welcomechangepw", null);
		        transaction(PartApiRequest0004, "getBasicParticipantProfile");
		    } 
		}

		function assignments(str) {
		    var PreviousScreen = window.localStorage.getItem("previousscreen");
		    if (str == "login") {
		        RegisterPagehit('sign-in');
		        $("input#password123").val("");
		        if (window.localStorage.getItem("username") == "" || window.localStorage.getItem("username") == "undefined" || window.localStorage.getItem("username") == null) {
		            if (window.localStorage.getItem("PhoneNumber") != "" && window.localStorage.getItem("PhoneNumber") != "undefined" && window.localStorage.getItem("PhoneNumber") != null) {
		                $("input#username123").val(window.localStorage.getItem("PhoneNumber"));
		            }
		        }
		        else if (window.localStorage.getItem("username") == "more") {
		            $("input#username123").val("");
		        }
		        else {
		            $("input#username123").val(window.localStorage.getItem("username"));
		        }
		        if (PreviousScreen == "splash") {
		            var LatestVerRequest = '{"request": {"action": "isLatestVersion","version": "3.00"}}';
		            //  $.mobile.showPageLoadingMsg();
		            ProgressBarShow();
		            transaction(LatestVerRequest, "isLatestVersion", "signin");
		        }
		    }

		    else if (str == "signup") {
		        RegisterPagehit('sign-up');

		        if (PreviousScreen == "splash") {

		            var LatestVerRequest = '{"request": {"action": "isLatestVersion","version": "3.00"}}';
		            // $.mobile.showPageLoadingMsg();
		            ProgressBarShow();
		            transaction(LatestVerRequest, "isLatestVersion", "signup");
		        }


		        var num = getUrlVars()["num"];
		        if (typeof num != "undefined") {
		            $("#mobile-number").val(num);
		        }
		    }

		    else if (str == "contactus") {
		        //  alert(window.localStorage.getItem("emailaddress"));
		        var email = window.localStorage.getItem("emailaddress");
		        var phnNum = window.localStorage.getItem("username");
		        var uname = window.localStorage.getItem("uname");
		        // alert(email.search("@"));
		        if (email.search("@") != -1) {
		            $("#contact-email").val(window.localStorage.getItem("emailaddress"));
		        }
		        if (uname != "null") {
		            $("#contact-phone-number").val(phnNum);
		        }
		    }


		    else if (str == "more-messagesettings") {
		        RegisterPagehit('more-messagesettings');
		        if (window.localStorage.getItem("text4babysmsstatus") == 3) {
		            $("#flip-select-text-message").val("on");
		            $('#flip-select-text-message').slider("refresh");
		        }
		        else {
		            $("#flip-select-text-message").val("off");
		            $('#flip-select-text-message').slider("refresh");
		        }
		    }

		    else if (str == 'more-badges') {
		        RegisterPagehit('more-badges');
		        BadgeActiveInactive();
		    }

		    else if (str == "more-accountsettings") {
		        RegisterPagehit('more-accountsettings');
		        if (window.localStorage.getItem("pregnancyduedate") != "" && window.localStorage.getItem("pregnancyduedate") != "null" && window.localStorage.getItem("pregnancyduedate") != null && window.localStorage.getItem("pregnancyduedate") != "undefined") {
		            window.localStorage.setItem("babynameshow", "false");
		            $("#due-date-account").val(window.localStorage.getItem("pregnancyduedate"));
		            window.localStorage.setItem("date", window.localStorage.getItem("pregnancyduedate"));
		        }
		        else if (window.localStorage.getItem("babydateofbirth") != "" && window.localStorage.getItem("babydateofbirth") != "null" && window.localStorage.getItem("babydateofbirth") != null && window.localStorage.getItem("babydateofbirth") != "undefined") {
		            window.localStorage.setItem("babynameshow", "true");
		            $("#due-date-account").val(window.localStorage.getItem("babydateofbirth"));
		            window.localStorage.setItem("date", window.localStorage.getItem("babydateofbirth"));
		        }
		        else {
		            $("#due-date-account").val("");
		        }
		        if (window.localStorage.getItem("currenttext4babyprotocol") == "2") {
		            $("#babyname-more").show();
		            if (window.localStorage.getItem("babyname") != "" && window.localStorage.getItem("babyname") != "undefined" && window.localStorage.getItem("babyname") != null) {
		                $("#baby-name3").val(window.localStorage.getItem("babyname"));
		            }
		        }
		    }

		    else if (str == "timeline") {
		        window.localStorage.setItem("previousscreen", "");
		        /* if (PreviousScreen == "splash") {
		        var LatestVerRequest = '{"request": {"action": "isLatestVersion","version": "1.00"}}';
		        $.mobile.showPageLoadingMsg();
		        transaction(LatestVerRequest, "isLatestVersion", "timeline");
		        }
		        else {*/
		        //  var welcome = getUrlVars()["welcome"];
		        var welcome = window.localStorage.getItem("welcome");
		        if (welcome == "true") {
		            //   $("#welcomediv").show();
		            window.localStorage.setItem("welcome", null);
		            // errormessage("welcome-message.html");
		            //  alert("Welcome to Text4baby! In addition to the app, Text4baby will also send you FREE text messages with personalized health information for you and your baby.");
		        }
		        $("#firstname1").text(window.localStorage.getItem("firstname"));
		        //  }
		    }

		}

function calculateweek(dateval) {
    var ONE_WEEK = 1000*60*60*24*7;
    var d = new Date();
    var today = (d.getUTCMonth() + 1) + '/' + d.getUTCDate() + '/' + d.getUTCFullYear();
    var date1 = new Date(today);
    var dt2 = new Date(dateval);
    var date2 = (dt2.getUTCMonth() + 1) + '/' + dt2.getUTCDate() + '/' + dt2.getUTCFullYear();
    date2 = new Date(date2);
    var daytoday = date1.getDay();
    var daydate = date2.getDay();
    var difftoday = 1000*60*60*24*(6 - daytoday);
    var diffdate = 1000*60*60*24*(6 - daydate);
    
    date1.setDate(date1.getDate() + (6-daytoday));
    date2.setDate(date2.getDate() + (6-daydate));
    
    
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    
    if(date1.getTimezoneOffset() != date2.getTimezoneOffset())
    {
        date2_ms = date2.getTime() + (3600000);
    }
    
    // var difference_ms = Math.abs((date1_ms + difftoday) - (date2_ms + diffdate));
    var difference_ms = Math.abs((date1_ms) - (date2_ms));
    
    if (window.localStorage.getItem("currenttext4babyprotocol") == "1") {
        return Math.floor(difference_ms / ONE_WEEK)+1;
    }
    else {
        return Math.ceil(difference_ms / ONE_WEEK)+1;
    }
    
}
/* Old Function */
/*function calculateweek(dateval) {


           var ONE_WEEK = 1000*60*60*24*7;
           var d = new Date();
           var today = (d.getUTCMonth() + 1) + '/' + d.getUTCDate() + '/' + d.getUTCFullYear();
           var date1 = new Date(today);
           var dt2 = new Date(dateval);
           var date2 = (dt2.getUTCMonth() + 1) + '/' + dt2.getUTCDate() + '/' + dt2.getUTCFullYear();
           date2 = new Date(date2);
           var daytoday = date1.getDay();
           var daydate = date2.getDay();
           var difftoday = 1000*60*60*24*(6 - daytoday);
            var diffdate = 1000*60*60*24*(6 - daydate);

            date1.setDate(date1.getDate() + (6-daytoday));
            date2.setDate(date2.getDate() + (6-daydate));


           var date1_ms = Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth() + 1, date1.getUTCDate());
           var date2_ms = Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth() + 1, date2.getUTCDate());

           // var difference_ms = Math.abs((date1_ms + difftoday) - (date2_ms + diffdate));
           var difference_ms = Math.abs((date1_ms) - (date2_ms));

            if (window.localStorage.getItem("currenttext4babyprotocol") == "1") {
                       return Math.floor(difference_ms / ONE_WEEK)+1;
                   }
                   else {
                       return Math.ceil(difference_ms / ONE_WEEK)+1;
                   }

           }*/


function AuthApi2Request(str) {
    if (str == "resend") {
        var AuthApi0002Request = '{"request": {"action": "getValidationCode","mobilenumber": "1' + window.localStorage.getItem("PhoneNumber") + '","programid": "2","firstname": "' + window.localStorage.getItem("fname") + '","emailaddress": "' + window.localStorage.getItem("email") + '","password": "' + window.localStorage.getItem("pw") + '"}}';
        transaction(AuthApi0002Request, "getValidationCode", "resend");
    }
    else {
        var AuthApi0002Request = '{"request": {"action": "getValidationCode","mobilenumber": "1' + window.localStorage.getItem("PhoneNumber") + '","programid": "2","firstname": "' + window.localStorage.getItem("fname") + '","emailaddress": "' + window.localStorage.getItem("email") + '","password": "' + window.localStorage.getItem("pw") + '"}}';
        transaction(AuthApi0002Request, "getValidationCode", "");
    }
}

function OnFlip(str) {
    if (str == "dateshowhide") {
        var yesno = $('#flip-select-due-date').val();
        if (yesno == "on") {
            $("#date1").show();
            $("#date2").hide();
            $("#period").val("");  
			$(".ui-select .ui-btn .ui-btn-inner .ui-btn-text").addClass('select-visible');
        }
        else {
            $("#date2").show();
            $("#date1").hide();
            $("#due-date-2").val("");
			$(".ui-select .ui-btn .ui-btn-inner .ui-btn-text").addClass('select-visible');
        }
    }

    else if (str == "protocolvalue") {
        var protocol = $('#select-protocol').val();
        window.localStorage.setItem("protocol1", $('#select-protocol').val());
        if (protocol == "Pregnant") {
            $("#duedateques").show();
            $("#date1").show();
            $("#date3").hide();
            $("#date4").hide();
            $("#babyname").hide();
            $("#baby-birthday").val("");
            $("#due-date-3").val("");
            $("#baby-name2").val("");
			$(".ui-select .ui-btn .ui-btn-inner .ui-btn-text").addClass('select-visible');
        }
        else if (protocol == "A new mom") {
            $("#duedateques").hide();
            $("#date1").hide();
            $("#date2").hide();
            $("#date4").hide();
            $("#date3").show();
            $("#babyname").show();
            $("#due-date-2").val("");
            $("#period").val("");
            $("#due-date-3").val("");
            $("#flip-select-due-date").val("on");
			$(".ui-select .ui-btn .ui-btn-inner .ui-btn-text").addClass('select-visible');
            $('#flip-select-due-date').slider("refresh");
        }
        else if (protocol != "Pregnant" || protocol != "A new mom") {
            $("#date4").show();
            $("#duedateques").hide();
            $("#date1").hide();
            $("#date2").hide();
            $("#date3").hide();
            $("#babyname").hide();
            $("#due-date-2").val("");
            $("#period").val("");
            $("#baby-birthday").val("");
            $("#baby-name2").val("");
            $("#due-date-3").val("");
            $("#flip-select-due-date").val("on");
			$(".ui-select .ui-btn .ui-btn-inner .ui-btn-text").addClass('select-visible');
            $('#flip-select-due-date').slider("refresh");
        }
        $("#select-protocol").html("<option value='I am: (please select)' selected='selected'>I am: " + $('#select-protocol').val() + "</option><option value='Pregnant'>Pregnant</option><option value='A new mom'>A new mom</option><option value='A dad or parent'>A dad or parent</option><option value='A relative/friend'>A relative/friend</option><option value='Health provider'>Health provider</option>");
    }

    else if (str == "ClearDataText") {
        //do nothing
//        if ($("#flip-select-data").val() == "on") {
//            $("#ClearDataPara").show();
//        }
//        else {
//            $("#ClearDataPara").hide();
//        }
    }

//    else if (str == "smssubscription") {
//        var status = "";
//        if ($("#flip-select-text-message").val() == "on") {
//            status = "1";
//        }
//        else {
//            status = "0";
//        }
//        var SubsUnsubsRequest = '{"request": {"type": "campaign","data": {"action": "subscribe","subscriptions": {"campaign": [{"campaignname": "text4baby","sms": "' + status + '",},]}}}}';
//        ProgressBarShow();
//        transaction(SubsUnsubsRequest, "subscribe");
//    }

    else if (str == "flipmsg") {
        var flipval = $("#flip-select-text-message").val();
        if (flipval == "off") {
            errormessage('more-message-setting.html');
            $("#flip-select-text-message").val("on").slider("refresh");
            $('#flip-select-text-message').slider('disable');
        }
        else {
            errormessage('more-message-setting-off-to-on.html');
            $("#flip-select-text-message").val("off").slider("refresh");
            $('#flip-select-text-message').slider('disable');
        }
    }

}


function messagsettingchange() {
   // var status = "0";
  //  $("#flip-select-text-message").val("off");
   // $('#flip-select-text-message').slider("refresh");
  //  var SubsUnsubsRequest = '{"request": {"type": "campaign","data": {"action": "subscribe","subscriptions": {"campaign": [{"campaignname": "text4baby","sms": "' + status + '",},]}}}}';
	var SubsUnsubsRequest = '{"request": {"action": "unsubscribeCampaign","data": {"name": "text4baby","channel": "2"}}}';
    ProgressBarShow();
    transaction(SubsUnsubsRequest, "subscribe", "0");
}

function messagsettingnochange() {
  //  var status = "1";
  //  $("#flip-select-text-message").val("on");
  //  $('#flip-select-text-message').slider("refresh");
   // var SubsUnsubsRequest = '{"request": {"type": "campaign","data": {"action": "subscribe","subscriptions": {"campaign": [{"campaignname": "text4baby","sms": "' + status + '",},]}}}}';
   var SubsUnsubsRequest = '{"request": {"action": "subscribeCampaign","data": {"name": "text4baby","channel": "2"}}}';
    ProgressBarShow();
    transaction(SubsUnsubsRequest, "subscribe", "1");
}

function nochange() {
    $("#flip-select-text-message").val("on");
    $('#flip-select-text-message').slider("refresh");
    $('#flip-select-text-message').slider('enable');
}

function ClearData() {
    var dataclear = $("#flip-select-data").val();
    if (dataclear == "on") {
        var DeleteApi0001Request = '{"request": {"action": "deleteParticipantAppointments"}}';
        transaction(DeleteApi0001Request, "deleteParticipantAppointments");
    }
    else {
        window.setTimeout(function () {
            $("#clearData").blur();
            ProgressBarHide();
        }, 1000);
    }
}

function IsDataCleared() {
    ProgressBarShow();
    //var dataclear = $("#flip-select-data").val();
    if (window.localStorage.getItem("moredatechange") == "true") {
        window.localStorage.setItem("moredatechange", "false")
        var date = window.localStorage.getItem("date");
        var daysdiff = calculatedate(date);
        if (daysdiff > 0 && daysdiff <= 270) {
            window.localStorage.setItem("pregnancyduedate", date);
            window.localStorage.setItem("babyname", "");
            window.localStorage.setItem("babydateofbirth", "");
            window.localStorage.setItem("weeknb", "1");
        }
        else {
            window.localStorage.setItem("babydateofbirth", date);
            window.localStorage.setItem("pregnancyduedate", "");
            window.localStorage.setItem("week", "40");
        }
        var protocolold = window.localStorage.getItem("currenttext4babyprotocol");
        var protocolnew = window.localStorage.getItem("protocolnew");
        if (protocolold != protocolnew) {
            window.localStorage.setItem("currenttext4babyprotocol", protocolnew);
            ProgressBarHide();
        }
        updateWeek();
      //  assignments('more');
       // $("#accountsettings-save").blur();
        SetPreference();
        ProgressBarHide();
        navigateTo("more.html", "{true}");
    }
//    else if (dataclear == "on") {
//        var DeleteApi0001Request = '{"request": {"action": "deleteParticipantAppointments"}}';
//        transaction(DeleteApi0001Request, "deleteParticipantAppointments");
//    }
    else {
        window.setTimeout(function () {
          //  $("#accountsettings-save").blur();
            ProgressBarHide();
            navigateTo("more.html", "{true}");
        },1000);
    }
}

function ClearStorage(str) {
    if (str == "more-clear") {
        DeleteTableFromDB(); 
    }

    else if (str == "signup4") {
        window.localStorage.setItem("protocol", "");
        window.localStorage.setItem("protocol1", "");
        window.localStorage.setItem("duedate", "");
        window.localStorage.setItem("birthdate", "");
        window.localStorage.setItem("fname", "");
        window.localStorage.setItem("email", "");
        window.localStorage.setItem("menstrualdate", "");
        window.localStorage.setItem("duebirthdate", "");
        window.localStorage.setItem("zipcode", "");
        window.localStorage.setItem("babyname", "");
        window.localStorage.setItem("duedateknown", "");
        window.localStorage.setItem("partialcompleteprofile", "false");
        return false;
    }

    else if (str == "signup2") {
        window.localStorage.setItem("fname", "");
        window.localStorage.setItem("email", "");
        return false;
    }

    else if (str == "username") {
        window.localStorage.setItem("changepassword", "false");
        window.localStorage.setItem("babyname", "");
        window.localStorage.setItem("badge", "");
        window.localStorage.setItem("countbaby", "null");
        window.localStorage.setItem("count", "null");
        for (i = 4; i <= 42; i++) {
            window.localStorage.setItem("checkbox2" + i, "");
            window.localStorage.setItem("checkbox1" + i, "");
            window.localStorage.setItem("poll" + i, "");
        }
        for (i = 1; i <= 52; i++) {
            window.localStorage.setItem("checkbox2nb" + i, "");
            window.localStorage.setItem("checkbox1nb" + i, "");
            window.localStorage.setItem("pollnb" + i, "");
        }
        window.localStorage.setItem("week", "");
        window.localStorage.setItem("weeknb", "");
    }

    else if (str == "signup4aftersignin") {
        window.localStorage.setItem("protocol", "");
        window.localStorage.setItem("protocol1", "");
        window.localStorage.setItem("duedate", "");
        window.localStorage.setItem("birthdate", "");
        window.localStorage.setItem("fname", "");
        window.localStorage.setItem("email", "");
        window.localStorage.setItem("menstrualdate", "");
        window.localStorage.setItem("duebirthdate", "");
        window.localStorage.setItem("zipcode", "");
        window.localStorage.setItem("duedateknown", "");
        window.localStorage.setItem("partialcompleteprofile", "false");
        return false;
    }
}

function showdate(whichdate) {
    if (whichdate == "duedate") {
        var duedate = $("#due-date-2").val();
        $("#due-date-2").val(duedate);
        var daysdiff = calculatedate(duedate);
        if (daysdiff <= 0 || daysdiff > 270) {
            errormessage('signup-screen4-duedate.html');
            window.localStorage.setItem("duedate", "");
            $("#due-date-2").val("");
        }
    }

    else if (whichdate == "menstrualdate") {
        var menstrualdate = $("#period").val();
        $("#period").val(menstrualdate);
        var daysdiff = calculatedate(menstrualdate);
        if (daysdiff > 0 || daysdiff < -270) {
            errormessage('signup-screen4-mperiod.html');
            window.localStorage.setItem("menstrualdate", "");
            $("#period").val("");
        }
    }

    else if (whichdate == "birthdate") {
        var birthdate = $("#baby-birthday").val();
        $("#baby-birthday").val(birthdate);
        var daysdiff = calculatedate(birthdate);
        if (daysdiff > 0 || daysdiff < -365) {
            errormessage('signup-screen4-baby-bday.html');
            window.localStorage.setItem("birthdate", "");
            $("#baby-birthday").val("");
        }
    }

    else if (whichdate == "duebirthdate") {
        var duebirthdate = $("#due-date-3").val();
        $("#due-date-3").val(duebirthdate);
        var daysdiff = calculatedate(duebirthdate);
        if (daysdiff > 270 || daysdiff < -365) {
            errormessage('signup-screen4-ddate-bbday.html');
            window.localStorage.setItem("duebirthdate", "");
            $("#due-date-3").val("");
        }
        if (daysdiff <= 0 && daysdiff > -365) {
            $("#babyname").show();
            window.localStorage.setItem("babynameshow", "true");
        }
        else {
            $("#babyname").hide();
            window.localStorage.setItem("babynameshow", "false");
        }
    }

    else if (whichdate == "moredate") {
        var moredate = $("#due-date-account").val();
        window.localStorage.setItem("moredate", moredate);
        $("#due-date-account").val(moredate);
        var daysdiff = calculatedate(moredate);
        if (daysdiff > 270 || daysdiff < -365) {
            errormessage('more-screen1-ddate.html');
            window.localStorage.setItem("moredate", "");
            $("#due-date-account").val(window.localStorage.getItem("date"));
            if (window.localStorage.getItem("currenttext4babyprotocol") == "2") {
                $("#babyname-more").show();
                window.localStorage.setItem("babynameshow", "true");
            if (window.localStorage.getItem("babyname") != "" && window.localStorage.getItem("babyname") != "undefined" && window.localStorage.getItem("babyname") != null) {
                $("#baby-name3").val(window.localStorage.getItem("babyname"));
              }
           }
        }
        else
            if (daysdiff <= 0 && daysdiff >= -365) {
                $("#babyname-more").show();
                window.localStorage.setItem("babynameshow", "true");
            }
            else {
                $("#babyname-more").hide();
                window.localStorage.setItem("babynameshow", "false");
                //window.localStorage.setItem("babyname", "");
                $("#baby-name3").val("");
            }
    }

    else if (whichdate == "preg-appointment") {
        var pregdate = $("#pregnancy-appointment-date").val();
        var daysdiff = calculatedate(pregdate);
        if (daysdiff <= 0) {
            errormessage('calender-date-appointment.html');
            //$("#pregnancy-appointment-date").val("");
        }
    }

    else if (whichdate == "baby-appointment") {
        var pregdate = $("#baby-appointment-date").val();
        var daysdiff = calculatedate(pregdate);
        if (daysdiff <= 0) {
            errormessage('calender-date-appointment.html');
            //$("#baby-appointment-date").val("");
        }
    }
}
function calculatedate(dateval) {
    var d = new Date();
    var today = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    var date1 = new Date(today);
    var date2 = new Date(dateval);
    var timeDiff = date2.getTime() - date1.getTime();
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

function PregAccorTwo(week) {
    var option = '';
    if ($("#radio-choice-pregnancy"+week+"-a").is(':checked')) {
        option = '1';
    }
    else if ($("#radio-choice-pregnancy" + week + "-b").is(':checked')) {
        option = '2';
    }
    else if ($("#radio-choice-pregnancy" + week + "-c").is(':checked')) {
        option = '3';
    }
    var pollid = week - 3;
    window.localStorage.setItem("pollid", pollid);
    var SurvApiRequest0001 = '{"request": {"action": "submitSingleQuestionPollResponses","pollid": "' + pollid + '","responseid": "' + option + '"}}';
    ProgressBarShow();
    transaction(SurvApiRequest0001, "submitSingleQuestionPollResponses", week);
}

function NewBabyAccorTwo(week) {
    var option = '';
    if ($("#radio-choice-baby-poll" + week + "-a").is(':checked')) {
        option = '1';
    }
    else if ($("#radio-choice-baby-poll" + week + "-b").is(':checked')) {
        option = '2';
    }
    else if ($("#radio-choice-baby-poll" + week + "-c").is(':checked')) {
        option = '3';
    }
    var pollid = parseInt(week) + 39;
    window.localStorage.setItem("pollid", pollid);
    var SurvApiRequest0001 = '{"request": {"action": "submitSingleQuestionPollResponses","pollid": "' + pollid + '","responseid": "' + option + '"}}';
    ProgressBarShow();
    transaction(SurvApiRequest0001, "submitSingleQuestionPollResponses", week);
}




function CheckboxSelect(week) {
    var count;
    if ($("#checkbox-week" + week + "-pregnancy-c1").is(':checked')) {
        window.localStorage.setItem("checkbox1" + week, "checked");
        if (window.localStorage.getItem("count") != null && window.localStorage.getItem("count") != "null" && window.localStorage.getItem("count") != "undefined" && window.localStorage.getItem("count") != "") {
            count = parseInt(window.localStorage.getItem("count")) + 1;
            window.localStorage.setItem("count", count);
            CountCheck();
        }
        else {
            count = 1;
            window.localStorage.setItem("count", count);
            CountCheck();
        }
    }
    else {
        window.localStorage.setItem("checkbox1" + week, null);
        if (window.localStorage.getItem("count") != null && window.localStorage.getItem("count") != "null" && window.localStorage.getItem("count") != "undefined" && window.localStorage.getItem("count") != "") {
            count = parseInt(window.localStorage.getItem("count")) - 1;
            window.localStorage.setItem("count", count);
            CountCheck();
        }
    }    
}

function CheckboxBabySelect(week) {
    var count;
    if ($("#checkbox-week" + week + "-baby-c1").is(':checked')) {
        window.localStorage.setItem("checkbox1nb" + week, "checked");
        if (window.localStorage.getItem("countbaby") != null && window.localStorage.getItem("countbaby") != "null" && window.localStorage.getItem("countbaby") != "undefined" && window.localStorage.getItem("countbaby") != "") {
            count = parseInt(window.localStorage.getItem("countbaby")) + 1;
            window.localStorage.setItem("countbaby", count);
            CountCheck();
        }
        else {
            count = 1;
            window.localStorage.setItem("countbaby", count);
            CountCheck();
        }
    }
    else {
        window.localStorage.setItem("checkbox1nb" + week, null);
        if (window.localStorage.getItem("countbaby") != null && window.localStorage.getItem("countbaby") != "null" && window.localStorage.getItem("countbaby") != "undefined" && window.localStorage.getItem("countbaby") != "") {
            count = parseInt(window.localStorage.getItem("countbaby")) - 1;
            window.localStorage.setItem("countbaby", count);
            CountCheck();
        }
    }    
}

function CheckboxSelect2(week) {
    var count;
    if ($("#checkbox-week" + week + "-pregnancy-c2").is(':checked')) {
        window.localStorage.setItem("checkbox2" + week, "checked");
        if (window.localStorage.getItem("count") != null && window.localStorage.getItem("count") != "null" && window.localStorage.getItem("count") != "undefined" && window.localStorage.getItem("count") != "") {
            count = parseInt(window.localStorage.getItem("count")) + 1;
            window.localStorage.setItem("count", count);
            CountCheck();
        }
        else {
            count = 1;
            window.localStorage.setItem("count", count);
        }
    }
    else {
        window.localStorage.setItem("checkbox2" + week, null);
        if (window.localStorage.getItem("count") != null && window.localStorage.getItem("count") != "null" && window.localStorage.getItem("count") != "undefined" && window.localStorage.getItem("count") != "") {
            count = parseInt(window.localStorage.getItem("count")) - 1;
            window.localStorage.setItem("count", count);
            CountCheck();
        }
    }
}

function CheckboxBabySelect2(week) {
    var count;
    if ($("#checkbox-week" + week + "-baby-c2").is(':checked')) {
        window.localStorage.setItem("checkbox2nb" + week, "checked");
        if (window.localStorage.getItem("countbaby") != null && window.localStorage.getItem("countbaby") != "null" && window.localStorage.getItem("countbaby") != "undefined" && window.localStorage.getItem("countbaby") != "") {
            count = parseInt(window.localStorage.getItem("countbaby")) + 1;
            window.localStorage.setItem("countbaby", count);
            CountCheck();
        }
        else {
            count = 1;
            window.localStorage.setItem("countbaby", count);
        }
    }
    else {
        window.localStorage.setItem("checkbox2nb" + week, null);
        if (window.localStorage.getItem("countbaby") != null && window.localStorage.getItem("countbaby") != "null" && window.localStorage.getItem("countbaby") != "undefined" && window.localStorage.getItem("countbaby") != "") {
            count = parseInt(window.localStorage.getItem("countbaby")) - 1;
            window.localStorage.setItem("countbaby", count);
            CountCheck();
        }
    }
}

function CheckboxChecked(str) {
    var num = str;
    if (window.localStorage.getItem("checkbox1" + num) == "checked") {
        $("#checkbox-week" + num + "-pregnancy-c1").attr('checked', 'checked').checkboxradio("refresh");

    }
    if (window.localStorage.getItem("checkbox2" + num) == "checked") {
        $("#checkbox-week" + num + "-pregnancy-c2").attr('checked', 'checked').checkboxradio("refresh");
    }
}

function CheckboxCheckedBaby(str) {
    var num = str;
    if (window.localStorage.getItem("checkbox1nb" + num) == "checked") {
        $("#checkbox-week" + num + "-baby-c1").attr('checked', 'checked').checkboxradio("refresh");

    }
    if (window.localStorage.getItem("checkbox2nb" + num) == "checked") {
        $("#checkbox-week" + num + "-baby-c2").attr('checked', 'checked').checkboxradio("refresh");
    }
}


function CountCheck() {
    if (window.localStorage.getItem("count") != "undefined" && window.localStorage.getItem("countbaby") != "undefined" && window.localStorage.getItem("count") != "null" && window.localStorage.getItem("countbaby") != "null" && window.localStorage.getItem("count") != null && window.localStorage.getItem("countbaby") != null) {
        var count = parseInt(window.localStorage.getItem("count")) + parseInt(window.localStorage.getItem("countbaby"));
    }
    else if (window.localStorage.getItem("count") == "undefined" || window.localStorage.getItem("count") == "null" || window.localStorage.getItem("count") == null) {
        var count = parseInt(window.localStorage.getItem("countbaby"));
    }
    else if (window.localStorage.getItem("countbaby") == "undefined" || window.localStorage.getItem("countbaby") == "null" || window.localStorage.getItem("countbaby") == null) {
        var count = parseInt(window.localStorage.getItem("count"));
    }
        if (count < 3) {
            $("#star1").removeClass("star-active");
            $("#star1nb").removeClass("star-active");
        }
        else if ((count >= "3" && count <= "5") || (count >= "18" && count <= "20") || (count >= "33" && count <= "35") || (count >= "48" && count <= "50") || (count >= "63" && count <= "65") || (count >= "78" && count <= "80") || (count >= "93" && count <= "95") || (count >= "108" && count <= "110") || (count >= "123" && count <= "125") || (count >= "138" && count <= "140") || (count >= "153" && count <= "155") || (count >= "168" && count <= "170")) {
            StarActiveInactive("1");
        }
        else if ((count >= "6" && count <= "8") || (count >= "21" && count <= "23") || (count >= "36" && count <= "38") || (count >= "51" && count <= "53") || (count >= "66" && count <= "68") || (count >= "81" && count <= "83") || (count >= "96" && count <= "98") || (count >= "111" && count <= "113") || (count >= "126" && count <= "128") || (count >= "141" && count <= "143") || (count >= "156" && count <= "158") || (count >= "171" && count <= "173")) {
            StarActiveInactive("2");
        }
        else if ((count >= "9" && count <= "11") || (count >= "24" && count <= "26") || (count >= "39" && count <= "41") || (count >= "54" && count <= "56") || (count >= "69" && count <= "71") || (count >= "84" && count <= "86") || (count >= "99" && count <= "101") || (count >= "114" && count <= "116") || (count >= "129" && count <= "131") || (count >= "144" && count <= "146") || (count >= "159" && count <= "161") || (count >= "174" && count <= "176")) {
            StarActiveInactive("3");
        }
        else if ((count >= "12" && count <= "14") || (count >= "27" && count <= "29") || (count >= "42" && count <= "44") || (count >= "57" && count <= "59") || (count >= "72" && count <= "74") || (count >= "87" && count <= "89") || (count >= "102" && count <= "104") || (count >= "117" && count <= "119") || (count >= "132" && count <= "134") || (count >= "147" && count <= "149") || (count >= "162" && count <= "164") || (count >= "177" && count <= "179")) {
            StarActiveInactive("4");
        }
        else if ((count >= "15" && count <= "17") || (count >= "30" && count <= "32") || (count >= "45" && count <= "47") || (count >= "60" && count <= "62") || (count >= "75" && count <= "77") || (count >= "90" && count <= "92") || (count >= "105" && count <= "107") || (count >= "120" && count <= "122") || (count >= "135" && count <= "137") || (count >= "150" && count <= "152") || (count >= "165" && count <= "167") || (count > 179)) {
            StarActiveInactive("5");
        }
        BadgeCount(count);
    }

    function StarActiveInactive(num) {
        for (i = 1; i <= num; i++) {
            $("#star" + i).addClass("star-active");
            $("#star" + i + "nb").addClass("star-active");
        }
        for (i = 5; i > num; i--) {
            $("#star" + i).removeClass("star-active");
            $("#star" + i + "nb").removeClass("star-active");
        }
    }

    function BadgeActiveInactive() {
        var badgecount = window.localStorage.getItem("badge");
        var i;
        for (i = 12; i > badgecount; i--) {
            $("#badge" + i).addClass("icon" + i);
        }
        if (badgecount != null && badgecount != "null" && badgecount != "" && badgecount != "undefined" && badgecount != "0") {
            document.getElementById("badgeHeading").style.display = "block";
            $("#numofbadges").text(badgecount);
            for (i = 1; i <= badgecount; i++) {
                $("#badge" + i).addClass("icon" + i + " icon" + i + "-active");
                $("#badgetext" + i).removeClass("badge-txt");
                $("#badgetext" + i).addClass("badge-txt-active");
            }
        }
        else {
            $("#numofbadges").text("0");
        }
    }

    function BadgeCount(count) {
        if (count < 15) {
            $("#badgediv").hide();
            $("#badgedivnb").hide();
            window.localStorage.setItem("badge", 0);
        }
        else if (count >= 15 && count <= 29) {
            BadgeShow("1", "A Plus Job!");
        }
        else if (count >= 30 && count <= 44) {
            BadgeShow("2", "Looking Good!");
        }
        else if (count >= 45 && count <= 59) {
            BadgeShow("3", "Shining Bright!");
        }
        else if (count >= 60 && count <= 74) {
            BadgeShow("4", "Full of Heart!");
        }
        else if (count >= 75 && count <= 89) {
            BadgeShow("5", "Smokin' Hot!");
        }
        else if (count >= 90 && count <= 104) {
            BadgeShow("6", "Big Thumbs Up!");
        }
        else if (count >= 105 && count <= 119) {
            BadgeShow("7", "Superwoman!");
        }
        else if (count >= 120 && count <= 134) {
            BadgeShow("8", "Picture Perfect!");
        }
        else if (count >= 135 && count <= 149) {
            BadgeShow("9", "No. 1 Mom!");
        }
        else if (count >= 150 && count <= 164) {
            BadgeShow("10", "Jack of All Trades!");
        }
        else if (count >= 165 && count <= 179) {
            BadgeShow("11", "You're Inspiring!");
        }
        else if (count > 179) {
            BadgeShow("12", "World Champ Mom!");
        }
    }

    function BadgeShow(badgecount, badgetext) {
        $("#badgediv").show();
        $("#badgedivnb").show();
        var classname = $('#badgespan').attr('class');
        if (classname != "" || classname != "undefined" || classname != "null" || classname != null) {
            $("#badgespan").removeClass(classname);
            $("#badgespannb").removeClass(classname);
        }
        $("#badgespan").addClass("badge-latest icon" + badgecount + "-active");
        $("#badgespannb").addClass("badge-latest icon" + badgecount + "-active");
        $("#badgetext").text(badgetext);
        $("#badgetextnb").text(badgetext);        
        window.localStorage.setItem("badge", badgecount);
    }

    function MoreBackRedirect() {
        if (document.referrer.indexOf(window.location.hostname) != -1) {
            var referrer = document.referrer;
            var parts = referrer.split("/");
            var prt3 = parts[parts.length - 3];
            var prt2 = parts[parts.length - 2];
            var prt1 = parts[parts.length - 1];
            if (prt3 == 'topics') {
                if (window.localStorage.getItem("currenttext4babyprotocol") == '1' && prt2 == 'baby') {
                    window.location = "topics/pregnancy/pregnancy-topics.html";
                    return;
                }
                else if (window.localStorage.getItem("currenttext4babyprotocol") == '2' && prt2 == 'pregnancy') {
                        window.location = "topics/baby/baby-topics.html";
                        return;
                    }
                    else {
                        window.location.assign(prt3 + '/' + prt2 + '/' + prt1);
                    }
            }
            else {
                window.location.assign(prt1);
            }
        }
    }

    function topicsPage() {
        if (window.localStorage.getItem("currenttext4babyprotocol") == "1") {
            window.location = "topics/pregnancy/pregnancy-topics.html";
        }
        else {
            window.location = "topics/baby/baby-topics.html";
        }
    }

    function tcback() {
        window.localStorage.setItem('previousscreen', 'tnc');
        window.location = "sign-up.html";
    }


     function initialSliderNumber() {
      //  $("#firstname1").text(window.localStorage.getItem("firstname"));
        if (window.localStorage.getItem("currenttext4babyprotocol") == "2") {
           // window.localStorage.setItem("week", "40");
            date = window.localStorage.getItem("babydateofbirth");
            var week = calculateweek(date);
            if (week <= 51) {
               // week = week + 1;
            }
            else {
                week = 52;
            }
            window.localStorage.setItem("weeknb", week);
            return week;
            //babyShow();
        }

        else if (window.localStorage.getItem("currenttext4babyprotocol") == "1") {
           // window.localStorage.setItem("weeknb", "1");
            date = window.localStorage.getItem("pregnancyduedate");
            var days = calculatedate(date);
            var week = calculateweek(date);

               if(week<38)
                  week = 40 - week + 1;
               else
                   week=4;

            window.localStorage.setItem("week", week);

            return week;
          //  pregnancyShow();
        }
    }

    function updateWeek() {
        //  $("#firstname1").text(window.localStorage.getItem("firstname"));
        if (window.localStorage.getItem("currenttext4babyprotocol") == "2") {
            // window.localStorage.setItem("week", "40");
            date = window.localStorage.getItem("babydateofbirth");
            var week = calculateweek(date);
            if (week <= 51) {
              //  week = week + 1;
            }
            else {
                week = 52;
            }
            window.localStorage.setItem("weeknb", week);
           // return week;
            //babyShow();
        }

        else if (window.localStorage.getItem("currenttext4babyprotocol") == "1") {
            // window.localStorage.setItem("weeknb", "1");
            date = window.localStorage.getItem("pregnancyduedate");
            var days = calculatedate(date);
            var week = calculateweek(date);

              if(week<38)
                  week = 40 - week + 1;
               else
                 week=4;

            window.localStorage.setItem("week", week);
        }
    }

    function timelinePage() {
       // commented.. window.location.assign("timeline.html?mode=" + window.localStorage.getItem("currenttext4babyprotocol"));
        navigateTo("timeline.html", "{\"week\":" + initialSliderNumber() + ",\"mode\":" + window.localStorage.getItem("currenttext4babyprotocol") + ",\"firstname\":\"" + window.localStorage.getItem("firstname") + "\"}");
    }

    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function Redirect(str) {
        if (str == "video") {
            window.location.assign("video.html?num=" + $("#mobile-number").val());
        }
        else if (str == "signup") {
            var num = getUrlVars()["num"];
            window.location.assign("sign-up.html?num=" + num);
        }
    }

    function calendarPage() {
        window.location.assign("calendar/baby/baby-calendar.html");
    }

    db = window.openDatabase("Text4BabyDB", "1.0", "PhoneGap Demo", 600000);
    function transaction_error() { 
    
    }

    // ----- drop table on clear data -----
    function DeleteTableFromDB() {
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS TAppointments');
        }
	     , transaction_error, DeleteTableFromDB_success);
    }

    function DeleteTableFromDB_success(tx, results) {
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS TChecklist');
        }
	     , transaction_error, CheckListDrop_success);
    }

    function CheckListDrop_success(tx, results) {
        CreateTablesCalendar("dbclear");
    }

//    function keydown() {
//        //alert(event.keyCode);
//        if (event.keyCode == 13 || event.keyCode == 10) {
//            document.getElementById('submitlogin').click();
//        }
//        return false;
//    }

    /*
    function showalert() {
        //alert('show alert');
        navigator.notification.alert(
            'We are unable to connect to the network at this time. Please try again.',
             null,
             'Alert',
             'Ok'
);
    }
        */

    function commentshowhide() {
       // $('#contact-comments').val('');
        $('#commentdiv').show();
//        if ($('#contact-reason').val() == "3" || $('#contact-reason').val() == "4") {
//            $('#commentdiv').show();
//        }
//        else {
//            $('#commentdiv').hide();
//        }

    }

    function RedirectOnBack() {
        var pagename = getUrlVars()['redirect'];
        window.location = pagename;
    }

    function ContactUsOnBack() {
        var pagename = window.localStorage.getItem("contactusFrom");
        window.localStorage.setItem("contactusFrom", null);
        if (pagename != null && pagename != "null") {
            navigateTo(pagename, '{}');
        }
        else {
            window.location.reload();
        }
    }

    function contactusRedirect(page) {
        window.localStorage.setItem("contactusFrom", page);
        navigateTo('contact-us.html', '{}');
    }



    // for more separate pages

    function more_redirect(str) {
        if (str == '1') {
            window.location = "more.accountsettings.htm";
        }
        else if (str == '2') {
            window.location = "more.messagesettings.htm";
        }
        else if (str == '3') {
            window.location = "more.badges.htm";
        }
        else if (str == '4') {
            window.location = "contact-us.html";
        }
        else if (str == '5') {
            window.location = "more.about.htm";
        }
        else if (str == '6') {
            window.location = "more-terms-conditions.html";
        }
        else if (str == '7') {
            window.location = "more-privacy-policy.html";
        }
        else if (str == '8') {
            window.location = "more.cleardata.htm";
        }
        else if (str == '9') {
            window.location = "error/more.logout.htm";
        }
    }

    // for timeline separate pages

    //    functions updated and constructed for timeline accordian two and navigation bars

    // Pregnancy Weeks Result
    function disp_pregnancy_result(val) {
        document.getElementById("poll-pregnancy-quiz" + val).style.display = "none";
        document.getElementById("poll-pregnancy-result" + val).style.display = "block";
        window.setTimeout(function () {
            $("div.pregnancy-week" + val + "-bar-1").addClass("preganim-week" + val + "-bar-1");
            $("div.pregnancy-week" + val + "-bar-2").addClass("preganim-week" + val + "-bar-2");
            $("div.pregnancy-week" + val + "-bar-3").addClass("preganim-week" + val + "-bar-3");
        }, 1000);

    };


    // Baby Weeks Result
    function disp_baby_result(val) {
        document.getElementById("poll-baby-quiz" + val).style.display = "none";
        document.getElementById("poll-baby-result" + val).style.display = "block";
        window.setTimeout(function () {
            //$("div.babyweek'+val+'-bar1").addClass('baby-week"+val+"-bar-1');
            //$("div.babyweek'+val+'-bar2").addClass('baby-week"+val+"-bar-2');
            //$("div.babyweek'+val+'-bar3").addClass('baby-week"+val+"-bar-3');
            $("div.baby-week" + val + "-bar-1").addClass("babyanim-week" + val + "-bar-1");
            $("div.baby-week" + val + "-bar-2").addClass("babyanim-week" + val + "-bar-2");
            $("div.baby-week" + val + "-bar-3").addClass("babyanim-week" + val + "-bar-3");
        }, 1000);
    };

    function navbarnext(str) {
        var newstr = str + 1;
        //window.location.assign('timeline_preg_week' + str + '.html');
        window.location = 'timeline_newbaby_week' + newstr + '.html';
        //        var a = "poll" + newstr;
        //        alert(a);
        //        alert(window.localStorage.getItem("poll" + newstr));
        //        if (window.localStorage.getItem("poll" + newstr) == "true") {
        //            alert('i m in next');
        //            disp_pregnancy_result(newstr);
        //        }

    }

    function navbarprev(str) {
        var newstr = str - 1;
        //window.location.assign('timeline_preg_week' + str + '.html');
        window.location = 'timeline_newbaby_week' + newstr + '.html';
        //            var a = "poll" + newstr;
        //            alert(a);
        //            alert(window.localStorage.getItem("poll" + newstr));
        //            if (window.localStorage.getItem("poll" + newstr) == "true") {
        //                alert('i m in prev');
        //                disp_pregnancy_result(newstr);
        //            }
    }

    function ShowResult(str) {
        var num = str;
        var flag = window.localStorage.getItem("poll" + num);
        if (flag == "true") {
            num = parseInt(num);
            disp_pregnancy_result(num);
        }
    }

    function ShowResultBaby(str) {
        var num = str;
        var flag = window.localStorage.getItem("pollnb" + num);
        if (flag == "true") {
            num = parseInt(num);
            disp_baby_result(num);
        }
    }

    function ShowCheckList(str) {
     //   pregnancy_timeline_expand('3');
        if (window.localStorage.getItem("checkbox1" + str) == "checked") {
            $("#checkbox-week" + str + "-pregnancy-c1").attr('checked', 'checked').checkboxradio("refresh");

        }
        if (window.localStorage.getItem("checkbox2" + str) == "checked") {
            $("#checkbox-week" + str + "-pregnancy-c2").attr('checked', 'checked').checkboxradio("refresh");
        }

        CountCheck();
    }

    function ShowCheckListBaby(str) {
      //  baby_timeline_expand('3');
        if (window.localStorage.getItem("checkbox1nb" + str) == "checked") {
            $("#checkbox-week" + str + "-baby-c1").attr('checked', 'checked').checkboxradio("refresh");

        }
        if (window.localStorage.getItem("checkbox2nb" + str) == "checked") {
            $("#checkbox-week" + str + "-baby-c2").attr('checked', 'checked').checkboxradio("refresh");
        }

        CountCheck();
    }


    function baby_timeline_expand(str) {
        if (str == '1') {
            window.localStorage.setItem('count_baby2', 0);
            window.localStorage.setItem('count_baby3', 0);
            window.localStorage.setItem("accord_baby", "1")
            var count = window.localStorage.getItem("count_baby1");
            count = parseInt(count) + 1;
            window.localStorage.setItem('count_baby1', count);
            window.localStorage.setItem("modulus", window.localStorage.getItem("count_baby1") % 2);
        }
        else if (str == '2') {
            window.localStorage.setItem('count_baby1', 0);
            window.localStorage.setItem('count_baby3', 0);
            window.localStorage.setItem("accord_baby", "2")
            var count = window.localStorage.getItem("count_baby2");
            count = parseInt(count) + 1;
            window.localStorage.setItem('count_baby2', count);
            window.localStorage.setItem("modulus", window.localStorage.getItem("count_baby2") % 2);
        }
        else if (str == '3') {
            window.localStorage.setItem('count_baby1', 0);
            window.localStorage.setItem('count_baby2', 0);
            window.localStorage.setItem("accord_baby", "3")
            var count = window.localStorage.getItem("count_baby3");
            count = parseInt(count) + 1;
            window.localStorage.setItem('count_baby3', count);
            window.localStorage.setItem("modulus", window.localStorage.getItem("count_baby3") % 2);
        }

    }


    function pregnancy_timeline_expand(str) {
        if (str == '1') {
            window.localStorage.setItem('count_pregnancy2', 0);
            window.localStorage.setItem('count_pregnancy3', 0);
            window.localStorage.setItem("accord_pregnancy", "1")
            var count = window.localStorage.getItem("count_pregnancy1");
            count = parseInt(count) + 1;
            window.localStorage.setItem('count_pregnancy1', count);
            window.localStorage.setItem("modulus_pregnancy", window.localStorage.getItem("count_pregnancy1") % 2);
        }
        else if (str == '2') {
            window.localStorage.setItem('count_pregnancy1', 0);
            window.localStorage.setItem('count_pregnancy3', 0);
            window.localStorage.setItem("accord_pregnancy", "2")
            var count = window.localStorage.getItem("count_pregnancy2");
            count = parseInt(count) + 1;
            window.localStorage.setItem('count_pregnancy2', count);
            window.localStorage.setItem("modulus_pregnancy", window.localStorage.getItem("count_pregnancy2") % 2);
        }
        else if (str == '3') {
            window.localStorage.setItem('count_pregnancy1', 0);
            window.localStorage.setItem('count_pregnancy2', 0);
            window.localStorage.setItem("accord_pregnancy", "3")
            var count = window.localStorage.getItem("count_pregnancy3");
            count = parseInt(count) + 1;
            window.localStorage.setItem('count_pregnancy3', count);
            window.localStorage.setItem("modulus_pregnancy", window.localStorage.getItem("count_pregnancy3") % 2);
        }
    }

    function expandNewbaby() {
        var accord = window.localStorage.getItem("accord_baby");
        window.localStorage.setItem("modulus_pregnancy", 0);
        if (window.localStorage.getItem("modulus"
        ) == "0") {
            $('#baby' + accord).trigger('collapse');
        }
        else
            if (window.localStorage.getItem("modulus") == "1") {
                if (accord == 1) {
                    $('#baby1').trigger('expand');
                }
                else
                    if (accord == 2) {
                        $('#baby2').trigger('expand');
                    }
                    else
                        if (accord == 3) {
                            $('#baby3').trigger('expand');
                        }
            }
    }

    function expandPregnancy() {
        var accord = window.localStorage.getItem("accord_pregnancy");
        window.localStorage.setItem("modulus", 0);
        if (window.localStorage.getItem("modulus_pregnancy") == "0") {
            $('#preg' + accord).trigger('collapse');
        }
        else
            if (window.localStorage.getItem("modulus_pregnancy") == "1") {
                if (accord == 1) {
                    $('#preg1').trigger('expand');
                }
                else
                    if (accord == 2) {
                        $('#preg2').trigger('expand');
                    }
                    else
                        if (accord == 3) {
                            $('#preg3').trigger('expand');
                        }
            }
    }


    function updateResults(str) {
            ShowResult(str);
            CheckboxChecked(str);
            CountCheck();
    }

    function updateResultsBaby(str) {
        ShowResultBaby(str);
        CheckboxCheckedBaby(str);
        CountCheck();
    }