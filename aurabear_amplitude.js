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
var tab ='';
// To do:
// Check for presense of JQuery file in page instead.
// Otherwise JQuery will be loaded a second time here:
if (typeof jQuery == 'undefined') {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
}

function switchLogInSignUp(){
    setTimeout(function (){
        jQuery('.auth0-lock-tabs a').unbind("click");
        jQuery('.auth0-lock-tabs a').bind("click", (function (e) {
	       //console.log($(this).text());
		   tab = $(this).text();
	       switchLogInSignUp();
        }));
        jQuery('.auth0-lock-social-button .auth0-lock-social-button-text').unbind("click");
	    jQuery('.auth0-lock-social-button .auth0-lock-social-button-text').bind("click", (function(e) {
            var properties = { Button : $(this).text()};
            //alert($(this).text());
            amplitude.getInstance().logEvent(tab, properties);
	    }));
    }, 100);
}

function initLogInSignUp() {
    jQuery('.auth0-lock-social-button .auth0-lock-social-button-text').click (function(e) {
            var properties = { Button : $(this).text()};
            //alert($(this).text());
            amplitude.getInstance().logEvent(tab, properties);
        });
    jQuery('.auth0-lock-tabs a').click(function (e) {
        tab = $(this).text();
        switchLogInSignUp();
        //console.log($(this).text());
    });
    jQuery('.auth0-lock-with-terms .auth0-lock-submit').click(function(e) {
        var properties = { Button : 'Email'};
        //alert($(this).text() );
        amplitude.getInstance().logEvent('Log in', properties);
    });
    jQuery('.auth0-lock:not(.auth0-lock-with-terms) .auth0-lock-submit').click(function(e) {
        var properties = { Button : 'Email'};
        //alert($(this).text());
        amplitude.getInstance().logEvent('Sign up', properties);
    });
}

function init() {
	jQuery(document).ready(function( $ ) {
		/*~~Main Page*/
		if (window.location.hostname == 'whalelend.com'){
			setTimeout(function (){var properties = { Page : 'View mainpage'}; amplitude.getInstance().logEvent('Mainpage - View', properties);console.log('switched');}, 10000);
			//Sign up button
			$('.menu-item-18').click(function(e) {
				var properties = { Button : 'Sign up'};
				console.log ($(this).text() );
				amplitude.getInstance().logEvent('Sign Up', properties);
			});
			//Log in button
			$('.menu-item-22').click(function(e) {
				var properties = { Button : 'Login'};
				console.log ($(this).text() );
				amplitude.getInstance().logEvent('Log In', properties);
			});
			//Start earning interest today button
			$('.button-section').click(function(e) {
				var properties = { Button : 'Start earning interest today'};
				console.log ($(this).text() );
				amplitude.getInstance().logEvent('Mainpage', properties);
			});
			$('#wwh-start-btn').click(function(e) {
				var properties = { Button : 'Start earning interest'};
				console.log ($(this).text() );
				amplitude.getInstance().logEvent('Mainpage', properties);
			});
		}
		/*End Main Page~~*/
		
		/*~~app.whalelend.com*/
		if (window.location.hostname == 'app.whalelend.com'){
			var url_string = window.location.href;
			var url = new URL(url_string);
			url_string = url_string.split('?')[0];
			//Wallet page
			if (url_string == 'https://app.whalelend.com/wallet'){
				var view = url.searchParams.get("view");
				if (view == '') {view = 'wallet';}
				var properties = { Page: view + ' reviewed'};
				amplitude.getInstance().logEvent('Deposit', properties);
				}
			}
			//app.whalelend.com page
			else {
				//Currency select
				$('.currency-selection').click(function(e) {
					setTimeout(function (){
						$('.deposit-box-actions .action-button').unbind("click");
						$('.deposit-box-actions .action-button').bind("click", (function(e) {
							var properties = { Button: $(this).text() };
							amplitude.getInstance().logEvent('Deposit', properties);
						}));
					}, 10);
				});
				//Cryptocurrency buttons
				$('.deposit-box-actions .action-button').bind("click", (function(e) {
					var properties = { Button: $(this).text() };
					amplitude.getInstance().logEvent('Deposit', properties);
				}));
				//Invite friends button
				$('.navbar .md-invite').click(function(e) {
					var properties = { Button: $(this).text() };
					amplitude.getInstance().logEvent('Invite', properties);
				});
				//refer a friend
				$('#onboard-refer-btn').click(function(e) {
					var properties = { Button: $(this).text() };
					amplitude.getInstance().logEvent('Invite', properties);
				});
			}
		}
		/*End app.whalelend.com~~*/

		/*~~Invite Page*/
		if (window.location.href == 'https://app.whalelend.com/invite')
		{
			$('.fb-btn').click(function(e) {
				var properties = { Button: 'Facebook'};
				amplitude.getInstance().logEvent('Invite', properties);
			});
			$('.twitter-btn').click(function(e) {
				var properties = { Button: 'Twitter'};
				amplitude.getInstance().logEvent('Invite', properties);
			});
			$('.link-btn').click(function(e) {
				var properties = { Button: 'Link'};
				amplitude.getInstance().logEvent('Invite', properties);
			});
		}
		/*End Invite Page~~*/
	
		/*~~Sign Up - Login Page*/
		if (window.location.hostname == 'whalelend.eu.auth0.com'){
			if ($('.auth0-lock-last-login-pane').length){
				console.log('Last Login pane');
				//last login pane
				$('.auth0-lock-last-login-pane .auth0-lock-social-button').bind("click", (function(e) {
					var properties = { Button : 'Last Login by ' + $(this).data("provider")};
					//alert($(this).data("provider"));
					amplitude.getInstance().logEvent('Log In', properties);
				}));
				//not your account button
				$('.auth0-lock-alternative').click(function(e) {
					setTimeout(function (){initLogInSignUp();console.log('switched');}, 1000);
				});
			}
			else {
				tab = $('.auth0-lock-tabs-current a').text();
				initLogInSignUp();
			}
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