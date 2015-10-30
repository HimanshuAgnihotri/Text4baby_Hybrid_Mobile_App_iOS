document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
    history.go(-1);
}

var to_position;

$(document).on("expand", "[data-role=collapsible]", function () {
    var topoffset = 50;
    var position = $(this).offset().top - topoffset;
    to_position = position;
    $.mobile.silentScroll(position);
});

function showcalendar() {
    FetchCalendarDataFromServer();
    if (window.localStorage.getItem("typeid") != null || window.localStorage.getItem("typeid") != "" || window.localStorage.getItem("typeid") != "undefined") {
        if (window.localStorage.getItem("typeid") <= "3") {
            $('#preg' + window.localStorage.getItem("typeid")).trigger('expand');
            FetchCalendarDataFromDB(window.localStorage.getItem("typeid"));
        }
        else {
            var num = parseInt(window.localStorage.getItem("typeid")) - 3;
            $('#baby' + num).trigger('expand');
            FetchCalendarDataFromDB(window.localStorage.getItem("typeid"));
        }
    }
} 

function displayflip(str1) {
    $("#timeline").addClass("flipped");
    window.setTimeout(function () { display(str1); }, 450);
    window.setTimeout(function () { $("#timeline").removeClass("flipped"); }, 520);
}

function display(str,pos) {
    if (str == 'baby-calendar') {
        RegisterPagehit('calendar-baby');
        if (pos == '1') {
            FetchCalendarDataFromDB(typeid);
            //$.mobile.silentScroll(to_position);
        }
        else {
            $('#baby1').trigger('collapse');
            $('#baby2').trigger('collapse');
            $('#baby3').trigger('collapse');
        }
        window.localStorage.setItem("id", null);
        window.localStorage.setItem("typeid", null);
        window.localStorage.setItem("subtypeid", null);
        window.localStorage.setItem("aid", null);
        window.localStorage.setItem("appointmentData", null);
        window.localStorage.setItem("datesetStatus", null);
        window.localStorage.setItem("appointmentDescription", null);
        window.localStorage.setItem("appointmentDate", null);
    }
    else
        if (str == 'baby-appointment') {
            RegisterPagehit('baby-appointment');
           // $("#back-btn").html('<a href="#" onclick="display(&#39;baby-calendar&#39;, &#39;' + id + '&#39;, &#39;' + typeid + '&#39;, &#39;' + subtypeid + '&#39;, &#39;' + aid + '&#39;,1);" rel="external" title="">Back</a>');

         /*   var id = getUrlVarsCalendar()["ID"];
            var typeid = getUrlVarsCalendar()["typeId"];
            var subtypeid = getUrlVarsCalendar()["subtypeId"];
            var aid = getUrlVarsCalendar()["aid"];
            var appointmentData = getUrlVarsCalendar()["appdata"];
            appointmentData = decodeURI(appointmentData);
            appointmentData = appointmentData.replace(/\^/g, "\"");
            var datesetStatus = getUrlVarsCalendar()["datesetstatus"];
            var appointmentDescription = getUrlVarsCalendar()["appdescription"];
            appointmentDescription = decodeURI(appointmentDescription);
            var appointmentDate = getUrlVarsCalendar()["appdate"];

            window.localStorage.setItem("id", id);
            window.localStorage.setItem("typeid", typeid);
            window.localStorage.setItem("subtypeid", subtypeid);
            window.localStorage.setItem("aid", aid);
            window.localStorage.setItem("appointmentData", appointmentData);
            window.localStorage.setItem("datesetStatus", datesetStatus);
            window.localStorage.setItem("appointmentDescription", appointmentDescription);
            window.localStorage.setItem("appointmentDate", appointmentDate); */

            var h2 = window.localStorage.getItem("appointmentDescription");
            var p = window.localStorage.getItem("appointmentData");


            if (window.localStorage.getItem("id") != undefined && window.localStorage.getItem("id") != "") {

               // if ($("#appointmentdate" + id).text() != "Date Not Set" && $("#appointmentdate" + id).text() != "") {
                if (window.localStorage.getItem("datesetStatus") == "1") {
                  //  var link = 'onclick="display(&#39;baby-add-checklist&#39;, &#39;' + id + '&#39;, &#39;' + typeid + '&#39;, &#39;' + subtypeid + '&#39;, &#39;' + aid + '&#39;);"';
                    var link = "baby-add-checklist.html";
                    var h2class = '';
                    var spanclass = 'add-checklist';
                }
                else {
                    var link = "";
                    var h2class = 'style="color:#b9b2b2;"';
                    var spanclass = 'add-checklist-gray';
                }
                $("#baby-appointment").html('<div class="grid-container" id="prenatal-visit-grid"><h2 id="nbpage2h2">' + h2 + '</h2><span class="add-info" id="addinfo"></span><h2 id="calendar-info" style="margin-top:8px; padding-right:5px;">What you need to know</h2><p id="nbpage2p">' + p + '</p><ul data-role="listview" data-split-icon="arrow"data-split-theme="d" data-inset="true"><li><a href="#" onclick="navigateTo(&quot;baby-add-appointment.html&quot;,'+'&quot;{}&quot;)" rel="external" ><span class="add-appointment">Appointment</span><h2>Record Appointment</h2><p>Set text message reminder</p></a></li><li><a href="#" onclick="navigateTo(&quot;'+link+'&quot;,'+'&quot;{}&quot;)" rel="external" ><span class="' + spanclass + '">Checklist</span><h2 ' + h2class + '>Appointment Checklist</h2><p ' + h2class + '>View and create</p></a></li></ul></div>').trigger("create");
            }
            else {
                $("#baby-appointment").html('<div class="grid-container" id="prenatal-visit-grid"><h2 id="nbpage2h2">Your Appointment</h2><span class="add-info" id="addinfo"></span><h2 id="calendar-info" style="margin-top:8px; padding-right:5px;">What you need to know</h2><p id="nbpage2p">Text4baby allows you to set 5 additional appointment reminders every 4 months. You can add 5 extra appointments for Months 0 - 4, 5 - 8, and 9 - 12! If there&#39;s any appointment we missed, feel free to add it to your calendar!</p><ul data-role="listview" data-split-icon="arrow"data-split-theme="d" data-inset="true"><li><a href="#" onclick="navigateTo(&quot;baby-add-appointment.html&quot;,'+'&quot;{}&quot;)" rel="external" ><span class="add-appointment">Appointment</span><h2>Record Appointment</h2><p>Set text message reminder</p></a></li><li><a href="#" rel="external" ><span class="add-checklist-gray">Checklist</span><h2 style="color:#b9b2b2;">Appointment Checklist</h2><p style="color:#b9b2b2;">View and create</p></a></li></ul></div>').trigger("create");
            }
        }
        else
            if (str == 'baby-add-appointment') {
                RegisterPagehit('baby-add-appointment');
                $("#baby-appointment-date").val('');
                $("#baby-appointment-title").val('');
                $("#nbidhidden").text('');
                $("#nbtypeidhidden").text('');
                $("#nbidhidden").text(window.localStorage.getItem("id"));
                $("#nbtypeidhidden").text(window.localStorage.getItem("typeid"));
                var date;
                
               // $("#back-btn").html('<a href="#" onclick="display(&#39;baby-appointment&#39;,&#39;' + id + '&#39;, &#39;' + typeid + '&#39;, &#39;' + subtypeid + '&#39;, &#39;' + aid + '&#39;);" rel="external" title="">Back</a>');

                date = window.localStorage.getItem("appointmentDate");
                datestatus = window.localStorage.getItem("datesetStatus");
                var description = window.localStorage.getItem("appointmentDescription");

               // if (date != "Date Not Set") {
                if (datestatus == "1") {
                    $("#baby-appointment-date").val(date);
                }
                if ($("#baby-appointment-date").val() != "") {
                    $("#baby-appointment-title").val(description);
                }
                else if (description != "Your Appointment" && $("#baby-appointment-date").val() == "") {
                    $("#baby-appointment-title").val(description);
                }
                if (window.localStorage.getItem("text4babysmsstatus") != 3) {
                    errormessage("calendar-messagesettings-alert.html");
                }
            }
            else
                if (str == 'baby-add-checklist') {

                    RegisterPagehit('baby-add-checklist');

                    $("#nbidchklist").text('');
                    $("#nbaidchklist").text('');
                    $("#nbtidchklist").text('');
                    $("#nbstidchklist").text('');
                    $("#nbidchklist").text(window.localStorage.getItem("id"));
                    $("#nbaidchklist").text(window.localStorage.getItem("aid"));
                    $("#nbtidchklist").text(window.localStorage.getItem("typeid"));
                    $("#nbstidchklist").text(window.localStorage.getItem("subtypeid"));

                    var aid = window.localStorage.getItem("aid");
                    var typeid = window.localStorage.getItem("typeid");
                    var subtypeid = window.localStorage.getItem("subtypeid");
                    
                  //  $("#back-btn").html('<a href="#" onclick="display(&#39;baby-appointment&#39;,&#39;' + id + '&#39;,&#39;' + typeid + '&#39;,&#39;' + subtypeid + '&#39;,&#39;' + aid + '&#39;);" rel="external" title="">Back</a>');
                    UpdateChecklistNB(aid, typeid, subtypeid);
                }
                else
                    if (str == 'baby-checklist-item') {
                        RegisterPagehit('baby-checklist-item');
                       // babycal();
                        $("#tr1-pv1-cl").val('');
                        
                      //  $("#back-btn").html('<a href="#" onclick="display(&#39;baby-add-checklist&#39;,&#39;' + $("#nbidchklist").text() + '&#39;,&#39;' + $("#nbtidchklist").text() + '&#39;,&#39;' + $("#nbstidchklist").text() + '&#39;,&#39;' + $("#nbaidchklist").text() + '&#39;);" rel="external" title="">Back</a>');
                    }
                    else
                        if (str == 'pregnancy-calendar') {
                            RegisterPagehit('calendar-pregnancy');
                            if (pos == '1') {
                                FetchCalendarDataFromDB(typeid)
                                //$.mobile.silentScroll(to_position);
                            }
                            else {
                                $('#preg1').trigger('collapse');
                                $('#preg2').trigger('collapse');
                                $('#preg3').trigger('collapse');
                            }
                            window.localStorage.setItem("id", null);
                            window.localStorage.setItem("typeid", null);
                            window.localStorage.setItem("subtypeid", null);
                            window.localStorage.setItem("aid", null);
                            window.localStorage.setItem("appointmentData", null);
                            window.localStorage.setItem("datesetStatus", null);
                            window.localStorage.setItem("appointmentDescription", null);
                            window.localStorage.setItem("appointmentDate", null);
                        }

                        else
                            if (str == 'pregnancy-appointment') {
                                // $("#back-btn-preg").html('<a href="#" onclick="display(&#39;pregnancy-calendar&#39;, &#39;' + id + '&#39;, &#39;' + typeid + '&#39;, &#39;' + subtypeid + '&#39;, &#39;' + aid + '&#39;,1);" rel="external" title="">Back</a>');
                                RegisterPagehit('pregnancy-appointment');
                              /*  var id = getUrlVarsCalendar()["ID"];
                                var typeid = getUrlVarsCalendar()["typeId"];
                                var subtypeid = getUrlVarsCalendar()["subtypeId"];
                                var aid = getUrlVarsCalendar()["aid"];
                                var appointmentData = getUrlVarsCalendar()["appdata"];
                                appointmentData = decodeURI(appointmentData);
                                appointmentData = appointmentData.replace(/\^/g, "\"");
                                var datesetStatus = getUrlVarsCalendar()["datesetstatus"];
                                var appointmentDescription = getUrlVarsCalendar()["appdescription"];
                                appointmentDescription = decodeURI(appointmentDescription);
                                var appointmentDate = getUrlVarsCalendar()["appdate"];

                                window.localStorage.setItem("id", id);
                                window.localStorage.setItem("typeid", typeid);
                                window.localStorage.setItem("subtypeid", subtypeid);
                                window.localStorage.setItem("aid", aid);
                                window.localStorage.setItem("appointmentData", appointmentData);
                                window.localStorage.setItem("datesetStatus", datesetStatus);
                                window.localStorage.setItem("appointmentDescription", appointmentDescription);
                                window.localStorage.setItem("appointmentDate", appointmentDate); */



                                if (window.localStorage.getItem("id") != undefined && window.localStorage.getItem("id") != "") {
                                    var h2 = window.localStorage.getItem("appointmentDescription");
                                    var p = window.localStorage.getItem("appointmentData");
                                  //  if ($("#appointmentdate" + id).text() != "Date Not Set" && $("#appointmentdate" + id).text() != "") {
                                    if (window.localStorage.getItem("datesetStatus") == "1") {
                                        // var link = 'onclick="display(&#39;pregnancy-add-checklist&#39;, &#39;' + id + '&#39;, &#39;' + typeid + '&#39;, &#39;' + subtypeid + '&#39;, &#39;' + aid + '&#39;);"';
                                        var link = "pregnancy-add-checklist.html";
                                        var h2class = '';
                                        var spanclass = 'add-checklist';
                                    }
                                    else {
                                        var link = "";
                                        var h2class = 'style="color:#b9b2b2;"';
                                        var spanclass = 'add-checklist-gray';
                                    }
                                    $("#pregnancy-appointment").html('<div class="grid-container" id="prenatal-visit-grid"><h2 id="pregpage2h2">' + h2 + '</h2><span class="add-info" id="addinfo"></span><h2 id="calendar-info" style="margin-top:8px; padding-right:5px;">What you need to know</h2><p id="pregpage2p">' + p + '</p><ul data-role="listview" data-split-icon="arrow" data-split-theme="d" data-inset="true"><li><a href="#" onclick="navigateTo(&quot;pregnancy-add-appointment.html&quot;,'+'&quot;{}&quot;)" rel="external" ><span class="add-appointment">Appointment</span><h2>Record Appointment</h2><p>Set text message reminder</p></a></li><li><a href="#" onclick="navigateTo(&quot;'+link+'&quot;,'+'&quot;{}&quot;)" rel="external"><span class="' + spanclass + '">Checklist</span><h2 ' + h2class + '>Appointment Checklist</h2><p ' + h2class + '>View and create</p></a></li></ul></div>').trigger("create");
                                    // $("#pregpage2h2").text($("#appdescription" + c).text());
                                    //   $("#pregpage2p").text($("#hiddendata" + c).text());
                                }
                                else {
                                    $("#pregnancy-appointment").html('<div class="grid-container" id="prenatal-visit-grid"><h2 id="pregpage2h2">Your Appointment</h2><span class="add-info" id="addinfo"></span><h2 id="calendar-info" style="margin-top:8px; padding-right:5px;">What you need to know</h2><p id="pregpage2p">Text4baby allows you set 5 additional appointment reminders per trimester. If there&#39;s any appointment we missed, feel free to add it to your calendar!</p><ul data-role="listview" data-split-icon="arrow" data-split-theme="d" data-inset="true"><li><a href="#" onclick="navigateTo(&quot;pregnancy-add-appointment.html&quot;,'+'&quot;{}&quot;)" rel="external" ><span class="add-appointment">Appointment</span><h2>Record Appointment</h2><p>Set text message reminder</p></a></li><li><a href="#" rel="external"  ><span class="add-checklist-gray">Checklist</span><h2 style="color:#b9b2b2;">Appointment Checklist</h2><p style="color:#b9b2b2;">View and create</p></a></li></ul></div>').trigger("create");
                                    // $("#pregpage2h2").text("Your Appointment");
                                    // $("#pregpage2p").text("New Appointment");
                                }

                            }
                            else
                                if (str == 'pregnancy-add-appointment') {
                                    RegisterPagehit('pregnancy-add-appointment');
                                    $("#pregnancy-appointment-date").val('');
                                    $("#pregnancy-appointment-title").val('');
                                    $("#idhidden").text('');
                                    $("#typeidhidden").text('');
                                    $("#idhidden").text(window.localStorage.getItem("id"));
                                    $("#typeidhidden").text(window.localStorage.getItem("typeid"));
                                    var date;
                                    
                                 //   $("#back-btn-preg").html('<a href="#" onclick="display(&#39;pregnancy-appointment&#39;,&#39;' + id + '&#39;, &#39;' + typeid + '&#39;, &#39;' + subtypeid + '&#39;, &#39;' + aid + '&#39;);" rel="external" title="">Back</a>');

                                    date = window.localStorage.getItem("appointmentDate");
                                    datestatus = window.localStorage.getItem("datesetStatus");
                                    var description = window.localStorage.getItem("appointmentDescription");

                                   // if (date != "Date Not Set") {
                                    if (datestatus == "1") {
                                        $("#pregnancy-appointment-date").val(date);
                                    }
                                    if ($("#pregnancy-appointment-date").val() != "") {
                                        $("#pregnancy-appointment-title").val(description);
                                    }
                                    else if (description != "Your Appointment" && $("#pregnancy-appointment-date").val() == "") {
                                        $("#pregnancy-appointment-title").val(description);
                                    }
                                    if (window.localStorage.getItem("text4babysmsstatus") != 3) {
                                        errormessage("calendar-messagesettings-alert.html");
                                    }
                                }
                                else
                                    if (str == 'pregnancy-add-checklist') {
                                        RegisterPagehit('pregnancy-add-checklist');
                                        $("#idchklist").text('');
                                        $("#aidchklist").text('');
                                        $("#tidchklist").text('');
                                        $("#stidchklist").text('');
                                        $("#idchklist").text(window.localStorage.getItem("id"));
                                        $("#aidchklist").text(window.localStorage.getItem("aid"));
                                        $("#tidchklist").text(window.localStorage.getItem("typeid"));
                                        $("#stidchklist").text(window.localStorage.getItem("subtypeid"));

                                        var aid = window.localStorage.getItem("aid");
                                        var typeid = window.localStorage.getItem("typeid");
                                        var subtypeid = window.localStorage.getItem("subtypeid");
                                      //  $("#back-btn-preg").html('<a href="#" onclick="display(&#39;pregnancy-appointment&#39;,&#39;' + id + '&#39;,&#39;' + typeid + '&#39;,&#39;' + subtypeid + '&#39;,&#39;' + aid + '&#39;);" rel="external" title="">Back</a>');
                                        UpdateChecklist(aid, typeid, subtypeid);
                                    }
                                    else
                                        if (str == 'pregnancy-checklist-item') {
                                            RegisterPagehit('pregnancy-checklist-item');
                                           // pregcal();
                                            $("#Textarea1").val('');
                                            
                                          //  $("#back-btn-preg").html('<a href="#" onclick="display(&#39;pregnancy-add-checklist&#39;,&#39;' + $("#idchklist").text() + '&#39;,&#39;' + $("#tidchklist").text() + '&#39;,&#39;' + $("#stidchklist").text() + '&#39;,&#39;' + $("#aidchklist").text() + '&#39;);" rel="external" title="">Back</a>');
                                        }
}

