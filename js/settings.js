var generalTab;
var appearenceTab;
var aboutTab;
var generalScreen;
var appearenceScreen;
var aboutScreen;

var shortcutContainer;

var DUPLICATED_SHORTCUTS_ERROR_MESSAGE = 'There is duplicated shortcuts';
var SAVE_SUCCESSFULL_MESSAGE = 'Settings saved';

function cloneObject(obj) {
    var newObj = (obj instanceof Array) ? [] : {};

    for (var i in obj) {
        if (i == 'clone') continue;
        if (obj[i] && typeof obj[i] == 'object') {
            newObj[i] = obj[i].clone();
        } else newObj[i] = obj[i];
    } return newObj;
};

function changeScreen(s) {
    var statusBar = document.getElementById('statusbar');

    switch (s) {
        case 'general':
            var tab = generalTab;
            var screen = generalScreen;
            statusBar.style.display = 'block';
            break;

        case 'appearence':
            var tab = appearenceTab;
            var screen = appearenceScreen;
            statusBar.style.display = 'block';
            break;

        case 'about':
            var tab = aboutTab;
            var screen = aboutScreen;
            statusBar.style.display = 'none';
            break;
    }

    var tabs = [generalTab, appearenceTab, aboutTab];
    var screens = [generalScreen, appearenceScreen, aboutScreen];

    for (var tabIndex in tabs) {
        if (tabs[tabIndex] === tab) {
            with (tabs[tabIndex]) {
                style.visibility = 'hidden';
                getElementsByClassName('tab-title')[0].style.visibility = 'visible';
            }
        } else {
            tabs[tabIndex].style.visibility = 'visible';
        }
    }

    for (var screenIndex in screens) {
        if (screens[screenIndex] === screen) {
            screens[screenIndex].style.display = 'block';
        } else {
            screens[screenIndex].style.display = 'none';
        }
    }
}

function addShortcutToLocalStore(shortcut) {
    var shortcuts = JSON.parse(localStorage.shortcuts);
    var shortcutId = localStorage.lastShortcutId;

    shortcut.id = parseInt(shortcutId) + 1;
    localStorage.lastShortcutId = shortcut.id;

    shortcuts[shortcuts.length] = shortcut;
    localStorage.shortcuts = JSON.stringify(shortcuts);
}

function addShortcutToDocument(shortcut) {
    var shortcutId = shortcut.id;

    var shortcutElement = document.createElement('div');
    shortcutElement.className = 'shortcut';
    shortcutElement.id = 'shortcut' + shortcutId;

    var keySelect1 = document.createElement('select');
    keySelect1.id = 'keySelect1_' + shortcutId;
    shortcutElement.appendChild(keySelect1);

    var text1 = document.createTextNode(' + ');
    shortcutElement.appendChild(text1);

    var keySelect2 = document.createElement('select');
    keySelect2.id = 'keySelect2_' + shortcutId;
    shortcutElement.appendChild(keySelect2);

    var text2 = document.createTextNode(' + Select - Translate to ');
    shortcutElement.appendChild(text2);

    var languageSelect = document.createElement('select');
    languageSelect.id = 'languageSelect' + shortcutId;
    shortcutElement.appendChild(languageSelect);

    if (shortcutId != 0) {
        var removeIcon = document.createElement('img');
        removeIcon.className = 'remove-icon';
        removeIcon.setAttribute('src', 'img/remove.png');
        removeIcon.addEventListener('click', function() { removeShortcut(shortcutId); }, false);
        shortcutElement.appendChild(removeIcon);
    }

    var keys = {
        'none': 'None',
        'ctrl': 'Ctrl',
        'alt': 'Alt',
        'shift': 'Shift',
        'meta': 'Meta'
    }

    for (var key in keys) {
        if (key != 'none') {
            var optionText1 = document.createTextNode(keys[key]);
            var optionElement1 = document.createElement('option');

            optionElement1.setAttribute('value', key);
            optionElement1.appendChild(optionText1);

            keySelect1.appendChild(optionElement1);
        }

        var optionText2 = document.createTextNode(keys[key]);
        var optionElement2 = document.createElement('option');

        optionElement2.setAttribute('value', key);
        optionElement2.appendChild(optionText2);

        keySelect2.appendChild(optionElement2);
    }

    keySelect1.value = shortcut.key1;
    keySelect2.value = shortcut.key2;

    var languages = {
        'ru': 'Russian',
        'en': 'English',
        'fr': 'Franch'
    }

    for (var language in languages) {
        var optionText = document.createTextNode(languages[language]);
        var optionElement = document.createElement('option');

        optionElement.setAttribute('value', language);
        optionElement.appendChild(optionText);

        languageSelect.appendChild(optionElement);
    }

    languageSelect.value = shortcut.language;

    shortcutContainer.appendChild(shortcutElement);
}

