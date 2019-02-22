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
var api_key = 'c8e1c50d7fe53e9c570ac9f7479fde6c';
amplitude.init(api_key, null, {
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
	
/*~~Sign Up - Log In Page*/
try {
	var element = document.getElementsByClassName('auth0-lock-social-button');
	//console.log(element[1].dataset.provider);
	//FB
	element[0].addEventListener("click", function(){ 		
			var properties = { Source : 'Facebook'};
			//alert ("0");
			amplitude.getInstance().logEvent('Sign Up', properties); });
	//Google
	element[1].addEventListener("click", function(){ 		
			var properties = { Source : 'Google'};
			//alert ("1");
			amplitude.getInstance().logEvent('Sign Up', properties); });
	//Email
	var form = document.getElementsByClassName('auth0-lock-center');
	form[0].addEventListener("submit", function(){ 		
			var properties = { Source : 'Email'};
			//alert ("2");
			amplitude.getInstance().logEvent('Sign Up', properties); });
	}
catch (e) {
	
}

/*End Sign up - Log In ~~*/

jQuery(document).ready(function( $ ) {
/*~~Main Page*/
	//Sign up button
	$(".menu-item-18").click(function(e) {
		var properties = { Button : 'Sign up'};
		console.log ($(this).text() );
		amplitude.getInstance().logEvent('Mainpage', properties);
	});
	//Log in button
	$(".menu-item-22").click(function(e) {
		var properties = { Button : 'Log in'};
		console.log ($(this).text() );
		amplitude.getInstance().logEvent('Mainpage', properties);
	});
	//Start earning interest today button
	$(".button-section").click(function(e) {
		var properties = { Button : 'Start earning interest today'};
		console.log ($(this).text() );
		amplitude.getInstance().logEvent('Mainpage', properties);
	});
/*End Main Page~~*/

/*~~app.whalelend.com Page*/
	//Cryptocurrency buttons
	$(".deposit-box-actions .action-button").click(function(e) {
		var properties = { Button: $(this).text() };
		amplitude.getInstance().logEvent('Deposit', properties);
	});
	//Invite friends button
	$(".navbar .md-invite").click(function(e) {
		var properties = { Button: $(this).text() };
		amplitude.getInstance().logEvent('Deposit', properties);
	});
/*End app.whalelend.com Page ~~*/

/*~~Invite Page*/
	$(".fb-btn").click(function(e) {
		var properties = { Button: 'Facebook'};
		amplitude.getInstance().logEvent('Invite', properties);
	});
	$(".twitter-btn").click(function(e) {
		var properties = { Button: 'Twitter'};
		amplitude.getInstance().logEvent('Invite', properties);
	});
	$(".link-btn").click(function(e) {
		var properties = { Button: 'Link'};
		amplitude.getInstance().logEvent('Invite', properties);
	});
/*End Invite Page~~*/

});

