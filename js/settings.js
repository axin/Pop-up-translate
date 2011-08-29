var generalTab;
var appearenceTab;
var aboutTab;
var generalScreen;
var appearenceScreen;
var aboutScreen;

var shortcutContainer;

function changeScreen(s) {
    switch (s) {
        case 'general':
            var tab = generalTab;
            var screen = generalScreen;
            break;

        case 'appearence':
            var tab = appearenceTab;
            var screen = appearenceScreen;
            break;

        case 'about':
            var tab = aboutTab;
            var screen = aboutScreen;
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

function addShortcut(shortcut) {
    var shortcutElement = document.createElement('div');
    shortcutElement.className = 'shortcut';

    var keySelect1 = document.createElement('select');
    shortcutElement.appendChild(keySelect1);

    var text1 = document.createTextNode(' + ');
    shortcutElement.appendChild(text1);

    var keySelect2 = document.createElement('select');
    shortcutElement.appendChild(keySelect2);

    var text2 = document.createTextNode(' + Select - Translate to ');
    shortcutElement.appendChild(text2);

    var languageSelect = document.createElement('select');
    shortcutElement.appendChild(languageSelect);

    var removeIcon = document.createElement('img');
    removeIcon.className = 'remove-icon';
    removeIcon.setAttribute('src', 'img/remove.png');
    shortcutElement.appendChild(removeIcon);

    var keys = {
        'none': 'None',
        'ctrl': 'Ctrl',
        'alt': 'Alt',
        'shift': 'Shift',
        'meta': 'Meta'
    }

    for (var key in keys) {
        var optionText1 = document.createTextNode(keys[key]);
        var optionElement1 = document.createElement('option');

        optionElement1.setAttribute('value', key);
        optionElement1.appendChild(optionText1);

        keySelect1.appendChild(optionElement1);

        var optionText2 = document.createTextNode(keys[key]);
        var optionElement2 = document.createElement('option');

        optionElement2.setAttribute('value', key);
        optionElement2.appendChild(optionText2);

        keySelect2.appendChild(optionElement2);
    }

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

    shortcutContainer.appendChild(shortcutContainer);
}

window.onload = function() {
    generalTab = document.getElementById('general-tab');
    appearenceTab = document.getElementById('appearence-tab');
    aboutTab = document.getElementById('about-tab');

    generalScreen = document.getElementById('general');
    appearenceScreen = document.getElementById('appearence');
    aboutScreen = document.getElementById('about');

    generalTab.addEventListener('click', function () { changeScreen('general'); }, false);
    appearenceTab.addEventListener('click', function () { changeScreen('appearence'); }, false);
    aboutTab.addEventListener('click', function () { changeScreen('about'); }, false);

    changeScreen('general');

    with (localStorage) {
        if (defaultShortcut == undefined) {
            defaultShortcut = {
                'key1': 'ctrl',
                'key2': 'none',
                'language': 'en'
            };
        }

        if (shortcuts == undefined) {
            shortcuts = new Array();
            shortcuts[0] = defaultShortcut;
        }
        
        for (var shortcut in shortcuts) {
            addShortcut(shortcuts[shortcut]);
        }
    }

    shortcutContainer = document.getElementById('shortcut-container');

    var addShortcutButton = document.getElementById('add-shortcut-button');
    addShortcutButton.addEventListener('click', function() { addShortcut(localStorage.defaultShortcut); }, false);
}
