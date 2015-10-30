//----------------------------Events Initialization Starts---------------------------------------------------------
document.addEventListener("deviceready", onDeviceReady, false);

// jQuery(document).on('webkitfullscreenchange', function(e) {   
   // alert('hi');   
    // setTimeout(function(){ 
            // window.location ='sign-up.html';
		// }, 10000);
// }); 

function onDeviceReady() { 
  
	if (typeof window.plugins.orientationchanger !== 'undefined'){
						// plugin is available
			  window.plugins.orientationchanger.lockOrientation('sensor');						
	}

 }
