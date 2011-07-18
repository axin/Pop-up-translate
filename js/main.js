document.onmouseup = function(event) {
    if(event.ctrlKey) {
        window.alert(window.getSelection().toString());
    }
}
