$(document).ready(function(){
if(window.location.pathname === "/photoedit"){
console.log(window.location.pathname);
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');


/**
 * Demonstrates how to download a canvas an image with a single
 * direct click on a link.
 */


function doCanvas() {
    var img = document.getElementById('hedgehog');
    img.onload = function (){
        ctx.drawImage(img, 0, 0, 720, 1280, 0, 0, 720, 1280);
    }
    console.log('hedgehog img var made');
}

function redLeft() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, 720, 1280, 0, 0, 720, 1280);
    ctx.fillStyle = 'blanchedalmond';
    ctx.fillRect(img.width * 0, img.height * 0, img.width * 0.2, img.height * 1);
}

function redBottom () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, 720, 1280, 0, 0, 720, 1280);
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(img.width * 0, img.width * 0.35, img.width * 1, img.height * 0.3);
}

function redRight() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, 720, 1280, 0, 0, 720, 1280);
    ctx.fillStyle = 'forestgreen';
    ctx.fillRect(img.width * 0.5, img.height * 0, img.width * 0.2, img.height * 1);
}

/**
 * This is the function that will take care of image extracting and
 * setting proper filename for the download.
 * IMPORTANT: Call it from within a onclick event.
*/
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}


document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'test.png');
}, false);

// $('download').on('click', function(){
//     downloadCanvas(this, 'canvas', 'test.png');
// });
/**
 * The event handler for the link's onclick event. We give THIS as a
 * parameter (=the link element), ID of the canvas and a filename.
*/
document.getElementById('redLeft').addEventListener('click', function() {
    redLeft();
}, false);

document.getElementById('redRight').addEventListener('click', function() {
    redRight();
}, false);

document.getElementById('redBottom').addEventListener('click', function() {
    redBottom();
}, false);

/**
 * Draw something to canvas
 */
doCanvas();
}
});
