// Header and Footer Position Fix

$(document).ready(function() {
$(".ui-footer, .ui-header").removeClass('slideup');
$(".ui-header").removeClass('slidedown');
$(".ui-footer, .ui-header").removeClass('in');
$(".ui-footer, .ui-header").removeClass('out');
$(".ui-footer, .ui-header").removeClass('reverse');
});

$(function () {
    var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());

    if (isiPhone) {
        
        $('input[type=text],input[type=password],input[type=date],input[type=number],input[type=email],input[type=tel],input[type=radio],input[type=checkbox],textarea,select').on('blur', function () {
            // alert("2");
            $('#header,#header-outSession,#header-inSession').attr('style', 'position:fixed !important;');
            $('#footer').attr('style', 'position:fixed !important;');



        });
		
		$('input[type=text],input[type=password],input[type=date],input[type=number],input[type=email],input[type=tel],input[type=radio],input[type=checkbox],textarea,select').on('focus', function () {
            //alert("1");

            $('#header,#header-outSession,#header-inSession').attr('style', 'position:absolute !important;');
            $('#footer').attr('style', 'position:absolute !important;');


        });
    }
    else {
        
        $('input[type=text],input[type=password],input[type=date],input[type=number],input[type=email],input[type=tel],input[type=radio],input[type=checkbox],textarea,select').on("blur", function (e) {
            if ($("input[type=submit],input[type=button]").data("mouseDown") != true) {
                $('#header, #footer').attr('style', 'position:fixed !important;');
            }
        });
		
		$('input[type=text],input[type=password],input[type=date],input[type=number],input[type=email],input[type=tel],input[type=radio],input[type=checkbox],textarea,select').on("focus", function (e) {
					if ($("input[type=submit],input[type=button]").data("mouseDown") != true) {
						$('#header, #footer').attr('style', 'position:absolute !important;');
					}
				});

        $("input[type=submit],input[type=button]").on("mousedown", function (e) {
			$('#header, #footer').attr('style', 'position:fixed !important;');
            $("input[type=submit],input[type=button]").data("mouseDown", true);
        });

        $("input[type=submit],input[type=button]").on("mouseup", function (e) {
            $("input[type=submit],input[type=button]").data("mouseDown", false);
        });
    }
})