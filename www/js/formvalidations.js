
$(document).ready(function () {
    $("#submitlogin").click(function () {
        if ($("#checkbox-0").is(':checked')) {
            window.localStorage.setItem("rpwflag", "true");
        }
        else {
            window.localStorage.setItem("rpwflag", "false");
        }
        window.localStorage.setItem('session', 'true');
        var username = $("input#username123").val();
        var password = $("input#password123").val();
        var letter = /[a-zA-Z]/;
        var number = /[0-9]/;
        if (username == "" || username.length != 10 || isNaN(username) || password == "") {
            errormessage("signin-screen1-phnnum-pwd.html");
            // $("input#username123").val("");
//            $("input#password123").val("");
            return false;
        }
        if (window.localStorage.getItem("username") != "undefined" && window.localStorage.getItem("username") != "" && window.localStorage.getItem("username") != null) {
            if (username != window.localStorage.getItem("username") && window.localStorage.getItem("username") != "more") {
                // ClearStorage('username');
                errormessage("signin-second-user.html");
//                $("input#password123").val('');
                return false;
            }
            else {
                var data = null;
                if (username != "" && password != "") {
                    //reqdata = '{"request": {"type": "login","data": {"username": "1' + username + '","password": "' + password + '"}}}';
                    reqdata = '{"request": {"action": "login","type": "login","data": {"username": "1' + username + '","password": "' + password + '"}}}';
                    ProgressBarShow();
                    //ProgressBarShow();
                    transaction(reqdata, "login", "login");
                }
            }
        }
        else {
            var data = null;
            if (username != "" && password != "") {
                //reqdata = '{"request": {"type": "login","data": {"username": "1' + username + '","password": "' + password + '"}}}';
                reqdata = '{"request": {"action": "login","type": "login","data": {"username": "1' + username + '","password": "' + password + '"}}}';
                ProgressBarShow();
                //ProgressBarShow();
                transaction(reqdata, "login", "login");
            }
        }
    });



    $("#resetpassword").click(function () {
        var phnnum = $("input#reset-mobile-number").val();
        if (phnnum == "" || phnnum.length != 10) {
            errormessage('signin-screen2-phnnum.html');
//            $("input#reset-mobile-number").val("");
            return false;
        }
        else {
            var PartApiRequest0002 = '{"request": {"action": "isParticipantEnrolledAndRegisteredInText4baby","mobilenumber": "' + $("input#reset-mobile-number").val() + '"}}';
            ProgressBarShow();
            transaction(PartApiRequest0002, "isParticipantEnrolledAndRegisteredInText4baby");
        }
    });



    $("#savechangepassword").click(function () {
        var letter = /[a-zA-Z]/;
        var number = /[0-9]/;
        var p1 = $("input#password-4").val();
        var p2 = $("input#password-5").val();
        window.localStorage.setItem("newpassword", p1);
        if (p1 == p2 && (p1 == "" || !(number.test(p1)) || !(letter.test(p1)) || p1.length < 8)) {
            errormessage('signin-screen4-pwd.html');
//            $("input#password-4").val("");
//            $("input#password-5").val("");
            return false;
        }
        else if (p1 != p2) {
            errormessage('signin-screen4-confrm-pwd.html');
//            $("input#password-4").val("");
//            $("input#password-5").val("");
            return false;
        }
        else if (p1 == p2 && p1 != "" && number.test(p1) && letter.test(p1) && p1.length >= 8) {
         //   var ChangePasswordRequest = '{"request": {"type": "login","data": {"action": "changepassword","username": "' + window.localStorage.getItem("uname") + '","newpassword": "' + p1 + '"}}}';
		   var ChangePasswordRequest = '{"request": {"action": "changepassword","data": {"username": "' + window.localStorage.getItem("uname") +'","newpassword": "' + p1 + '"}}}';
            ProgressBarShow();
            transaction(ChangePasswordRequest, "changepassword");
        }

    });


    $("#signupsubmit-1").click(function () {
        var phnnum = $("input#mobile-number").val();
        if (phnnum == "" || phnnum.length != 10 || isNaN(phnnum)) {
            errormessage('signup-screen1-phn.html');
            // $("input#mobile-number").val("");
            return false;
        }
        else {
            window.localStorage.setItem("PhoneNumber", phnnum);
            var PartApiRequest0002 = '{"request": {"action": "isParticipantEnrolledAndRegisteredInText4baby","mobilenumber": "' + phnnum + '"}}';
            ProgressBarShow();
            transaction(PartApiRequest0002, "isParticipantEnrolledAndRegisteredInText4baby", "signupchk");
        }
    });


    $("#signupsubmit-2").click(function () {
        //var eml = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var eml = /^([a-z0-9A-Z]+([0-9a-zA-Z]*[-.\w])*){2}@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,3}(?:\.[a-z]{2})?)$/i;
        var letter = /[a-zA-Z]/;
        var number = /[0-9]/;
        var p1 = $("input#password-1").val();
        var p2 = $("input#password-2").val();
        var firstname = $("#first-name").val();
        var babyname = $("#baby-name").val();
        var errorstring = new Array();
        if (firstname.trim() == "") {
            // errormessage('signup-screen2-fname.html');
            errorstring.push("Please enter your first name.");
//            $("input#password-1").val("");
//            $("input#password-2").val("");
            // return false;
        }
        if (babyname.trim() == "" && window.localStorage.getItem("currenttext4babyprotocol") == 2) {
            //  errormessage('signup-screen2-baby-fname.html');
            errorstring.push("Please enter baby's first name.");
//            $("input#password-1").val("");
//            $("input#password-2").val("");
            //  return false;
        }
        if (!eml.test($("#email-1").val()) || $("#email-1").val() == "") {
            // errormessage('signup-screen2-email.html');
            errorstring.push("Invalid email address.");
//            $("#email-1").val("");
//            $("input#password-1").val("");
//            $("input#password-2").val("");
            //  return false;
        }
        if (p1 == p2 && (p1 == "" || !(number.test(p1)) || !(letter.test(p1)) || p1.length < 8)) {
            // errormessage('signup-screen2-pwd.html');
            errorstring.push("Password format is not correct.");
//            $("input#password-1").val("");
//            $("input#password-2").val("");
            //  return false;
        }
        if (p1 != p2) {
            //  errormessage('signup-screen2-confrm-pwd.html');
            errorstring.push("Passwords don't match.");
//            $("input#password-1").val("");
//            $("input#password-2").val("");
            // return false;
        }
        if (errorstring == "") {
            window.localStorage.setItem("fname", firstname.trim());
            window.localStorage.setItem("babyname", babyname.trim());
            window.localStorage.setItem("email", $("#email-1").val());
            //  $("#pwhidden").val($("input#password-1").val());
            window.localStorage.setItem("pw", $("input#password-1").val());
            window.localStorage.setItem("privacycodepending", "true");
            ProgressBarShow();
            AuthApi2Request("");
        }
        else {
            window.localStorage.setItem("error", errorstring);
            errormessage('signup-screen4-iam.html');
        }
    });


    $("#signupsubmit-3").click(function () {
        var privacycode = $("#code-1").val();
        if (privacycode.length != 6 || isNaN(privacycode) || privacycode == "") {
            errormessage('signup-screen3-code.html');
//            $("#code-1").val("");
            return false;
        }
        else {
            var AuthApi0003Request = '{"request": {"action": "validateValidationCode","mobilenumber": "1' + window.localStorage.getItem("PhoneNumber") + '","validationcode": "' + $("#code-1").val() + '","updateprofileofparticipant": "1"}}';
            ProgressBarShow();
            transaction(AuthApi0003Request, "validateValidationCode", "");
        }
    });


    $("#signupsubmit-4").click(function () {
        var usertype = window.localStorage.getItem("protocol1");
        var duedateknown;
        var eml = /^([a-z0-9A-Z]+([0-9a-zA-Z]*[-.\w])*){2}@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,3}(?:\.[a-z]{2})?)$/i;
        //var eml = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var letter = /[a-zA-Z]/;
        var number = /[0-9]/;
        var p1 = $("input#password-3").val();
        var p2 = $("input#password-6").val();
        var space = /\s/;
        var fname = $("#first-name2").val();
        var bname = $("#baby-name2").val();
        var errorstring = new Array();
        if (usertype == "" || usertype == "null" || usertype == "I am: (please select)" || usertype == null || usertype == "undefined") {
            // errormessage('signup-screen4-iam.html');
            errorstring.push("Please indicate if you are pregnant or have a new baby.");
//            $("input#password-3").val("");
//            $("input#password-6").val("");
            // return false;
        }

        else {
            if (usertype == "Pregnant") {
                if ($('#flip-select-due-date').val() == "on") {
                    duedateknown = 1;
                    window.localStorage.setItem("duedateknown", duedateknown);
                    if ($("#due-date-2").val() != "" && $("#due-date-2").val() != "My Due Date Is: ") {
                        var duedate = $("#due-date-2").val();
                        window.localStorage.setItem("duedate", duedate);
                    }
                    else if ($("#due-date-2").val() == "") {
                        errorstring.push("Please select your due date.");
                    }
                    else {
                        //  errormessage('signup-screen4-duedate.html');
                        errorstring.push("Due date is not valid. Please enter a date in the future that is not more than 9 months from today.");
//                        $("input#password-3").val("");
//                        $("input#password-6").val("");
                        // return false;
                    }
                }

                else if ($('#flip-select-due-date').val() == "off") {
                    duedateknown = 2;
                    window.localStorage.setItem("duedateknown", duedateknown);
                    if ($("#period").val() != "" && $("#period").val() != "1st Day of Last Menstrual Period: ") {
                        var menstrualdate = $("#period").val();
                        window.localStorage.setItem("menstrualdate", menstrualdate);
                    }
                    else if ($("#period").val() == "") {
                        errorstring.push("Please select your 1st Day of Last Menstrual Period.");
                    }
                    else {
                        //  errormessage('signup-screen4-mperiod.html');
                        errorstring.push("The date of your last menstrual period cannot be in the future or more than 9 months in the past.");
//                        $("input#password-3").val("");
//                        $("input#password-6").val("");
                        // return false;
                    }
                }
                else {
                    duedateknown = '""';
                    window.localStorage.setItem("duedateknown", duedateknown);
                }
            }


            else if (usertype == "A new mom") {
                if ($("#baby-birthday").val() != "" && $("#baby-birthday").val() != "My Baby's Birthday is: ") {
                    var birthdate = $("#baby-birthday").val();
                    window.localStorage.setItem("birthdate", birthdate);
                }
                else if ($("#baby-birthday").val() == "") {
                    errorstring.push("Please select your date of birth.");
                }
                else {
                    // errormessage('signup-screen4-baby-bday.html');
                    errorstring.push("Baby's birthday is not valid. Text4baby provides tips through baby's first year. Please enter a date within the last year.");
//                    $("input#password-3").val("");
//                    $("input#password-6").val("");
                    // return false;
                }
            }


            else if (usertype == "A dad or parent" || usertype == "A relative/friend" || usertype == "Health provider") {
                if ($("#due-date-3").val() != "" && $("#due-date-3").val() != "Due Date or Baby's Birthday Is: ") {
                    var duebirthdate = $("#due-date-3").val();
                    window.localStorage.setItem("duebirthdate", duebirthdate);
                }
                else if ($("#due-date-3").val() == "") {
                    errorstring.push("Please select your due date or date of birth.");
                }
                else {
                    // errormessage('signup-screen4-ddate-bbday.html');
                    errorstring.push("Date cannot be more than 12 months in the past nor more than 9 months in the future.");
//                    $("input#password-3").val("");
//                    $("input#password-6").val("");
                    //  return false;
                }
            }

        }

        if (fname.trim() == "") {
            //errormessage('signup-screen4-fname.html');
            errorstring.push("Please enter your first name.");
//            $("#first-name2").val("");
//            $("input#password-3").val("");
//            $("input#password-6").val("");
            //  return false;
        }
        if ((bname.trim() == "" && usertype == "A new mom") || (bname.trim() == "" && window.localStorage.getItem("babynameshow") == "true" && (usertype == "A dad or parent" || usertype == "A relative/friend" || usertype == "Health provider"))) {
            // errormessage('signup-screen4-baby-fname.html');
            errorstring.push("Please enter baby's first name.");
//            $("#baby-name2").val("");
//            $("input#password-3").val("");
//            $("input#password-6").val("");
            // return false;
        }
        if (!eml.test($("#email-2").val()) || $("#email-2").val() == "") {
            // errormessage('signup-screen4-email.html');
            errorstring.push("Invalid email address.");
//            $("input#password-3").val("");
//            $("input#password-6").val("");
//            $("#email-2").val("");
            // return false;

        }
        if ($("#zip-code").val() == "" || $("#zip-code").val().length != '5' || isNaN($("#zip-code").val())) {
            // errormessage('signup-screen4-zcode.html');
            errorstring.push("Invalid zip code.");
//            $("input#password-3").val("");
//            $("input#password-6").val("");
//            $("#zip-code").val("");
            // return false;
        }
        if (p1 == p2 && (p1 == "" || !(number.test(p1)) || !(letter.test(p1)) || p1.length < 8)) {
            // errormessage('signup-screen4-pwd.html');
            errorstring.push("Password format is not correct.");
//            $("input#password-3").val("");
//            $("input#password-6").val("");
            //  return false;
        }
        if (p1 != p2) {
            //  errormessage('signup-screen4-confrm-pwd.html');
            errorstring.push("Passwords don't match.");
//            $("input#password-3").val("");
//            $("input#password-6").val("");
            // return false;
        }

        if (errorstring == "") {
            window.localStorage.setItem("fname", fname.trim());
            window.localStorage.setItem("babyname", bname.trim());
            window.localStorage.setItem("email", $("#email-2").val());
            window.localStorage.setItem("zipcode", $("#zip-code").val());
            window.localStorage.setItem("partialcompleteprofile", "true");
            window.localStorage.setItem("protocol", usertype);
           // $("#pwhidden").val($("input#password-3").val());
            window.localStorage.setItem("pw", $("input#password-3").val());
            // dispdiv_5();
           // window.location = "signup-finish.html";
           navigateTo("signup-finish.html","{}");
        }
        else {
            window.localStorage.setItem("error", errorstring);
                errormessage('signup-screen4-iam.html');
        }

    });


    $("#signupsubmit-5").click(function () {
        window.localStorage.setItem("protocol1", "");
        var chkTnC = $("#flip-select-terms").val();
        if (chkTnC == "no") {
            errormessage('signup-screen5-terms-ppolicy.html');
            window.localStorage.setItem("chkTnC", chkTnC);
            return false;
        }
        else {
            window.localStorage.setItem("chkTnC", chkTnC);
            var protocol = window.localStorage.getItem("protocol");
            switch (protocol) {
                case 'Pregnant':
                    protocol = '1';
                    break;
                case 'A new mom':
                    protocol = '2';
                    break;
                case 'A dad or parent':
                    protocol = '3';
                    break;
                case 'A relative/friend':
                    protocol = '4';
                    break;
                case 'Health provider':
                    protocol = '5';
                    break;
                default:
                    protocol = "";
            }
            var knownduedate = window.localStorage.getItem("duedateknown");
            if (window.localStorage.getItem("duedateknown") == "" || window.localStorage.getItem("duedateknown") == "undefined" || window.localStorage.getItem("duedateknown") == null) {
                knownduedate = '""';
            }
            var EnrApi0017 = '{"request": {"action": "enrollParticipantInText4baby","participanttype": ' + protocol + ',"firstname":"' + window.localStorage.getItem("fname") + '","emailaddress":"' + window.localStorage.getItem("email") + '","duedateknown":' + knownduedate + ',"menstrualperioddate":"' + window.localStorage.getItem("menstrualdate") + '","pregnancyduedate": "' + window.localStorage.getItem("duedate") + '","babydateofbirth": "' + window.localStorage.getItem("birthdate") + '","duedateorbabydateofbirth": "' + window.localStorage.getItem("duebirthdate") + '","mobilenumber": "' + window.localStorage.getItem("PhoneNumber") + '","zipcode": "' + window.localStorage.getItem("zipcode") + '","participantcode": "","referringurl": "","sourceofenrollment": "5","password": "' + window.localStorage.getItem("pw") + '"}}';
            ProgressBarShow();
            transaction(EnrApi0017, "enrollParticipantInText4baby", "");
        }
    });


