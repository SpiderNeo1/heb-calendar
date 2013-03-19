
	var facebookUserId = "";
	var facebookUserObject="";
	var completedFacebookInitialization = false;
		
	// Obtain Events.
	function SetfacebookUserObjectAndGetEvents()
	{
		FB.api('/me', function(response) {
			facebookUserObject = response;
			GetEventsFromMySql();
			document.getElementById("FacebookDetails").innerHTML = "<p class='seriously-cross-platform'>Hi <b>"+response.first_name+"</b>, welcome back!</p>"
			document.getElementById("profilePicture").src = "https://graph.facebook.com/"+response.username +"/picture"
			document.getElementById("profilePicture").style.display = "block"
			facebookUserId = facebookUserObject.id;		  
			document.getElementById('calendar').contentWindow.location.reload(true);
			// Loaded Facebook logged in indication
			completedFacebookInitialization = true;
		});
	}
	function SetNotConnectedText()
	{
		document.getElementById("FacebookDetails").innerHTML = "<p class='seriously-cross-platform'>Login to Add and View Personal Events</p>"
		document.getElementById("profilePicture").style.display = "none"
		facebookUserId = ""
		facebookUserObject = "";
		// Loaded Facebook not logged in indication
		document.getElementById('calendar').contentWindow.location.reload(true);		
		completedFacebookInitialization = true;
	}
	
	// Sets User Events.
	function SetEventsToMySql(eventsStr)
	{
		if (facebookUserObject = "")
		{
			// Not logged in...
			return false;
		}
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		 {
		 if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				//alert(xmlhttp.responseText);
			}
		  }
		xmlhttp.open("GET","db/dbset.asp?user="+facebookUserObject.id+"&events="+eventsStr,true);
		xmlhttp.send();	
		return true;
	}
	/*
	 * Gets user events from database using Ajax.
	 */
	function GetEventsFromMySql() {
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		 {
		 if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				//alert(xmlhttp.responseText);
			}
		  }
		xmlhttp.open("GET","db/dbget.asp?user="+facebookUserObject.id,true);
		xmlhttp.send();
	}
	  // Additional JS functions here
	  
	  window.fbAsyncInit = function() {
		FB.init({
		  appId      : '615409268488523', // App ID
		  channelUrl : 'localhost/channel.html', // Channel File
		  status     : true, // check login status
		  cookie     : true, // enable cookies to allow the server to access the session
		  xfbml      : true  // parse XFBML

		});
		
		/*
		 * SUBSCRIBE TO AUTHORIZATION STATUS CHANGE.
		 *
		 */
		FB.Event.subscribe("auth.statusChange", function(response) {
		  if (response.status == "connected")
		  {
			SetfacebookUserObjectAndGetEvents();
			console.log("Setting connected text");
		  }
		  else 
		  {
			SetNotConnectedText();
			console.log("Setting disconnected text");
		  }

		  console.log(response);
		});			

		// Additional init code here
		FB.getLoginStatus(function(response) {
		  if (response.status === 'connected') {
			// connected
			//SetfacebookUserObjectAndGetEvents();
		  } else if (response.status === 'not_authorized') {
			//alert("Not Authorized");
			// not_authorized
			SetNotConnectedText();
		  } else {
			//alert("Not Logged In");
			// not_logged_in
			SetNotConnectedText();
		  }
		 });		  


	  };

	  // Load the SDK Asynchronously
	  (function(d){
		 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		 if (d.getElementById(id)) {return;}
		 js = d.createElement('script'); js.id = id; js.async = true;
		 js.src = "//connect.facebook.net/en_US/all.js";
		 ref.parentNode.insertBefore(js, ref);
	   }(document));
	  (function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=APP_ID";
		  fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));	   

	function logout() {
		FB.logout(function(response) {
			console.log('User is now logged out');
			SetNotConnectedText();
		});
	}
	function login() {
		FB.login(function(response) {
			if (response.authResponse) {
				SetfacebookUserObjectAndGetEvents();
				// connected
			} else {
				SetNotConnectedText();
				// cancelled
			}
		});
	}