function getShortcutIndexById(shortcuts, shortcutId) {
    for (var index = 0; index < shortcuts.length; index++) {
        if (shortcuts[index].id == shortcutId) {
            return index;
        }
    }
}

function removeShortcut(shortcutId) {
    var shortcuts = JSON.parse(localStorage.shortcuts);
    var shortcutElement = document.getElementById('shortcut' + shortcutId);

    // Find shortcut in array.
    var index = getShortcutIndexById(shortcuts, shortcutId);

    shortcuts[index].removed = true;

    // Save modified array in localStore.
    localStorage.shortcuts = JSON.stringify(shortcuts);

    // Remove shortcut from document.
    shortcutContainer.removeChild(shortcutElement);
}

function wetherDuplicatedShortcutElements() {
    var shortcutElements = document.getElementsByClassName('shortcut');

    for (var element1Index = 0; element1Index < shortcutElements.length; element1Index++) {
        for (var element2Index = 0; element2Index < shortcutElements.length; element2Index++) {
            if (element1Index != element2Index) {
                var element1 = shortcutElements[element1Index];
                var element2 = shortcutElements[element2Index];
                var selectElements1 = element1.getElementsByTagName('select');
                var selectElements2 = element2.getElementsByTagName('select');

                if ((selectElements1[0].value == selectElements2[0].value) &&
                    (selectElements1[1].value == selectElements2[1].value)) {
                    return true;
                }
            }
        }
    }

    return false;
}

function saveShortcuts() {
    var shortcuts = JSON.parse(localStorage.shortcuts);
    var shortcutElements = document.getElementsByClassName('shortcut');

    if (wetherDuplicatedShortcutElements()) {
        return { 'successfull': false, 'errorMessage': DUPLICATED_SHORTCUTS_ERROR_MESSAGE };
    }

    // Remove shortcuts
    for (var index = 0; index < shortcuts.length; index++) {
        if (shortcuts[index].removed == true) {
            // Remove shortcut from array.
            shortcuts.splice(index, 1);
        }
    }

    for (var elementIndex = 0; elementIndex < shortcutElements.length; elementIndex++) {
        var shortcutElement = shortcutElements[elementIndex];
        var shortcutId = parseInt(shortcutElement.id.substr(8));
        var shortcutIndex = getShortcutIndexById(shortcuts, shortcutId);
        var selectElements = shortcutElement.getElementsByTagName('select');

        shortcuts[shortcutIndex].key1 = selectElements[0].value;
        shortcuts[shortcutIndex].key2 = selectElements[1].value;
        shortcuts[shortcutIndex].language = selectElements[2].value;
        shortcuts[shortcutIndex].saved = true;
    }

    localStorage.shortcuts = JSON.stringify(shortcuts);

    return { 'successfull': true };
}

function saveAppearence() {
    var appearence = {};

    appearence.fontFamily = document.getElementById('font-select').value;
    appearence.fontSize = document.getElementById('font-size-select').value;
    appearence.fontColor = document.getElementById('font-color-select').hexColor;
    appearence.backgroundColor = document.getElementById('background-color-select').hexColor;
    appearence.shadowColor = document.getElementById('shadow-color-select').hexColor;

    localStorage.appearence = JSON.stringify(appearence);
}

var timer = null;
function fadeElement(element) {
    if (timer == null) {
        element.style.visibility = 'visible';
        element.style.opacity = '1';
    }

    var opacity = parseFloat(element.style.opacity);
    if (opacity > 0.015) {
        element.style.opacity = opacity - 0.01;
        timer = setTimeout(function() { fadeElement(element); }, 20);
    }
    else {
        clearTimeout(timer);
        element.style.visibility = 'hidden';
        timer = null;
    }
}

var showTimer = null;
function showStatusMessage(message, isErrorMessage) {
    var saveStatusElement = document.getElementById('save-status');

    saveStatusElement.innerText = message;

    if (isErrorMessage) {
        saveStatusElement.style.color = 'red';
    }
    else {
        saveStatusElement.style.color = 'green';
    }

    clearTimeout(timer);
    timer = null;
    if (showTimer != null) {
        clearTimeout(showTimer);
    }
    saveStatusElement.style.visibility = 'visible';
    saveStatusElement.style.opacity = '1';
    showTimer = setTimeout(function() { fadeElement(saveStatusElement); }, 3000);
}

