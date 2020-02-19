//alert("popup loaded")
document.addEventListener('DOMContentLoaded', function () {
   document.querySelector('button').addEventListener('click', onclick, false)

    function onclick () {
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'hi')
        })
    }
}, false)

// significantly influenced by: https://www.youtube.com/watch?v=Ipa58NVGs_c