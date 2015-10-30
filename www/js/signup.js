
function dispdiv_2() {
    RegisterPagehit('signup-link');
    if (window.localStorage.getItem("currenttext4babyprotocol") == "2") {
        $("#babyname1").show();
    }
    window.localStorage.setItem("oldphnnum", window.localStorage.getItem("PhoneNumber"));
   // $("#back-btn").html("<a href='sign-up.html' rel='external' title=''>Back</a>");
    $("#first-name").val(window.localStorage.getItem("fname"));
    $("#baby-name").val(window.localStorage.getItem("babyname"));
    $("#email-1").val(window.localStorage.getItem("email"));
    $("#password-1").val("");
    $("#password-2").val("");
    window.localStorage.setItem("signupprocesscomplete", "false");
};



function dispdiv_4() {
    RegisterPagehit('signup-tellus');
    $("#password-3").val("");
    $("#password-6").val("");
    window.localStorage.setItem("oldphnnum", window.localStorage.getItem("PhoneNumber"));

    window.localStorage.setItem("signupprocesscomplete", "false");
    window.localStorage.setItem("chkTnC", "no");
  //  $("#back-btn").html("<a href='sign-up.html' rel='external' title=''>Back</a>");

    var prtcl = window.localStorage.getItem("protocol");
    // alert("displaydiv4 protocol----------"+ prtcl);
    if (prtcl == null || prtcl == "" || prtcl == "undefined") {
        // alert("protocol blank");
        var p = "";
        $("#duedateques").hide();
        $("#date1").hide();
        $("#date2").hide();
        $("#date4").hide();
        $("#date3").hide();
        $("#babyname").hide();
        $("#due-date-2").val("");
        $("#period").val("");
        $("#baby-birthday").val("");
        $("#due-date-3").val("");
        $("#baby-name2").val("");
    }
    else {
        p = prtcl;
    }
    window.localStorage.setItem("protocol1", p);
    if (p == "") {
        p = "(please select)";
    }
    $("#select-protocol").html("<option value='I am: (please select)' selected='selected'>I am: " + p + "</option><option value='Pregnant'>Pregnant</option><option value='A new mom'>A new mom</option><option value='A dad or parent'>A dad or parent</option><option value='A relative/friend'>A relative/friend</option><option value='Health provider'>Health provider</option>");
    $('#select-protocol').selectmenu("refresh");
    $("#first-name2").val(window.localStorage.getItem("fname"));
    //  $("#baby-name2").val(window.localStorage.getItem("babyname"));
    $("#email-2").val(window.localStorage.getItem("email"));
    $("#zip-code").val(window.localStorage.getItem("zipcode"));
    // alert(prtcl);
    if (prtcl == "Pregnant") {
        $("#duedateques").show();
        // alert("duedateknown" + window.localStorage.getItem("duedateknown"));
        //			    if (window.localStorage.getItem("duedateknown") == "") {
        //			        window.localStorage.setItem("duedateknown", "1");
        //                }
        // alert(window.localStorage.getItem("duedateknown"));
        if (window.localStorage.getItem("duedateknown") == "1") {
            $("#flip-select-due-date").val("on");
            $('#flip-select-due-date').slider("refresh");
            //alert("show date");
            $("#date1").show();
            //  alert("duedate----" + window.localStorage.getItem("duedate"));
            $("#due-date-2").val(window.localStorage.getItem("duedate"));
        }
        else if (window.localStorage.getItem("duedateknown") == "2") {
            $("#flip-select-due-date").val("off");
            $('#flip-select-due-date').slider("refresh");
            $("#date2").show();
            //  alert(window.localStorage.getItem("menstrualdate"));
            $("#period").val(window.localStorage.getItem("menstrualdate"));
        }
    }
    else if (prtcl == "A new mom") {
        $("#babyname").show();
        $("#baby-name2").val(window.localStorage.getItem("babyname"));
        $("#date3").show();
        $("#baby-birthday").val(window.localStorage.getItem("birthdate"));
    }
    else if (prtcl == "A dad or parent" || prtcl == "A relative/friend" || prtcl == "Health provider") {
        $("#date4").show();
        $("#due-date-3").val(window.localStorage.getItem("duebirthdate"));
        if (window.localStorage.getItem("babynameshow") == "true") {
            $("#babyname").show();
            $("#baby-name2").val(window.localStorage.getItem("babyname"));
        }
    }
    $("#flip-select-terms").val("no");
    $('#flip-select-terms').slider("refresh");
};

function dispdiv_5() {
    //alert("displaydiv5");
    RegisterPagehit('signup-finish');
  //  $("#back-btn").html("<a href='signup-tell-us.html' rel='external' title=''>Back</a>");
    var str = window.localStorage.getItem("PhoneNumber");
    mobilephonenumber = str.substr(0, 3) + "-" + str.substr(3, 3) + "-" + str.substr(6, 4);
    $("#mobile-number-2").val(mobilephonenumber);
    window.scrollTo(0, 0);
};


$(document).ready(function () {

    window.setTimeout(function () {
        $("#signup_banner").fadeOut("slow", function () {
            $('#signup_banner').attr("class", "responsive-banner sign-up-3-banner");
            $("#signup_banner").fadeIn();
        });
    }, 7000);

    window.setTimeout(function () {
        $("#signup_banner").fadeOut("slow", function () {
            $('#signup_banner').attr("class", "responsive-banner sign-up-banner");
            $("#signup_banner").fadeIn();
        });
    }, 14000);


    setInterval(function () {
        $("#signup_banner").fadeOut("slow", function () {
            $('#signup_banner').attr("class", "responsive-banner sign-up-2-banner");
            $("#signup_banner").fadeIn();
        });

        window.setTimeout(function () {
            $("#signup_banner").fadeOut("slow", function () {
                $('#signup_banner').attr("class", "responsive-banner sign-up-3-banner");
                $("#signup_banner").fadeIn();
            });
        }, 7000);

        window.setTimeout(function () {
            $("#signup_banner").fadeOut("slow", function () {
                $('#signup_banner').attr("class", "responsive-banner sign-up-banner");
                $("#signup_banner").fadeIn();
            });
        }, 14000);

    }, 21000);
});