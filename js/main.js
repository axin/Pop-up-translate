document.onmouseup = function(event) {
    if (event.ctrlKey) {
        var translation = document.getElementById("translation");
        var selection = window.getSelection();
        var popUp = document.getElementById("pop-up");

        translation.innerHTML = selection.toString();
        //popUp.style.cssText = 'background-color: green; width: 100px;' +
            //'height: 30px; top: 50px; left: 100px; position: absolute;';
        
        //debugger;

        popUp.style.top = getAbsoluteOffset(selection.anchorNode.parentNode)[1] + 'px';
        popUp.style.left = getAbsoluteOffset(selection.anchorNode.parentNode)[0] + 
            selection.anchorOffset + 'px';
    }
}
