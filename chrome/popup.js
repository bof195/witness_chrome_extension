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
$(window).on("load",function(){
	//Attach action to manual button
	$('button').click(onclick)

	// Build slider for K_AUTO_PROCESS
	$('#'+K_AUTO_PROCESS).attr('data-toggle','toggle')
	$('#'+K_AUTO_PROCESS).attr('data-onstyle','success')
	$('#'+K_AUTO_PROCESS).attr('data-on','<i class="far fa-eye fa-lg"></i>')
	$('#'+K_AUTO_PROCESS).attr('data-off','<i class="far fa-eye-slash fa-lg"></i>')
	$('#'+K_AUTO_PROCESS).attr('data-offstyle','outline-danger')

	if(C_DEBUG){
		console.log("popup.js script ran on load")
	}
});
/*
document.addEventListener('DOMContentLoaded', function () {
   document.querySelector('button').addEventListener('click', onclick, false)

    function onclick () {
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, '')
        })
    }
}, false)
*/

