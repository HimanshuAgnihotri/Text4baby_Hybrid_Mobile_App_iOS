//RegisterPagehit('sign-in');

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) { 
   e.preventDefault();    
}

function dispdiv_1() {
   // window.location = "sign-in.html";
    
    //$("#password123").val("");
    navigateTo("sign-in.html","{}");
  
};

function dispdiv_2() {
    RegisterPagehit('signin-forgotpassword');
    $('#reset-mobile-number').val("");

    // $("#back-btn").html("<a href='#' onclick='dispdiv_1();' rel='external' title=''>Back</a>");
    var phnnum = window.localStorage.getItem("resetnum");
    if (phnnum != "" && phnnum.length == 10) {
        $('#reset-mobile-number').val(phnnum);
    }
};



function dispdiv_4() {
    RegisterPagehit('signin-changepassword');
    ProgressBarHide();

    // $("#back-btn").html("<a href='#' onclick='dispdiv_1();' rel='external' title=''>Back</a>");
    $("#password-4").val("");
    $("#password-5").val("");
    //window.localStorage.setItem("changepassword", "false");
};

function RedirectToForgotPW() {
    var welcome = getUrlVars()["welcome"];
    window.localStorage.setItem("welcomechangepw", welcome);
    window.localStorage.setItem("resetnum", $("input#username123").val());
    //window.location = "signin-forgotpw.html";
    $('#password123').val("");
     navigateTo("signin-forgotpw.html","{}");
}