/*function babycal() {
    document.getElementById("baby_calendar_home").style.display = "block";
    document.getElementById("back-btn").style.display = "block";
    document.getElementById("pregnancy-flip").style.display = "none";
    document.getElementById("pregnancy_calendar_home").style.display = "none";
    document.getElementById("back-btn-preg").style.display = "none";
    document.getElementById("baby-flip").style.display = "none";
    document.getElementById("pregnancy-calendar").style.display = "none";
    document.getElementById("pregnancy-appointment").style.display = "none";
    document.getElementById("pregnancy-add-appointment").style.display = "none";
    document.getElementById("pregnancy-add-checklist").style.display = "none";
    document.getElementById("pregnancy-checklist-item").style.display = "none";
}*/

/*function pregcal() {
    document.getElementById("baby_calendar_home").style.display = "none";
    document.getElementById("back-btn").style.display = "none";
    document.getElementById("pregnancy-flip").style.display = "none";
    document.getElementById("pregnancy_calendar_home").style.display = "block";
    document.getElementById("back-btn-preg").style.display = "block";
    document.getElementById("baby-flip").style.display = "none";
    document.getElementById("baby-calendar").style.display = "none";
    document.getElementById("baby-appointment").style.display = "none";
    document.getElementById("baby-add-appointment").style.display = "none";
    document.getElementById("baby-add-checklist").style.display = "none";
    document.getElementById("baby-checklist-item").style.display = "none";
}*/

