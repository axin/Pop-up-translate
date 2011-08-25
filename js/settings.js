var generalTab;
var appearenceTab;
var aboutTab;
var generalScreen;
var appearenceScreen;
var aboutScreen;

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
}