function saveSettings() {
    var s = saveShortcuts();

    saveAppearence();

    if (s.successfull == false) {
        showStatusMessage(s.errorMessage, true);
    }
    else {
        showStatusMessage(SAVE_SUCCESSFULL_MESSAGE, false);
    }
}

function changeColor(color) {
    var bubble = document.getElementById('bubble'),
        bubbleShadow = document.getElementById('bubble-shadow'),
        arrowDown = document.getElementById('arrow-down'),
        translation = document.getElementById('translation');

    switch (this.id) {
    case 'font-color-select':
        translation.style.color = color;
        break;
    case 'background-color-select':
        bubble.style.backgroundColor = color;
        bubbleShadow.style.backgroundColor = color;
        arrowDown.style.backgroundColor = color;
        break;
    case 'shadow-color-select':
        bubbleShadow.style.boxShadow = '0 0 5px 1px ' +  color;
        arrowDown.style.boxShadow = '0 0 5px 1px ' +  color;
        break;
    }
}

function turnIntoColorSelect(element, defaultColor, callback) {
    with (element.style) {
        display = 'inline-block';
        width = '90px';
        height = '23px';
        position = 'relative';
        border = '1px solid #727272';
        borderRadius = '3px';
    }

    element.hexColor = defaultColor;

    var colors = ['#FCE94F', '#EDD400', '#C4A000', '#C4A000', '#F57900', '#CE5C00',
                  '#E9B96E', '#C17D11', '#8F5902', '#8AE234', '#73D216', '#4E9A06',
                  '#729FCF', '#3465A4', '#204A87', '#AD7FA8', '#75507B', '#5C3566',
                  '#EF2929', '#CC0000', '#A40000', '#EEEEEC', '#D3D7CF', '#BABDB6',
                  '#888A85', '#666666', '#555753', '#2E3436', '#FFFFFF', '#000000'];

    var colorValueElemnt = document.createElement('input');
    colorValueElemnt.setAttribute('type', 'text');
    colorValueElemnt.setAttribute('value', defaultColor);
    colorValueElemnt.disabled = true;
    with (colorValueElemnt.style) {
        border = 'none';
        borderRadius = '3px';
        outline = 'none';
        display = 'block';
        width = '67px';
        height = '100%';
        marginLeft = '23px';
    }

    element.appendChild(colorValueElemnt);

    var colorSquareElement = document.createElement('div');
    colorSquareElement.addEventListener('click',
                                        function() { colorPalleteElemet.style.display = 'block'; },
                                        false);
    with (colorSquareElement.style) {
        position = 'absolute';
        left = '0';
        top = '0';
        margin = '2px';
        dispalay = 'inline-block';
        width = '19px';
        height = '19px';
        borderRadius = '3px';
        backgroundColor = defaultColor;
    }

    var colorPalleteElemet = document.createElement('div');
    with (colorPalleteElemet.style) {
        display = 'none';
        position = 'absolute';
        left = '0';
        top = '25px';
        padding = '5px 2px 2px 5px';
        backgroundColor = 'white';
        border = '1px solid #727272';
        width = '120px';
        zIndex = '999999';
    }

    for (var colorIndex = 0; colorIndex < colors.length; colorIndex++) {
        var colorElement = document.createElement('div');
        colorElement.colorIndex = colorIndex;
        with (colorElement.style) {
            width = '15px';
            height = '15px';
            display = 'inline-block';
            border = '1px solid black';
            float = 'left';
            margin = '0 3px 3px 0';
            backgroundColor = colors[colorIndex];
        }

        colorElement.addEventListener('click', function(e) { colorSquareElement.style.backgroundColor =
                                                            colors[this.colorIndex];
                                                            colorPalleteElemet.style.display = 'none';
                                                            colorValueElemnt.value = colors[this.colorIndex];
                                                            callback.call(element, colors[this.colorIndex]);
                                                            element.hexColor = colors[this.colorIndex];
                                                            e.stopPropagation(); },
                                                            false);
        colorPalleteElemet.appendChild(colorElement);
    }

    colorSquareElement.appendChild(colorPalleteElemet);
    element.appendChild(colorSquareElement);
}

