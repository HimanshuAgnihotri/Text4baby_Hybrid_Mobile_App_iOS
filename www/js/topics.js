RegisterPagehit('topics');

var to_position;

$(document).on("expand", "[data-role=collapsible]", function () {
    var topoffset = 50;
    var position = $(this).offset().top - topoffset;
    to_position = position;
    $.mobile.silentScroll(position);
});

document.addEventListener("backbutton", onBackKeyDown, false);

var topicsLinks = [];

function onBackKeyDown(e) {
    //alert('array before popping out' + topicsLinks.toString());
    var pop = topicsLinks.pop();
    var length = topicsLinks.length;
    if (length == 0) {
        //window.location = "timeline.html?mode=" + window.localStorage.getItem("currenttext4babyprotocol");
        history.go(-1);
    }
    else {
        var show = topicsLinks[topicsLinks.length - 1];
        dispdiv(show, 2);
    }
    e.preventDefault();
}

function show() {
    if (window.localStorage.getItem("currenttext4babyprotocol") == "1") {
        dispdiv('1001');
    }
    else
        if (window.localStorage.getItem("currenttext4babyprotocol") == "2") {
            dispdiv('1002');
        }
}

function dispdivflip(str) {
    $("#timeline").addClass("flipped");
    window.setTimeout(function () { dispdiv(str, 1); }, 450);
    window.setTimeout(function () { $("#timeline").removeClass("flipped"); }, 520);
}

