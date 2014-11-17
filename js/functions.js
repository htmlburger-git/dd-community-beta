;(function(window, document, undefined) {
	'use strict';

	// Variable for the current scope
	var win = window;
	var doc = document;
	var visibilityClassNames = {
		'js': 'no-js',
		'nav': 'nav-visible',
		'dropdown': 'expanded',
		'notifications': 'notifications-visible',
		'readNotifications': 'no-notifications',
		'sidebar': 'sidebar-visible',
		'mobile': 'mobile-device',
		'desktop': 'desktop-device',
		'collapse': 'collapsed'
	};
	var htmlTag, wrapper;

	// Detect if the user is on a mobile device
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return ( isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() );
		}
	};

	// Toggle Dropdowns visibility
	function toggleDropdowns() {
		var dropdownTrigger = doc.querySelectorAll('.dropdown-trigger');
		var i = 0;

		for ( ; i < dropdownTrigger.length; i++ ) {
			dropdownTrigger[i].addEventListener('click', function(event) {
				event.preventDefault();

				this.parentNode.classList.toggle(visibilityClassNames.dropdown);
			}, false);
		}
	};

	// Toggle Notifications visibility
	function toggleNotifications() {
		var notificationsTrigger = doc.querySelectorAll('.link-notifications .dropdown-trigger');
		var i = 0;

		for ( ; i < notificationsTrigger.length; i++ ) {
			notificationsTrigger[i].addEventListener('click', function(event) {
				event.preventDefault();

				this.classList.add(visibilityClassNames.readNotifications);
				htmlTag.classList.remove(visibilityClassNames.nav);
				htmlTag.classList.toggle(visibilityClassNames.notifications);
			}, false);
		}
	};

	// Toggle Forums visibility
	function toggleElements() {
		var toggler = doc.querySelectorAll('.toggler');
		var i = 0;

		for ( ; i < toggler.length; i++ ) {
			toggler[i].addEventListener('click', function(event) {
				event.preventDefault();

				this.parentNode.classList.toggle(visibilityClassNames.collapse);
			}, false);
		}
	};

	// Document Ready Event
	document.addEventListener('DOMContentLoaded', function(event) {
		// Assign values to the empty variables above
		// We use the <html> tag and the ".wrapper" element
		htmlTag = doc.getElementsByTagName('html')[0];
		wrapper = doc.getElementById('wrapper');

		// Mobile Device check
		if ( isMobile.any() ) {
			// Add a class to the <html> tag if the user is on a mobile device
			htmlTag.classList.add(visibilityClassNames.mobile);

			// Toggle Dropdowns visibility
			toggleDropdowns(); 

			// Toggle Notifications visibility
			toggleNotifications(); 

			// Toggle Forums visibility
			toggleElements();
		} else {
			// Add a class to the <html> tag if the user is on a desktop device
			htmlTag.classList.add(visibilityClassNames.desktop);
		}

		// If the user has his javascript enabled, then we don't need the additional class of the <html> tag
		// We can however still use it to provide a fallback content if the user has decided to disable the javascript of his browser
		htmlTag.classList.remove(visibilityClassNames.js);

		// Set the background of the page using the image with id "siteBackground"
		// This image is a direct child of the ".wrapper" element.
		doc.getElementById('wrapper').style.backgroundImage = 'url(' + doc.getElementById('siteBackground').src + ')';

		// Toggle navigation visibility
		// This only works on a mobile device or a small viewport width
		// and closes all previously opened dropdowns inlucing notifcations.
		doc.querySelector('.bars').addEventListener('click', function(event) {
			event.preventDefault();

			var dropdowns = doc.querySelectorAll('.dropdown-holder');
			var i = 0;

			for ( ; i < dropdowns.length; i++ ) {
				dropdowns[i].classList.remove('expanded');
			}

			htmlTag.classList.remove(visibilityClassNames.notifications);
			htmlTag.classList.remove(visibilityClassNames.sidebar);
			htmlTag.classList.toggle(visibilityClassNames.nav);
		}, false);

		// Toggle sidebar visibility for tablet devices
		// This only works on a table device or a medium viewport width
		// and closes all previously opened dropdowns inlucing notifcations.
		doc.querySelector('.sidebar-toggle').addEventListener('click', function(event) {
			event.preventDefault();

			var dropdowns = doc.querySelectorAll('.dropdown-holder');
			var i = 0;

			for ( ; i < dropdowns.length; i++ ) {
				dropdowns[i].classList.remove('expanded');
			}

			htmlTag.classList.remove(visibilityClassNames.notifications);
			htmlTag.classList.remove(visibilityClassNames.nav);
			htmlTag.classList.toggle(visibilityClassNames.sidebar);
		}, false);
	}, false);

})(window, document);
