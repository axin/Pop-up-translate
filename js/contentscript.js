var PopUp = {
    extId: '',
    bingAppId: '',

    addedToDocument: false,

    Appearence: {
        fontFamily: 'sans-serif',
        fontSize: '18px',
        fontColor: '#727272',
        backgroundColor: '#E3E3E3',
        shadowColor: '#3C81FF'
    },

    getStyles: function() {
        return '[id ^= "' + PopUp.extId + '"] {' +
            'margin: 0;' +
            'padding: 0;' +
            'border: none;' +
            'font-family: inherit;' +
            'font-size: inherit;' +
            'line-height: normal;' +
        '}' +

        '#' + PopUp.extId + 'pop-up div {' +
            'width: auto;' +
            'height: auto;' +
        '}' +
        
        '#' + PopUp.extId + 'pop-up img {' +
            'background: transparent !important;' +
        '}' +
        
        '#' + PopUp.extId + 'pop-up {' +
            'position: absolute;' +
            'z-index: 999000;' +
            //'display: none;' +
            'max-width: 500px;' +
            'left: 50px;' +
            'top: 50px;' +
            'font-family: ' + PopUp.Appearence.fontFamily + ';' +
            'font-size: ' + PopUp.Appearence.fontSize + ';' +
        '}' +

        '.' + PopUp.extId + 'pop-up-part {' +
            'background-color: ' + PopUp.Appearence.backgroundColor + ';' +
            'box-shadow: 0 0 5px 1px ' + PopUp.Appearence.shadowColor + ';' +
        '}' +

        '#' + PopUp.extId + 'bubble {' +
            'position: relative;' +
            'float: left;' +
            'z-index: 999100;' +
            'min-width: 2em;' +
            'min-height: 2em;' +
            'border-radius: 5px;' +
            'box-shadow: none;' +
        '}' +

        '#' + PopUp.extId + 'bubble-shadow {' +
            'position: relative;' +
            'float: left;' +
            'border-radius: 5px;' +
        '}' +

        '#' + PopUp.extId + 'translation-container {' +
            'float: left;' +
            'margin-right: 30px;' +
        '}' +

        '#' + PopUp.extId + 'pronounce-icon-container {' +
            'position: absolute;' +
            'width: 20px;' +
            'height: 20px;' +
            'right: 0;' +
            'top: 50%;' +
            'padding: 0 5px;' +
            'margin-top: -10px;' +
        '}' +

        '#' + PopUp.extId + 'translation {' +
            'margin: 0.5em;' +
            'color: ' + PopUp.Appearence.fontColor + ';' +
        '}' +

        '#' + PopUp.extId + 'pronounce-icon {' +
             'width: 20px;' +
             'height: 20px;' +
        '}' +

        '.' + PopUp.extId + 'arrow {' +
            'width: 20px !important;' +
            'height: 20px !important;' +
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

            var bubbleShadow = document.createElement('div');
            bubbleShadow.setAttribute('id', PopUp.extId + 'bubble-shadow');
            bubbleShadow.setAttribute('class', PopUp.extId + 'pop-up-part');

            var bubble = document.createElement('div');
            bubble.setAttribute('id', PopUp.extId + 'bubble');
            bubble.setAttribute('class', PopUp.extId + 'pop-up-part');

            var translationContainer = document.createElement('div');
            translationContainer.setAttribute('id', PopUp.extId + 'translation-container');

            var translation = document.createElement('p');
            translation.setAttribute('id', PopUp.extId + 'translation');

            var pronounceIconContainer = document.createElement('div');
            pronounceIconContainer.setAttribute('id', PopUp.extId + 'pronounce-icon-container');

            var pronounceIcon = document.createElement('img'); 
            pronounceIcon.setAttribute('id', PopUp.extId + 'pronounce-icon');
            pronounceIcon.setAttribute('src', chrome.extension.getURL('img/pronounce.png'));

            var arrowUp = document.createElement('div');
            arrowUp.setAttribute('id', PopUp.extId + 'arrow-up');
            arrowUp.setAttribute('class', PopUp.extId + 'pop-up-part ' + PopUp.extId +'arrow');

            var arrowDown = document.createElement('div');
            arrowDown.setAttribute('id', PopUp.extId + 'arrow-down');
            arrowDown.setAttribute('class', PopUp.extId + 'pop-up-part ' + PopUp.extId +'arrow');

            PopUp.popUpInstance.appendChild(bubbleShadow);
            bubbleShadow.appendChild(bubble);
            bubble.appendChild(translationContainer);
            translationContainer.appendChild(translation);
            bubble.appendChild(pronounceIconContainer);
            pronounceIconContainer.appendChild(pronounceIcon);
            bubbleShadow.appendChild(arrowUp);
            bubbleShadow.appendChild(arrowDown);
            document.body.parentElement.insertBefore(PopUp.popUpInstance, document.body);
        }
    },

    getSettings: function () {
        chrome.extension.sendRequest('settings', function (settings) {
                debugger;
            if (settings !== {}) {
                PopUp.extId = settings.extId;
                PopUp.bingAppId = settings.bingAppId;
                PopUp.Appearence = settings.appearence;
            } else {
                // Error!
            }
        });
    },

    // This function triggers when window's onclick event occures.
    // It shows/hides pop-up depending if some text is selected or not.
    toggle: function(e) {
        var popUp = document.getElementById(PopUp.extId + 'pop-up');
        var selection = window.getSelection().toString();

        if (selection != '') {
            popUp.style.display = 'block';

            var translationElement = document.getElementById(PopUp.extId + 'translation');
            translationElement.innerText = selection;
        }
        else {
            popUp.style.display = 'none';
        }

    }
}

PopUp.getSettings();
PopUp.addToDocument();

window.addEventListener('click', PopUp.toggle, false);