// ----- to fetch data from server -----
function FetchCalendarDataFromServer() {
    selectDataFromDB();
    window.setTimeout(function () {
    var ListApi0001Request = '{"request": {"action": "getParticipantAppointmentsByType","typeid": "0","subtypeid": "0"}}';
    ProgressBarShow();
    transaction(ListApi0001Request, "getParticipantAppointmentsByType", "");
}, 500);
}

db = window.openDatabase("Text4BabyDB", "1.0", "PhoneGap Demo", 600000);

function transaction_error(tx, error) {
    alert("Database Error: " + error);
}

function selectDataFromDB() {
    var sql = "Select AppointmentId from TAppointments WHERE SubTypeId='0'";
    db.transaction(function (tx) {
        tx.executeSql(sql, [], saveAppointmentID);
    }
						 , transaction_error);
}

var appIDLocal = new Array();

function saveAppointmentID(tx, results) {
    var len = results.rows.length;
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            var profile = results.rows.item(i);
            appIDLocal.push(profile.AppointmentId);
        }
    }
}

// ----- update appointment table by data from server -----
function updateCalendarTable(jsonObject) {
    var str = jsonObject.response.result.appointments.appointment;
    $(str).each(function () {

        if (typeof str === "undefined") {
            return;
        }
        else {
            if (this.description == null) {
                
                this.description = "Your Appointment";
            }
            var Date = this.date;
            var datewithouttime = Date.split(" ");
            var splitdate = datewithouttime[0].split("/");
            if (splitdate[0].length == 1) {
                splitdate[0] = "0" + splitdate[0]
            }
            if (splitdate[1].length == 1) {
                splitdate[1] = "0" + splitdate[1]
            }
            splitdate = splitdate[0] + "/" + splitdate[1] + "/" + splitdate[2];
            var UpdateDataObject = { "UpdateData":
                {
                    'AppointmentId': this["@id"], 'ApppointmentDate': splitdate, 'AppointmentDescription': this.description, 'TypeId': this.typeid, 'SubTypeId': this.subtypeid
                }
            };

            UpdateTAppointments(UpdateDataObject);
        }
    });
}


