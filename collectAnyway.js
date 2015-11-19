function adExists() {
	return window['noBlocker'];
}

function gaExists() {
// This function checks if the regular Univeral Analytics pageview has loaded and returns true or false
	return typeof(ga) === 'function' && typeof(ga.getAll) === 'function';
}

function gtmExists() {
// This function checks if Google tag Manager has loaded and returns true or false
	return typeof(google_tag_manager) === 'function';
}

function getZ() {
	return (Math.round((new Date()).getTime() / 1000)).toString();
}

function getClientId() {
	return ga.getAll()[0].get('clientId');
}

function getFlashVersion(){
  // ie
  try {
    try {
      // avoid fp6 minor version lookup issues
      // see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
      var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
      try { axo.AllowScriptAccess = 'always'; }
      catch(e) { return '6'; }
    } catch(e) {}
    return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/Shockwave\sFlash\s(2\.0\s)?/g, "");
  // other browsers
  } catch(e) {
    try {
      if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
        return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/Shockwave\sFlash\s(2\.0\s)?/g, "");
      }
    } catch(e) {}
  }
  return '';
}

function getCookie(cookieName) {
    cookieName += '=';
    var cookieArray = document.cookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var selectedCookie = cookieArray[i];
        while (selectedCookie.charAt(0) == ' ') {
			selectedCookie = selectedCookie.substring(1);
		}
        if (selectedCookie.indexOf(cookieName) == 0) {
			return selectedCookie.substring(cookieName.length, selectedCookie.length);
		}
    }
    return '';
}

function setCookie(cookieName, cookieValue, expirationDays) {
	var cookieToSet = cookieName + '=' + cookieValue + ';';
	if (expirationDays != undefined) {
		var d = new Date();
		d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
		cookie += ' expires=' + d.toUTCString();
	}
	document.cookie = cookieToSet;
}

function collectAnyway() {
// This function will track an event in Universal Analytics with an
	var didAdLoad = adExists();
	var didAnalyticsLoad = gaExists();
	var didGtmLoad = gtmExists();

	var imgSrc = 'collectAnyway.php?'
		+ '&z=' + getZ() // Cache Buster
		+ '&cid=' + (didAnalyticsLoad ? getClientId() : '') // Client ID
		+ '&dr=' + encodeURIComponent(document.referrer) // Document Referrer
		+ '&sr=' + String(window.screen.width) + 'x' + String(window.screen.height) // Screen Resolution
		+ '&vp=' + String(window.screen.availWidth) + 'x' + String(window.screen.availHeight) // Viewport Size
		+ '&de=' + document.characterSet // Document Encoding
		+ '&sd=' + window.screen.pixelDepth // Screen Colors
		+ '&ul=' + navigator.language // User Language
		+ '&je=' + (navigator.javaEnabled() ? '1' : '0') // Java Enabled
		+ '&fl=' + encodeURIComponent(getFlashVersion()) // Flash Version
		+ '&dl=' + encodeURIComponent(window.location.href) // URL
		+ '&dt=' + encodeURIComponent(document.title) // Page Title
		+ '&ea=' + encodeURIComponent('test ad loaded: ' + didAdLoad + ', GA loaded: ' + didAnalyticsLoad + ', GTM loaded: ' + didGtmLoad); // Event Action

	var img = document.createElement('img');
	img.src = imgSrc;
	img.width = 1;
	img.height = 1;

	document.getElementsByTagName('body')[0].appendChild(img);
	setCookie('collectedAnyway', 'true');
}

if (getCookie('collectedAnyway') != 'true') {
	if (window.addEventListener) {
		window.addEventListener('load', collectAnyway);
	} else if (window.attachEvent) {
		window.attachEvent('onload', collectAnyway);
	}
}