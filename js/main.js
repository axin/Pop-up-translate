var PopUp = {
    extId: '__MSG_@@extension_id__',
    bingAppId: 'FEA3B73DEA9F7A311924116269D3094501970811',

    popUpInstance: null,

    Appearence: {
        fontFamily: 'sans-serif',
        fontSize: '18px',
        fontColor: '#727272',
        backgroundColor: '#E3E3E3',
        shadowColor: '#3C81FF'
    },
    
    addToDocument: function() {
        if (PopUp.popUpInstance == null) {
            PopUp.popUpInstance = document.createElement('div');
            with (PopUp.popUpInstance.style) {
                position = 'absolute';
                zIndex = '999000';
                display = 'none';
            }
            PopUp.popUpInstance.setAttribute('id', PopUp.extId + 'pop-up');

            var bubleShadow = document.createElement('div');
            with (bubleShadow.style) {
                position = 'relative';
                float = 'left';
                borderRadius = '5px';
                boxShadow = '0 0 5px 1px ' + PopUp.Appearence.shadowColor;
            }

            var buble = document.createElement('div');
            with (buble.style) {
                position = 'relative';
                float = 'left';
                zIndex = '999100';
                borderRadius = '5px';
                backgroundColor = PopUp.Appearence.backgroundColor;
            }

            var translationContainer = document.createElement('div');
            with (translationContainer.style) {
                minWidth = '2em';
                minHeight = '2em';
                maxWidth = '500px';
                marginRight = '30px';
            }

            var translation = document.createElement('p');
            with (translation.style) {
                margin = '0.5em';
                color = PopUp.Appearence.fontColor;
                fontFamily = PopUp.Appearence.fontFamily;
                fontSize = PopUp.Appearence.fontSize;
                translation.setAttribute('id', PopUp.extId + 'translation');
            }

            var pronounceIconContainer = document.createElement('div');
            with (pronounceIconContainer.style) {
                width = '20px';
                minWidth = '20px'; 
                minHeight = '20px';
                position = 'absolute';
                right = '0';
                top = '50%';
                padding = '0 5px';
                marginTop = '-10px';
            }

            var pronounceIcon = document.createElement('img'); 
            with (pronounceIcon) {
                setAttribute('src', 'img/pronounce.png');
                setAttribute('width', '20px');
                setAttribute('height', '20px');
                setAttribute('id', PopUp.extId + 'pronounce-icon');
            }

            var arrowUp = document.createElement('div');
            with (arrowUp.style) {
                width = '20px';
                height = '20px';
                position = 'absolute';
                left = '50%';
                webkitTransform = 'rotate(45deg) skew(10deg, 10deg)';
                backgroundColor = PopUp.Appearence.backgroundColor;
                boxShadow = '0 0 5px 1px ' + PopUp.Appearence.shadowColor;
                marginLeft = '-10px';
                top = '0';
                marginTop = '-5px';
            }
            arrowUp.setAttribute('id', PopUp.extId + 'arrow-up');

            var arrowDown = document.createElement('div');
            with (arrowDown.style) {
                width = arrowUp.style.width;
                height = arrowUp.style.height;
                position = arrowUp.style.position;
                left = arrowUp.style.left;
                webkitTransform = arrowUp.style.webkitTransform;
                backgroundColor = arrowUp.style.backgroundColor;
                boxShadow = arrowUp.style.boxShadow;
                marginLeft = arrowUp.style.marginLeft;
                bottom = '0';
                marginBottom = '-5px';
            }
            arrowDown.setAttribute('id', PopUp.extId + 'arrow-down');

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

    toggle: function(e) {
        var popUp = document.getElementById(PopUp.extId + 'pop-up');
        var selection = window.getSelection().toString();

        if (selection != '') {
            popUp.style.display = 'block';
        }
        else {
            popUp.style.display = 'none';
        }

    },

    hide: function() {
        if (PopUp.popUpInstance.style.display == 'block') {
            PopUp.popUpInstance.style.display = 'none';
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
//window.addEventListener('mousedown', PopUp.hide, false);