function UpdateTAppointments(UpdateDataObject) {
   
    if (UpdateDataObject.UpdateData.SubTypeId != "0") {
        var sql = "UPDATE TAppointments SET AppointmentId='" + UpdateDataObject.UpdateData.AppointmentId + "',ApppointmentDate='" + UpdateDataObject.UpdateData.ApppointmentDate + "',AppointmentDescription='" + UpdateDataObject.UpdateData.AppointmentDescription + "',DateSetStatus='1',AppointmentDateSet='" + UpdateDataObject.UpdateData.ApppointmentDate + "' WHERE TypeId='" + UpdateDataObject.UpdateData.TypeId + "' AND SubTypeId='" + UpdateDataObject.UpdateData.SubTypeId + "'";
        db.transaction(function (tx) {
            tx.executeSql(sql);
        }
       , transaction_error, EndQuery_success);
    }
    else {
        var a = appIDLocal.indexOf(parseInt(UpdateDataObject.UpdateData.AppointmentId));
        
        if (a != -1) {
            var sql = "UPDATE TAppointments SET ApppointmentDate='" + UpdateDataObject.UpdateData.ApppointmentDate + "',AppointmentDescription='" + UpdateDataObject.UpdateData.AppointmentDescription + "',DateSetStatus='1',AppointmentDateSet='" + UpdateDataObject.UpdateData.ApppointmentDate + "' WHERE AppointmentId='" + UpdateDataObject.UpdateData.AppointmentId + "'";
            db.transaction(function (tx) {
                tx.executeSql(sql);
            }
       , transaction_error, EndQuery_success);
        }
        else {
            if (UpdateDataObject.UpdateData.TypeId <= 3) {
                var appointmentData = "Text4baby allows you set 5 additional appointment reminders per trimester. If there\'s any appointment we missed, feel free to add it to your calendar!";
            }
            else {
                var appointmentData = "Text4baby allows you to set 5 additional appointment reminders every 4 months. You can add 5 extra appointments for Months 0 - 4, 5 - 8, and 9 - 12! If there\'s any appointment we missed, feel free to add it to your calendar!";
            }
            var sql = 'INSERT INTO TAppointments (TypeId,SubTypeId,AppointmentId,AppointmentDescription,ApppointmentDate,AppointmentData,DateSetStatus,AppointmentDateSet) VALUES ("' + UpdateDataObject.UpdateData.TypeId + '","0","' + UpdateDataObject.UpdateData.AppointmentId + '","' + UpdateDataObject.UpdateData.AppointmentDescription + '","' + UpdateDataObject.UpdateData.ApppointmentDate + '","' + appointmentData + '","1","' + UpdateDataObject.UpdateData.ApppointmentDate + '")';
            db.transaction(function (tx) {
                tx.executeSql(sql, [], EndQuery_success);
            }
       , transaction_error);
        }
    }
}

// ----- to end query executed successfully -----
function EndQuery_success() {

}

// ----- per accordian fetch data -----
function FetchCalendarDataFromDB(accordian) {
    if (accordian == "1") {
        var sql = "Select ID,AppointmentId,ApppointmentDate,AppointmentDescription,SubTypeId,TypeId,AppointmentData,DateSetStatus,AppointmentDateSet from TAppointments WHERE TypeId='1' ORDER by substr(AppointmentDateSet,7)||substr(AppointmentDateSet,1,2)||substr(AppointmentDateSet,4,2)";
        db.transaction(function (tx) {
            tx.executeSql(sql, [], pregnancyfirstaccordian_success);
        }
						 , transaction_error);
    }
    if (accordian == "2") {
        var sql = "Select ID,AppointmentId,ApppointmentDate,AppointmentDescription,SubTypeId,TypeId,AppointmentData,DateSetStatus,AppointmentDateSet from TAppointments WHERE TypeId='2' ORDER by substr(AppointmentDateSet,7)||substr(AppointmentDateSet,1,2)||substr(AppointmentDateSet,4,2)";
        db.transaction(function (tx) {
            tx.executeSql(sql, [], pregnancysecondaccordian_success);
        }
						 , transaction_error);
    }
    if (accordian == "3") {
        var sql = "Select ID,AppointmentId,ApppointmentDate,AppointmentDescription,SubTypeId,TypeId,AppointmentData,DateSetStatus,AppointmentDateSet from TAppointments WHERE TypeId='3' ORDER by substr(AppointmentDateSet,7)||substr(AppointmentDateSet,1,2)||substr(AppointmentDateSet,4,2)";
        db.transaction(function (tx) {
            tx.executeSql(sql, [], pregnancythirdaccordian_success);
        }
						 , transaction_error);
    }
    if (accordian == "4") {
        var sql = "Select ID,AppointmentId,ApppointmentDate,AppointmentDescription,SubTypeId,TypeId,AppointmentData,DateSetStatus,AppointmentDateSet from TAppointments WHERE TypeId='4' ORDER by substr(AppointmentDateSet,7)||substr(AppointmentDateSet,1,2)||substr(AppointmentDateSet,4,2)";
        db.transaction(function (tx) {
            tx.executeSql(sql, [], babyfirstaccordian_success);
        }
						 , transaction_error);
    }
    if (accordian == "5") {
        var sql = "Select ID,AppointmentId,ApppointmentDate,AppointmentDescription,SubTypeId,TypeId,AppointmentData,DateSetStatus,AppointmentDateSet from TAppointments WHERE TypeId='5' ORDER by substr(AppointmentDateSet,7)||substr(AppointmentDateSet,1,2)||substr(AppointmentDateSet,4,2)";
        db.transaction(function (tx) {
            tx.executeSql(sql, [], babysecondaccordian_success);
        }
						 , transaction_error);
    }

    if (accordian == "6") {
        var sql = "Select ID,AppointmentId,ApppointmentDate,AppointmentDescription,SubTypeId,TypeId,AppointmentData,DateSetStatus,AppointmentDateSet from TAppointments WHERE TypeId='6' ORDER by substr(AppointmentDateSet,7)||substr(AppointmentDateSet,1,2)||substr(AppointmentDateSet,4,2)";
        db.transaction(function (tx) {
            tx.executeSql(sql, [], babythirdaccordian_success);
        }
						 , transaction_error);
    }
}


// set values in local storage
function setVariables(var1, var2, var3, var4, var5, var6, var7, var8, var9) {
    //alert(set variables);
    var5 = var5.replace(/\^/g, "\"");
    window.localStorage.setItem("id", var1);
    window.localStorage.setItem("typeid", var2);
    window.localStorage.setItem("subtypeid", var3);
    window.localStorage.setItem("aid", var4);
    window.localStorage.setItem("appointmentData", var5);
    window.localStorage.setItem("datesetStatus", var6);
    window.localStorage.setItem("appointmentDescription", var7);
    window.localStorage.setItem("appointmentDate", var8);
    navigateTo(var9, "{}");
}


