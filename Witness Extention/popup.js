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

