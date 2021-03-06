;(function(window, document, undefined) {
	'use strict';

	// Variables for the current scope
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
		'collapse': 'collapsed',
		'formControls': 'show-controls',
		'visible': 'visible',
		'current': 'current',
		'modal': 'show-modal'
	};
	var scrollbars = [];
	var isMessengerPage = doc.querySelectorAll('.messenger').length > 0;
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

	// Comment areas
	// Expand textareas and show form buttons
	function shareboxControlsShow() {
		var textarea = doc.querySelectorAll('.sharebox-control');
		var i = 0;

		for ( ; i < textarea.length; i++ ) {
			textarea[i].addEventListener('focus', function(event) {
				this.parentNode.classList.add(visibilityClassNames.formControls);
			}, false);
		}
	};

	// Comment areas
	// Collapse textareas and hide form buttons
	function shareboxControlsHide() {
		var button = doc.querySelectorAll('.btn-cancel-share');
		var i = 0;

		for ( ; i < button.length; i++ ) {
			button[i].addEventListener('click', function(event) {
				event.preventDefault();

				var form = doc.getElementById(this.getAttribute('data-handle'));

				form.classList.remove(visibilityClassNames.formControls);
			}, false);
		}
	};

	// Some elements overlap due to position not static
	// We overwrite their z-index with JS since we do not know their exact count
	// e.g. article's comments element
	// @param obj / selector
	function setZindex(element) {
		var elements = doc.querySelectorAll(element);
		var zIndex = 99; // We assume that there will be no more than 100 elements per page.
		var i = 0;

		for ( ; i < elements.length; i++ ) {
			elements[i].style.zIndex = zIndex - i;
		}
	};

	// Tabs Functionality
	// Hide Tabs
	function hideTab() {
		var tabHandler = doc.querySelectorAll('.tab-handler');
		var tab = doc.querySelectorAll('.tab-media');
		var i = 0;

		for ( ; i < tab.length; i++ ) {
			tabHandler[i].parentNode.classList.remove(visibilityClassNames.current);
			tab[i].classList.remove(visibilityClassNames.visible);
		}
	};

	// Hide Tabs in Modal
	function hideModalTab() {
		var tab = doc.querySelectorAll('.modal .tab');
		var i = 0;

		for ( ; i < tab.length; i++ ) {
			tab[i].classList.remove(visibilityClassNames.visible);
		}
	};

	// Hide Admin Pages Elements
	function hideAdminPanels() {
		var adminTabTrigger = doc.querySelectorAll('.admin-tab');
		var adminPanel = doc.querySelectorAll('.admin-panel');
		var i = 0;

		for ( ; i < adminPanel.length; i++ ) {
			adminTabTrigger[i].parentNode.classList.remove(visibilityClassNames.current);
			adminPanel[i].classList.remove(visibilityClassNames.visible);
		}
	};

	// Hide visible Admin Page Element
	function hideAdminPanel() {
		var dismissButton = doc.querySelectorAll('.panel-dismiss');
		var i = 0;

		for ( ; i < dismissButton.length; i++ ) {
			dismissButton[i].addEventListener('click', function(event) {
				event.preventDefault();

				doc.getElementById(this.getAttribute('data-dismiss')).classList.remove(visibilityClassNames.visible);
			}, false);
		}
	};

	// Tabs Functionality
	// Show Tabs
	function tabs() {
		if ( win.innerWidth > 640 || isMessengerPage ) {
			var tabHandler = doc.querySelectorAll('.tab-handler');
			var i = 0;

			for ( ; i < tabHandler.length; i++ ) {
				tabHandler[i].addEventListener('click', function(event) {
					event.preventDefault();

					hideTab();

					this.parentNode.classList.add(visibilityClassNames.current);

					doc.getElementById(this.getAttribute('data-href')).classList.add(visibilityClassNames.visible);
				}, false);
			}
		}
	};

	// Show Tabs in Modal
	function modalTabs() {
		var tabHandler = doc.querySelectorAll('.modal-tab');
		var i = 0;

		for ( ; i < tabHandler.length; i++ ) {
			tabHandler[i].addEventListener('click', function(event) {
				event.preventDefault();

				hideModalTab();

				this.parentNode.classList.add(visibilityClassNames.current);
				
				document.getElementById(this.getAttribute('href').replace('#', '')).classList.add(visibilityClassNames.visible);
			}, false);
		}
	};

	// Show Tabs in Modal
	function adminPanels() {
		var adminTabTrigger = doc.querySelectorAll('.admin-tab');
		var i = 0;

		for ( ; i < adminTabTrigger.length; i++ ) {
			adminTabTrigger[i].addEventListener('click', function(event) {
				event.preventDefault();

				hideAdminPanels();

				this.parentNode.classList.remove(visibilityClassNames.current);
				
				document.getElementById(this.getAttribute('href').replace('#', '')).classList.add(visibilityClassNames.visible);

				if ( isMobile.any() ) {
					win.scrollTo(0, 0);
				}
			}, false);
		}
	};

	// Custom Scrollbars
	// https://github.com/cubiq/iscroll
	// http://iscrolljs.com/
	function customScrollBars() {
		var scrollable = doc.querySelectorAll('.scrollable');
		var i = 0;
		var scrollbar;

		for ( ; i < scrollable.length; i++ ) {
			// Create iScroll instances and init the custom scrollbar
			scrollbar = new IScroll(doc.getElementById(scrollable[i].id), {
				click: true,
				scrollbars: true,
				mouseWheel: true,
				interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: false
			});

			// Fill the array with each iScroll instance
			// We will use that array to resize each iScroll instance on window resize
			scrollbars.push(scrollbar);
		}
	};

	// Show active conversations on mobile device
	function toggleConversations() {
		var friends = doc.querySelectorAll('.list-friends li a');
		var i = 0;

		for ( ; i < friends.length; i++ ) {
			friends[i].addEventListener('click', function(event) {
				if ( isMobile.any() && win.innerWidth < 641 ) {
					event.preventDefault();

					doc.querySelector('.content').classList.add(visibilityClassNames.visible);
				}
			}, false);
		}

		if ( doc.querySelectorAll('#goBack').length > 0 ) {
			doc.getElementById('goBack').addEventListener('click', function(event) {
				if ( isMobile.any() && win.innerWidth < 641 ) {
					event.preventDefault();

					doc.querySelector('.content').classList.remove(visibilityClassNames.visible);
				}
			}, false);
		}
	};

	// Show inline Modal overlays
	function showInlineModals() {
		var modalTrigger = doc.querySelectorAll('.modal-trigger');
		var i = 0;

		for ( ; i < modalTrigger.length; i++ ) {
			modalTrigger[i].addEventListener('click', function(event) {
				event.preventDefault();

				var modal = this.getAttribute('href').replace('#', '');

				doc.getElementById(modal).classList.add(visibilityClassNames.visible)
				doc.getElementById('modalOverlay').classList.add(visibilityClassNames.visible);

				htmlTag.classList.remove(visibilityClassNames.nav);
				htmlTag.classList.add(visibilityClassNames.modal);
			}, false);
		}
	};

	// Hide inline Modal overlays
	function hideInlineModals() {
		var modalClose = doc.querySelectorAll('.modal-close');
		var i = 0;

		for ( ; i < modalClose.length; i++ ) {
			modalClose[i].addEventListener('click', function(event) {
				event.preventDefault();

				var modal = this.getAttribute('data-close');

				doc.getElementById(modal).classList.remove(visibilityClassNames.visible)
				doc.getElementById('modalOverlay').classList.remove(visibilityClassNames.visible);

				htmlTag.classList.remove(visibilityClassNames.modal);
			}, false);
		}
	};

	// Custom Selectbox overlay
	function customSelectOverlay() {
		var customSelect = doc.querySelectorAll('.custom-select select');
		var i = 0;

		for ( ; i < customSelect.length; i++ ) {
			customSelect[i].previousElementSibling.innerHTML = customSelect[i].options[customSelect[i].options.selectedIndex].innerHTML;

			customSelect[i].addEventListener('change', function(event) {
				this.previousElementSibling.innerHTML = this.options[this.options.selectedIndex].innerHTML;
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
				dropdowns[i].classList.remove(visibilityClassNames.dropdown);
			}

			htmlTag.classList.remove(visibilityClassNames.notifications);
			htmlTag.classList.remove(visibilityClassNames.sidebar);
			htmlTag.classList.toggle(visibilityClassNames.nav);
		}, false);

		// Toggle sidebar visibility for tablet devices
		// This only works on a tablet device or a medium viewport width
		// and closes all previously opened dropdowns inlucing notifcations.
		doc.querySelector('.sidebar-toggle').addEventListener('click', function(event) {
			event.preventDefault();

			var dropdowns = doc.querySelectorAll('.dropdown-holder');
			var i = 0;

			for ( ; i < dropdowns.length; i++ ) {
				dropdowns[i].classList.remove(visibilityClassNames.dropdown);
			}

			htmlTag.classList.remove(visibilityClassNames.notifications);
			htmlTag.classList.remove(visibilityClassNames.nav);
			htmlTag.classList.toggle(visibilityClassNames.sidebar);
		}, false);

		// Comment areas
		// Expand textareas and show form buttons
		shareboxControlsShow();

		// Comment areas
		// Collapse textareas and hide form buttons
		shareboxControlsHide();

		// Tabs Functionality
		tabs();
		modalTabs();
		adminPanels();
		hideAdminPanel();

		// Some elements overlap due to position !== static
		// We overwrite their z-index with JS since we do not know their exact count
		// e.g. article's comments
		setZindex('.article-comment');
		setZindex('.thread');
		setZindex('.sidebar-section .sidebar-body > ul > li');
		setZindex('.section-forums-single > ul > li');

		// Show active conversations on mobile device
		toggleConversations();

		// Show inline Modal overlays
		showInlineModals();

		// Hide inline Modal overlays
		hideInlineModals();

		// Custom Selectbox overlay
		customSelectOverlay();

		// window load event
		win.addEventListener('load', function() {
			// Custom Scrollbars
			// https://github.com/cubiq/iscroll
			// http://iscrolljs.com/
			customScrollBars();
		}, false);

		win.addEventListener('resize', function() {
			// Custom Scrollbars Reload on Window Resize - refresh() method.
			// https://github.com/cubiq/iscroll
			// http://iscrolljs.com/
			if ( isMessengerPage ) {
				for ( var i = 0; i < scrollbars.length; i++ ) {
					// Resize each iScroll instance depending on the height of its container
					scrollbars[i].refresh();
				}
			}
		}, false);
	}, false);

})(window, document);