// ----- baby first accordian fetch data -----
function babyfirstaccordian_success(tx, results) {
    $(".nbfirstaccordianlist").html('');
    var nb1count = 0;
    var appdescriptionid;
    var appointmentdate;
    var appicon;
    var datesetstatus;
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var profile = results.rows.item(i);
     //   hiddenpid = "hiddendata" + profile.ID;
        appdescriptionid = "appdescription" + profile.ID;
        appointmentdate = "appointmentdate" + profile.ID;
      //  datesetstatus = "datesetstatus" + profile.ID;
       // if (profile.ApppointmentDate != "Date Not Set" && profile.ApppointmentDate != null && profile.ApppointmentDate != "") {
        if (profile.DateSetStatus == "1") {
            appicon = 'class="add-appointment"';
        }
        else {
            appicon = '';
        }
        var appdata = profile.AppointmentData.replace(/&quot;/g, '^');
        var redirectTo = "baby-appointment.html";
        if (profile.SubTypeId != 0) {
            $(".nbfirstaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><span ' + appicon + '>Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
        }
        else if (profile.SubTypeId == 0 && profile.AppointmentId != "" && nb1count < 5) {
            $(".nbfirstaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><span class="add-appointment">Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
            nb1count++;
        }
    }
    AddAnAppointment(nb1count, "nbfirstaccordianlist", "baby-appointment", "4");
    $.mobile.silentScroll(to_position);
}

// ----- baby second accordian fetch data -----

function babysecondaccordian_success(tx, results) {
    $(".nbsecaccordianlist").html('');
    var nb2count = 0;
    var appdescriptionid;
    var appointmentdate;
    var appicon;
    var datesetstatus;
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var profile = results.rows.item(i);
       // hiddenpid = "hiddendata" + profile.ID;
        appdescriptionid = "appdescription" + profile.ID;
        appointmentdate = "appointmentdate" + profile.ID;
       // datesetstatus = "datesetstatus" + profile.ID;
       // if (profile.ApppointmentDate != "Date Not Set" && profile.ApppointmentDate != null && profile.ApppointmentDate != "") {
        if (profile.DateSetStatus == "1") {
            appicon = 'class="add-appointment"';
        }
        else {
            appicon = '';
        }
        var appdata = profile.AppointmentData.replace(/&quot;/g, '^');
        var redirectTo = "baby-appointment.html";
        if (profile.SubTypeId != 0) {
            $(".nbsecaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><span ' + appicon + '>Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
        }
        else if (profile.SubTypeId == 0 && profile.AppointmentId != "" && nb2count < 5) {
            $(".nbsecaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><span class="add-appointment">Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
            nb2count++;
        }
    }
    AddAnAppointment(nb2count, "nbsecaccordianlist", "baby-appointment", "5");
    $.mobile.silentScroll(to_position);
}

// ----- baby third accordian fetch data -----

function babythirdaccordian_success(tx, results) {
    $(".nbthirdaccordianlist").html('');
    var nb3count = 0;
    var appdescriptionid;
    var appointmentdate;
    var appicon;
    var datesetstatus;
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var profile = results.rows.item(i);
        hiddenpid = "hiddendata" + profile.ID;
        appdescriptionid = "appdescription" + profile.ID;
        appointmentdate = "appointmentdate" + profile.ID;
        datesetstatus = "datesetstatus" + profile.ID;
      //  if (profile.ApppointmentDate != "Date Not Set" && profile.ApppointmentDate != null && profile.ApppointmentDate != "") {
        if (profile.DateSetStatus == "1") {
            appicon = 'class="add-appointment"';
        }
        else {
            appicon = '';
        }
        var appdata = profile.AppointmentData.replace(/&quot;/g, '^');
        var redirectTo = "baby-appointment.html";
        if (profile.SubTypeId != 0) {
            $(".nbthirdaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><span ' + appicon + '>Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
        }
        else if (profile.SubTypeId == 0 && profile.AppointmentId != "" && nb3count < 5) {
            $(".nbthirdaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><span class="add-appointment">Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
            nb3count++;
        }
    }
    AddAnAppointment(nb3count, "nbthirdaccordianlist", "baby-appointment", "6");
    $.mobile.silentScroll(to_position);
}

// ----- pregnancy first accordian fetch data -----

function pregnancyfirstaccordian_success(tx, results) {
    $(".pregfirstaccordianlist").html('');
    var preg1count = 0;
    var appdescriptionid;
    var appointmentdate;
    var appicon;
    var datesetstatus;
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var profile = results.rows.item(i);
       // hiddenpid = "hiddendata" + profile.ID;
        appdescriptionid = "appdescription" + profile.ID;
        appointmentdate = "appointmentdate" + profile.ID;
      //  datesetstatus = "datesetstatus" + profile.ID;
      //  if (profile.ApppointmentDate != "Date Not Set" && profile.ApppointmentDate != null && profile.ApppointmentDate != "") {
        if (profile.DateSetStatus == "1") {
            appicon = 'class="add-appointment"';
        }
        else {
            appicon = '';
        }
        var appdata = profile.AppointmentData.replace(/&quot;/g, '^');
        var redirectTo = "pregnancy-appointment.html";
        if (profile.SubTypeId != 0) {
            $(".pregfirstaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external"><span ' + appicon + '>Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
        }
        else if (profile.SubTypeId == 0 && profile.AppointmentId != "" && preg1count < 5) {
            $(".pregfirstaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external"><span class="add-appointment">Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
            preg1count++;
        }
    }
    AddAnAppointment(preg1count, "pregfirstaccordianlist", "pregnancy-appointment", "1");
    $.mobile.silentScroll(to_position);
}


// ----- pregnancy second accordian fetch data -----

function pregnancysecondaccordian_success(tx, results) {
    $(".pregsecaccordianlist").html('');
    var preg2count = 0;
    var appdescriptionid;
    var appointmentdate;
    var appicon;
    var datesetstatus;
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var profile = results.rows.item(i);
       // hiddenpid = "hiddendata" + profile.ID;
        appdescriptionid = "appdescription" + profile.ID;
        appointmentdate = "appointmentdate" + profile.ID;
      //  datesetstatus = "datesetstatus" + profile.ID;
     //   if (profile.ApppointmentDate != "Date Not Set" && profile.ApppointmentDate != null && profile.ApppointmentDate != "") {
        if (profile.DateSetStatus == "1") {
            appicon = 'class="add-appointment"';
        }
        else {
            appicon = '';
        }
        var appdata = profile.AppointmentData.replace(/&quot;/g, '^');
        var redirectTo = "pregnancy-appointment.html";
        if (profile.SubTypeId != 0) {
            $(".pregsecaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><span ' + appicon + '>Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
        }
        else if (profile.SubTypeId == 0 && profile.AppointmentId != "" && preg2count < 5) {
            $(".pregsecaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><span class="add-appointment">Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
            preg2count++;
        }
    }
    AddAnAppointment(preg2count, "pregsecaccordianlist", "pregnancy-appointment", "2");
    $.mobile.silentScroll(to_position);
}

// ----- pregnancy third accordian fetch data -----

function pregnancythirdaccordian_success(tx, results) {
    $(".pregthirdaccordianlist").html('');
    var preg3count = 0;
    var appdescriptionid;
    var appointmentdate;
    var appicon;
    var datesetstatus;
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var profile = results.rows.item(i);
       // hiddenpid = "hiddendata" + profile.ID;
        appdescriptionid = "appdescription" + profile.ID;
        appointmentdate = "appointmentdate" + profile.ID;
       // datesetstatus = "datesetstatus" + profile.ID;
       // if (profile.ApppointmentDate != "Date Not Set" && profile.ApppointmentDate != null && profile.ApppointmentDate != "") {
        if (profile.DateSetStatus == "1") {
            appicon = 'class="add-appointment"';
        }
        else {
            appicon = '';
        }
        var appdata = profile.AppointmentData.replace(/&quot;/g, '^');
        var redirectTo = "pregnancy-appointment.html";
        if (profile.SubTypeId != 0) {
            $(".pregthirdaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><span ' + appicon + '>Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
        }
        else if (profile.SubTypeId == 0 && profile.AppointmentId != "" && preg3count < 5) {
            $(".pregthirdaccordianlist").append('<li><a href="#" onclick="setVariables(&quot;' + profile.ID + '&quot;,&quot;' + profile.TypeId + '&quot;,&quot;' + profile.SubTypeId + '&quot;,&quot;' + profile.AppointmentId + '&quot;,&quot;' + appdata + '&quot;,&quot;' + profile.DateSetStatus + '&quot;,&quot;' + profile.AppointmentDescription + '&quot;,&quot;' + profile.ApppointmentDate + '&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><span class="add-appointment">Appointment</span><h2 id="' + appdescriptionid + '">' + profile.AppointmentDescription + '</h2><p id="' + appointmentdate + '">' + profile.ApppointmentDate + '</p></a></li>').listview('refresh').trigger("create");
            preg3count++;
        }
    }
    AddAnAppointment(preg3count, "pregthirdaccordianlist", "pregnancy-appointment", "3");
    $.mobile.silentScroll(to_position);
}


// ----- add an appointment -----
function AddAnAppointment(count, classname, str, typeid) {
    if (count < 5) {
        if (str == "pregnancy-appointment") {
            var redirectTo = "pregnancy-appointment.html";
        }
        else {
            var redirectTo = "baby-appointment.html";
        }
        $("." + classname).append('<li><a href="#" onclick="setVariables(&quot;&quot;,&quot;' + typeid + '&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;,&quot;' + redirectTo + '&quot;);" rel="external" ><h2>Add an Appointment</h2></a></li>').listview('refresh').trigger("create");
    }
}


// ----- fetch data from db to submit appointment on server for pregnancy -----

function Fetchdata(id) {
    if (id != "" && id != undefined) {
        var sql = "Select ID,AppointmentId,ApppointmentDate,AppointmentDescription,SubTypeId,TypeId,AppointmentData,DateSetStatus,AppointmentDateSet from TAppointments WHERE ID='" + id + "'";
        db.transaction(function (tx) {
            tx.executeSql(sql, [], Fetchdata_success);
        }
						 , transaction_error);
    }
    else {
        var typeid = $("#typeidhidden").text();
        var SurvApi0002Request = '{"request": {"action": "submitAppointment","id": "","typeid": "' + typeid + '","subtypeid": "0","date": "' + $("#pregnancy-appointment-date").val() + '","description": "' + $("#pregnancy-appointment-title").val() + '","programid": "2"}}';
        ProgressBarShow();
        transaction(SurvApi0002Request, "submitAppointment", "pregnancy");
    }
}

function Fetchdata_success(tx, results) {
    var profile = results.rows.item(0);
    var SurvApi0002Request = '{"request": {"action": "submitAppointment","id": "' + profile.AppointmentId + '","typeid": "' + profile.TypeId + '","subtypeid": "' + profile.SubTypeId + '","date": "' + $("#pregnancy-appointment-date").val() + '","description": "' + $("#pregnancy-appointment-title").val() + '","programid": "2"}}';
    ProgressBarShow();
    transaction(SurvApi0002Request, "submitAppointment", "pregnancy");


}

// ----- fetch data from db to submit appointment on server for baby-----
function FetchdataNB(id) {
    if (id != "" && id != undefined) {
        var sql = "Select ID,AppointmentId,ApppointmentDate,AppointmentDescription,SubTypeId,TypeId,AppointmentData,DateSetStatus,AppointmentDateSet from TAppointments WHERE ID='" + id + "'";
        db.transaction(function (tx) {
            tx.executeSql(sql, [], FetchdataNB_success);
        }
						 , transaction_error);
    }
    else {
        var typeid = $("#nbtypeidhidden").text();
        var SurvApi0002Request = '{"request": {"action": "submitAppointment","id": "","typeid": "' + typeid + '","subtypeid": "0","date": "' + $("#baby-appointment-date").val() + '","description": "' + $("#baby-appointment-title").val() + '","programid": "2"}}';
        ProgressBarShow();
        transaction(SurvApi0002Request, "submitAppointment", "baby");
    }
}

function FetchdataNB_success(tx, results) {
    var profile = results.rows.item(0);
    var SurvApi0002Request = '{"request": {"action": "submitAppointment","id": "' + profile.AppointmentId + '","typeid": "' + profile.TypeId + '","subtypeid": "' + profile.SubTypeId + '","date": "' + $("#baby-appointment-date").val() + '","description": "' + $("#baby-appointment-title").val() + '","programid": "2"}}';
    ProgressBarShow();
    transaction(SurvApi0002Request, "submitAppointment", "baby");
}

// ----- update appointment table after submission on server for pregnancy -----
function UpdateTAppointmentAfterSubmit(aid) {
    if ($("#idhidden").text() == "" || $("#idhidden").text() == undefined) {
        InsertNewAppointment(aid);
    }
    else {
        var title;
        var allspace = /^\s+$/;
        if ($("#pregnancy-appointment-title").val() == "" || allspace.test($("#pregnancy-appointment-title").val())) {
            title = "Your Appointment";
        }
        else {
            title = $("#pregnancy-appointment-title").val();
        }
        var sql = "UPDATE TAppointments SET AppointmentId='" + aid + "',ApppointmentDate='" + $("#pregnancy-appointment-date").val() + "',AppointmentDescription='" + title + "',DateSetStatus='1',AppointmentDateSet='" + $("#pregnancy-appointment-date").val() + "' WHERE ID='" + $("#idhidden").text() + "'";
        db.transaction(function (tx) {
            tx.executeSql(sql, [], UpdateTAppointmentAfterSubmit_success);
        }
       , transaction_error);
    }
}

function UpdateTAppointmentAfterSubmit_success() {
    FetchCalendarDataById($("#idhidden").text());
}

// ----- update appointment table after submission on server for baby -----
function UpdateTAppointmentAfterSubmitNB(aid) {
    if ($("#nbidhidden").text() == "" || $("#nbidhidden").text() == undefined) {
        InsertNewAppointmentNB(aid);
    }
    else {
        var title;
        var allspace = /^\s+$/;
        if ($("#baby-appointment-title").val() == "" || allspace.test($("#baby-appointment-title").val())) {
            title = "Your Appointment";
        }
        else {
            title = $("#baby-appointment-title").val();
        }
        var sql = "UPDATE TAppointments SET AppointmentId='" + aid + "',ApppointmentDate='" + $("#baby-appointment-date").val() + "',AppointmentDescription='" + title + "',DateSetStatus='1',AppointmentDateSet='" + $("#baby-appointment-date").val() + "' WHERE ID='" + $("#nbidhidden").text() + "'";
        db.transaction(function (tx) {
            tx.executeSql(sql, [], UpdateTAppointmentAfterSubmitNB_success);
        }
       , transaction_error);
    }
}

function UpdateTAppointmentAfterSubmitNB_success() {
    FetchCalendarDataById($("#nbidhidden").text());

}


// ----- fetch data by id -----

function FetchCalendarDataById(id) {
    var sql = "Select ID,AppointmentId,ApppointmentDate,AppointmentDescription,SubTypeId,TypeId,AppointmentData,DateSetStatus from TAppointments WHERE ID='" + id + "'";
    db.transaction(function (tx) {
        tx.executeSql(sql, [], FetchCalendarDataById_success);
    }
						 , transaction_error);
}

function FetchCalendarDataById_success(tx, results) {
    var profile = results.rows.item(0);
  //  $("#appdescription" + profile.ID).text(profile.AppointmentDescription);
   // $("#appointmentdate" + profile.ID).text(profile.ApppointmentDate);
  //  $("#datesetstatus" + profile.ID).text(profile.DateSetStatus);
    if (profile.TypeId <= 3) {
        //  display('pregnancy-appointment', profile.ID, profile.TypeId, profile.SubTypeId, profile.AppointmentId);
       // window.location = "pregnancy-appointment.html?ID=" + profile.ID + "@typeId=" + profile.TypeId + "@subtypeId=" + profile.SubTypeId + "@aid=" + profile.AppointmentId + "@appdata=" + profile.AppointmentData + "@datesetstatus=" + profile.DateSetStatus + "@appdescription=" + profile.AppointmentDescription + "@appdate=" + profile.ApppointmentDate;
        navigateTo("pregnancy-appointment.html?ID=" + profile.ID + "@typeId=" + profile.TypeId + "@subtypeId=" + profile.SubTypeId + "@aid=" + profile.AppointmentId + "@appdata=" + profile.AppointmentData + "@datesetstatus=" + profile.DateSetStatus + "@appdescription=" + profile.AppointmentDescription + "@appdate=" + profile.ApppointmentDate, "{true}");
        window.localStorage.setItem("appointmentDescription", profile.AppointmentDescription);
        window.localStorage.setItem("appointmentDate", profile.ApppointmentDate);
        window.localStorage.setItem("datesetStatus", profile.DateSetStatus);
    }
    else {
        //  display('baby-appointment', profile.ID, profile.TypeId, profile.SubTypeId, profile.AppointmentId);
      //  window.location = "baby-appointment.html?ID=" + profile.ID + "@typeId=" + profile.TypeId + "@subtypeId=" + profile.SubTypeId + "@aid=" + profile.AppointmentId + "@appdata=" + profile.AppointmentData + "@datesetstatus=" + profile.DateSetStatus + "@appdescription=" + profile.AppointmentDescription + "@appdate=" + profile.ApppointmentDate;
        navigateTo("baby-appointment.html?ID=" + profile.ID + "@typeId=" + profile.TypeId + "@subtypeId=" + profile.SubTypeId + "@aid=" + profile.AppointmentId + "@appdata=" + profile.AppointmentData + "@datesetstatus=" + profile.DateSetStatus + "@appdescription=" + profile.AppointmentDescription + "@appdate=" + profile.ApppointmentDate, "{true}");
        window.localStorage.setItem("appointmentDescription", profile.AppointmentDescription);
        window.localStorage.setItem("appointmentDate", profile.ApppointmentDate);
        window.localStorage.setItem("datesetStatus", profile.DateSetStatus);
    }
}

// ----- insert new row in table after add an appointment for pregnancy -----
function InsertNewAppointment(aid) {
    var title;
    var allspace = /^\s+$/;
    if ($("#pregnancy-appointment-title").val() == "" || allspace.test($("#pregnancy-appointment-title").val())) {
        title = "Your Appointment";
    }
    else {
        title = $("#pregnancy-appointment-title").val();
    }
    var sql = 'INSERT INTO TAppointments (TypeId,SubTypeId,AppointmentId,AppointmentDescription,ApppointmentDate,AppointmentData,DateSetStatus,AppointmentDateSet) VALUES ("' + $("#typeidhidden").text() + '","0","' + aid + '","' + title + '","' + $("#pregnancy-appointment-date").val() + '","Text4baby allows you set 5 additional appointment reminders per trimester. If there\'s any appointment we missed, feel free to add it to your calendar!","1","' + $("#pregnancy-appointment-date").val() + '")';
    db.transaction(function (tx) {
        tx.executeSql(sql, [], InsertNewAppointment_success);
    }
       , transaction_error);
}

function InsertNewAppointment_success(tx, results) {
    //FetchCalendarDataByAID(aid);
    var id = results.insertId;
    FetchCalendarDataByInsertId(id);
    // FetchCalendarDataById(id);

}


// ----- insert new row in table after add an appointment for baby -----
function InsertNewAppointmentNB(aid) {
    var title;
    var allspace = /^\s+$/;
    if ($("#baby-appointment-title").val() == "" || allspace.test($("#baby-appointment-title").val())) {
        title = "Your Appointment";
    }
    else {
        title = $("#baby-appointment-title").val();
    }
    var sql = 'INSERT INTO TAppointments (TypeId,SubTypeId,AppointmentId,AppointmentDescription,ApppointmentDate,AppointmentData,DateSetStatus,AppointmentDateSet) VALUES ("' + $("#nbtypeidhidden").text() + '","0","' + aid + '","' + title + '","' + $("#baby-appointment-date").val() + '","Text4baby allows you to set 5 additional appointment reminders every 4 months. You can add 5 extra appointments for Months 0 - 4, 5 - 8, and 9 - 12! If there\'s any appointment we missed, feel free to add it to your calendar!","1","' + $("#baby-appointment-date").val() + '")';
    db.transaction(function (tx) {
        tx.executeSql(sql, [], InsertNewAppointmentNB_success);
    }
       , transaction_error);
}

function InsertNewAppointmentNB_success(tx, results) {
    var id = results.insertId;
    FetchCalendarDataByInsertId(id);
}


// ----- fetch data by insert id -----

function FetchCalendarDataByInsertId(id) {
    var sql = "Select ID,AppointmentId,ApppointmentDate,AppointmentDescription,SubTypeId,TypeId,AppointmentData,DateSetStatus from TAppointments WHERE ID='" + id + "'";
    db.transaction(function (tx) {
        tx.executeSql(sql, [], FetchCalendarDataByInsertId_success);
    }
						 , transaction_error);
}


function FetchCalendarDataByInsertId_success(tx, results) {
    var profile = results.rows.item(0);

    if (profile.TypeId <= 3) {
       // window.location = "pregnancy-appointment.html?ID=" + profile.ID + "@typeId=" + profile.TypeId + "@subtypeId=" + profile.SubTypeId + "@aid=" + profile.AppointmentId + "@appdata=" + profile.AppointmentData + "@datesetstatus=" + profile.DateSetStatus + "@appdescription=" + profile.AppointmentDescription + "@appdate=" + profile.ApppointmentDate;
        navigateTo("pregnancy-appointment.html?ID=" + profile.ID + "@typeId=" + profile.TypeId + "@subtypeId=" + profile.SubTypeId + "@aid=" + profile.AppointmentId + "@appdata=" + profile.AppointmentData + "@datesetstatus=" + profile.DateSetStatus + "@appdescription=" + profile.AppointmentDescription + "@appdate=" + profile.ApppointmentDate, "{true}");
        window.localStorage.setItem("id", profile.ID);
        window.localStorage.setItem("typeid", profile.TypeId);
        window.localStorage.setItem("subtypeid", profile.SubTypeId);
        window.localStorage.setItem("aid", profile.AppointmentId);
        window.localStorage.setItem("appointmentData", profile.AppointmentData);
        window.localStorage.setItem("datesetStatus", profile.DateSetStatus);
        window.localStorage.setItem("appointmentDescription", profile.AppointmentDescription);
        window.localStorage.setItem("appointmentDate", profile.ApppointmentDate);
    }
    else {
       // window.location = "baby-appointment.html?ID=" + profile.ID + "@typeId=" + profile.TypeId + "@subtypeId=" + profile.SubTypeId + "@aid=" + profile.AppointmentId + "@appdata=" + profile.AppointmentData + "@datesetstatus=" + profile.DateSetStatus + "@appdescription=" + profile.AppointmentDescription + "@appdate=" + profile.ApppointmentDate;
        navigateTo("baby-appointment.html?ID=" + profile.ID + "@typeId=" + profile.TypeId + "@subtypeId=" + profile.SubTypeId + "@aid=" + profile.AppointmentId + "@appdata=" + profile.AppointmentData + "@datesetstatus=" + profile.DateSetStatus + "@appdescription=" + profile.AppointmentDescription + "@appdate=" + profile.ApppointmentDate, "{true}");
        window.localStorage.setItem("id", profile.ID);
        window.localStorage.setItem("typeid", profile.TypeId);
        window.localStorage.setItem("subtypeid", profile.SubTypeId);
        window.localStorage.setItem("aid", profile.AppointmentId);
        window.localStorage.setItem("appointmentData", profile.AppointmentData);
        window.localStorage.setItem("datesetStatus", profile.DateSetStatus);
        window.localStorage.setItem("appointmentDescription", profile.AppointmentDescription);
        window.localStorage.setItem("appointmentDate", profile.ApppointmentDate);
    }
}

// ----- get data of checklist per appointment for pregnancy -----
function GetChecklistData(aid, typeid, subtypeid) {
    var sql = "Select ID,TypeId,SubTypeId,AppointmentId,ChecklistItem,FixedOrDynamic,CheckStatus from TChecklist WHERE AppointmentId='" + aid + "' AND TypeId='" + typeid + "' AND SubTypeId='" + subtypeid + "'";
    db.transaction(function (tx) {
        tx.executeSql(sql, [], GetChecklistData_success);
    }
						 , transaction_error);
}


function GetChecklistData_success(tx, results) {
    $(".checklistfixed").html('');
    $(".checklistdynamic").html('');
  //  $("#pregchecklistcount").text('');
    var fixedcount = 0;
    var checklistcount = 1;
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var profile = results.rows.item(i);

        var chklistid = "pregnancy-add-checklist-c" + checklistcount;
        if (profile.FixedOrDynamic == "Fixed") {
            $(".checklistfixed").append('<input name="' + chklistid + '" id="' + chklistid + '" type="checkbox" onclick="IsChecklistChecked(&#39;' + chklistid + '&#39;,&#39;' + profile.ID + '&#39;)"><label for="' + chklistid + '">' + profile.ChecklistItem + '</label>').trigger("create");
            if (profile.CheckStatus == "1") {
                $("#" + chklistid).attr('checked', 'checked').checkboxradio("refresh");
            }
            fixedcount++;
            checklistcount++;
        }
        else if (profile.FixedOrDynamic == "Dynamic") {
            $(".checklistdynamic").append('<input name="' + chklistid + '" id="' + chklistid + '" type="checkbox" onclick="IsChecklistChecked(&#39;' + chklistid + '&#39;,&#39;' + profile.ID + '&#39;)"><label for="' + chklistid + '">' + profile.ChecklistItem + '</label>').trigger("create");
            if (profile.CheckStatus == "1") {
                $("#" + chklistid).attr('checked', 'checked').checkboxradio("refresh");
            }
            checklistcount++;
        }
    }
    if (fixedcount >= 1) {
        $("#checklistdata").text("Here are some things to discuss at your prenatal appointment. You can add other items below.");
    }
    else {
        $("#checklistdata").text("Need to remember something for your appointment? Want to take notes? Add items to your checklist below.");
    }
   // $("#pregchecklistcount").text(checklistcount);

}

// ----- get data of checklist per appointment for baby -----
function GetChecklistDataBaby(aid, typeid, subtypeid) {
    var sql = "Select ID,TypeId,SubTypeId,AppointmentId,ChecklistItem,FixedOrDynamic,CheckStatus from TChecklist WHERE AppointmentId='" + aid + "' AND TypeId='" + typeid + "' AND SubTypeId='" + subtypeid + "'";
    db.transaction(function (tx) {
        tx.executeSql(sql, [], GetChecklistDataBaby_success);
    }
						 , transaction_error);
}


function GetChecklistDataBaby_success(tx, results) {
    $(".checklistfixedbaby").html('');
    $(".checklistdynamicbaby").html('');
  //  $("#babychecklistcount").text('');
    var fixedcount = 0;
    var checklistcount = 1;
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var profile = results.rows.item(i);
        var chklistid = "baby-checkbox-checklist-c" + checklistcount;
        if (profile.FixedOrDynamic == "Fixed") {
            $(".checklistfixedbaby").append('<input name="' + chklistid + '" id="' + chklistid + '" type="checkbox" onclick="IsChecklistChecked(&#39;' + chklistid + '&#39;,&#39;' + profile.ID + '&#39;)"><label for="' + chklistid + '">' + profile.ChecklistItem + '</label>').trigger("create");
            if (profile.CheckStatus == "1") {
                $("#" + chklistid).attr('checked', 'checked').checkboxradio("refresh");
            }
            fixedcount++;
            checklistcount++;
        }
        else if (profile.FixedOrDynamic == "Dynamic") {
            $(".checklistdynamicbaby").append('<input name="' + chklistid + '" id="' + chklistid + '" type="checkbox" onclick="IsChecklistChecked(&#39;' + chklistid + '&#39;,&#39;' + profile.ID + '&#39;)"><label for="' + chklistid + '">' + profile.ChecklistItem + '</label>').trigger("create");
            if (profile.CheckStatus == "1") {
                $("#" + chklistid).attr('checked', 'checked').checkboxradio("refresh");
            }
            checklistcount++;
        }
    }
    if (fixedcount >= 1) {
        $("#checklistdatababy").text("Here are some things to discuss at your baby's appointment. You can add other items below.");
    }
    else {
        $("#checklistdatababy").text("Need to remember something for your appointment? Want to take notes? Add items to your checklist below.");
    }
  //  $("#babychecklistcount").text(checklistcount);
}


function UpdateChecklist(aid, typeid, subtypeid) {
    var sql = "UPDATE TChecklist SET AppointmentId='" + aid + "' WHERE TypeId='" + typeid + "' AND SubTypeId='" + subtypeid + "' AND AppointmentId=''";
    db.transaction(function (tx) {
        tx.executeSql(sql, [], UpdateChecklist_success);
    }
						 , transaction_error);
}

function UpdateChecklistNB(aid, typeid, subtypeid) {
    var sql = "UPDATE TChecklist SET AppointmentId='" + aid + "' WHERE TypeId='" + typeid + "' AND SubTypeId='" + subtypeid + "' AND AppointmentId=''";
    db.transaction(function (tx) {
        tx.executeSql(sql, [], UpdateChecklistNB_success);
    }
						 , transaction_error);
}

function UpdateChecklist_success() {
    GetChecklistData($("#aidchklist").text(), $("#tidchklist").text(), $("#stidchklist").text());
}

function UpdateChecklistNB_success() {
    GetChecklistDataBaby($("#nbaidchklist").text(), $("#nbtidchklist").text(), $("#nbstidchklist").text());
}

// ----- will add dynamic checklist on submit for pregnancy -----
function AddTChecklistAfterSubmit(aid, typeid, subtypeid) {
    var sql = 'INSERT INTO TChecklist (TypeId,SubTypeId,AppointmentId,ChecklistItem,FixedOrDynamic,CheckStatus) VALUES ("' + typeid + '","' + subtypeid + '","' + aid + '","' + $("#Textarea1").val() + '","Dynamic","")';
    db.transaction(function (tx) {
        tx.executeSql(sql, [], AddTChecklist_success);
    }
						 , transaction_error);
    ProgressBarHide();
}

function AddTChecklist_success() {
    $("#Textarea1").val('');
    // display('pregnancy-add-checklist', $("#idchklist").text(), $("#tidchklist").text(), $("#stidchklist").text(), $("#aidchklist").text());
    //  window.location = "pregnancy-add-checklist.html";
    navigateTo("pregnancy-add-checklist.html", "{true}");
}

// ----- will add dynamic checklist on submit for baby -----
function AddTChecklistAfterSubmitNB(aid, typeid, subtypeid) {
    var sql = 'INSERT INTO TChecklist (TypeId,SubTypeId,AppointmentId,ChecklistItem,FixedOrDynamic,CheckStatus) VALUES ("' + typeid + '","' + subtypeid + '","' + aid + '","' + $("#tr1-pv1-cl").val() + '","Dynamic","")';
    db.transaction(function (tx) {
        tx.executeSql(sql, [], AddTChecklistNB_success);
    }
						 , transaction_error);
    ProgressBarHide();
}

function AddTChecklistNB_success() {
    $("#tr1-pv1-cl").val('');
    // display('baby-add-checklist', $("#nbidchklist").text(), $("#nbtidchklist").text(), $("#nbstidchklist").text(), $("#nbaidchklist").text());
   // window.location = "baby-add-checklist.html";
    navigateTo("baby-add-checklist.html", "{true}");
}

// ----- to check and uncheck checkbox -----
function IsChecklistChecked(chklistid, tableid) {
    if ($("#" + chklistid).is(':checked')) {
        var sql = "UPDATE TChecklist SET CheckStatus='1' WHERE ID='" + tableid + "'";
        db.transaction(function (tx) {
            tx.executeSql(sql);
        }
       , transaction_error, IsChecklistChecked_success);
    }
    else {
        var sql = "UPDATE TChecklist SET CheckStatus='0' WHERE ID='" + tableid + "'";
        db.transaction(function (tx) {
            tx.executeSql(sql);
        }
       , transaction_error, IsChecklistChecked_success);
    }

}


function IsChecklistChecked_success() {

}


function getUrlVarsCalendar() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('@');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