window.onload = function() {
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        var settings = {};

        settings.extId = 'ipgccjoekgalifmnmoolgojgaaofkgab';
        settings.bingAppId = 'FEA3B73DEA9F7A311924116269D3094501970811';
        settigs.appearence = JSON.parse(localStorage.appearence);

        if (request === 'settings') {
            sendResponse(settings);
        }
    });

    generalTab = document.getElementById('general-tab');
    appearenceTab = document.getElementById('appearence-tab');
    aboutTab = document.getElementById('about-tab');

    generalScreen = document.getElementById('general');
    appearenceScreen = document.getElementById('appearence');
    aboutScreen = document.getElementById('about');

    generalTab.addEventListener('click', function () { changeScreen('general'); }, false);
    appearenceTab.addEventListener('click', function () { changeScreen('appearence'); }, false);
    aboutTab.addEventListener('click', function () { changeScreen('about'); }, false);

    shortcutContainer = document.getElementById('shortcut-container');

    changeScreen('general');

    var defaultShortcut = {
        'key1': 'ctrl',
        'key2': 'none',
        'language': 'en',
        'saved': false,
        'removed': false
    }

    if (('defaultShortcut' in localStorage) == false) {
        localStorage.defaultShortcut = JSON.stringify(defaultShortcut);
    }

    // If shortcuts is empty, add default shortcut.
    if (('shortcuts' in localStorage) == false) {
        var shortcuts = [];
        localStorage.shortcuts = JSON.stringify(shortcuts);
        localStorage.lastShortcutId = -1;

        var firstShortcut = cloneObject(defaultShortcut);
        firstShortcut.saved = true;
        addShortcutToLocalStore(firstShortcut);
        addShortcutToDocument(firstShortcut);
    }
    // Else add to document all exesting shortcuts.
    else {
        shortcuts = JSON.parse(localStorage.shortcuts);
        for (var shortcut in shortcuts) {
            shortcuts[shortcut].removed = false;
            if (shortcuts[shortcut].saved == true) {
                addShortcutToDocument(shortcuts[shortcut]);
            }
        }

        for (var shortcut in shortcuts) {
            if (shortcuts[shortcut].saved == false) {
                // Find shortcut in array.
                var index = getShortcutIndexById(shortcuts, shortcuts[shortcut].id);

                // Remove shortcut from array.
                shortcuts.splice(index, 1);
            }
        }
        localStorage.shortcuts = JSON.stringify(shortcuts);
    }

    var defaultAppearence =  {
        fontFamily: 'sans-serif',
        fontSize: '18px',
        fontColor: '#727272',
        backgroundColor: '#E3E3E3',
        shadowColor: '#3C81FF'
    }

    if (('appearence' in localStorage) == false) {
        localStorage.appearence = JSON.stringify(defaultAppearence);
    }

    var appearence = JSON.parse(localStorage.appearence);

    var popUp = document.getElementById('pop-up');
    popUp.style.fontFamily = appearence.fontFamily;
    popUp.style.fontSize = appearence.fontSize;

    var bubble = document.getElementById('bubble');
    bubble.style.backgroundColor = appearence.backgroundColor;

    var bubbleShadow = document.getElementById('bubble-shadow');
    bubbleShadow.style.backgroundColor = appearence.backgroundColor;
    bubbleShadow.style.boxShadow = '0 0 5px 1px ' +  appearence.shadowColor;

    var arrowDown = document.getElementById('arrow-down');
    arrowDown.style.backgroundColor = appearence.backgroundColor;
    arrowDown.style.boxShadow = '0 0 5px 1px ' +  appearence.shadowColor;

    var translation = document.getElementById('translation');
    translation.style.color = appearence.fontColor;

    var fontSelect = document.getElementById('font-select');
    fontSelect.value = appearence.fontFamily;
    fontSelect.addEventListener('change', function () {
        popUp.style.fontFamily = fontSelect.value;
    },
    false);

    var fontSizeSelect = document.getElementById('font-size-select');
    fontSizeSelect.value = appearence.fontSize;
    fontSizeSelect.addEventListener('change', function () {
        popUp.style.fontSize = fontSizeSelect.value;
    },
    false);

    var fontColorSelect = document.getElementById('font-color-select');
    turnIntoColorSelect(fontColorSelect, appearence.fontColor, changeColor);

    var backgroundColorSelect = document.getElementById('background-color-select');
    turnIntoColorSelect(backgroundColorSelect, appearence.backgroundColor, changeColor);

    var shadowColorSelect = document.getElementById('shadow-color-select');
    turnIntoColorSelect(shadowColorSelect, appearence.shadowColor, changeColor);

    var addShortcutButton = document.getElementById('add-shortcut-button');
    addShortcutButton.addEventListener('click', function() {
                                       addShortcutToLocalStore(defaultShortcut);
                                       addShortcutToDocument(defaultShortcut);
                                       }, false);

    var saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', saveSettings, false);
}