//    $("#accountsettings-save").click(function () {
//        window.localStorage.setItem("babyname", $("#baby-name3").val());
//        if ($("#baby-name3").val() == "" && window.localStorage.getItem("babynameshow") == "true") {
//            errormessage('more-screen1-baby-name.html');
//            return false;
//        }
//        var duedate = window.localStorage.getItem("moredate");
//        if (duedate != window.localStorage.getItem("date") && duedate != "" && duedate != null && duedate != "undefined") {
//            window.localStorage.setItem("moredatechange", "true");
//            var PartApi0003Request = '{"request": {"action": "setParticipantDueDateBabyDateOfBirth","participantid": "' + window.localStorage.getItem("participantid") + '","date": "' + duedate + '"}}';
//            ProgressBarShow();
//            transaction(PartApi0003Request, "setParticipantDueDateBabyDateOfBirth");
//        }
//        else {
//            IsDataCleared();
//        }
//    });

  //  $(document).on('touchend', 'form #accountsettings-save', function (e) {
    $("#accountsettings-save").click(function () {
        $("#baby-name3").blur();
        window.localStorage.setItem("babyname", $("#baby-name3").val());
        var bname = $("#baby-name3").val();
        if (bname.trim() == "" && window.localStorage.getItem("babynameshow") == "true") {
            errormessage('more-screen1-baby-name.html');
            return false;
        }
        var duedate = window.localStorage.getItem("moredate");
        if (duedate != window.localStorage.getItem("date") && duedate != "" && duedate != null && duedate != "undefined") {
            window.localStorage.setItem("moredatechange", "true");
            var PartApi0003Request = '{"request": {"action": "setParticipantDueDateBabyDateOfBirth","participantid": "' + window.localStorage.getItem("participantid") + '","date": "' + duedate + '"}}';
            ProgressBarShow();
            transaction(PartApi0003Request, "setParticipantDueDateBabyDateOfBirth");
        }
        else {
            IsDataCleared();
        }
    });

    $("#clearData").click(function () {
        if ($("#flip-select-data").val() == "on") {
            ProgressBarShow();
            errormessage('more-clear-data.html');
            return false;
        }
        else {
            ProgressBarShow();
            window.setTimeout(function () {
                ProgressBarHide();
            }, 1000);
        }

    });


    $("#logout_no").click(function () {
        $('#logout-div').trigger('collapse');
        window.location = "more.html";
    });

    $("#logout_yes").click(function () {
        ProgressBarShow();
        window.localStorage.setItem('session', 'false');
        window.localStorage.setItem("rememberpassword", "false");
        window.localStorage.setItem("password", "");
        ProgressBarHide();
        window.location = "sign-in.html";
    });


    $("#pregnancy-appointment-save").click(function () {
        var date = $("#pregnancy-appointment-date").val();
        var daysdiff = calculatedate(date);
        if ($("#pregnancy-appointment-date").val() == "") {
            errormessage('calendar-no-date.html');
            return false;
        }
        else if (daysdiff <= 0) {
            errormessage('calender-date-appointment.html');
            //$("#pregnancy-appointment-date").val("");
            return false;
        }
        else {
            var id = $("#idhidden").text();
            Fetchdata(id);
        }
    });

    $("#baby-appointment-save").click(function () {
        var date = $("#baby-appointment-date").val();
        var daysdiff = calculatedate(date);
        if ($("#baby-appointment-date").val() == "") {
            errormessage('calendar-no-date.html');
            return false;
        }
        else if (daysdiff <= 0) {
            errormessage('calender-date-appointment.html');
           // $("#baby-appointment-date").val("");
            return false;
        }

        else {
            var id = $("#nbidhidden").text();
            FetchdataNB(id);
        }
    });

