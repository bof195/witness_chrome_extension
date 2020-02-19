chrome.runtime.onMessage.addListener(function (request) {
    var images = document.getElementsByTagName('img'); 

var srcList = [];
for(var i = 0; i < images.length; i++) {
    srcList.push(images[i].src);
}

console.log(srcList);
alert("You witnessed " + srcList.length + " images");
})

// https://stackoverflow.com/questions/9321863/javascript-function-to-get-all-images-in-html

//issue pull req 
// new directory in exsisting repo for my code
// calcualte hash of images in esxtentio jsut jpg sha 256
// adress images that are data