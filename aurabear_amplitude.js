/*Aurabear 2019 _ TuVu _ Amplitude JS*/
/*~~ Set up Amplitude*/
(function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
;r.type="text/javascript";r.async=true
;r.src="https://cdn.amplitude.com/libs/amplitude-4.4.0-min.gz.js"
;r.onload=function(){if(e.amplitude.runQueuedFunctions){
e.amplitude.runQueuedFunctions()}else{
console.log("[Amplitude] Error: could not load SDK")}}
;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)
;function s(e,t){e.prototype[t]=function(){
this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
var o=function(){this._q=[];return this}
;var a=["add","append","clearAll","prepend","set","setOnce","unset"]
;for(var u=0;u<a.length;u++){s(o,a[u])}n.Identify=o;var c=function(){this._q=[]
;return this}
;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
;for(var p=0;p<l.length;p++){s(c,l[p])}n.Revenue=c
;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"]
;function v(e){function t(t){e[t]=function(){
e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
e=(!e||e.length===0?"$default_instance":e).toLowerCase()
;if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]}
;e.amplitude=n})(window,document);
const amp_config = decodeURIComponent(atob('MjU3MDEyOGMzMzFhM2FmYWU2ZGJmMzk2M2VjOWVmZmY='));
amplitude.init(amp_config, null, {
      saveEvents: true,
      includeReferrer: true,
      includeUtm: true,
      saveParamsReferrerOncePerSession: false,
      unsetParamsReferrerOnNewSession: true,
      sessionTimeout: 10*60*1000,
      domain: '.whalelend.com'
    }, function() {
        console.log(amplitude.options.deviceId);
    });
/* End Set up Amplitude ~~*/

var attemptCount = 0;
// To do:
// Check for presense of JQuery file in page instead.
// Otherwise JQuery will be loaded a second time here:
if (typeof jQuery == 'undefined') {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
}

/*function switchLogInSignUp(){
    setTimeout(function (){
        jQuery('.auth0-lock-tabs a').unbind("click");
        jQuery('.auth0-lock-tabs a').bind("click", (function (e) {
	       console.log($(this).text());
		   tab = $(this).text();
	       switchLogInSignUp();
        }));
        jQuery('.auth0-lock-social-button .auth0-lock-social-button-text').unbind("click");
	    jQuery('.auth0-lock-social-button .auth0-lock-social-button-text').bind("click", (function(e) {
            var properties = { Button : $(this).text()};
			console.log($(this).text());
            amplitude.getInstance().logEvent(tab, properties);
	    }));
    }, 100);
}*/

function initMainpage() {
	//Auto send when open mainpage
	var properties = { Page : 'View mainpage'}; amplitude.getInstance().logEvent('Mainpage - View', properties);
	//Sign up button
	jQuery(document).on('click','.menu-item-18',function(){
		var properties = { Button : 'Sign up'};
		amplitude.getInstance().logEvent('Sign Up', properties);
	});
	//Log in button
	jQuery(document).on('click','.menu-item-22',function(){
		var properties = { Button : 'Login'};
		amplitude.getInstance().logEvent('Log In', properties);
	});
	//Start earning interest today button
	jQuery(document).on('click','.button-section',function(){
		var properties = { Button : 'Start earning interest today'};
		amplitude.getInstance().logEvent('Mainpage', properties);
	});
	//Start earning interest button
	jQuery(document).on('click','#wwh-start-btn',function(){
		var properties = { Button : 'Start earning interest'};
		amplitude.getInstance().logEvent('Mainpage', properties);
	});
}

//Login - Sign up Page ~~ rebind buttons if switch tab
function initLogInSignUp() {
	//last login pane
	jQuery(document).on('click','.auth0-lock-last-login-pane .auth0-lock-social-button',function(){
		var properties = { Button : 'Last Login by ' + $(this).data("provider")};
		amplitude.getInstance().logEvent('Log In', properties);
	});
	//not your account button
	jQuery(document).on('click','.auth0-lock-alternative',function(){
		setTimeout(function (){initLogInSignUp();}, 1000);
	});
	//google, facebook button
	jQuery(document).on('click','.auth0-lock-social-button .auth0-lock-social-button-text',function(){
		var tab = $('.auth0-lock-tabs-current a').text();
		var properties = { Button : $(this).text()};
		amplitude.getInstance().logEvent(tab, properties);
        });
	//SignUp button
	jQuery(document).on('click','.auth0-lock-with-terms .auth0-lock-submit',function(){
        var properties = { Button : 'Sign up with Email'};
        amplitude.getInstance().logEvent('Sign Up', properties);
    });
	//LogIn button
	jQuery(document).on('click','.auth0-lock:not(.auth0-lock-with-terms) .auth0-lock-submit',function(){
        var properties = { Button : 'Log in with Email'};
        amplitude.getInstance().logEvent('Log In', properties);
    });
}

function initWalletPage() {
	//Detect which tab in wallet page
	var url = new URL(window.location.href);
	var view = url.searchParams.get("view");
	if (view == null) {view = 'deposits';}
	var properties = { Page: view + ' viewed'};
	console.log(properties);
	amplitude.getInstance().logEvent('Deposit', properties);
}

function initFirstDepositPage() {
	//Cryptocurrency buttons
	jQuery(document).on('click', '.deposit-box-actions .action-button', function() {
		var properties = { Button: $(this).text() };
		console.log(properties);
		amplitude.getInstance().logEvent('Deposit', properties);
	});
	//Invite friends button
	jQuery(document).on('click', '.navbar .md-invite', function() {
		var properties = { Button: $(this).text() };
		amplitude.getInstance().logEvent('Invite', properties);
	});
	//refer a friend
	jQuery(document).on('click', '#onboard-refer-btn', function() {
		var properties = { Button: $(this).text() };
		amplitude.getInstance().logEvent('Invite', properties);
	});
}

function initInvitePage(){
	//fb button
	jQuery(document).on('click','.fb-btn',function(){
		var properties = { Button: 'Facebook'};
		console.log(properties);
		amplitude.getInstance().logEvent('Invite', properties);
	});
	//twitter button
	jQuery(document).on('click','.twitter-btn',function(){
		var properties = { Button: 'Twitter'};
		console.log(properties);
		amplitude.getInstance().logEvent('Invite', properties);
	});
	//link button
	jQuery(document).on('click','.link-btn',function(){
		var properties = { Button: 'Link'};
		console.log(properties);
		amplitude.getInstance().logEvent('Invite', properties);
	});
}

//check for URL change in wallet page
function detectURLChanged(){
	history.pushState = ( f => function pushState(){
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushState'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
	})(history.pushState);

	history.replaceState = ( f => function replaceState(){
		var ret = f.apply(this, arguments);
		window.dispatchEvent(new Event('replaceState'));
		window.dispatchEvent(new Event('locationchange'));
		return ret;
	})(history.replaceState);

	window.addEventListener('popstate',()=>{
		window.dispatchEvent(new Event('locationchange'))
	});
}

function init() {
	jQuery(document).ready(function() {
		// Everything has loaded!
		console.log('Amplitude is loaded!');
		
		/*~~Main Page*/
		if (window.location.href == 'https://whalelend.com/'){
			initMainpage();
		}
		/*End Main Page~~*/
		
		/*~~app.whalelend.com*/
		if (window.location.hostname == 'app.whalelend.com'){
			detectURLChanged();
			var url_string = window.location.href;
			//first time deposit page
			if (url_string == 'https://app.whalelend.com/'){initFirstDepositPage();}
			//Wallet page
			else {
				url_string = url_string.split('?')[0];
				if (url_string == 'https://app.whalelend.com/wallets'){initWalletPage();}
			}
			//add URL change event listerner for wallet page
			window.addEventListener('locationchange', function(){
				url_string = window.location.href;
				url_string = url_string.split('?')[0];
				if (url_string == 'https://app.whalelend.com/wallets'){initWalletPage();}
				if (window.location.href == 'https://app.whalelend.com/invite'){initInvitePage();}
			});
		}
		/*End app.whalelend.com~~*/

		/*~~Invite Page*/
		if (window.location.href == 'https://app.whalelend.com/invite'){initInvitePage();}
		/*End Invite Page~~*/
	
		/*~~Sign Up - Login Page*/
		if (window.location.hostname == 'whalelend.eu.auth0.com'){
			initLogInSignUp();
		}
		/*End Sign up - Log In ~~*/
	});
}

//Wait for jQuery to load before init
function waitForJQuery() {
    attemptCount++;
    if (typeof jQuery != 'undefined') { // JQuery is loaded!
        console.log("JQuery loaded!");
        init();    
        return;
    }
    if (attemptCount < 100) {
        setTimeout(waitForJQuery, 100); // Check 10x a second
    }
    return;
}

// Mozilla, Opera and webkit nightlies currently support this event
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", waitForJQuery(), false);
// If IE event model is used
} else if (document.attachEvent) {
    waitForJQuery();
} else {
	window.onload = waitForJQuery();
}