//    $("#pregnancy-checklist-item-save").click(function () {
//        if ($("#Textarea1").val() != "") {
//            ProgressBarShow();
//            AddTChecklistAfterSubmit(window.localStorage.getItem("aid"), window.localStorage.getItem("typeid"), window.localStorage.getItem("subtypeid"));
//        }
//    });

//    $("#baby-checklist-item-save").click(function () {
//        if ($("#tr1-pv1-cl").val() != "") {
//            ProgressBarShow();
//            AddTChecklistAfterSubmitNB(window.localStorage.getItem("aid"), window.localStorage.getItem("typeid"), window.localStorage.getItem("subtypeid"));
//        }
    //    });


    $(document).on('touchend', 'form #pregnancy-checklist-item-save', function (e) {
        var allspace = /^\s+$/;
        var chcklisttxt = $("#Textarea1").val();
        if (allspace.test(chcklisttxt) || chcklisttxt == "") {
            errormessage('checklist-blank.html');
            $("#Textarea1").val("");
            return false;
        } else
            if ($("#Textarea1").val() != "") {
                ProgressBarShow();
                window.setTimeout(function () {
                    AddTChecklistAfterSubmit(window.localStorage.getItem("aid"), window.localStorage.getItem("typeid"), window.localStorage.getItem("subtypeid"));
                }, 500);
            }
    });

    $(document).on('touchend', 'form #baby-checklist-item-save', function (e) {
        var allspace = /^\s+$/;
        var chcklisttxt = $("#tr1-pv1-cl").val();
        if (allspace.test(chcklisttxt) || chcklisttxt == "") {
            errormessage('checklist-blank.html');
            $("#tr1-pv1-cl").val("");
            return false;
        } else
            if ($("#tr1-pv1-cl").val() != "") {
                ProgressBarShow();
                window.setTimeout(function () {
                    AddTChecklistAfterSubmitNB(window.localStorage.getItem("aid"), window.localStorage.getItem("typeid"), window.localStorage.getItem("subtypeid"));
                }, 500);
            }
    });

    $("#yes-text-message").click(function () {
        $("#phnnum_contact").show();
    });

    $("#no-text-message").click(function () {
        $("#phnnum_contact").hide();
    });

    $("#previously-text-message").click(function () {
        $("#phnnum_contact").show();
    });

    $("#submitcontact").click(function () {
        var isT4BRegistered;
        var number = /[0-9]/;
        var eml = /^([a-z0-9A-Z]+([0-9a-zA-Z]*[-.\w])*){2}@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,3}(?:\.[a-z]{2})?)$/i;
        //var eml = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var phonenum = $('#contact-phone-number').val();
        var email = $("#contact-email").val();
        var ROC = $('#contact-reason').val();
        var comment = $('#contact-comments').val();
        var errorstring = new Array();

        comment = comment.trim();
        $('#contact-comments').val(comment);

        if ($("#yes-text-message").is(':checked')) {
            isT4BRegistered = "1";
        }
        else if ($("#no-text-message").is(':checked')) {
            isT4BRegistered = "2";
        }
        else if ($("#previously-text-message").is(':checked')) {
            isT4BRegistered = "3";
        }
        if ($("#yes-text-message").is(':checked') || $("#previously-text-message").is(':checked')) {
            if (phonenum == "" || phonenum.length != 10 || isNaN(phonenum)) {
                //  error message for invalid phone number
                // errormessage('contactus-invalid-pnum.html');
                errorstring.push("Invalid phone number.");
                //  return false;
            }
        }
        if ((!eml.test(email) && email != "") || email == "") {
            // error message for invalid email id 
            // errormessage('contactus-invalid-email.html');
            errorstring.push("Invalid email address.");
            // return false;
        }
        if (errorstring == "") {
            var ContactUsRequest = '{"request": {"action": "submitcontactus","istext4babyparticipant": "' + isT4BRegistered + '","phonenumber": "' + phonenum + '","emailaddress": "' + email + '","reasonofcontact": "' + ROC + '","comments": "' + comment + '","source": "5"}}';
            ProgressBarShow();
            transaction(ContactUsRequest, "submitcontactus");
        }
        else {
            window.localStorage.setItem("error", errorstring);
            errormessage('contactus-invalid-email.html');
        }
    });


});




