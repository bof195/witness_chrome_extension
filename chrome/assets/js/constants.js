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


/* Constants used across all the extension javascript */

// XML POST requests sent to this url, this is a testing backend
const BACKEND_URL = "https://reqres.in/api/users";

// Set to false to stop console output
var C_DEBUG = true;
var C_VERSION = "0.0.3"; // Should match manifest


// Keys used for persistent storage
var K_AUTO_PROCESS = 'auto_process'
var K_MANUAL_WITNESS = 'manual_witness'

//Message passing commands
var M_VERSION = "version";
var M_GET_AUTO_PROCESS = "get_"+K_AUTO_PROCESS;
var M_SET_AUTO_PROCESS = "set_"+K_AUTO_PROCESS;

//Standard Message passing responses
var MR_WAIT = "wait";
var MR_GOOD = "good";
var MR_ERROR = "error";
var MR_UNKNOWN_COMMAND = "unknown command";

