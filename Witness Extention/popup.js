/* Begins witnessing proccess by clicking extention icon and then clicking the button that appears
 * Created by Ben Thomas
 * significantly influenced by: https://www.youtube.com/watch?v=Ipa58NVGs_c
 */
document.addEventListener('DOMContentLoaded', function () {
   document.querySelector('button').addEventListener('click', onclick, false)

    function onclick () {
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, '')
        })
    }
}, false)

//        ToDo 
//issue pull req 
// new directory in exsisting repo for my code
// calcualte hash of images in esxtentio jsut jpg sha 256
// adress images that are data

/*     Questions
what additional info should image hashes be sent with?
user interface preferences?
should the hash include the overhead of data url's
*/
