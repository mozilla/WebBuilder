

exports.main = function(options, callbacks) {
	var Window = require('window-utils'),
		Prefs = require('preferences-service'),
		windows = [],
		builders = [],
		locationPref = 'devtools.webbuilder.location',
		locationUrl = Prefs.get(locationPref) || 'http://webbuilder.mozilla.org';
		
	if (!Prefs.get(locationPref)) Prefs.set(locationPref, locationUrl);
	
	new Window.WindowTracker({
		onTrack: function(window) {
		
			var document = window.document,
				builderIndex = builders.indexOf(window),
				menuItem = document.querySelector('#appmenu_errorConsole');
			
			if (menuItem) {
				var item = document.createElement('menuitem');
					item.id = 'appmenu_webBuilder';
					item.label = 'Web Builder';
					item.addEventListener('click', function(e){
						builders.push(window.open('about:blank', 'web-builder-chrome-window', 'width=600,height=600,resizable=yes,scrollbars=no,chrome=yes'));
					}, false);
				
				var label = document.createElement('xul:label');
					label.className = 'menu-text';
					label.textContent = label.value = 'Web Builder';
					label.style.marginLeft = '2px';
					label.style.paddingStartValue = '1.45em';
					label.style.MozAppearance = 'menuitemtext';
			
				item.appendChild(label);
				menuItem.parentElement.insertBefore(item, menuItem);
			}
			
			if (builderIndex != -1) {
				document.location = locationUrl;
				window.addEventListener('unload', function(){
					builders.splice(builderIndex, 1);
				}, false);

			}
		},
		onUntrack: function(window) {
			var document = window.document,
				index = windows.indexOf(window);
			if (index != -1){
				var menuItem = document.querySelector('#appmenu_webBuilder');
				menuItem.parentElement.removeChild(menuItem);
			}
		}
	});
}
