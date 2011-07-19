document.onmouseup = function(event) {
    if(event.ctrlKey) {
        document.getElementById("translation").innerHTML =
        window.getSelection().toString();
    }
}