function dispdiv(a, b) {
    if (a == '1002') {
        if (b == 3) {
            $.mobile.silentScroll(to_position);
        }
            if (b == 1) {
                window.scrollTo(0, 0);
            $('#baby-care-block').trigger('collapse');
            $('#baby-health-safety-block').trigger('collapse');
            $('#teething-block').trigger('collapse');
            $('#issues-concerns-block').trigger('collapse');
            $('#feeding-baby-block').trigger('collapse');
            $('#baby-hotlines-block').trigger('collapse');
            //$("#" + document.getElementById("prev").value).removeClass("ui-btn-active");
        }
        $("#" + document.getElementById("prev").value).removeClass("ui-btn-active");
        document.getElementById("baby_topics").style.display = "block";
        document.getElementById("back-btn").style.display = "none";
        document.getElementById("content_baby").style.display = "block";
        document.getElementById("pregnancy_topics").style.display = "none";
        document.getElementById("back-btn-preg").style.display = "none";
        document.getElementById("content_pregnancy").style.display = "none";
        if (b != 2) {
            topicsLinks.push("1002");
        }


        for (i = 1; i <= 27; i++) {
            document.getElementById("page" + i).style.display = "none";
        }
        for (j = 1; j <= 24; j++) {
            document.getElementById("page" + j + "p").style.display = "none";
        }
    }
    else
        if (a == '1001') {
            if (b == 3) {
                $.mobile.silentScroll(to_position);
            }

                if (b == 1) {
                    window.scrollTo(0, 0);
                $('#prenatal-care-block').trigger('collapse');
                $('#food-nutrition-block').trigger('collapse');
                $('#health-issues-block').trigger('collapse');
                $('#weight-exercise-block').trigger('collapse');
                $('#labor-delivery-block').trigger('collapse');
                $('#hotlines-block').trigger('collapse');
                //$("#" + document.getElementById("prevpreg").value).removeClass("ui-btn-active");
            }
            $("#" + document.getElementById("prevpreg").value).removeClass("ui-btn-active");
            document.getElementById("baby_topics").style.display = "none";
            document.getElementById("back-btn").style.display = "none";
            document.getElementById("content_baby").style.display = "none";
            document.getElementById("pregnancy_topics").style.display = "block";
            document.getElementById("back-btn-preg").style.display = "none";
            document.getElementById("content_pregnancy").style.display = "block";
            if (b != 2) {
                topicsLinks.push("1001");
            }


            for (i = 1; i <= 27; i++) {
                document.getElementById("page" + i).style.display = "none";
            }
            for (j = 1; j <= 24; j++) {
                document.getElementById("page" + j + "p").style.display = "none";
            }
        }
        else if (a >= 1 && a <= 27) {
            babypage1();
            var pageid = a;
            if (b != 2) {
                topicsLinks.push(pageid);
            }
            for (i = 1; i <= 27; i++) {
                if (a != i) {
                    document.getElementById("page" + i).style.display = "none";
                }
                else {
                    document.getElementById("page" + i).style.display = "block";

                }
            }
            for (j = 1; j <= 24; j++) {
                document.getElementById("page" + j + "p").style.display = "none";
            }
//            setTimeout(function () {
//                window.scrollTo(0, 0);
//            }, 300);
            window.scrollTo(0, 0);
        }
        else if (a >= 28 && a <= 51) {
            var pageid = a;
            if (b != 2) {
                topicsLinks.push(pageid);
            }
            var1 = parseInt(a) - 27;
            pregnancypage1();
            for (i = 1; i <= 27; i++) {
                document.getElementById("page" + i).style.display = "none";
            }

            for (j = 1; j <= 24; j++) {
                if (var1 != j) {
                    document.getElementById("page" + j + "p").style.display = "none";
                }
                else {
                    document.getElementById("page" + j + "p").style.display = "block";
                }
            }
//            setTimeout(function () {
//                window.scrollTo(0, 0);
//            }, 300);
            window.scrollTo(0, 0);
        }

    if (a != '1001' && a != '1002' && a >= 1 && a <= 27) {
        document.getElementById("prev").value = a;
    }
    else if (a != '1001' && a != '1002' && a >= 28 && a <= 51) {
        document.getElementById("prevpreg").value = a;
    }

    var pageNames = ["", "Safe-Sleep", "No-TV-for-Baby", "Crying-Baby", "Bathing-Baby", "Reading-to-Baby", "Bedtime-Routine", "Baby-Vaccines", "Sun-Safety", "Car-Seat-Safety", "Baby-Walkers", "Tips", "Cavities", "Jaundice", "Fever", "Preemies", "Iron-Deficiency", "RSV", "Flu", "Breastfeeding", "How-Much?", "Baby-Weight-Gain", "Starting-Solids", "First-Foods", "Self-Feeding", "Baby-Safety", "Baby-Help-and-Support", "Baby-Health", "Visits", "Ultrasound", "Preg-Vaccines", "Tests", "Prenatal-Vitamins", "Folic-Acid", "Breakfast-Ideas", "Food-Safety", "Listeriosis", "Eating-Seafood", "High-Blood", "Preeclampsia", "Gestational-Diabetes", "Morning-Sickness", "Urinary-Tract-Infection", "Bleeding", "Weight-Gain", "Exercise", "Signs-of-Labor", "Contraction-Types", "Why-Wait-39 Weeks", "Preterm-Labor", "Preg-Help-and-Support", "Preg-Health"];

    if (a != '1001' && a != '1002') {
        RegisterPagehit(pageNames[a]);
    }
    else if (a == '1001') {
            RegisterPagehit('pregnancy-topics');
        }
        else if (a == '1002') {
            RegisterPagehit('baby-topics');
        }
}

function babypage1() {
    document.getElementById("baby_topics").style.display = "block";
    document.getElementById("back-btn").style.display = "block";
    document.getElementById("content_baby").style.display = "none";
    document.getElementById("pregnancy_topics").style.display = "none";
    document.getElementById("back-btn-preg").style.display = "none";
    document.getElementById("content_pregnancy").style.display = "none";
    //$("#" + document.getElementById("prev").value).removeClass("ui-btn-active");
}

function pregnancypage1() {
    document.getElementById("baby_topics").style.display = "none";
    document.getElementById("back-btn").style.display = "none";
    document.getElementById("content_baby").style.display = "none";
    document.getElementById("pregnancy_topics").style.display = "block";
    document.getElementById("back-btn-preg").style.display = "block";
    document.getElementById("content_pregnancy").style.display = "none";
    //$("#" + document.getElementById("prevpreg").value).removeClass("ui-btn-active");
}