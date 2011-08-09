var PopUp = {
    extId: 'ipgccjoekgalifmnmoolgojgaaofkgab',
    bingAppId: 'FEA3B73DEA9F7A311924116269D3094501970811',

    addedToDocument: false,

    Appearence: {
        fontFamily: 'sans-serif',
        fontSize: '18px',
        fontColor: '#727272',
        backgroundColor: '#E3E3E3',
        shadowColor: '#3C81FF'
    },

    getStyles: function() {
        return '#' + PopUp.extId + 'pop-up {' +
            'position: absolute;' +
            'z-index: 999000;' +
            'display: none;' +
            'left: 50px;' +
            'top: 50px;' +
        '}' +

        '.' + PopUp.extId + 'pop-up-part {' +
            'background-color: ' + PopUp.Appearence.backgroundColor + ';' +
            'box-shadow: 0 0 5px 1px ' + PopUp.Appearence.shadowColor + ';' +
        '}' +

        '#' + PopUp.extId + 'buble {' +
            'position: relative;' +
            'float: left;' +
            'z-index: 999100;' +
            'border-radius: 5px;' +
            'box-shadow: none;' +
        '}' +

        '#' + PopUp.extId + 'buble-shadow {' +
            'position: relative;' +
            'float: left;' +
            'border-radius: 5px;' +
        '}' +

        '#' + PopUp.extId + 'translation-container {' +
            'float: left;' +
            'min-width: 2em;' +
            'min-height: 2em;' +
            'max-width: 500px;' +
            'margin-right: 30px;' +
        '}' +

        '#' + PopUp.extId + 'pronounce-icon-container {' +
            'width: 20px;' +
            'min-width: 20px;' +
            'min-height: 20px;' +
            'position: absolute;' +
            'right: 0;' +
            'top: 50%;' +
            'padding: 0 5px;' +
            'margin-top: -10px;' +
        '}' +

        '#' + PopUp.extId + 'translation {' +
            'margin: 0.5em;' +
            'color: ' + PopUp.Appearence.fontColor + ';' +
            'font-family: ' + PopUp.Appearence.fontFamily + ';' +
            'font-size: ' + PopUp.Appearence.fontSize + ';' +
        '}' +

        '.' + PopUp.extId + 'arrow {' +
            'width: 20px;' +
            'height: 20px;' +
            'position: absolute;' +
            'left: 50%;' +
            'margin-left: -10px;' +
            '-webkit-transform: rotate(45deg) skew(10deg, 10deg);' +
        '}' +

        '#' + PopUp.extId + 'arrow-up {' +
            'top: 0;' +
            'margin-top: -5px;' +
        '}' +

        '#' + PopUp.extId + 'arrow-down {' +
            'bottom: 0;' +
            'margin-bottom: -5px;' +
        '}';
    },

    addToDocument: function() {
        if (PopUp.addedToDocument == false) {
            PopUp.addedToDocument = true;

            var styles = document.createTextNode(PopUp.getStyles());

            var styleElement = document.createElement('style');
            styleElement.setAttribute('type', 'text/css');
            styleElement.appendChild(styles);
            document.head.appendChild(styleElement);

            PopUp.popUpInstance = document.createElement('div');
            PopUp.popUpInstance.setAttribute('id', PopUp.extId + 'pop-up');

            var bubleShadow = document.createElement('div');
            bubleShadow.setAttribute('id', PopUp.extId + 'buble-shadow');
            bubleShadow.setAttribute('class', PopUp.extId + 'pop-up-part');

            var buble = document.createElement('div');
            buble.setAttribute('id', PopUp.extId + 'buble');
            buble.setAttribute('class', PopUp.extId + 'pop-up-part');

            var translationContainer = document.createElement('div');
            translationContainer.setAttribute('id', PopUp.extId + 'translation-container');

            var translation = document.createElement('p');
            translation.setAttribute('id', PopUp.extId + 'translation');

            var pronounceIconContainer = document.createElement('div');
            pronounceIconContainer.setAttribute('id', PopUp.extId + 'pronounce-icon-container');

            var pronounceIcon = document.createElement('img'); 
            pronounceIcon.setAttribute('src', 'img/pronounce.png');
            pronounceIcon.setAttribute('width', '20px');
            pronounceIcon.setAttribute('height', '20px');

            var arrowUp = document.createElement('div');
            arrowUp.setAttribute('id', PopUp.extId + 'arrow-up');
            arrowUp.setAttribute('class', PopUp.extId + 'pop-up-part arrow');

            var arrowDown = document.createElement('div');
            arrowDown.setAttribute('id', PopUp.extId + 'arrow-down');
            arrowDown.setAttribute('class', PopUp.extId + 'pop-up-part arrow');

            PopUp.popUpInstance.appendChild(bubleShadow);
            bubleShadow.appendChild(buble);
            buble.appendChild(translationContainer);
            translationContainer.appendChild(translation);
            buble.appendChild(pronounceIconContainer);
            pronounceIconContainer.appendChild(pronounceIcon);
            bubleShadow.appendChild(arrowUp);
            bubleShadow.appendChild(arrowDown);
            document.body.appendChild(PopUp.popUpInstance);
        }
    },

    // This function triggers when window's onclick event occures.
    // It shows/hides pop-up depending if some text is selected or not.
    toggle: function(e) {
        var popUp = document.getElementById(PopUp.extId + 'pop-up');
        var selection = window.getSelection().toString();

        if (selection != '') {
            popUp.style.display = 'block';

            var tranlationTextNode = document.createTextNode(selection);
            var translationElement = document.getElementById(PopUp.extId + 'translation');
            translationElement.appendChild(tranlationTextNode);
        }
        else {
            popUp.style.display = 'none';
        }

    }
}

//document.onmouseup = function(event) {
    //if (event.ctrlKey) {
        //var translation = document.getElementById("translation");
        //var selection = window.getSelection();
        //var popUp = document.getElementById("pop-up");

        //translation.innerHTML = selection.toString();
        ////popUp.style.cssText = 'background-color: green; width: 100px;' +
            ////'height: 30px; top: 50px; left: 100px; position: absolute;';
        
        ////debugger;

        //popUp.style.top = getAbsoluteOffset(selection.anchorNode.parentNode)[1] + 'px';
        //popUp.style.left = getAbsoluteOffset(selection.anchorNode.parentNode)[0] + 
            //selection.anchorOffset + 'px';
    //}
//}

window.addEventListener('load', PopUp.addToDocument, false);
window.addEventListener('click', PopUp.toggle, false);

