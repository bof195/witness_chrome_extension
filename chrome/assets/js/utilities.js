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


/****************************/
/* Help for message passing */


function validate_response_ok(response){
	if('undefined' == typeof response){
		console.error("WTM: Message passing broken: no response");
		return false;
	}
	else if('undefined' == typeof response.result){
		console.error("WTM: Message passing broken response.result undefined");
		return false;
	}
	return true;
}

function check_message_passing(responder){
	//Make sure the message passing is all good to go
	chrome.runtime.sendMessage({command: M_VERSION}, function(response) {
		if(validate_response_ok(response)){
			if(!(response.result === C_VERSION)){ 
				console.error("WTM: Message passing broken "+response.result+" !=== "+C_VERSION);
			}
			else{
				if(C_DEBUG){
					console.log("WTM: Message passing okay "+response.result+" === "+C_VERSION);
				}
				responder(true)
				return;
			}
		}
		responder(false)
	});
}




