/*
 * Copyright 2020 Don Patterson, github: @djp3 email: d_j_p_3 at djp3.net
 *
 *  This file is part of the Witness This Media Chrome Extension (WTMCE).

    WTMCE is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WTMCE is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WTMCE.  If not, see <https://www.gnu.org/licenses/>.

*/




/* Begins witnessing proccess by clicking extention icon and then clicking the button that appears
 * Created by Ben Thomas
 * significantly influenced by: https://www.youtube.com/watch?v=Ipa58NVGs_c
 */

//Local Constant
var CL_MESSAGE_PASSING_OK = true; // Assume it is working in race conditions with the check


function main(){
	check_message_passing(function(ok){
		CL_MESSAGE_PASSING_OK = ok;
	});

	if(C_DEBUG){
		console.log("popup.js main() finished");
	}
}


function update_K_AUTO_PROCESS(value){

	// Resolve what the new setting should be between the parameter and the U/I.
	// The incoming parameter has priority
	// Default is off
	var new_value = 'off' //default
	if($("#"+K_AUTO_PROCESS).prop('checked')){
		new_value = 'on'
	}

	//If we have an input parameter and understand it,  then use it
	if('undefined' != typeof value && value){
		if (value == "on"){
			new_value = "on"
		} else if (value == "off"){
			new_value = "off"
		}
	}
	

	//Store the value in local storage for persistence
	if(CL_MESSAGE_PASSING_OK){

		chrome.runtime.sendMessage({command: M_SET_AUTO_PROCESS,data:new_value}, function(response) {
			if(!validate_response_ok(response)){
				if(C_DEBUG){
					console.log("Storage failed for new_value:"+new_value+":"+JSON.stringify(response));
				}
			}
			//Nothing to do if everything goes right
		});
	}


	//If the new_value is on, then make sure it starts a witness process
	if(new_value == 'on'){
		manualWitnessStart();
	}
	else if (new_value == 'off'){
		manualWitnessStop();
	}
	

	return new_value;
}




function manualWitnessStart () {
	chrome.tabs.query({active:true, currentWindow: true},
		function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command:M_MANUAL_WITNESS},
				function(response) {
					if(C_DEBUG){
						console.log("manual witness start result:"+response.result);
					}
				}
			)
		}
	)
}


function manualWitnessStop () {
	chrome.tabs.query({active:true, currentWindow: true},
		function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {command:M_STOP_WITNESS},
				function(response) {
					if(C_DEBUG){
						console.log("manual witness stop result:"+response.result);
					}
				}
			)
		}
	)
}




$(window).on("load",function(){
	//Attach action to manual button
	$('#manual_button').click(manualWitnessStart)

	// Build slider for K_AUTO_PROCESS
	$('#'+K_AUTO_PROCESS).attr('data-toggle','toggle')
	$('#'+K_AUTO_PROCESS).attr('data-onstyle','success')
	$('#'+K_AUTO_PROCESS).attr('data-on','<i class="far fa-eye fa-lg"></i>')
	$('#'+K_AUTO_PROCESS).attr('data-off','<i class="far fa-eye-slash fa-lg"></i>')
	$('#'+K_AUTO_PROCESS).attr('data-offstyle','outline-danger')
	$('#'+K_AUTO_PROCESS).bootstrapToggle('disable')
	//Initialize it to the stored value
	if(CL_MESSAGE_PASSING_OK){
		console.log("About to initialize slider")
		chrome.runtime.sendMessage({command: M_GET_AUTO_PROCESS}, function(response) {
			console.log("Got a call back:"+JSON.stringify(response))
			if(validate_response_ok(response)){
				var new_value = response.result;
				console.log("Got a call back that's ready: "+new_value);
				$('#'+K_AUTO_PROCESS).bootstrapToggle('enable',false)
				$('#'+K_AUTO_PROCESS).bootstrapToggle(new_value,false)
				//Register for new changes
				$('#'+K_AUTO_PROCESS).change(update_K_AUTO_PROCESS)
			}
		});
	}
	else{
		console.log("Message passing not okay")
	}


	//Tooltips
	$('#'+K_AUTO_PROCESS+"_tooltip").attr('title',chrome.i18n.getMessage('ext_auto_tooltip'))
	$('#'+K_AUTO_PROCESS+"_tooltip").tooltip()

	$('#'+K_MANUAL_WITNESS).attr('title',chrome.i18n.getMessage('ext_manual_tooltip'))
	$('#'+K_MANUAL_WITNESS).tooltip()

	if(C_DEBUG){
		console.log("popup.js script ran on load")
	}
});



main()
