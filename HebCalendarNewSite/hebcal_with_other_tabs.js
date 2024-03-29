﻿
//===================================================================================================================
//======================================G L O B A L  V A R I A B L E S===============================================
//===================================================================================================================
	//_IG_RegisterOnloadHandler(init);
	var loaded = false;
// Colour consts
	var BORDER_COLOR='#000000'
	var LIGHTBLUE_COLOR_CELLBACKGROUND='#c3d9ff'
	var HEADLINEFONT_COLOR='#ffffff'	
	var SHABBATHCELLBACKGROUND_COLOR='#80afff'
	var HINTCOLORBACKGROUND = '#c8d4fa'
	var CURRENTDAYCOLOR = '#cc0000'
	var HEADLINEBACKCOLOR = '#2d7bff'
	var OTHERMONTH_FORECOLOR = '#858585'
	var OTHERMONTH_FORECOLOR_WITHEVENT='#acacac'	
	var SHABBATHCELLBACKGROUND_COLOR_FIREFOX='rgb(128, 175, 255)'	
	var OTHERMONTH_FORECOLOR_WITHEVENT_FIREFOX='rgb(172, 172, 172)'	

	// XML Tree ENUM structure.
	var ENUM_XML_Nodes = {HebrewMonths : 0, HebrewDates : 1, GregorianMonths : 2, Holidays : 3, TabsName : 4, DaysOfWeek : 5, ShabbathText : 6, EventTextAnnually: 7, GeneralText: 8, EventTabText: 9, MessagesToUserInEventTab: 10, ListEventsTabText:11, AdarBetCases : 12, FeatureBox : 13 };
	
	var MAX_HOLIDAYS_COUNT = 100;
	var ENUM_Holidays = new Array(MAX_HOLIDAYS_COUNT);

	var ENUM_TabsNames = new Array(5);
	var arrDaysOfTheWeek = new Array("א","ב","ג","ד","ה","ו","ש");
	var ENUM_ShabbathText = new Array(3);
	var eventTextYearly = "Annually";
	var ENUM_GeneralText_EarliedOrPostponed = new Array(2);
	var ENUM_EventTabText = new Array(20);
	var ENUM_EventTabMessagesToUser = new Array(7);
	var ENUM_ListEventsTabText = new Array(5);
	var ENUM_AdarBetCases = new Array(3);
	
	var arrHebMonths;
	
	var ENUM_AdarBetCases = new Array(3);
	
	// USED FOR CONVERT DATES - BOTH NEED TO APPEAR
	
	var arrHebMonthsEng = new Array("Tshrei","Cheshvan","Kislev","Tevet","Shvat","Adar A","Adar","Nissan","Iyar","Sivan","Tamuz","Av","Elul")
	var ENUM_AdarBetCasesEng = new Array("Adar Bet","Adar");
	var arrHebDateEng = new Array("1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30")

	var arrHebMonthsHeb = new Array("תשרי","חשוון","כסלו","טבת","שבט","אדר א","אדר","ניסן","אייר","סיוון","תמוז","אב","אלול")
	var ENUM_AdarBetCasesHeb = new Array("אדר ב","אדר");
	var arrHebDateHeb = new Array("א","ב","ג","ד","ה","ו","ז","ח","ט","י","יא","יב","יג","יד","טו","טז","יז","יח","יט","כ","כא","כב","כג","כד","כה","כו","כז","כח","כט","ל")
	
	
	var ENUM_FeatureBox = new Array(3);
	
// End of colour consts
	var editingIndex=0;
	
	var arrComulativeDays = new Array(1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366);
	
	var currentGregOrHeb="AddGregDate";
	
	var chosenLanguage = "english"
	var divToInsertCalendar = "basiccalendar";
	
	var chosenLocation = "31,46,N,35,14,E,2"
	var directionOfForm = "ltr"
	
	var msg;
	var just = "ltr";
	var alPrev = "right";
	var	alNext = "left";
	var messages = new Array();
	var eventCount;
	
	var LeftToRight=true;
	var DESIGN_LOCATION="http://heb-calendar.googlecode.com/svn/trunk/images/design/"
	var loadingImageUrl = "http://heb-calendar.googlecode.com/svn/trunk/TodayFeature/loading.gif";
	var TD_W5H9 = "width='5' align='center' height='9' style='font-size:1px;' "
	var TD_W40H9 = "width='40' align='center' height='9' style='font-size:1px;' "
	var FULL_DAY = 5;
	var HALF_DAY = 4;
	var OTHER_WEEKDAY = 3;
	var CURRENT_WEEKDAY = 2;
	var OTHER_SATURDAY = 1;
	var CURRENT_SATURDAY = 0;
	var NONE=0;
	var toolTipCellText = Array(42);
	var currMonth=0;
	var currYear=0;
	var currDay=0;
	var currHebYear=0;
	var HEB_DATE = 0;  // identifying user event date type
	var GREG_DATE = 1; // identifying user event date type
	var doubleClickFlag=0;
 	var editMode=false;
 	var RunningForTheFirstTime=true;
	// Variable used to initiate reading from XML upon first execution only.
	var FirstRunReadFromXML = true;
 	
//--------------------------------------I M A G E S  V A R S  AND  S E T T I N G S----------------------------------------------- 	 	
 	// var but02 = new Image(26,38);
	// but02.src = DESIGN_LOCATION+"but_02"+just+".jpg";
	
	// var butB02 = new Image(26,38);
	// butB02.src = DESIGN_LOCATION+"butB_02"+just+".jpg";

	// var but04 = new Image(18,38);
	// but04.src = DESIGN_LOCATION+"but_04"+just+".jpg";
	// var butB04 = new Image(18,38);
	// butB04.src = DESIGN_LOCATION+"butB_04"+just+".jpg";

	// var but06 = new Image(18,38);
	// but06.src = DESIGN_LOCATION+"but_06"+just+".jpg";
	// var butB06 = new Image(18,38);
	// butB06.src = DESIGN_LOCATION+"butB_06"+just+".jpg";
	
	// var but08 = new Image(26,38);
	// but08.src = DESIGN_LOCATION+"but_08"+just+".jpg";
	// var butB08 = new Image(26,38);
	// butB08.src = DESIGN_LOCATION+"butB_08"+just+".jpg";

	// Will hold all holidays in an array of array of holidays in each month.
	var holidays = null;

	// Where images loaded? Set to false in the beginning otherwise should always remain true.
	var imagesLoadedRemotely=false;
	
	var xmlObjectData;
//===================================================================================================================	
//======================================E N D  O F  G L O B A L  V A R I A B L E S===================================
//===================================================================================================================
	/*
	 * The function is called when the gadget is first executeed and modifies the current month and year.
	 */
	function firstRun()
	{
		if (imagesLoadedRemotely == false)
		{
			loadImagesFromRemoteLocation();
		}
		var now = new Date();
		currMonth=now.getMonth()
		currYear=now.getUTCFullYear()
		currDay = now.getDate()
		writeCalendar();
	}
	
	function loadImagesFromRemoteLocation()
	{
		imagesLoadedRemotely = true;
		//--------------------------------------I M A G E S  V A R S  AND  S E T T I N G S----------------------------------------------- 	 	
		window.but02 = new Image(26,38);
		but02.src = DESIGN_LOCATION+"but_02"+just+".jpg";
		
		window.butB02 = new Image(26,38);
		butB02.src = DESIGN_LOCATION+"butB_02"+just+".jpg";

		window.but04 = new Image(18,38);
		but04.src = DESIGN_LOCATION+"but_04"+just+".jpg";
		window.butB04 = new Image(18,38);
		butB04.src = DESIGN_LOCATION+"butB_04"+just+".jpg";

		window.but06 = new Image(18,38);
		but06.src = DESIGN_LOCATION+"but_06"+just+".jpg";
		window.butB06 = new Image(18,38);
		butB06.src = DESIGN_LOCATION+"butB_06"+just+".jpg";
		
		window.but08 = new Image(26,38);
		but08.src = DESIGN_LOCATION+"but_08"+just+".jpg";
		window.butB08 = new Image(26,38);
		butB08.src = DESIGN_LOCATION+"butB_08"+just+".jpg";
	
	}
	
	// Trigger open XML - returns before XML is read.
	function ReadXMLAndSetData()
	{
		var url = "NamesXML.xml";
		
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }

		xmlhttp.onreadystatechange = response;
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
	}

	// callback function for XML read.
	// processes all XML nodes and creates all arrays.
	function response()
	{
		console.log("in response");
		// not ready yet.
		if (xmlhttp.readyState != 4)
		{
			return;
		}

		// First time - set XML object data to XML response.
		if (xmlObjectData == null)
		{
			xmlObjectData = xmlhttp.responseXML;
		}
		
		if (xmlObjectData == null)
		{
			document.write("Error while reading XML!");
			return;
		}

		
		var languagesAvailableList = xmlObjectData.getElementsByTagName("Language");
		//alert(languagesAvailableList);
		var chosenLanguageXMLList;
		 // For each <Language> node, get child nodes.
		 var nodeList = languagesAvailableList.item(0).childNodes;

		 // Loop through child nodes. Extract data from the text nodes that are
		 // the children of the associated name, price, and calories element nodes.
		for (var j = 0; j < nodeList.length ; j++) 
		{
			var node = nodeList.item(j);
			
			if (chosenLanguage == node.nodeName )
			{				
				break;
			}
		}
		// Check if explorer.
		var IE = document.all?true:false;
		
		// If explorer, j should remain as j. If not explorer, j should be - (j-1)/2;
		if (!IE)
		{
			j = (j - 1) / 2;
		}
		
		// Set hebrew months array.
		var tmp =  xmlObjectData.getElementsByTagName("HebrewMonths");
		tmp = tmp.item(j).firstChild.nodeValue;
		arrHebMonths = tmp.split(",");

		// Set jewish dates - 1,2 or א,ב
		var tmp =  xmlObjectData.getElementsByTagName("HebrewDates");
		tmp = tmp.item(j).firstChild.nodeValue;		
		arrHebDate = tmp.split(",");
		
		// Set Greogrian Months.
		var tmp =  xmlObjectData.getElementsByTagName("GregorianMonths");
		tmp = tmp.item(j).firstChild.nodeValue;				

		arrGregMonths = tmp.split(",");

		// Set Holidays			
		var tmp =  xmlObjectData.getElementsByTagName("Holidays");
		var holidayList = tmp.item(j).childNodes;				
			
		FromListToEnum(holidayList,ENUM_Holidays);
	
		
		// Create tabs list enum.
		var tmp =  xmlObjectData.getElementsByTagName("TabsName");
		var tabsList = tmp.item(j).childNodes;				
			
		FromListToEnum(tabsList,ENUM_TabsNames);	

		
		// Set Days Of Week.
		var tmp =  xmlObjectData.getElementsByTagName("DaysOfTheWeek");
		tmp = tmp.item(j).firstChild.nodeValue;
		arrDaysOfTheWeek = tmp.split(",");
		
		
		// Create shabbathText enum.
		var tmp =  xmlObjectData.getElementsByTagName("ShabbathText");
		var shabbathList = tmp.item(j).childNodes;			
	
		FromListToEnum(shabbathList,ENUM_ShabbathText);
											
		// Annuall text for annual events.
		var tmp =  xmlObjectData.getElementsByTagName("EventTextAnnually");
		eventTextYearly = tmp.item(j).firstChild.nodeValue;
		
		
		
		// Create GeneralText enum.
		var tmp =  xmlObjectData.getElementsByTagName("GeneralText");
		var generalTextList = tmp.item(j).childNodes;			
		
		FromListToEnum(generalTextList,ENUM_GeneralText_EarliedOrPostponed);
		
		// Create eventTab enum.
		var tmp =  xmlObjectData.getElementsByTagName("EventTabText");
		var eventTabText = tmp.item(j).childNodes;			

		FromListToEnum(eventTabText,ENUM_EventTabText);		

		// Create MessagesToUserInEventTab enum.
		var tmp =  xmlObjectData.getElementsByTagName("MessagesToUserInEventTab");
		var messagesToUserInEventTabText = tmp.item(j).childNodes;			
		
		FromListToEnum(messagesToUserInEventTabText,ENUM_EventTabMessagesToUser);		
		
		// Create ListEventsTab enum.
		var tmp =  xmlObjectData.getElementsByTagName("ListEventsText");
		var listEventsTabTexts = tmp.item(j).childNodes;			
		
		FromListToEnum(listEventsTabTexts,ENUM_ListEventsTabText);		
				
		// Create Adarbetcases enum.
		var tmp =  xmlObjectData.getElementsByTagName("AdarBetCases");
		var messagesAdarBetCasesText = tmp.item(j).childNodes;			
		
		FromListToEnum(messagesAdarBetCasesText,ENUM_AdarBetCases);		
	
		// Create featurebox enum.
		var tmp =  xmlObjectData.getElementsByTagName("FeatureBox");
		var messagesFeatureBoxText = tmp.item(j).childNodes;			

		
		FromListToEnum(messagesFeatureBoxText,ENUM_FeatureBox);		
		
		SetAllHolidays();
		
		loaded = true;
		// Set tab names
        $('#tabs ul:first li:eq(0) a').text(ENUM_TabsNames[0]);
		$('#tabs ul:first li:eq(1) a').text(ENUM_TabsNames[2]);
		$('#tabs ul:first li:eq(2) a').text(ENUM_TabsNames[3]);
		
	}


	// helper function, converts an XML node with children to an array.
	function FromListToEnum(list,arrEnum)
	{
		var count = 0;
		// loop over all Tabs Names
		for (var l = 0; l < list.length; l++)
		{
			// If isn't a text entry (each xml entry is followed by a text entry)
			if (list.item(l).firstChild != null)
			{										
				// Get the text string that represents the holiday.
				var tmp = list.item(l).firstChild.nodeValue;
				// Set text of holiday in holiday description enum.
				arrEnum[count] = tmp;
				// Increment number of hildays.
				count++;
			}
		}				
	}
	
	function ReloadCalendarInNewLanguage(languageToChangeTo)
	{
		SwitchLanguage(languageToChangeTo);
		
		// Reload calendar and all other tabs.
		writeCalendar();
		addEventForm("addevent");
		listEvents("showevents");

	}
	// Function to change ENUMS from one language to the other 
	function SwitchLanguage(languageToChangeTo)
	{
		// do nothing if its the same language.
		if (chosenLanguage == languageToChangeTo)
			return;
		chosenLanguage = languageToChangeTo;
		directionOfForm = (chosenLanguage == "hebrew" ? "rtl" : "ltr");
		// Update enums - if loaded already
		if (loaded == true)
		{
			response();
		}
	}

	
	// creates holidays array.
	function SetAllHolidays()
	{
	//--------------------------------------J E W I S H  H O L I D A Y S------------------------------------------------- 	
	
		//---TISHREY-1-//
		
		var roshHashana1 = new holiday(ENUM_Holidays[0], 1, 1,FULL_DAY);
		var roshHashana2 = new holiday(ENUM_Holidays[1], 1, 2,FULL_DAY);
		var tzomGdalia = new holiday(ENUM_Holidays[2], 1, 3,NONE);
				tzomGdalia.isTzom=1;
				tzomGdalia.isMovable=1;
		var erevYomKipur = new holiday(ENUM_Holidays[3], 1, 9,HALF_DAY);
		var YomKipur = new holiday(ENUM_Holidays[4], 1, 10,FULL_DAY);
		var erevSukot = new holiday(ENUM_Holidays[5], 1, 14, HALF_DAY);
		var sukot = new holiday(ENUM_Holidays[6], 1, 15, FULL_DAY);
		var sukot_holHamoed1 = new holiday(ENUM_Holidays[7], 1, 16,HALF_DAY);
		var sukot_holHamoed2 = new holiday(ENUM_Holidays[8], 1, 17,HALF_DAY);
		var sukot_holHamoed3 = new holiday(ENUM_Holidays[9], 1, 18,HALF_DAY);
		var sukot_holHamoed4 = new holiday(ENUM_Holidays[10], 1, 19,HALF_DAY);
		var sukot_holHamoed5 = new holiday(ENUM_Holidays[11], 1, 20,HALF_DAY);
		var sukot_hoshaanaRaba = new holiday(ENUM_Holidays[12], 1, 21,HALF_DAY);
		var sukot_shminiAtzeret = new holiday(ENUM_Holidays[13], 1, 22, FULL_DAY);
		//---HESHVAN-2-//
		var rabin = new holiday(ENUM_Holidays[14], 2, 12, NONE);
	rabin.isMovable = 1;
				rabin.isHistoricalEvent=1;
		//---KISLEV-3-//
		var erevHanuka = new holiday(ENUM_Holidays[15], 3, 24, NONE);
		var hanuka1 = new holiday(ENUM_Holidays[16], 3, 25, NONE);
		var hanuka2 = new holiday(ENUM_Holidays[17], 3, 26, NONE);
		var hanuka3 = new holiday(ENUM_Holidays[18], 3, 27, NONE);
		var hanuka4 = new holiday(ENUM_Holidays[19], 3, 28, NONE);
		var hanuka5 = new holiday(ENUM_Holidays[20], 3, 29, NONE);
		//---TEVET-4-//
		var hanuka6 = new holiday(ENUM_Holidays[21], 4, 1, NONE);
				hanuka6.isMovable=1;
		var hanuka7 = new holiday(ENUM_Holidays[22], 4, 2, NONE);
				hanuka7.isMovable=1;
		var hanuka8 = new holiday(ENUM_Holidays[23], 4, 3, NONE);
				hanuka8.isMovable=1;
		var tzomYudBetevet = new holiday(ENUM_Holidays[24], 4, 10, NONE);
				tzomYudBetevet.isTzom=1;
				tzomYudBetevet.isMovable=1;
		//---SHVAT-5-//
		var tuBeshvat = new holiday(ENUM_Holidays[25], 5, 15, NONE);
		//---ADAR-7-//
		var tzomTaanitEster = new holiday(ENUM_Holidays[26], 7, 13,NONE);
				//not maked as regular tzom since it's not postponed to Sunday when falls on Saturday
				tzomTaanitEster.isMovable=1;
		var purim = new holiday(ENUM_Holidays[27], 7, 14, HALF_DAY);
		var shushanPurim = new holiday(ENUM_Holidays[28], 7, 15, NONE);
		//---NISAN-8-//
		var erevPesah = new holiday(ENUM_Holidays[29], 8,14,HALF_DAY);
		var Pesah = new holiday(ENUM_Holidays[30], 8,15,FULL_DAY);
		var pesah_holHamoed1 = new holiday(ENUM_Holidays[31], 8, 16,HALF_DAY);
		var pesah_holHamoed2 = new holiday(ENUM_Holidays[32], 8, 17,HALF_DAY);
		var pesah_holHamoed3 = new holiday(ENUM_Holidays[33], 8, 18,HALF_DAY);
		var pesah_holHamoed4 = new holiday(ENUM_Holidays[34], 8, 19,HALF_DAY);
		var pesah_holHamoed5 = new holiday(ENUM_Holidays[35], 8, 20,HALF_DAY);
		var pesah_hagSheni = new holiday(ENUM_Holidays[36], 8, 21, FULL_DAY);
		var yomHashoa = new holiday(ENUM_Holidays[37], 8, 27, NONE);
				yomHashoa.isMovable=1;
				yomHashoa.isHistoricalEvent=1;
		//---IYAR-9-//
		var yomHazikaron = new holiday(ENUM_Holidays[38], 9, 4,HALF_DAY);
				yomHazikaron.isMovable=1;
				yomHazikaron.isHistoricalEvent=1;
		var yomHaatzmaut = new holiday(ENUM_Holidays[39], 9, 5, FULL_DAY);
				yomHaatzmaut.isHistoricalEvent=1;
				yomHaatzmaut.isMovable=1;
		var lagBaomer = new holiday(ENUM_Holidays[40], 9, 18, NONE);
		var yomYerushalaim = new holiday(ENUM_Holidays[41], 9, 28, NONE);
				yomYerushalaim.isHistoricalEvent=1;
		//---SIVAN-10-//
		var erevShavuot = new holiday(ENUM_Holidays[42], 10, 5, HALF_DAY);
		var Shavuot = new holiday(ENUM_Holidays[43], 10, 6, FULL_DAY);
		//---TAMUZ-11-//
		var tzomYudZain = new holiday(ENUM_Holidays[44], 11, 17, NONE);
				tzomYudZain.isTzom=1;
				tzomYudZain.isMovable=1;
		//---AV-12-//
		var tzomTetBeAv = new holiday(ENUM_Holidays[45], 12, 9, NONE);
				tzomTetBeAv.isTzom=1;
				tzomTetBeAv.isMovable=1;
		//---ALUL-13-//
		var erevRoshHashana = new holiday(ENUM_Holidays[46], 13, 29,HALF_DAY);
		//----------End of holidays----------//
		var holidays_01 = new Array(roshHashana1, roshHashana2, tzomGdalia, erevYomKipur, YomKipur, erevSukot, sukot, sukot_holHamoed1, sukot_holHamoed2, sukot_holHamoed3, sukot_holHamoed4, sukot_holHamoed5, sukot_hoshaanaRaba, sukot_shminiAtzeret);
		var holidays_02 = new Array(rabin);
		var holidays_03 = new Array(erevHanuka,hanuka1,hanuka2,hanuka3,hanuka4,hanuka5);
		var holidays_04 = new Array(hanuka6,hanuka7,hanuka8, tzomYudBetevet);
		var holidays_05 = new Array(tuBeshvat);
		var holidays_06 = new Array();
		var holidays_07 = new Array(tzomTaanitEster, purim, shushanPurim);
		var holidays_08 = new Array(erevPesah, Pesah, pesah_holHamoed1,pesah_holHamoed2,pesah_holHamoed3,pesah_holHamoed4,pesah_holHamoed5, pesah_hagSheni, yomHashoa);
		var holidays_09 = new Array(yomHazikaron, yomHaatzmaut, lagBaomer, yomYerushalaim);
		var holidays_10 = new Array(erevShavuot, Shavuot);
		var holidays_11 = new Array(tzomYudZain);
		var holidays_12 = new Array(tzomTetBeAv);
		var holidays_13 = new Array(erevRoshHashana);
			
		// Load holidays into holiday array.
		holidays = new Array(holidays_01,holidays_02,holidays_03,holidays_04,holidays_05,holidays_06,holidays_07,holidays_08,holidays_09,holidays_10,holidays_11,holidays_12,holidays_13);
	
	}

	// Helper function - load XML before starting.
	// functionToRun - function in string format to run.
	// tabId - tab id of the current tab to display a loading message.
	function ExecuteFunctionAfterReadingXML(functionToRun, tabId)
	{
		if (FirstRunReadFromXML == true)
		{
			var loadingImageHTML = "<br><center><img src='"+loadingImageUrl+"' border='0' /></center>";
			document.getElementById(tabId).innerHTML=loadingImageHTML;
			ReadXMLAndSetData();
			FirstRunReadFromXML = false;
		}
		setTimeout(functionToRun+"('"+tabId+"')", 500);
	}
	
	//======================================= WRITE CALENDAR ==========================================================
	
	/*
	 * This function actually creates the calendar's backbone. 
	 */
	function writeCalendar(){	

	if (loaded == false) 
	{	
		if (FirstRunReadFromXML == true)
		{
			var loadingImageHTML = "<br><left><img src='"+loadingImageUrl+"' border='0' /></left>";
			//document.body.innerHTML=loadingImageHTML;
			document.getElementById(divToInsertCalendar).innerHTML = loadingImageHTML;

			ReadXMLAndSetData();
			FirstRunReadFromXML = false;
		}
		setTimeout(writeCalendar,500);
		//alert("In Write Calendar");
		return;
	}
	editMode=false;
	currentGregOrHeb="";

	var text = ""
	// Create the table for the calendar.
	text="<div id='fb-root'></div><br><left>"
	text += "<table id='headl' borderColor="+BORDER_COLOR+" cellSpacing='0' cellPadding='0' style='border-collapse: collapse' border='0'>"

	text +="<tbody><tr><td><table cellSpacing='0' cellPadding='0' border='0' bgcolor="+LIGHTBLUE_COLOR_CELLBACKGROUND+" width='290'><tbody><tr>"
	// The << cell.
	text +="<td id=prevyear background='"+DESIGN_LOCATION+"cal_03"+just+".jpg' rowspan='2' colSpan='1' width='45' height='38' align='"+alPrev+"'>"
	text +="<a href='javascript:changedate(0,-1)'><img src='"+DESIGN_LOCATION+"but_02"+just+".jpg' onmousedown='this.src=butB02.src' onmouseup='this.src=but02.src' border='0' /></a></td>"
	// The < cell.
	text +="<td id=prevmonth background='"+DESIGN_LOCATION+"cal_04"+just+".jpg' rowspan='2' colSpan='1' width='33' height='38' align='right'>"
	text +="<a href='javascript:changedate(-1,0)'><img src='"+DESIGN_LOCATION+"but_04"+just+".jpg' onmousedown='this.src=butB04.src' onmouseup='this.src=but04.src' border='0' /></a></td>"

	// The return to today cell.
	text +="<td id=picture background='"+DESIGN_LOCATION+"cal_04"+just+".jpg' rowspan='2' colSpan='1' width='15' height='38' align='"+alPrev+"'>"
	text +="<a href='javascript:firstRun();changedate(0,0)'><img src='http://heb-calendar.googlecode.com/svn/trunk/TodayFeature/img1fin.gif' width='15' border='0' /></a></td>"
	// The headline cell

	text +="<td id=headline background='"+DESIGN_LOCATION+"cal_05"+just+".jpg' width='125' colSpan='3' height='21'><center><b><font size='3'>"
	text +=arrGregMonths[currMonth]
	text +="&nbsp;&nbsp;"+currYear
	// The > cell
	text +="<td id=nextmonth background='"+DESIGN_LOCATION+"cal_04"+just+".jpg' rowspan='2' colSpan='1' width='33' height='38' align='"+alNext+"'>"
	text +="<a href='javascript:changedate(1,0)'><img src='"+DESIGN_LOCATION+"but_06"+just+".jpg' onmousedown='this.src=butB06.src' onmouseup='this.src=but06.src' border='0' /></a></td>"
	// The >> cell
	text +="<td id=nextyear valign='Middle' background='"+DESIGN_LOCATION+"cal_07"+just+".jpg' rowspan='2' colSpan='1' width='45' height='38'  align='"+alNext+"'>"
	text +="<a href='javascript:changedate(0,1)'><img src='"+DESIGN_LOCATION+"but_08"+just+".jpg' onmousedown='this.src=butB08.src' onmouseup='this.src=but08.src' border='0' /></a></td>"
	text +="</tr><tr>"
	// The hebrew month headline (headlineheb)
	text +="<td  background='"+DESIGN_LOCATION+"cal_09"+just+".jpg' width='141' colSpan='3' height='17'><center><b><font size='1pt' color="+HEADLINEFONT_COLOR+"><span id=headlineheb>"
	text +="אלול תשסז - תשרי תשסח"
	text +="</span></font></td></tr></tbody></table></table>"
	text += "<table cellSpacing='0' cellPadding='0' style='border-collapse: collapse'>"
	text +="<tbody><tr><td><table cellSpacing='0' cellPadding='0' bgcolor="+LIGHTBLUE_COLOR_CELLBACKGROUND+" border='0' width='290'><tbody><tr>"
	// Days of the week row creation.


	text +="<td width='5' align='center' height='22' style='font-size:1px;'><img src='"+DESIGN_LOCATION+"cal_13"+just+".jpg' border=0/></td>"
	for (ii=0;ii<=5;ii++){
			text += "<td width='40' background='"+DESIGN_LOCATION+"cal_14"+just+".jpg' id=day"+ii+" style='cursor: default;'  align='center' height='22'><b><font size='4'>" + arrDaysOfTheWeek[ii] + "</font></b></td>"
		}
	text += "<td width='40' border='0' id=day6 style='cursor: default;' bgcolor="+SHABBATHCELLBACKGROUND_COLOR+" align='center' height='22'><b><font size='4'>" + arrDaysOfTheWeek[ii] + "</font></b></td>"
	text +="<td width='5' align='center' height='22' style='font-size:1px;'><img src='"+DESIGN_LOCATION+"cal_20"+just+".jpg' border=0/></td>"				
	text += "</tr>"
	aa = 0
	// All 42 calendar cells are created.
	// The Gregorian date - spI, The Hebrew date - hebI; (sp0-sp41,heb0-heb41)
		for (kk=0;kk<=5;kk++){
			text += "<tr>"
				backimgurl="";
				backimgurl = ((kk==5) ? "cal_22"+just+".jpg" : "cal_13"+just+".jpg");
			text +="<td width='5' height='22' style='font-size:10px;'><img src='"+DESIGN_LOCATION+""+backimgurl+"' border=0/></td>"			
			for (ii=0;ii<=6;ii++){
				backimgurl="";
				if ((ii==0)&&(kk==5)) backimgurl="background='"+DESIGN_LOCATION+"cal_23"+just+".gif'";
				if ((ii==6)&&(kk==5)) backimgurl="background='"+DESIGN_LOCATION+"cal_25"+just+".gif'";				
				text += "<td align='center' border='0' id='cellsp" + aa + "'><table style='width:40px; height:22px;' cellSpacing='0' cellPadding='0'><tr><td align='center' "+backimgurl+" ondblclick='doubleClickedCell("+aa+");' onclick='clickedCell("+aa+");' onmousemove='hint(event,"+aa+");' onmouseout='hintout()' style='font:14px Verdana;cursor:pointer;'><span id=sp"+aa+" color='yellow'>0</span><span id=heb" + aa + " color='yellow'><font size='1.5'> יא</font></span></td></tr></table></td>"
				aa += 1
			}
			backimgurl = ((kk==5) ? "cal_26"+just+".jpg" : "cal_20"+just+".jpg");
			text +="<td width='5' align='center' height='22' style='font-size:1px;'><img src='"+DESIGN_LOCATION+""+backimgurl+"' border=0/></td>"			
			text += "</tr>"
		}

			text += "<tr>"
			text +="<td "+TD_W5H9+" background='"+DESIGN_LOCATION+"cal_27"+just+".jpg'><img src='"+DESIGN_LOCATION+"cal_27"+just+".jpg' border=0/></td>"			
			text +="<td "+TD_W40H9+" background='"+DESIGN_LOCATION+"cal_28"+just+".jpg' >&nbsp;</td>"			
			var iii
			for (iii=0 ; iii<5 ; iii++) //bottom shade
				text +="<td "+TD_W40H9+" background='"+DESIGN_LOCATION+"cal_29"+just+".jpg' >&nbsp;</td>"			
			text +="<td "+TD_W40H9+" background='"+DESIGN_LOCATION+"cal_30"+just+".jpg' >&nbsp;</td>"			
			text +="<td "+TD_W5H9+" background='"+DESIGN_LOCATION+"cal_31"+just+".jpg' ><img src='"+DESIGN_LOCATION+"cal_31"+just+".jpg' border=0/></td>"			
			text += "</tr>"

	text += "</table>"
	text += "</td></tr>"
	text += "</table>"

	text+="<iframe src='http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FHebrew-Gregorian-Calendar%2F148828745164363&amp;layout=standard&amp;show_faces=false&amp;width=300&amp;action=recommend&amp;font=lucida+grande&amp;colorscheme=light&amp;height=35' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:300px; height:35px;' allowTransparency='true'></iframe>"
// Leave an empty line.
text+="<table id='emptyline' margin-left:'auto' margin-right:'auto'  bordercolor='white' cellspacing='0' cellpadding='2' style=' border-collapse: collapse; visibility:visible;'  border='1'>"
text+="<tr>"
text+="<td bgcolor='white'><font face='Arial' size='1' weight='bold'> <div id='emptylineinner'> "
text+="</div></font></td>"
text+="</tr>"
text+="</table>"

// FeatureBox
text+="<table id='featureBoxOuter' margin-left:'auto' margin-right:'auto'  bordercolor="+BORDER_COLOR+" cellspacing='0' cellpadding='2' style=' border-collapse: collapse; visibility:hidden;' border='1'>"
text+="<tr>"
text+="<td bgcolor="+HINTCOLORBACKGROUND+"><font face='Arial' size='2' weight='bold'> <div id='featureBox'>"
text+="</div></font></td>"
text+="</tr>"
text+="</table>"

// Leave an empty line.
text+="<table id='emptyline' margin-left:'auto' margin-right:'auto'  bordercolor='white' cellspacing='0' cellpadding='2' style=' border-collapse: collapse; visibility:visible;'  border='1'>"
text+="<tr>"
text+="<td bgcolor='white'><font face='Arial' size='1' weight='bold'> <div id='emptylineinner'> "
text+="</div></font></td>"
text+="</tr>"
text+="</table>"

// Clock Code

text+="<table id='clockBoxOuter' margin-left:'auto' margin-right:'auto'  bordercolor="+BORDER_COLOR+" cellspacing='0' cellpadding='2' style=' border-collapse: collapse; visibility:hidden;'  border='1'>"
text+="<tr>"
text+="<td bgcolor="+HINTCOLORBACKGROUND+"><font face='Arial' size='2' weight='bold'> <div id='clockBox'>"
text+="</div></font></td>"
text+="</tr>"
text+="</table>"

// End clock code.

	text+="<div id='messageBox' dir='rtl'></div>"
	text+="<div id='googleAdsense' dir='rtl' style='position: absolute; font-size:0.1em;visibility:hidden;'>סוכות, poker, calendar, holidays</div>"
	/* ADDED TOOLTIP CODE */

text+="<table id='hint' bordercolor="+BORDER_COLOR+" cellspacing='0' cellpadding='2' style='position: absolute;visibility:hidden; border-collapse: collapse ' border='1'>"
text+="<tr>"
text+="<td bgcolor="+HINTCOLORBACKGROUND+"><font face='Arial' size='2'> <div id='hintdesc'>"
text+="</div></font></td>"
text+="</tr>"
text+="</table>"

	/* TOOLTIP CODE END. */

	
	

	//document.body.innerHTML=text;
	document.getElementById(divToInsertCalendar).innerHTML = text;

	// Change the cells calendar according to the current month and year.
	changeCal();
	
	// Set the left and top of image id.
	
	changeCalHebrew();

	// Feature box will be displayed for 30 days.
	var dateFeatureAdded = new Date();
	var dateFromFeatureXML = ENUM_FeatureBox[0].split("/");
	dateFeatureAdded.setDate(dateFromFeatureXML[0]);
	dateFeatureAdded.setMonth(dateFromFeatureXML[1] - 1);
	dateFeatureAdded.setUTCFullYear(dateFromFeatureXML[2]);
	
	var todaysDate = new Date()
	
    // Value of one day in seconds - for calculation of difference between dates.
    var one_day=1000*60*60*24

    //Calculate difference btw the two dates, and convert to days	
    if(Math.ceil((todaysDate.getTime()-dateFeatureAdded.getTime())/(one_day)) < 31)
    {
		document.getElementById('featureBoxOuter').style.visibility = "visible";
		document.getElementById('featureBox').innerHTML="<a href='http://hebcalendar.blogspot.com/'  target='_blank'>"+ENUM_FeatureBox[1]+"</a>";													
    }
	//setTimeout("autoAdjustHeight()",500);
	RunningForTheFirstTime=false;
	
	// If clock should be displayed set time and interval.
	/*
	if (prefs.getString("clock")=="Show")
	{
	   document.getElementById('clockBoxOuter').style.visibility = "visible";
	   updateClock()
	   setInterval('updateClock()', 60000)
	}
		*/
	
	// Disable ability to select.
	var alltables=document.getElementsByTagName("table")
	for (var i=0; i<alltables.length; i++)
		disableSelection(alltables[i])
	// Check direction preferences and set to right to left / left to right accordingly.
	//if (prefs.getString("DocDirection")=="Right to Left"){
//		LeftToRight=false;
	//	document.dir="rtl"
	//}
	//else 
		{
			LeftToRight=true;
			document.dir="ltr"
		}
}

	/*
	 * The following function, changes the Gregorian dates displayed in the calendar.
	 */
	function changeCal(){

	var now = new Date
	var dd = now.getDate()
	currDay = dd
	var mm = now.getMonth()
	var yyyy = now.getUTCFullYear()
	
	var mmyyyy = new Date()
	
	var day1=getFirstDayOfTheMonth();
	var prevM = getPreviousMonth();
	
	// Array to hold the date numbers of all 42 cells of the calendar.
	var arrN = new Array(42)
	var aa
	var maxDaysPreviousMonth = maxDays((prevM),currYear)
	var maxDaysCurrMonth=maxDays(currMonth,currYear)
	// Set all days of the previous month up till the day of the week of the current month displayed
		for (ii=0;ii<day1;ii++){
			arrN[ii] =  maxDaysPreviousMonth - day1 + ii + 1
		}
		aa = 1
	// Set all days of the current month.
		for (ii=day1;ii<=day1+maxDaysCurrMonth-1;ii++){
			arrN[ii] = aa
			aa += 1
		}
		aa = 1
	// Set all days of the following month.
		for (ii=day1+maxDaysCurrMonth;ii<=41;ii++){
			arrN[ii] = aa
			aa += 1
		}
	
	var dCount = 0
	// Set all cell values to the arrN value in the current cell number.
		for (ii=0;ii<=41;ii++){
		// Days are either in the previous or following month.
			if (((ii<7)&&(arrN[ii]>20))||((ii>27)&&(arrN[ii]<20))){
				document.getElementById("sp" +ii).innerHTML = arrN[ii]+" "
			// Day is a saturday.
				if (dCount==6){
					changeStyleForCell(ii,OTHER_SATURDAY)
				}
				else{
					changeStyleForCell(ii,OTHER_WEEKDAY)
				}
			}
			else{
		 // Days are in current month.
				document.getElementById("sp"+ii).innerHTML = arrN[ii] + " "
				if ((dCount==6)){		
					changeStyleForCell(ii,CURRENT_SATURDAY)
				}
				else{
					changeStyleForCell(ii,CURRENT_WEEKDAY)
				}
				if ((arrN[ii]==dd)&&(mm==currMonth)&&(yyyy==currYear)){
						document.getElementById("sp"+ii).style.color=CURRENTDAYCOLOR
						document.getElementById("sp"+ii).style.fontWeight='bold'
						document.getElementById("heb"+ii).style.color=CURRENTDAYCOLOR
				}
			}
		dCount += 1
			if (dCount>6){
				dCount=0
			}
		}
 	// Change headline of Gregorian month.
		document.getElementById("headline").style.color='white'
		document.getElementById("headline").style.fontWeight='bold'
		document.getElementById("headline").align='center'
		document.getElementById("headline").bgColor=HEADLINEBACKCOLOR
		document.getElementById("headline").innerHTML=arrGregMonths[currMonth]+ "&nbsp;&nbsp;"+currYear
		
	}

/**
	* This function changes the cells in the calendar so that they
	* hold the correct hebrew date.
	**/
	function changeCalHebrew(){
			
	//dismissMiniMessages();
	//autoAdjustHeight();
	// Hebrew date array.

	var arrN = new Array(42)
	// Get the first date that appears in the calendar.
	var firstDateGregorian=parseInt(getFirstDayGregorian())
 	var prevM = getPreviousMonth()
 	var hebDaysTotal;
 	var hebDate;
 	/* Index1 denotes the first day of the current calendar presented.
 	 * Index2 denotes the last day of the current month presented.
 	 */
 	var index1=getFirstDayOfTheMonth();
 	var index2=index1 + parseInt(maxDays(currMonth,currYear)) - 1;
	var ii=0
	var mdyDate
	var i=0
	var indexFirsts=-1;
	var arrFirsts = new Array(3);
	var first=0
	var last=0
	// As long as we have yet to assign a value to all 42 cells
	while (ii<42)
	{
		// First Case - The current month has yet to begin (first few cells in the calendar)
		if (ii<index1)
		{
			// If the current month is January, convert to hebrew date using currYear-1
	 		if (currMonth==0)
	 		{
	 				hebDate=GregToHeb(new Date(currYear-1,prevM,firstDateGregorian+ii))	
	 				if (ii==0)
	 					arrFirsts[++indexFirsts]= new firstDates(0,hebDate)
	 		}
	 		// Else use this year and the previous month.
	 		else
	 		{
	 				hebDate=GregToHeb(new Date(currYear,prevM,firstDateGregorian+ii))
	 				if (ii==0)
	 					arrFirsts[++indexFirsts]= new firstDates(0,hebDate)
	 		}
	 	}
	 	// Second Case - We are in the current month.
	 	// Convert to gregorian the day we have reached (e.x the 10th of this month).
	 	else if ((ii>=index1) && (ii<=index2))
	 	{
	 		hebDate=GregToHeb(new Date(currYear,currMonth,ii-index1+1))
	 	}
	 	else
	 	{
	 	// Third Case - We have passed the current month.
	 		// If the current month is December, increase the year by 1.
	 		if (currMonth==11)
	 		{
	 				hebDate=GregToHeb(new Date(currYear+1,parseInt(getNextMonth()),ii-index2))	
	 		}
	 		// Else use this year and the next month.
	 		else
	 		{
	 				hebDate=GregToHeb(new Date(currYear,parseInt(getNextMonth()),ii-index2))
	 		}
	 	}
 		// Retrieve the amount of days in the month.
 		hebDaysTotal=daysInHebMonth(hebDate)
		// Retrieve month day and year from hebrew date (in that order)
		mdyDate = hebDate.split("/")
		// Retrieve the beginning of the month (This is not 1 iif this is the first day in the calendar
		first=parseInt(mdyDate[1])
		if ((first==1) && (ii!=0))
			arrFirsts[++indexFirsts]=new firstDates(ii,hebDate);
		// Set the last day of the month according to the ammount of days in that month.
		last=parseInt(hebDaysTotal)
		
		/* 
		 * Loop on all days in the month and store them in arrN - the array which holds the hebrew dates for each cell.
		 */
		for (i=first;i<=last;i++)
		{
			if (ii<42) 
				arrN[ii++]=arrHebDate[i-1]
			else break
		}
 	}
 	// Update each heb id with the corresponding hebrew letter and change its style.
	for (i=0;i<42;i++){
		document.getElementById("heb"+i).innerHTML=arrN[i]
		document.getElementById("heb"+i).style.font='10px Arial'
	}
	// Create the hebrew heading.
	document.getElementById("headlineheb").style.font='10px Arial'
	var currBeginDate=(GregToHeb(new Date(currYear,currMonth,1))).split("/")
	var currEndDate=(GregToHeb(new Date(currYear,currMonth,parseInt(maxDays(currMonth,currYear))))).split("/")
	var currMonthMid=(GregToHeb(new Date(currYear,currMonth,16))).split("/")
	
	var intCurrMonthBegin=parseInt(currBeginDate[0])
	var intCurrMonthEnd=parseInt(currEndDate[0])
	var intCurrMonthMid=parseInt(currMonthMid[0])
	var intCurrYear=parseInt(currBeginDate[2])
	currHebYear=intCurrYear;
	// If the current month ends before the beginning of Tishrey.
	if (intCurrMonthEnd!=1)
	{
		if (IsLeapYear(intCurrYear)){
			arrHebMonths[6]=ENUM_AdarBetCases[0]
		}
		// If the hebrew month of the 1st and the last days of the Gregorian month are the same display only
		// the specific month.
		if (intCurrMonthBegin==intCurrMonthEnd){
			document.getElementById("headlineheb").innerHTML=arrHebMonths[intCurrMonthEnd-1] + ' '+Nyear2Hyear(intCurrYear)	
		}
		// Fix for specific gregorian months were 3 hebrew months appear (January 1949)
		else if ((intCurrMonthBegin!=intCurrMonthMid) && (intCurrMonthMid!=intCurrMonthEnd)){
			document.getElementById("headlineheb").innerHTML=arrHebMonths[intCurrMonthBegin-1]+' - '+arrHebMonths[intCurrMonthMid-1] +' - '+arrHebMonths[intCurrMonthEnd-1] + ' '+Nyear2Hyear(intCurrYear)
		}
		else // If there are exactly 2 months to be displayed.
		{
		document.getElementById("headlineheb").innerHTML=arrHebMonths[intCurrMonthBegin-1]+' - '+arrHebMonths[intCurrMonthEnd-1] + ' '+Nyear2Hyear(intCurrYear)
		}
	}
	else
	{	
		document.getElementById("headlineheb").innerHTML= arrHebMonths[intCurrMonthBegin-1]+' '+Nyear2Hyear(intCurrYear)+' - '+arrHebMonths[intCurrMonthEnd-1]+' '+Nyear2Hyear(intCurrYear+1)
	}
	// Clear the tooltip text from the previous displayed month.
	for (ii=0;ii<=41;ii++){
		toolTipCellText[ii]=""
	}
	// Update the tooltip text.
	//alert(arrFirsts[0].Date+" "+arrFirsts[1].Date+" "+indexFirsts);
	showCalendarEvents(arrFirsts,indexFirsts);
	// Displayes the events - holidays etc.
	
	// Commented out due to FB AJAX waiting.
	
	
	showUserEvents();
	
	// Displays Knissat & Yetziaat shabbath.
	//if (prefs.getString("shabbathTimes")=="Show")
	{
		showZmaniKinsatVeyetziatShabbath();
	}


	}

	function updateClock ( )
    {
      var currentTime = new Date ( );
    
      var currentHours = currentTime.getHours ( );
      var currentMinutes = currentTime.getMinutes ( );
    
      // Pad the minutes and seconds with leading zeros, if required
      currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    
      // Choose either "AM" or "PM" as appropriate
      var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
    
      // Convert the hours component to 12-hour format if needed
      currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
    
      // Convert an hours component of "0" to "12"
      currentHours = ( currentHours == 0 ) ? 12 : currentHours;
    
      // Compose the string for display
      var currentTimeString = currentHours + ":" + currentMinutes + timeOfDay;
    
      // Update the time display
      document.getElementById("clockBox").innerHTML = currentTimeString;
    }
	
	
	/*
	 * This function handles the style of different cells based on their type.
	 */		
	function changeStyleForCell(numid,cellStyle){
	
	dayid = document.getElementById("sp"+numid);	
	hebid = document.getElementById("heb"+numid);		
	id = document.getElementById("cellsp"+numid);
		id.borderWidths=0
		id.style.font='14px Verdana'
		dayid.style.font='14px Verdana'
		id.borderWidths='0'			
		id.font='Verdana'
		//id.onmouseout=function(){hintout(); doubleClickFlag = 0; }
		// Based on cellStyle (const from program, modify the cell style)
		switch (cellStyle){
			case CURRENT_SATURDAY: //Setting changes for CURRENT Saturday
				id.style.backgroundColor=SHABBATHCELLBACKGROUND_COLOR
				dayid.style.color='black'
				hebid.style.color='black'
				id.style.backgroundImage=''
				break
			case OTHER_SATURDAY: //Setting changes for OTHER Saturday
				id.style.backgroundColor=SHABBATHCELLBACKGROUND_COLOR
				dayid.style.color=OTHERMONTH_FORECOLOR
				hebid.style.color=OTHERMONTH_FORECOLOR 
				id.style.backgroundImage=''	
				break
			case CURRENT_WEEKDAY: //Setting changes for CURRENT weekday
				id.style.backgroundColor=LIGHTBLUE_COLOR_CELLBACKGROUND
				dayid.style.color='black'
				hebid.style.color='black'
				id.style.backgroundImage=''
				break
			case OTHER_WEEKDAY: //Setting changes for OTHER weekday
				id.style.backgroundColor=LIGHTBLUE_COLOR_CELLBACKGROUND
				dayid.style.color=OTHERMONTH_FORECOLOR_WITHEVENT
				hebid.style.color=OTHERMONTH_FORECOLOR_WITHEVENT
				id.style.backgroundImage=''
				break
			case HALF_DAY: // Setting changes for half days.
				dayid.style.fontWeight='bold'
				if ((id.style.backgroundColor==SHABBATHCELLBACKGROUND_COLOR)||(id.style.backgroundColor==SHABBATHCELLBACKGROUND_COLOR_FIREFOX)) 
					{
						id.style.backgroundImage=''; //Don't update HALF_DAY for saturdays
						break;
					}
				if (dayid.style.color==OTHERMONTH_FORECOLOR_WITHEVENT|| dayid.style.color==OTHERMONTH_FORECOLOR_WITHEVENT_FIREFOX){	//Change forecolor to stronger gray
					dayid.style.color=OTHERMONTH_FORECOLOR 
					hebid.style.color=OTHERMONTH_FORECOLOR 
				}
				id.style.backgroundImage="url("+DESIGN_LOCATION+"half"+just+".jpg)"
				break
			case FULL_DAY:
				if (dayid.style.color==OTHERMONTH_FORECOLOR_WITHEVENT || dayid.style.color==OTHERMONTH_FORECOLOR_WITHEVENT_FIREFOX)	{//Change forecolor to stronger gray
					dayid.style.color=OTHERMONTH_FORECOLOR 
					hebid.style.color=OTHERMONTH_FORECOLOR 
				}
				id.style.backgroundColor=SHABBATHCELLBACKGROUND_COLOR
				dayid.style.fontWeight='bold'
				break
		}

	}
	
	//======================================= END OF WRITE CALENDAR ===================================
	//=================================================================================================
	
	// ===================================== Kinssat / Yetziat Shabbath Handlers ======================
	
	/*
	 * Returns 1 if current year is a leap year.
	 */
	function isGregorianLeapYear(y) 
	{
		return ((y % 400 == 0) || (y % 100 != 0 && y % 4 == 0));
	}

	/*
	 * Returns the amount of days passed since the beginning of the year.
	 */
	function daysSinceYearBegun(d, m, y) 
	{
		m--;
		// Add the number of days passed + 1 if the current year is a leap year.
		return arrComulativeDays[m] + d + (m > 2 && isGregorianLeapYear(y));
	}
	

	/*
	 * This extremely complicated function, calculates the sunrise and sunset times.
	 * Sunrise is stored at ret$[1]
	 * Sunset is stored at ret$[2]
	 * (ret$[0] - returns the status of the execution where 0 means success.
	 */	
	function suntime(
	dy, mn, yr,
	sundeg, sunmin,
	londeg, lonmin, ew,
	latdeg, latmin, ns,
	timezone)
	{
		if (ew == "W")
			ewi = -1;
		else
			ewi = 1;
	
		if (ns == "N")
			nsi = 1;
		else
			nsi = -1;
			
	
		var success = 0;	// error code stored here.
	
		longitude = (londeg + lonmin/60.0) * ewi;
		latitude  = (latdeg + latmin/60.0) * nsi;
	
		
	
		var yday = daysSinceYearBegun(dy, mn, yr);
	
		
		var A = 1.5708; 
		var B = 3.14159; 
		var C = 4.71239; 
		var D = 6.28319;      
		var E = 0.0174533 * latitude; 
		var F = 0.0174533 * longitude; 
		var G = 0.261799 * timezone; 
	
		var R = Math.cos(0.01745 * (sundeg + sunmin/60.0));
	
		var J;
	
		// twice through the loop
		//    i=0 is for sunrise
		//    i=1 is for sunset
		for (i = 0; i < 2; i++) 
			{ 
		
				if(!i)
					J =  A;	// sunrise 
				else
					J = C;	// sunset
		
				var K = yday + ((J - F) / D); 
				var L = (K * .017202) - .0574039;              // Solar Mean Anomoly 
				var M = L + .0334405 * Math.sin(L);            // Solar True Longitude 
				M += 4.93289 + (3.49066E-04) * Math.sin(2 * L); 
				
				// Quadrant Determination 
				if (D == 0) {
					// SHOULD NOT HAPPEN - ERROR HAS OCCURRED.	
					status = 1;
				} 
		
				while(M < 0)
					M = (M + D);
		
				while(M >= D)
					M = (M - D);
		
				if ((M / A) - Math.floor(M / A) == 0)
					M += 4.84814E-06;
		
				var P = Math.sin(M) / Math.cos(M);                   // Solar Right Ascension 
				P = Math.atan2(.91746 * P, 1); 
		
				// Quadrant Adjustment 
				if (M > C)
					P += D;
				else {
					if (M > A)
						P += B;
				} 
		
				var Q = .39782 * Math.sin(M);      // Solar Declination 
				Q = Q / Math.sqrt(-Q * Q + 1);     // This is how the original author wrote it! 
				Q = Math.atan2(Q, 1); 
		
				var S = R - (Math.sin(Q) * Math.sin(E)); 
				S = S / (Math.cos(Q) * Math.cos(E)); 
		
				if(Math.abs(S) > 1)
					status = 1;	// uh oh! no sunrise/sunset
		
				S = S / Math.sqrt(-S * S + 1); 
				S = A - Math.atan2(S, 1); 
		
				if(!i)
					S = D - S;	// sunrise
		
				var T = S + P - 0.0172028 * K - 1.73364;  // Local apparent time 
				var U = T - F;                            // Universal timer 
				var V = U + G;                            // Wall clock time 
				
				// Quadrant Determination 
				if(D == 0) {
					// SHOULD NOT HAPPEN - ERROR HAS OCCURRED.
					status = 1
				} 
				
				while(V < 0)
					V = V + D;
				while(V >= D)
					V = V - D;
				V = V * 3.81972; 
		
				if(!i)
					sunrise = V;	// sunrise
				else
					sunset = V;	// sunset
			} 

		var returnArray = new Array(status,sunrise,sunset);
	
		return returnArray;
	}
	
	/*
	 * Converts the time received from the function "suntime" to a 24 hour time.
	 * ret$ = "hour : minutes" 
	 */
	function adjustTime(t) 
	{
		var hour;
		var min;
	
		var time = t;
	
		var hour = Math.floor(time);
	
		var min  = Math.floor((time - hour) * 60.0 + 0.5);
	
		if (min >= 60) {
			 hour += 1;
			 min  -= 60;
		}
		
		var ReturnTime = hour + ':' + ((min < 10) ? '0' : '') + min;
	
		return ReturnTime;
	
	}

	/*
	 * This function calculates the Knissat & Yetziaat shabbath times.
	 * It is currently set to calculate the time based on Jerusalem (no day light saving time)
	 */
  function calculateZmaniKinsatVeyetziatShabbath(dayG,monthG,yearG)
  {
		var locationCoords = chosenLocation.split(",");
		NorthOrSouth = locationCoords[2];//"N";
		latd = parseInt(locationCoords[0]);//31;
		latm = parseInt(locationCoords[1]);//46;
		EastOrWest = locationCoords[5];//"E";
		lngd = parseInt(locationCoords[3]);//35;
		lngm = parseInt(locationCoords[4]);//14;
		tz = parseInt(locationCoords[6]);
		
		var arrZmanimRet = Array(2);
	
		var yom = new Date (yearG, monthG, dayG);
		// Check daylight saving time.
		// Daylight saving time in Israel: From the friday before the 2nd of April untill 10th of Tishrei.
		hebDate=GregToHeb(new Date (yearG, monthG, dayG));
		hebDateApril2=GregToHeb(new Date (yearG, 3, 2));

		var mdyDate = hebDate.split("/")
		var mdyDateApril2 = hebDateApril2.split("/")
		
		// Only if we are in Israel.
		// NOTE: THIS IS A KNOWN BUG - ALL +2 GMT WILL
		// ACT AS DAYLIGHT SAVING TIME IS IN ISRAEL.
		if (tz == 2)
		{
			// If after the 2nd of April
			if ((monthG > 2) && (dayG > 1))
			{
				// If we are in the same hebrew year as the 2nd of april it means we are before the
				// 10th of Tishrei - hence Daylight saving time applies.
				if (mdyDate[2] == mdyDateApril2[2]) 
				{
					tz++;
				}
				// If we are a year after the 2nd of April, check to see if we are before the 10th
				// of Tishrei - DST still applies.
				else if ((mdyDate[2] > mdyDateApril2[2])
								&& (mdyDate[0] == 1)
								&& (mdyDate[1] < 10))
				{
					tz++;
				}
				
			}
		}
		// motzei shabbat (3 small stars)
		time = suntime(dayG, monthG+1, yearG, 98, 30, lngd, lngm, EastOrWest, latd, latm, NorthOrSouth, tz);

		// If Sunset and sunrise have been calculated successfully.
		if(time[0] == 0)
		{
			// Set zman Yetsiat shabbath.
			arrZmanimRet[1] = adjustTime(time[2]);

		}
		
		// Kinssat Shabbath
		var day_before = new Date(yom.getTime() - 86400000);
		db = day_before.getDate();
		mb = day_before.getMonth() + 1;
		yb = day_before.getUTCFullYear();

		time = suntime(db, mb, yb, 90, 50, lngd, lngm, EastOrWest, latd, latm, NorthOrSouth, tz);
		// Set zman Kinssat shabbath
		arrZmanimRet[0] = adjustTime(time[2] - 40.0/60.0);
	

 	
 		return arrZmanimRet;
  }

	function showZmaniKinsatVeyetziatShabbath()
	{

	var ii;
	var ZmaniShabbath = Array(2);
	
	var firstDayDisplayed=getFirstDayGregorian();
	var day1=getFirstDayOfTheMonth();
	
	var prevM = getPreviousMonth();
  var nextM = getNextMonth();
  
  var prevY = (currMonth == 0) ? (currYear - 1) : currYear;
  var nextY = (currMonth == 11) ? (currYear + 1) : currYear;
	  
  var maxDaysPreviousMonth = maxDays((prevM),currYear);
	var maxDaysCurrMonth=maxDays(currMonth,currYear);

	// Set all zmani shabbath for fridays of the previous month;
	for (ii=0 ; ii<day1 ; ii++){
		if ((ii % 7) == 5) // If Friday
		{
			ZmaniShabbath = 
								calculateZmaniKinsatVeyetziatShabbath(eval(firstDayDisplayed +"+"+ ii),prevM,prevY);
		
			if (toolTipCellText[ii] != "")		//event description will be displayed in a new line
					toolTipCellText[ii] += "<BR>"
			toolTipCellText[ii] += ENUM_ShabbathText[0] + ZmaniShabbath[0];

			if (toolTipCellText[ii+1] != "")		//event description will be displayed in a new line
					toolTipCellText[ii+1] += "<BR>"
			toolTipCellText[ii+1] += ENUM_ShabbathText[1] + ZmaniShabbath[1];
		}
	}
	// Set all zmani shabbath for fridays of the current month;
	for (ii=day1;ii<=day1+maxDaysCurrMonth-1;ii++){
		if (ii % 7 == 5) // If Friday
		{
			ZmaniShabbath = 
								calculateZmaniKinsatVeyetziatShabbath(eval(ii-day1+1),currMonth,currYear);

			if (toolTipCellText[ii] != "")		//event description will be displayed in a new line
					toolTipCellText[ii] += "<BR>"
			toolTipCellText[ii] += ENUM_ShabbathText[0] + ZmaniShabbath[0];

			if (toolTipCellText[ii+1] != "")		//event description will be displayed in a new line
					toolTipCellText[ii+1] += "<BR>"
			toolTipCellText[ii+1] += ENUM_ShabbathText[1] + ZmaniShabbath[1];
		}
	}
	// Set all zmani shabbath for fridays of the following month;
	for (ii=day1+maxDaysCurrMonth;ii<=41;ii++)
	{
		if (ii % 7 == 5) // If Friday
		{
			// the day is the current cell - days of current month - days of previous month (day1)
			ZmaniShabbath = 
								calculateZmaniKinsatVeyetziatShabbath(eval(ii - maxDaysCurrMonth - day1 + 1),nextM,nextY);
			if (toolTipCellText[ii] != "")		//event description will be displayed in a new line
					toolTipCellText[ii] += "<BR>"
			toolTipCellText[ii] += ENUM_ShabbathText[0] + ZmaniShabbath[0];
		
			if (toolTipCellText[ii+1] != "")		//event description will be displayed in a new line
					toolTipCellText[ii+1] += "<BR>"			
			toolTipCellText[ii+1] += ENUM_ShabbathText[1] + ZmaniShabbath[1];

		}
	}		
	}
	//====================================== EVENT\HOLIDAY HANDLERS ===================================
	
	/*
	 * Receives num of current displayed heb months(indexFirsts)
	 * Receives array with all 'Rosh Hodesh' heb date
	 * Updates current displayed calendar with all relevant Israel 
	 * holidays and national events
	 */
	function showCalendarEvents(arrFirsts,indexFirsts){
		var j
		var k
		var cell1, cell2
		var isMoved = new Array(1)
		var tempholiday
		var YEAR=2 
		var DAY=1 
		var MONTH=0
		
		for (j = 0 ; j < (indexFirsts+1) ; j++) //scan all relevant hebMonths
		{
			var tempHebDate = arrFirsts[j].Date.split("/") //Spliting to [MM,DD,YYYY]
			for (k=0 ; k < holidays[tempHebDate[MONTH]-1].length ; k++) //scan all holidays in current tempHebDate[MONTH]
			{
				tempholiday =(holidays[tempHebDate[MONTH]-1][k].isMovable ? cloneholiday(holidays[tempHebDate[MONTH]-1][k]) : holidays[tempHebDate[MONTH]-1][k])
				if (tempholiday.Hday >= tempHebDate[DAY]) // holiday IS to be shown
				{
					cell1 = arrFirsts[j].id + tempholiday.Hday - tempHebDate[DAY] //calc cell number for holiday before moving
					cell2 = moveEventIfNecessary(tempholiday, cell1) //calc cell again to see if event must be moved
					if (cell2 > 41 || cell2 < 0)
					{
						continue;
					}
					if (tempholiday.isHistoricalEvent)
						if (!(isValidholiday(holidays[tempHebDate[MONTH]-1][k])))
							continue;  //skip current event since it hasn't occured yet (currYear is older / smaller)
					toolTipCellText[cell2] = tempholiday.desc 
					document.getElementById("sp" + cell2).style.fontWeight='bold'
					if (tempholiday.eventType != NONE)	//updating cell style if needed
					{
						changeStyleForCell(cell2,tempholiday.eventType)
					}
				}
			}
		}
	}
		
	/*
	 * By retrieving the user event list, this function updates current displayed month 
	 * with all relevant user events (Gregorian and Hebrew dated events)
	 */
	function showUserEvents(){
		//var events = (prefs.getString("mylist")).split("|")
		console.log("showuserevents");
		var events = GetEventsAsList();
		if (events[0]=="")
			return
		var cell = -1 // initial value
		var day1 // cell holding 1st day of current month
		var firstCorner // earliest day displayed ( ltr - left corner ; rtl - right corner)
		var day2 // cell holding day1 of next month
		var gEvent
		var gDate = new Date()
		var Hyear
		var i,j
		var jump = new Array(0,1,-1)
		var tempEvent
		var prevMonth = getPreviousMonth()
		var nextMonth = getNextMonth()
		
		for (i = 0 ; i < events.length ; i++) //scanning all user private events
		{
		//	alert("curr event: " + events[i]);
			tempEvent = parseEventString(decodeStr(events[i]))
			cell = -1 // resetting last calculations
			
			if (tempEvent.dateType == GREG_DATE)
			{
				cell = calcCellForGregEvent(tempEvent)
			}
			else if (tempEvent.dateType == HEB_DATE)
			{
				for (j = 0 ; j < jump.length ; j++)
				{
				//	alert("j = "+j);
					Hyear = (parseInt(tempEvent.year) == -1 ? currHebYear : parseInt(tempEvent.year))		// set current heb year for annually events
					Hyear +=jump[j];
					//alert("currHebYear = "+currHebYear)
					if (!(hebDateExists(Hyear, parseInt(tempEvent.Hmonth), parseInt(tempEvent.Hday))))	// skip if date doesn't exists in current displayed calendar
						continue;
										
					// create GEvent containing greg date corresponded to the heb one in order to use showUserGregEvent() function.
					//alert("event HHHyear: " +Hyear + " ; HHHmonth: " +parseInt(tempEvent.Hmonth) + " ; HHHday: " +parseInt(tempEvent.Hday))
					//alert("event HHHmonth: " +parseInt(tempEvent.Hmonth))
					//alert("event HHHday: " +parseInt(tempEvent.Hday))
					
					gDate = HebToGreg(Hyear, parseInt(tempEvent.Hmonth), parseInt(tempEvent.Hday));
					gEvent = cloneholiday(tempEvent)
					gEvent.year = gDate.getUTCFullYear()
					gEvent.Hmonth = gDate.getMonth()
					gEvent.Hday = gDate.getDate()
					//alert("Greg Date is: "+gDate);
					cell = calcCellForGregEvent(gEvent)
					//alert("cell = " + cell)
					//alert("tempEventYear = " + parseInt(tempEvent.year));
					if ((parseInt(tempEvent.year) != -1) || (cell >= 0 && cell <= 41))
						break;
					
					//alert("cell = "+cell)
				}
			}
			else //Corrupted event
			{
				continue;
			}
			// updating calendar
			if (cell >= 0 && cell <= 41)
			{
				//if (prefs.getString("minimessages")=="Show")
					//messages[messages.length] = msg.createStaticMessage(eventToString(tempEvent) + " - " +  tempEvent.desc, _IG_AdjustIFrameHeight);	//Creating user mini messages
					//{
					// direction of MiniMessage depends on the input language - if hebrew should be right to left.
						var directionOfMiniMessage = (chosenLanguage == "hebrew" ? "rtl" : "ltr");
						//messages[messages.length] = msg.createStaticMessage("<p dir='"+directionOfMiniMessage+"'>"+eventToString(tempEvent) + " - " +  tempEvent.desc +"</p>", _IG_AdjustIFrameHeight);	//Creating user mini messages
					//}
				if (toolTipCellText[cell] != "")		//event description will be displayed in a new line
					toolTipCellText[cell] += "<BR>"
				toolTipCellText[cell] +=tempEvent.desc 
				document.getElementById("sp" + cell).style.fontWeight='bold'
				document.getElementById("cellsp" + cell).style.backgroundImage="url("+DESIGN_LOCATION+"info5.gif)"
			}
		}
	}
 
	/*
	 * Calculates the cell for a given event
	 * PreCondition: event's date type is gregorian	
	 */
	function calcCellForGregEvent(tempEvent){
		var prevMonth = getPreviousMonth()
		var nextMonth = getNextMonth()
		var day1 = getFirstDayOfTheMonth()
		var firstCorner = getFirstDayGregorian()
		var day2 = day1 + maxDays(currMonth, currYear)
		var cell = -1
		if ((tempEvent.Hmonth == 1) && (tempEvent.Hday == 29))	// not showing 29/2 events if N/A
		{
			if (maxDays(1, currYear) == 28)
				return -3;
		}
		if ((tempEvent.year != -1 ) && (tempEvent.year != currYear))  //showing events in 'gray' cells in Dec\Jan
		{
			if ((currMonth==0) && (tempEvent.year == currYear - 1) && (tempEvent.Hmonth == 11))
					cell = tempEvent.Hday - firstCorner
			if ((currMonth==11) && (tempEvent.year == currYear + 1) && (tempEvent.Hmonth == 0))
					cell = day2 + tempEvent.Hday - 1
		}
		else if ((tempEvent.year != -1) && (tempEvent.year == currYear) && (currMonth==0) && (tempEvent.Hmonth == 11))
			cell = -2;
		else if ((tempEvent.year != -1) && (tempEvent.year == currYear) && (currMonth==11) && (tempEvent.Hmonth == 0))
			cell = -2;
		else // Regular cell calcs
		{
			switch (tempEvent.Hmonth)
			{
				case prevMonth:
					cell = tempEvent.Hday - firstCorner
					break
				case currMonth:
					cell = day1 + tempEvent.Hday - 1
					break
				case nextMonth:
					cell = day2 + tempEvent.Hday - 1
					break
				default:
					cell = -2
			}
		}
		return cell;				
	}
 
 /*
 	* Recieves userevent object and returns a date hebrew description string to be displayed
 	* as a silent alert or in the event list
 	*/
 	function eventToString(userEvent){
		var str = ""
		if (userEvent.dateType == GREG_DATE)  // Generating a Gregorian date 
		{
			str += "" + userEvent.Hday
			str += " "
			// Can't leave an XML node empty but want that possiblity to not add anything between day and month.
			// SO.. if this node is equal empty,
			// do not connect the day and month with anything.
			if (ENUM_ListEventsTabText[1] != "Empty")
			{
				str += ENUM_ListEventsTabText[1];
			}
			str += arrGregMonths[userEvent.Hmonth]
			str += ", "
			str += (userEvent.year == -1 ? eventTextYearly : ("" + userEvent.year))
		}
		else
		{
			str += arrHebDate[userEvent.Hday - 1]
			str += " "
			// Can't leave an XML node empty but want that possiblity to not add anything between day and month.
			// SO.. if this node is equal empty,
			// do not connect the day and month with anything.
			if (ENUM_ListEventsTabText[1] != "Empty")
			{
				str += ENUM_ListEventsTabText[1];
			}
			str += arrHebMonths[userEvent.Hmonth - 1]
			str += ", "
			str += (userEvent.year == -1 ? eventTextYearly : ("" + Nyear2Hyear(userEvent.year)))
		}
		return str	
	}
	
	/*
	 * returns a cloned copy of h
	 */
	function cloneholiday(h){
		var temp = new holiday(h.desc,h.Hmonth,h.Hday ,h.eventType)
		temp.isTzom = h.isTzom
		temp.isHistoricalEvent = h.isHistoricalEvent
		temp.isMovable = h.isMovable
		return temp
	}
	
	/*
	 * This function receives a holiday and a cell (under standard calculation)
	 * It then, calcs a new cell only if holiday must be moved according to the 
	 * jewish calendar rules.
	 */	
	function moveEventIfNecessary(tempholiday, cell){
		if (tempholiday.isMovable==1)
		{	
			if (tempholiday.isTzom == 1)
			{
				if (cell % 7 == 6) //tzom is on Saturday
				{
					cell +=1
					tempholiday.desc += " - " + ENUM_GeneralText_EarliedOrPostponed[1];
				}
			}
			// ENUM_Holidays[21] = hanuka6, 22 - hanuka7, 23 - hanuka 8
			else if (tempholiday.desc==ENUM_Holidays[21] || tempholiday.desc==ENUM_Holidays[22] || tempholiday.desc==ENUM_Holidays[23])
			{
				if (hebDateExists(currHebYear, 3, 30))  // Kislev 30th exists - Hanuka 6th is on Kislev 30th instead of Tevet 1st and so on
				{
					cell-=1
				}
			}
			// Tzom taanit ester.
			else if (tempholiday.desc==ENUM_Holidays[26])
			{
				if (cell % 7 == 6)
				{
					cell -=2
					tempholiday.desc += " - " + ENUM_GeneralText_EarliedOrPostponed[0];
				}
			}
			// 38 - yom hazikaron.
			else if (tempholiday.desc==ENUM_Holidays[38])
			{
				if (cell % 7 == 5) // Friday
				{
					cell -=1
					tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[0];
				}
				else if (cell % 7 == 0) //Sunday
				{
					cell +=1
					tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[1];
				}
			}
			// 14 - Rabin.
			else if (tempholiday.desc==ENUM_Holidays[14])
			{
				if (cell % 7 == 5) // Friday
				{
					cell -=1
					tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[0];
				}
				else if (cell % 7 == 6) //Saturday
				{
					cell -=2
					tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[0];
				}
			}
			// Yom Hazikaron - 38
			else if (tempholiday.desc==ENUM_Holidays[38])
			{
				if (currYear == 1950)
				{
					cell -=1
					tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[0];
					tempholiday.eventType=NONE	// ONLY this time it's not coordinated with erevYomHaatzmaut
				}
				else
				{
					if (cell % 7 == 5) // Friday
					{
						cell -=2
						tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[0];
					}
					else if (cell % 7 == 4) // Thursday
					{
						cell -=1
						tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[0];
					}
					else if (cell % 7 == 0) //Sunday
					{
						cell +=1
						tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[1];
					}
				}
			}
			// 39 - yom haatzmauut.
			else if (tempholiday.desc==ENUM_Holidays[39])
			{
				if (currYear == 1950)
				{
					toolTipCellText[cell]=ENUM_GeneralText_EarliedOrPostponed[2] + " " +ENUM_Holidays[39]+ " - " + ENUM_GeneralText_EarliedOrPostponed[1];   //"ערב יום העצמאות - נדחה"
					cell +=1
					tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[1];
				}
				else
				{
					if (cell % 7 == 6) // Saturday
					{
						cell -=2
						tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[0];
					}
					else if (cell % 7 == 5) // Friday
					{
						cell -=1
						tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[0];
					}
					else if (cell % 7 == 1) //Monday
					{
						cell +=1
						tempholiday.desc += " - " +ENUM_GeneralText_EarliedOrPostponed[1] ;
					}
				}
			}
		}
		return cell
	}
	 
	/*
	 * Returns true iff Historical event (toCheck)
	 * should appear according to current year
	 * Event is NOT shown if it 'yet to occur'
	 */
	function isValidholiday(toCheck){
		var flag=true
		if (currYear < 1997)
		{
			// 14 - Rabin.
			if (toCheck.desc==ENUM_Holidays[14])
				flag = false
		}
		if (currYear < 1968)
		{
			// 41 - yom yerushalaim.
			if (toCheck.desc==ENUM_Holidays[41])
				flag = false
		}
		if (currYear < 1959)
		{
			// 37 - Yom Hashoa
			if (toCheck.desc==ENUM_Holidays[37])
				flag = false
		}
		if (currYear < 1950)
		{
			// Yom Hazikaron.
			if (toCheck.desc==ENUM_Holidays[38])
				flag = false
		}
		if (currYear < 1949)
		{
			// Yom Haatzmaut.
			if (toCheck.desc==ENUM_Holidays[39])
				flag = false
		}
		return flag  						
	}
	
	//====================================== END OF EVENT\HOLIDAY HANDLERS ===================================
	//========================================================================================================
	
	//====================================== MOUSE EVENT HANDLERS FOR WRITE CALENDAR =========================
		
	/*
	 * The function is called when a cell is clicked and is intended to add the feature of
	 * moving between months by clicking on the previous months' days that are displayed.
	 */
	function clickedCell(cellNum){
		if ((cellNum > 7) && (cellNum < 27))
			return;
			// If the day selected is before the current displayed month
		var intDay = document.getElementById("sp"+cellNum).innerHTML;
		if ((cellNum < 7) && (intDay > 20)){
			doubleClickFlag=1
				// Move one month backwards
			changedate(-1,0);
				// Make the tooltip text invisible (of the previous day clicked
			hintout();
			return;
		}
			// If the day selected is after the current displayed month
		if ((cellNum > 27) && (intDay < 20)){
			doubleClickFlag=1
				// Move one month forward.
			changedate(1,0);
				// Make the tooltip text invisible (of the previous day clicked
			hintout();
	return;
		}
	}
	/*
	 * Called when user double clicks one of current month cells.
	 * The function jumps to AddEvent tab and updates the currentDaySelected
	 * to the clicked date.
	 */ 
	function doubleClickedCell(cell){
		if (doubleClickFlag == 0)
		{
			var day1 = getFirstDayOfTheMonth()
			if ((cell < day1) || (cell > day1 + maxDays(currMonth, currYear)))
				return;
			currDay = cell - day1 + 1
			updateDropDownBoxes();
			$( "#tabs" ).tabs( "option", "active", 1 );
			 //$tabs.tabs('disable', 0).tabs('selected', 2).tabs('disable', 0);
			var elemDescription = document.getElementById("EventDescription")
			elemDescription.focus();
		}
		doubleClickFlag=0
	}
	
	/*
	 * The function receives to integers the first states the month movement and the second
	 * refers to the year movement.
	 */
	function changedate(mm,yy){
		// Should we need to move a month forward from December - increment the year.
		if ((currMonth==11) && (mm==1)){
			currYear+=1
			currMonth=0
		}
		// Should we need to move a month back from January - decrement the year.
		else if((currMonth==0) && (mm==-1)){
			currYear-=1
			currMonth=11
		}
		else
		{
			currMonth+=mm
			currYear+=yy
		}
		// Update the cell values.
		changeCal()
		changeCalHebrew()
	}
	
	/*
	 * The following function is the core of the tooltip text displayed engine. Upon a mouse over event
	 * on one of the cells displayed this function is called.
	 */
	function hint(e,cellNum){
	var marq;
	var desc=toolTipCellText[cellNum];
		// If there are no events in the current day selected - return.
	if (desc=="") return;
	var mousex;
	var Spread;
	var IE = document.all?true:false;
		// Modify the text of the tooltip.
	document.getElementById('hintdesc').innerHTML=desc;
		// Make it visible.
	document.getElementById('hint').style.visibility = "visible";
		// Vertical position of the tooltip.
	var upSpace=(((document.getElementById("hintdesc").offsetHeight) / 16)-1)*16 + 32;
		// If the browser is Internet explorer.
	if (IE) {
		if (document.documentElement && !document.documentElement.scrollTop) {
			// IE6 +4.01 but no scrolling going on
			mousex = getMouseX(event.clientX , desc, cellNum);
			mousey = event.clientY-upSpace;
			} else if (document.documentElement && document.documentElement.scrollTop) {
				// IE6 +4.01 and user has scrolled
				mousex = getMouseX(event.clientX + document.documentElement.scrollLeft,desc,cellNum);
				mousey = (event.clientY + document.documentElement.scrollTop)-upSpace;
			} else if (document.body && document.body.scrollTop) {
					// IE5 or DTD 3.2
					mousex = getMouseX(event.clientX+document.body.scrollLeft,desc,cellNum);
					mousey = (event.clientY + document.body.scrollTop)-upSpace;
			}
		if (mousex < 0) mousex = 0;
		if (mousey < 0) mousey = 0;
		document.getElementById('hint').style.top=mousey+"px";
		document.getElementById('hint').style.left=mousex+"px";
		} else  { // FireFox browser.
		mousey = e.pageY-upSpace;
		mousex = getMouseX(e.pageX, desc, cellNum);
		if (mousex < 0) mousex = 0;
		if (mousey < 0) mousey = 0;
		document.getElementById('hint').style.top=mousey+"px";
		document.getElementById('hint').style.left=mousex+"px";
		}
	}
	
	/*
	 * The function is called by the hint function to receive the correct x co-ordinate of the tooltip,
	 * based on the cellnumber and the description's length.
	 */
	function getMouseX(LocationX, desc, cellNum){
		
			var mousex;
			var Spread;
			var Space=15;
				// Retrieve the position of the table (differs on Firefox / IE 6 / IE 7 browsers)
			
			var RightMost = document.getElementById("headl").offsetLeft + document.getElementById("headl").offsetWidth;
			
			//alert(RightMost);
			var LeftMost = document.getElementById("headl").offsetLeft;
			
				// Cell number position 0-6.
			var cellNumber = parseInt(cellNum) % 7;	
			var widthOfToolTip=document.getElementById("hintdesc").offsetWidth + 5;	
				// If the left to right option is on, cells are switched.
			if (!LeftToRight){
				cellNumber = 6 - cellNumber;
			}
			switch(cellNumber){
						// Same case for cells 0,1,2 (left most)
					case 0:
					case 1:
					case 2:
						mousex = LocationX;
						Spread = mousex + widthOfToolTip; 
						if (Spread > RightMost)
							mousex = mousex - (Spread-RightMost) + ((LocationX - LeftMost) % 40) - 40;
						break;
						// In this case, the text is centered.					
					case 3:
						mousex = LocationX - (widthOfToolTip /2);
						Spread = mousex + (widthOfToolTip/2);
						if (Spread > RightMost)
							mousex = mousex - (Spread-RightMost) + ((LocationX - LeftMost) % 40) - 40;
						break;
						// same case for cells 4,5.
					case 4:
					case 5:
						mousex = LocationX-widthOfToolTip-Space;
							// Make sure the text does not exeed the left most position.
						if (mousex < LeftMost + 40)
							mousex = mousex + (LeftMost - mousex) + ((LocationX-LeftMost)%40);
						break;
					case 6:
						mousex = LocationX-widthOfToolTip-Space;
						break;
			}
		return mousex;
	}
	/*
	 * Make the hint invisible.
	 */ 
	function hintout() {
	document.getElementById('hint').style.visibility = 'hidden';
	}	
	//====================================== END OF MOUSE EVENT HANDLERS FOR WRITE CALENDAR ==================
	//========================================================================================================
	
	//====================================== ADD/REMOVE/EDIT/LIST EVENTS =====================================
	
	  /*
   * This function creates the table of events to be displayed in the third tab
   * (the list event tab). It is executed upon selection of tab 3 - list events.
   */
	function listEvents(tabId){

	// XML hasn't been loaded yet. wait for it to load.
	if (loaded == false) 
	{	
		ExecuteFunctionAfterReadingXML("listEvents",tabId);
		return;
	}	
	// Refresh Add event tab.
	$('#tabs ul:first li:eq(1) a').text(ENUM_TabsNames[2]);
	addEventForm("addevent");

	//tabs.getTabs()[1].getNameContainer().innerHTML = ENUM_TabsNames[2];
	
	// GET EVENTS.
	//var events = (prefs.getString("mylist")).split("|")
	console.log("#listEvents, requesting events")
	var events = GetEventsAsList();
	console.log("#listEvents, "+events)
	
	var i,eventCount = events.length;
	var writeText ="";
	// set direction according to input language - ltr for english/ ..., rtl for hebrew.
	var directionOfForm = "ltr";
	// Direction of most of the text in the form, description, date will be aligned according to the rtl or rtl of the chosen
	// language.
	var directionToAlign = "left";
	
	// alignment of the X button, is on the opposite side.
	var alignmentOfRemove = "right";
	if (chosenLanguage == "hebrew")
	{
		directionOfForm="rtl";
		directionToAlign = "right";
		alignmentOfRemove = "left";
	}
	
	var oldCurrentGregOrHeb = currentGregOrHeb;
	// Clear current greg or heb status, so that the data boxes will be updated.
	// TODO: Not sure why this is necessary..
	currentGregOrHeb=""
	// If there are no events present - display no events added.
	if ((events[0]=="") || (events=="")) {
		writeText +="<div align='center'><font face='Arial' style='font-size: 9pt; font-weight: 700'><BR>"+ENUM_ListEventsTabText[0]+ " </font></div>";	
	}
	else
	{
		// Create the table of events.
		writeText = "<table dir='"+directionOfForm+"' id='tableList' border='0' style='border-collapse: collapse; '>"
		for (i=0;i<eventCount;i++){
			// parse event to with hold its description and other properties.
			var currEvent=parseEventString(decodeStr(events[i]));
			writeText +="<tr align='"+directionToAlign+"' bgcolor='" + ((i % 2) == 0 ? "#ECF5FF" : "#FFFFFF") + "' onmousemove='boldLine("+i+");' onmouseout='unBoldLine("+i+");' >"
			writeText +="<td width='25' align='center' onclick='editEvent("+i+")' style= 'cursor: pointer;'><font face='Arial' style='font-size: 9pt'><span id='serial"+i+"'>"+(i+1)+"</span></font></td>"
			writeText +="<td width='270' align='"+directionToAlign+"' onclick='editEvent("+i+")' style= 'cursor: pointer;'><font face='Arial' style='font-size: 9pt'><span id='description"+i+"'>"+currEvent.desc+"</span></font></td>"
			writeText +="<td width='295' align='"+directionToAlign+"' onclick='editEvent("+i+")' style= 'cursor: pointer;'><font face='Arial' style='font-size: 9pt'><span lang='he'><span id='strDate"+i+"'>"+eventToString(currEvent)+"</span></span></font></td>"
			writeText +="<td align='"+alignmentOfRemove+"' width='110'> <img border='0' src='"+DESIGN_LOCATION+"x2.gif' style='cursor: pointer' onclick='deleteEvent("+i+")'> </td>"
			writeText +="</tr>"
		}	
	writeText+="</table>"
	if (eventCount>1)
		writeText +="<div align='center' dir='"+directionOfForm+"'><font face='Arial' style='font-size: 9pt; font-weight: 700'><BR>"+eventCount+" "+ENUM_ListEventsTabText[2]+ " </font></div>";
	else
		writeText +="<div align='center' dir='"+directionOfForm+"'><font face='Arial' style='font-size: 9pt; font-weight: 700'><BR>"+ENUM_ListEventsTabText[3]+ " </font></div>";
	}
	document.getElementById(tabId).innerHTML=writeText; 
	currentGregOrHeb = oldCurrentGregOrHeb
	}
	
	/*
	 * When mouse is over a certain event, display it in red.
	 */
	function boldLine(index){
		document.getElementById("serial"+index).style.color='red'
		document.getElementById("description"+index).style.color='red'
		document.getElementById("strDate"+index).style.color='red'
	}
	/*
	 * When mouse is NOT over a certain event, display it in black.
	 */
	function unBoldLine(index){
		document.getElementById("serial"+index).style.color='black'
		document.getElementById("description"+index).style.color='black'
		document.getElementById("strDate"+index).style.color='black'
	}	

	/*
	 * The following function creates the second tabs' HTML form. 
	 * The function is called when tab 2 is selected and when an edit event is requested. 
	 * In the latter case, certain parts of the form are changed - the submit button text, and the
	 * event description.
	 */
	function addEventForm(tabId){
	// XML hasn't been loaded yet. wait for it to load.
	if (loaded == false) 
	{	
		ExecuteFunctionAfterReadingXML("addEventForm",tabId);
		return;
	}	
 	
		// set direction according to input language - ltr for english/ ..., rtl for hebrew.
	var directionOfForm = "ltr";
	// Direction of most of the text in the form, description, date will be aligned according to the rtl or rtl of the chosen
	// language.
	var directionToAlign = "left";
	
	// alignment of the X button, is on the opposite side.
	var alignmentOfRemove = "right";
	if (chosenLanguage == "hebrew")
	{
		directionOfForm="rtl";
		directionToAlign = "right";
		alignmentOfRemove = "left";
	}
	var text=createFormAddEvent();
	
	/* ADDED ALERT TOOLTIP CODE */
	text+="<table id='alert' bordercolor="+BORDER_COLOR+" cellspacing='0' cellpadding='2' style='position: absolute;display:none; border-collapse: collapse ' border='1'>"
	text+="<tr>"
	text+="<td bgcolor="+HINTCOLORBACKGROUND+"><font face='Arial' size='2'> <div id='alertdesc'>"
	text+="</div></font></td>"
	text+="</tr>"
	text+="</table>"

	/* ALERT TOOLTIP CODE END. */
	text+="<br>"
	document.getElementById(tabId).innerHTML=text;
	var elemYear = document.getElementById("EventYear")
	var elemMonth = document.getElementById("EventMonth")
	var elemDay = document.getElementById("EventDay")
	var elemDesc = document.getElementById("EventDescription")
	var elemAdd = document.getElementById("add")
	var elemReset = document.getElementById("reset")

	elemDay.style.font='13px Arial'
	elemMonth.style.font='13px Arial'
	elemYear.style.font='13px Arial'
	elemDesc.style.font='13px Arial'
	elemAdd.style.font='13px Arial'
	elemReset.style.font='13px Arial'

	updateDropDownBoxes();
	autoAdjustHeight();

	var elemDescription = document.getElementById("EventDescription")
	elemDescription.focus();
	}	
	
	/*
	 * This function is called after the form on tab 1 has been submitted. It then retrieves the
	 * event description and date from the form an calls the addEventToList function with the relevant
	 * params.
	 */
	function submitEvent(){

		var elemDescription = document.getElementById("EventDescription")
		var elemYear = document.getElementById("EventYear")
		var elemMonth = document.getElementById("EventMonth")
		var elemDay = document.getElementById("EventDay")
		var elemAnnually = document.getElementById("annually")
			// If there is no event description do nothing.
		if (elemDescription.value=="") {
			displayMessage(ENUM_EventTabMessagesToUser[0]);
			elemDescription.focus();
			return;
		}
			// Modify month/year/day selected.
		var monthSelected = parseInt(elemMonth.options[elemMonth.selectedIndex].value);
		var yearSelected = parseInt(elemYear.options[elemYear.selectedIndex].value);
		var daySelected=parseInt(elemDay.options[elemDay.selectedIndex].value);
			// obtain the type of event to be added - Gregorian or Hebrew calendar.
		var GregOrHeb = (currentGregOrHeb == "AddGregDate") ? "g" : "h";
			// Call the function to add event, upon success display success message and reset the description text box.
		var bool=addEventToList(GregOrHeb,elemDescription.value,daySelected,monthSelected,yearSelected,elemAnnually.checked);
		if (bool==1)
		{
			if (editMode == true) {
				displayMessage(ENUM_EventTabMessagesToUser[1]);
				$('#tabs ul:first li:eq(1) a').text(ENUM_TabsNames[2]);				
				//tabs.getTabs()[1].getNameContainer().innerHTML = ENUM_TabsNames[2];
				deleteEvent(editingIndex);
				editMode = false;
				$( "#tabs" ).tabs( "option", "active", 2);
			}
			else
				displayMessage(ENUM_EventTabMessagesToUser[2]);
			document.getElementById('EventDescription').value=''
			elemDescription.focus();
		}
		else if (bool == -1)
			displayMessage(ENUM_EventTabMessagesToUser[3]);
		else if (bool == -2)
			displayMessage(ENUM_EventTabMessagesToUser[4]);
	}
	
	function createFormAddEvent()
	{
		var text="<form id='NewEvent' action='javascript:submitEvent()' Method='GET'"
		text+="<p dir='"+directionOfForm+"'>&nbsp;&nbsp;&nbsp;<input type='radio' value='AddHebDate' id = 'rr1' name='R1' onclick='updateDropDownBoxes()'><font face='Arial' size='2.5'><span lang='he'> "+ENUM_EventTabText[0];
		text+="</span>&nbsp;&nbsp;&nbsp;"
		text+="<input type='radio' value='AddGregDate' checked id = 'R1' name='R1' onclick='updateDropDownBoxes()'><span lang='he'> "+ ENUM_EventTabText[1]+"</span></p>"
		text+="<p dir='"+directionOfForm+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span lang='he'>"+ENUM_EventTabText[2]+" <input type='text' id='EventDescription' size='21' maxlength='21'></span></p>"
		text+="<p dir='"+directionOfForm+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span lang='he'>"+ENUM_EventTabText[3]+": <select size='1' id='EventDay'></select> &nbsp;&nbsp;&nbsp; "
		text+=ENUM_EventTabText[4]+":&nbsp;<select size='1' id='EventMonth' onchange='updateDays()'></select> &nbsp;&nbsp;&nbsp; </span></p>"
		text+="<p dir='"+directionOfForm+"'>&nbsp;&nbsp;&nbsp;<span lang='he'> "+ENUM_EventTabText[5]+":&nbsp;"
		text+="<select size='1' id='EventYear' onchange='updateDays()'></select></span>"
		text+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
		text+="<input type='Checkbox' id='annually' value='ON' onclick='updateYearField()'>&nbsp;"+ENUM_EventTabText[6]+"</p>"
		text+="<p dir='"+directionOfForm+"'>&nbsp;&nbsp;&nbsp;"
		text+="<input type='button' value='"+ENUM_EventTabText[7]+"' id='add' onclick='submitEvent()'>&nbsp;&nbsp;&nbsp; <input type='button' value='"+ENUM_EventTabText[8]+"' id='reset' onclick='clearText()'></p>"
		text+="</font></form>"
		return text;
	}


	
	/*
	 * The following function is used in the second tab upon submitting the form,
	 * a message is to be displayed - either the event has been added successfully or an error has occurred.
	 * The message is displayed in a tooltip box with a fade in/out effect.
	 */	
	function displayMessage(textToDisplay){
		document.getElementById('alertdesc').innerHTML=textToDisplay;
		$('#alertdesc').text(textToDisplay);
		$('#alert').fadeIn(1000);
		$('#alert').fadeOut(2000);
		return;
	// Change the tooltip text to the requested text.
		document.getElementById('alertdesc').innerHTML=textToDisplay;
			// Make the tooltip visible.
		document.getElementById('alert').style.visibility = "visible"
			// Place the tooltip underneath the addevent button.
		document.getElementById('alert').style.top = (document.getElementById('add').offsetTop + 30)+ "px"
		// if direction is right to left
		if (chosenLanguage == "hebrew")
		{
			document.getElementById('alert').style.left = (document.getElementById('add').offsetLeft+document.getElementById('add').offsetWidth - document.getElementById('alert').offsetWidth) +"px"
		}
		else
		{
			document.getElementById('alert').style.left = (document.getElementById('add').offsetRight+document.getElementById('add').offsetWidth - document.getElementById('alert').offsetWidth) +"px"		
		}
		opacity('alert',0,100,500);
		setTimeout("opacity('alert',100,0,500)",2000);
	}

 /** ADDED OPACITY CODE **/
 /*
  * This function creates a fade effect.
  */
 function opacity(id, opacStart, opacEnd, millisec) { 
    //speed for each frame 
    var speed = Math.round(millisec / 100); 
    var timer = 0; 

    //determine the direction for the blending, if start and end are the same nothing happens 
    if(opacStart > opacEnd) { 
        for(i = opacStart; i >= opacEnd; i--) { 
            setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed)); 
            timer++; 
        } 
    } else if(opacStart < opacEnd) { 
        for(i = opacStart; i <= opacEnd; i++) 
            { 
            setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed)); 
            timer++; 
        } 
    } 
} 

//change the opacity for different browsers 
	// function changeOpac(opacity, id) { 
	    // var object = document.getElementById(id).style; 
	    // object.opacity = (opacity / 100); 
	    // object.MozOpacity = (opacity / 100); 
	    // object.KhtmlOpacity = (opacity / 100); 
	    // object.filter = "alpha(opacity=" + opacity + ")"; 
	// }
	/** OPACITY CODE END **/
	
	/*
   * This function adds an event to the user prefs list.
   *	Params - 	G or H (Gregorian or Hebrew)
 	 * 					Test Description
	 *						day of the month (0-30 !)
	 *						month of the year (0-11)
	 *						year (2008)
	 *						annually (true or false)
	 */	
	function addEventToList(GorH,TextDescription,day,month,year,annually){
		/*
		 * Set user prefs and add to list
		 * Format to idan's list.
		 */
		 // Day should be between 1-31 so incremental is neccessary.
		 day++;
		 //var events = (prefs.getString("mylist")).split("|");
		 
		 //var events = GetEventsAsList();
		 
		 //eventCount=events.length;
		 //if ((eventCount==45) && (editMode==false)) return -2
		 
		 //var events = prefs.getString("mylist");
		 var events = GetEvents();
		 
		 // Should the event be of the Gregorian calendar increment the month (1-12 and not 0-11).
		 if (GorH == 'h') month++;
		 // Create the event string, the event differs should the event be an annually event (year=-1) or not.
		 var eventStr = annually == true ? GorH + "~" + TextDescription + "_" + day + "/" + month : GorH + "~" + TextDescription + "_" + day + "/" + month + "/" +  year
		 if (TextDescription.split("~").length > 1) return -1;
		 if (TextDescription.split("_").length > 1) return -1;
		 if (TextDescription.split("/").length > 1) return -1;
		 if (TextDescription.split("|").length > 1) return -1;
		 if (TextDescription.split(")").length > 1) return -1;
		 if (TextDescription.split("(").length > 1) return -1;
		 if (events!="")
			events += "|" + encodeStr(eventStr);
		 else
			events = encodeStr(eventStr);
		 // Add the event to the user prefs.
		 //prefs.set("mylist",events);
		 SetEvents(events);
		 listEvents("showevents");
		 return 1;
	}
	
	/*
	 * Upon choosing Hebrew Calendar / Gregorian Calendar, all data lists need to be updated.
	 * The following function, updates the drop down boxes with the correct information.
	 */	
	function updateDropDownBoxes(){
		var i;
		var elemYear = document.getElementById("EventYear")
		var elemMonth = document.getElementById("EventMonth")
		var elemDay = document.getElementById("EventDay")
		var currYearLeap = IsLeapYear(currHebYear);
		var GregOrHeb = document.getElementById("rr1").checked == false ? "AddGregDate" : "AddHebDate"
		// If the current event type is the same as clicked don't update the form.
		//if (GregOrHeb == currentGregOrHeb)
//			return;
		currentGregOrHeb=GregOrHeb;

		// Clear all previous options.
		while (elemDay.options.length > 0){
			elemDay.options[0]=null;
		}
		while (elemMonth.options.length > 0){
			elemMonth.options[0]=null;
		}
		while (elemYear.options.length > 0){
			elemYear.options[0]=null;
		}
			// If the current selected format is hregorian
		if (GregOrHeb == "AddGregDate"){
				// Add days with respect to max days in the selected month & year (currMonth, currYear)
			for (i=0;i<maxDays(currMonth,currYear);i++){
				var optn = document.createElement("OPTION");
				optn.text = i+1;
				optn.value = i;
				elemDay.options.add(optn);
			}
				// Add all Gregorian months.
			for (i=0;i<12;i++){
				var optn = document.createElement("OPTION");
				optn.text = arrGregMonths[i];
				optn.value = i;
				elemMonth.options.add(optn);
			}
				// Add 100 years before the current selected year, and 100 years after.
			for (i=-100;i<101;i++){
				var optn = document.createElement("OPTION");
				optn.text = currYear + i;
				optn.value = currYear + i;
				elemYear.options.add(optn);
			}
				// Set the default values.
			elemYear.options.selectedIndex = 100;
			elemDay.options.selectedIndex = currDay - 1;
			elemMonth.options.selectedIndex = currMonth;
		}
			else // Hebrew calendar selected.
		{
				// Add 30 days to the days text box.
			for (i=0;i<30;i++){
				elemDay.clear;
				var optn = document.createElement("OPTION");
				optn.text = arrHebDate[i];
				optn.value = i;
				elemDay.options.add(optn);
			}
				// Add the hebrew months.
				for (i=0;i<13;i++){
				if (i==5) {
						// if the current year is a leap one add adar bet else modify the fifth array element to be
						// adar (not adar bet)
					if (currYearLeap)
					{
						arrHebMonths[6]=ENUM_AdarBetCases[0];
					}
					else 
					{
						arrHebMonths[6]=ENUM_AdarBetCases[1];
						continue;
					}
				}
				var optn = document.createElement("OPTION");
				optn.text = arrHebMonths[i];
				optn.value = i//+1;
				elemMonth.options.add(optn);
			}	
			for (i=-100;i<101;i++){
				var optn = document.createElement("OPTION");
				optn.text = Nyear2Hyear(currHebYear + i);
				optn.value = currHebYear + i;
				elemYear.options.add(optn);
			}
				// Set default values.
			var hDate = (GregToHeb(new Date(currYear,currMonth,currDay))).split("/")
			elemYear.options.selectedIndex=100;
				// if the current year is not a leap year, months 7-12 will be in index 5-10 respectivly.
			if ((!currYearLeap) && (parseInt(hDate[0]) > 6))
				elemMonth.options.selectedIndex=parseInt(hDate[0]) - 2;
			else
				elemMonth.options.selectedIndex=parseInt(hDate[0]) - 1;
			elemDay.options.selectedIndex=parseInt(hDate[1])-1;	
		}
	 }	
	
	//====================================== END OF ADD/REMOVE/EDIT/LIST EVENTS ==============================
	//========================================================================================================
	
	//====================================== ADD/REMOVE/EDIT/LIST MOUSE EVENT HANDLERS ========================
	/*
 	 * The following function deletes the event in index : indexToDelete.
   */
 	function deleteEvent(indexToDelete){
	var events = GetEventsAsList();
	eventCount=events.length;
	var finalEvents="";
	var separator="";
	var ii;
	for (ii=0;ii<eventCount;ii++)
	{
		if (ii==indexToDelete)
			continue;
		finalEvents+= separator + events[ii];
		separator = "|";
	}
	SetEvents(finalEvents);
	listEvents("showevents");
 
 	}
 	
 	/**
	  * This function is called following an edit even request and updates the form fields
	  * to those of the event - the date displayed and the description.
	  */
	function editEvent(i){
		var now = new Date();
		//tabs.getTabs()[1].getNameContainer().innerHTML = ENUM_TabsNames[1];
		$('#tabs ul:first li:eq(1) a').text(ENUM_TabsNames[1]);				
		
		editMode=true;
		editingIndex=i;
		var events = GetEventsAsList();
		var currEvent = parseEventString(events[i]);
		
		currEvent.desc = decodeStr(currEvent.desc)
		if (currEvent.dateType == HEB_DATE){
			var gDate;
			if (currEvent.year == -1)
				gDate = HebToGreg(""+currHebYear,currEvent.Hmonth,currEvent.Hday-1);
			else
				gDate = HebToGreg(currEvent.year,currEvent.Hmonth,currEvent.Hday-1);
			currDay = gDate.getDate();
			currMonth = gDate.getMonth();
			currYear = gDate.getUTCFullYear();
			if (currEvent.year!=-1) 
				currHebYear=parseInt(currEvent.year)
		}
		else
		{
			if (currEvent.year !=-1) 
				currYear = parseInt(currEvent.year)
			else 
				currYear=now.getUTCFullYear()
			currDay = currEvent.Hday
			currMonth = currEvent.Hmonth
			var mdyDate = (GregToHeb(new Date(currYear,currMonth,currDay))).split("/")
			currHebYear = parseInt(mdyDate[2])
		}	
		$( "#tabs" ).tabs( "option", "active", 1 );
		var elemDescription = document.getElementById("EventDescription")
		var elemYear = document.getElementById("EventYear")
		var elemMonth = document.getElementById("EventMonth")
		var elemDay = document.getElementById("EventDay")
		var elemAnnually = document.getElementById("annually")
		if (currEvent.dateType==HEB_DATE)
			document.getElementById("rr1").checked=true
		if (currEvent.year == -1)
			elemAnnually.checked=true;
		document.getElementById("add").value=ENUM_TabsNames[1];
		elemDescription.value = currEvent.desc;
		updateDropDownBoxes();
		updateYearField();
		if (currEvent.dateType == HEB_DATE){
			elemDay.options.selectedIndex=currEvent.Hday-1;
			var i=1;
			elemMonth.options.selectedIndex=i;
			while ((elemMonth.options[elemMonth.options.selectedIndex].value<currEvent.Hmonth-1))
				elemMonth.options.selectedIndex=++i;
		}
	}

	/*
	 * When annually checkbox is clicked, this function is called to disable / enable the choose year data list.
	 */
	function updateYearField(){
		if (document.getElementById("annually").checked){
			document.getElementById("EventYear").disabled=true;
			return;
		}
		document.getElementById("EventYear").disabled=false;
	}
	
	/*
	 * Whenever the form is to be changed for example when a user chooses a different month
	 * or alternatly a change from gregorian to hebrew calendar is made, this function is called.
	 * The function updates the days list to display only days that exist under a specific month,
	 * furthermore, when a jewish leap year is selected - adar bet needs to be displayed in the month list.
	 */
	function updateDays(useHebrew){
		var elemYear = document.getElementById("EventYear")
		var elemMonth = document.getElementById("EventMonth")
		var elemDay = document.getElementById("EventDay")
		
		arrHebDateToUse = arrHebDateEng;
		arrHebMonthsToUse = arrHebMonthsEng;
		ENUM_AdarBetCasesToUse = ENUM_AdarBetCasesEng;

		if ((useHebrew !== "undefined") && (useHebrew == true))
		{
			arrHebDateToUse = arrHebDateHeb;
			arrHebMonthsToUse = arrHebMonthsHeb;
			ENUM_AdarBetCasesToUse = ENUM_AdarBetCasesHeb;
		}
		var monthSelected = parseInt(elemMonth.options[elemMonth.selectedIndex].value);
		var yearSelected = parseInt(elemYear.options[elemYear.selectedIndex].value)
	
		var getMaxDays;
			// If the current form is by the gregorian calendar, simply update the days (no months are added
			// in this calendar on leap years..)
		if (currentGregOrHeb == "AddGregDate")
				getMaxDays = maxDays(monthSelected,yearSelected);
			else // The current form is by hebrew dates.
		{
				  // If the current displayed year is a leap year add adar bet.
				if (IsLeapYear(yearSelected)) {
					if (elemMonth.options[6].text!=ENUM_AdarBetCasesToUse[0]){
						arrHebMonthsToUse[6]=ENUM_AdarBetCasesToUse[0];
						for (i=5;i<12;i++){
							elemMonth.options[i].text=arrHebMonthsToUse[i];
							elemMonth.options[i].value=i+1;
						}
					var optn = document.createElement("OPTION");
					optn.text = arrHebMonthsToUse[12];
					optn.value = 12;
					elemMonth.options.add(optn);
					}
				}
				else
				{
						// Else, if adar bet is in the month list, remove it.
					if (elemMonth.options[6].text==ENUM_AdarBetCasesToUse[0]){
						elemMonth.options[5].text=ENUM_AdarBetCasesToUse[1]
						elemMonth.options[5].value=6
						elemMonth.options[6]=null;
					}
					monthSelected = parseInt(elemMonth.options[elemMonth.selectedIndex].value);
				}
					// Retrieve the number of days in the selected hebrew month.
				getMaxDays = daysInHebMonth((monthSelected+1)+"/01/"+yearSelected);
		}
		var currDays = elemDay.options.length;
			// while there are still days to be removed or added to the days data list.
			// currDays - current amount of days in data list.
			// getMaxDays - max days in current selected month.
		while (getMaxDays != currDays){
				// If there are not enough days displayed, add another day (in letters for hebrew calendar and
				// a number for the Gregorian one.
			if (getMaxDays > currDays) {
				var optn = document.createElement("OPTION");
				// If the event is in a hebrew year add letter, else add number.
				//if (currentGregOrHeb == "AddHebDate")
						optn.text = arrHebDateToUse[currDays];
				//else
					//	optn.text = currDays+1;
				optn.value = currDays+1;
				elemDay.options.add(optn);
				currDays++;
			}
				// If there are too many days displayed, remove 1.
			if (getMaxDays < currDays) {
				elemDay.options[currDays-1]=null;
				currDays--;
			}
		}
	}	
	
	// /*
	 // * If the clear text button is clicked, reset the form.
	 // */
	function clearText(){
		document.getElementById("EventDescription").value="";
		document.getElementById("annually").checked=false;
		document.getElementById("EventYear").disabled=false;
	}	
	//====================================== END OF ADD/REMOVE/EDIT/LIST MOUSE EVENT HANDLERS =================
	//=========================================================================================================

	//====================================== UTILS - FREQUENTLY USED METHODS ===================================
	
	/*
	 * Parses the string by the protocol (e.g. g~sometitle_1/1/2008),
	 * returns an object of type holiday
	 */
	function parseEventString(eventString){
		var DAY = 0
		var MONTH = 1
		var YEAR = 2
		
		var type_rest = eventString.split("~")
		var title_date = type_rest[1].split("_")
		var parsedDate = title_date[1].split("/")
		var userEvent = new holiday(title_date[0], parseInt(parsedDate[MONTH]), parseInt(parsedDate[DAY]), NONE)
		if (type_rest[0] == 'g')
		{
			userEvent.dateType = GREG_DATE
		}
		else if (type_rest[0] == "h")
		{
			userEvent.dateType = HEB_DATE
		}
		else 
			return false
		if (parsedDate.length == 3)
			userEvent.year = parsedDate[YEAR]

		return userEvent	
	}
	/*
	 * This function is executed when the calendar is displayed and is inteaded to disable the selection
	 * of text within the calendar.
	 */
	function disableSelection(target){
		if (typeof target.onselectstart!="undefined") //IE route
			target.onselectstart=function(){return false}
		else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
			target.style.MozUserSelect="none"
		else //All other route (ie: Opera)
			target.onmousedown=function(){return false}
			target.style.cursor = "default"
	}
	
	/*
	 * This function returns the max days in a given Gregorian month (based on month & year).
	 */
	function maxDays(mm, yyyy){
	var mDay;
		if((mm == 3) || (mm == 5) || (mm == 8) || (mm == 10)){
			mDay = 30;
	  	}
	  	else{
	  		mDay = 31
	  		if(mm == 1){
	   			if (yyyy % 4 != 0){
	   				mDay = 28
	   			}
			   	else if ((yyyy % 100 == 0) && (yyyy % 400 != 0)){
			   		mDay = 28
			   	}
			   	else {
			   		mDay = 29
			   	}
	  			
			}
	  }
	return mDay;
	}

	/*
	 * This function returns the previous month of the currMonth.
	 */
	function getPreviousMonth(){
		return ((currMonth+11)%12)
	}
	/*
	 * This function returns the next month of the currMonth.
	 */
	function getNextMonth(){
		return ((currMonth+1)%12)
	}
	/*
	 * This function returns the day of the week of the 1st of currMonth.
	 */
	function getFirstDayOfTheMonth(){
		var mmyyyy = new Date()
		mmyyyy.setUTCFullYear(currYear)
		mmyyyy.setDate(1)
		mmyyyy.setMonth(currMonth)
		var day1 = mmyyyy.getDay()
		if (day1 == 0){
				day1 = 7
			}	
		return day1
	}
	/*
	 * returns the earliest day displayed (always appears in gray)
	 */
	function getFirstDayGregorian(){
		var ii= document.getElementById("sp"+0).innerHTML
		return ii
	}

	/**
	*	Normally, all hebrew letters are saved as unicode and this means every hebrew letter takes 2 bytes instead of 1,
	*	in addition, in iGoogle, they use URL String to save userprefs so every byte saved as %XX where XX is the hex range of
	*	00 - FF. As a result, all heb chars are saved as %XX%YY which are 6 bytes in total.
	*	This function encodes a given String (strIn) in a way that every heb/eng letter takes at most 2 url bytes (instead of 6)
	* All chars are encoded using this key:
	*
	*		A ==> ZA		|		א ==> A
	*		B ==> ZB		|		ב ==> B
	*		C ==> ZC		|		ג ==> C
	*		D ==> ZD		|		ד ==> D
	*		E ==> ZE		|		ה ==> E
	*		F ==> ZF		|		ו ==> F
	*		G ==> ZG		|		ז ==> G
	*		H ==> ZH		|		ח ==> H
	*		I ==> ZI		|		ט ==> I
	*		J ==> ZJ		|		י ==> J
	*		K ==> ZK		|		ך ==> K
	*		L ==> ZL		|		כ ==> L
	*		M ==> ZM		|		ל ==> M
	*		N ==> ZN		|		ם ==> N
	*		O ==> ZO		|		מ ==> O
	*		P ==> ZP		|		ן ==> P
	*		Q ==> ZQ		|		נ ==> Q
	*		R ==> ZR		|		ס ==> R
	*		S ==> ZS		|		ע ==> S
	*		T ==> ZT		|		ף ==> T
	*		U ==> ZU		|		פ ==> U
	*		V ==> ZV		|		ץ ==> V
	*		W ==> ZW		|		צ ==> W
	*		X ==> ZX		|		ק ==> X
	*		Y ==> ZY		|		ר ==> Y
	*		Z ==> ZZ		|		ש ==> (
	*								|		ת ==> )
	**/
	function encodeStr(strIn){
		var HEBREW_SHIFTING = 1488	// Alef is 1488 and therefore will be encoded to HebEncodings[0]
		var ENGLISH_SHIFTING = 65		// A is 65 and therefore will be encoded to engEncodings[0]
		var strOut = "";
		// All unicode chars in range 1488 - 1514 (א - ת)
		var HebEncodings = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","(",")")
		// All unicode chars in range 65 - 90 (A - Z)
		var EngEncodings = new Array("ZA","ZB","ZC","ZD","ZE","ZF","ZG","ZH","ZI","ZJ","ZK","ZL","ZM","ZN","ZO","ZP","ZQ","ZR","ZS","ZT","ZU","ZV","ZW","ZX","ZY","ZZ")
		var i  //scans strIn
		var c	 //holds char's unicode to see how to encode it, hebrew letters or english CAPITAL letters will be encoded
		
		for (i =0 ; i < strIn.length ; i++)
		{
			c = strIn.charCodeAt(i)
			if (isHebLetter(c))		// the char is in hebrew
			{
				c -= HEBREW_SHIFTING
				strOut += HebEncodings[c]
			}
			else if (isEngLetter(c))	// the char is a capital letter
			{
				c -= ENGLISH_SHIFTING
				strOut += EngEncodings[c]
			}
			else
				strOut += strIn.charAt(i)	// the char is neither and therefore will not be encoded
		}
		return strOut
	}
	
	function decodeStr(strIn){
		var NORMAL_SHIFTING = 65	// ASCII code of 'A'
		var SPECIAL_SHIFTING = 40	// ASCII code of '('
		var hebDecodings = new Array("א","ב","ג","ד","ה","ו","ז","ח","ט","י","ך","כ","ל","ם","מ","ן","נ","ס","ע","ף","פ","ץ","צ","ק","ר")
		var hebSpecialCase = new Array("ש","ת")
		var strOut = ""
		var i
		var unicode
		for (i = 0 ; i < strIn.length ; i++)
		{
			if (strIn.charAt(i) == 'Z')	// found a capital letter
			{
				i++
				strOut += strIn.charAt(i)	// the decoded value is the follwing char (i+1)
			}
			else if (isEngLetter(unicode = strIn.charCodeAt(i))) // found a hebrew letter (because a capital letter which is NOT 'Z' means the next letter will be decoded to heb char)
			{
				strOut += hebDecodings[unicode - NORMAL_SHIFTING]	// decoding using the array above
			}
			// 	Special case: Since in hebrew we have 27 letters (22 regular + 5 finals),
			//	we have one too many when comparing to english letters (26)
			else if ((unicode >= 40) && (unicode <= 41))	
			{
				strOut += hebSpecialCase[unicode - SPECIAL_SHIFTING]
			}
			else
				strOut += strIn.charAt(i)
		}
		return strOut
	
	}	

 	/*
 	 * Not every Hebrew date (dd/mm) appears every year and so
 	 * this function returns true iff a given hebrew full date exists.
 	 */ 
  function hebDateExists(yyyy, mm, dd){
     	var verifyDate = GregToHeb((HebToGreg(yyyy, mm, dd)))
     	var hDateSplitted = verifyDate.split("/")
     	return (hDateSplitted[0] == mm && hDateSplitted[1] == dd && hDateSplitted[2] == yyyy)
     }

	/*
 	 * Converts hebrew numeric year (e.g. 5768) to a Hebrew string (e.g. תשס"ח) using numerology.
 	 */
	function Nyear2Hyear(numYear,forceHebrew){ //converts numeric Hebrew year to letter Hebrew year (e.g. 5768 -> תשס"ח)
		// If input language isn't hebrew no need to convert to Gimatrya.
		// and we're not forcing hebrew
		if ((chosenLanguage != "hebrew") && 
			((typeof forceHebrew === "undefined") ||
			 (forceHebrew == false)))
		{
			return numYear;
		}
		
		var gim = new Array(1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400)
		var alphabet = new Array("א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת")
		var i
		var hebYear=""
		
		numYear %= 1000 //losing all thousands (5768 -> 768)
		for (i=21 ; i>=0 ; i--)
		{
			while (numYear >= gim[i])
			{
				if ((i != 9) || ((i = 9) && (numYear != 15) && (numYear != 16)))
				{
					numYear -= gim[i]
					if ((numYear == 0) && (hebYear.length > 1))
					{
						hebYear += "\"" //Inserting " (e.g. תשסח -> תשס"ח)
					}
					hebYear += alphabet[i] //concatenates next letter
				}
				else
				{
					if (numYear == 15)
						hebYear += "ט\"ו"
					if (numYear == 16)
						hebYear += "ט\"ז"
					numYear = 0
				}
			}
		}
		return hebYear
	}

	/*
	 * Receives a hebrew date
	 * Returns num of days in the given hebrew month
	 */
	function daysInHebMonth(hebFullDate){
		var YEAR=2 
		var DAY=1 
		var MONTH=0
		var hDate = hebFullDate.split("/") //[0] - M, [1] - D, [2] - Y
		var date1 = HebToGreg(parseInt(hDate[YEAR]), parseInt(hDate[MONTH]), 1)
		var date2 = (parseInt(hDate[MONTH]) == 13 ? HebToGreg(parseInt(hDate[YEAR])+1, 1, 1) : HebToGreg(parseInt(hDate[YEAR]), parseInt(hDate[MONTH])+1, 1))
		var datediff = Math.round((date2 - date1)/86400000)
		return datediff
	}			
	
	//	'Alef' unicode is 1488, 'Taf' unicode is 1514
	function isHebLetter(c){
		return ((c >= 1488) && (c <= 1514))
	}
	//	'A' unicode is 65, 'Z' unicode is 90
	function isEngLetter(c){
		return ((c >= 65) && (c <= 90))
	}	
	

	function autoAdjustHeight(){
		//_IG_AdjustIFrameHeight();
			
	}
		
	//====================================== END OF UTILS - FREQUENTLY USED METHODS ===================================
	//=================================================================================================================


	//========================= PUBSUB FEATURE ==========================================================================

	/*
	 * Called whenever pubsub userpref is changed.
	 * This function parses a message sent from Tel Aviv university Yedion gadget.
	 * The message is being sent in order to add an exam date to hebCalendar.
	 */	
	// function tauExam(){
		// var courseString= prefs.getString("rawquery");
		// var course= JSON.parse(courseString);
		// var courseName = course.name;
		// var type_date = course.data.split("@");
		// if (type_date[0] != "test")
			// return;
		// var examDate = type_date[1].split("/");
		// addEventToList("g","מבחן ב" + courseName,examDate[0],examDate[1],examDate[2],false);
	// }

	//========================= END OF PUBSUB FEATURE ===================================================================
	//===================================================================================================================
	
	/*
	 * Declaration of the holiday / event Object
	 */
	function holiday(desc, Hmonth, Hday,eventType){
			return new holiday(desc,Hmonth,Hday,eventType,0,0,0,"","");
	}
	function holiday(desc, Hmonth, Hday,eventType, isTzom, isMovable, isHistoricalEvent, gregDate,hebDate){
		this.isTzom=isTzom;
		this.isMovable=isMovable;  // any tzom or some of the historical events
		this.isHistoricalEvent=isHistoricalEvent;  //e.g. Yom zikaron
		this.isAnnually = 1
		this.dateType=HEB_DATE
		this.desc=desc;		// short description
		this.Hmonth=Hmonth;  // Hebrew month
		this.Hday=Hday;			// Hebrew day in month
		this.year=-1
		this.eventType=eventType; //how will be marked on calndar (full day off, half day off or none){FULL_DAY, HALF_DAY,NONE}
		this.gregDate = gregDate;
		this.hebDate = hebDate;
		
	}
	// firstDates struct.
	function firstDates(id, Date){
	this.id=id;
	this.Date=Date;
	}





	
	//=================================H E B R E W  -  G R E G O I A N  D A T E  C O N V E R T O R=======================

  /*
    This code was converted to Java Script from my VB.Net program
    to convert Hebrew dates to and from Gregorian dates. I avoided
    using many optimization in order to make the logic clearer.

    These functions assume that all the current rules of the
    Hebrew calendar were always in existence (which is not true
    since the Hebrew calendar was not always fixed) and all the
    current rules of the Gregorian calendar were always in existence
    (which is not true).

    Here is a very brief description of the Hebrew calendar.

    The Hebrew calendar is a lunisolar calendar.  This means that
    the months are in sync with the moon and the years stay in sync
    with the sun.  A solar year is approximately 365.25 days.  A
    lunar month is approximately 29.5 days.  Twelve lunar months is
    approximately 354 days (12 * 29.5=354).  Thus, a lunar year of
    twelve months is 11.25 days shorter than the solar year. To make
    up for this shortfall, the Hebrew calendar adds a thirteenth
    month to seven years over a nineteen year period. Therefore, over
    a nineteen year period, the Hebrew calendar is approximately the
    same length as a nineteen year solar calendar.

    In order to understand this code, you must know the following
    terms:
      Molad - new moon. Hebrew months start around the day of the
              new moon
      Chalakim - 1 / 1080 of an hour or 3 1/3 seconds
      Tishrei - the first month of the Hebrew year (at least for
                these calculations)
      Rosh Hashanah - The Jewish new year which starts on Tishrei 1.

    The Hebrew calendar assumes the period of time between one new
    moon to the next is 29 days, 12 hours and 793 chalakim. The first
    molad after creation occurred on Monday, September, 7th -3760 at 5
    hours and 204 chalakim.  Technically, the Gregorian date would be
    in the year 3761 BCE because there was no year 0 in the Gregorian
    calendar, but we will use the year of -3760.

    Sample Usage:
       // Converts AdarB/7/5765 to 4/6/2005
       alert(HebToGreg(5765, 7, 26))

  */

  // This function returns how many months there has been from the
  // first Molad until the beginning of the year nYearH
  function MonSinceFirstMolad(nYearH) {
    var nMonSinceFirstMolad

    // A shortcut to this function can simply be the following formula
    //   return Math.floor(((235 * nYearH) - 234) / 19)
    // This formula is found in Remy Landau's website and he
    // attributes it to Wolfgang Alexander Shochen. I will use a less
    // optimized function which I believe shows the underlying logic
    // better.

    // count how many months there has been in all years up to last
    // year. The months of this year hasn't happened yet.
    nYearH --

    // In the 19 year cycle, there will always be 235 months. That
    // would be 19 years times 12 months plus 7 extra month for the
    // leap years. (19 * 12) + 7 = 235.

    // Get how many 19 year cycles there has been and multiply it by
    // 235
    nMonSinceFirstMolad = Math.floor(nYearH / 19) * 235
    // Get the remaining years after the last complete 19 year cycle
    nYearH = nYearH % 19
    // Add 12 months for each of those years
    nMonSinceFirstMolad += 12 * nYearH
    // Add the extra months to account for the leap years
    if (nYearH >= 17) {
      nMonSinceFirstMolad += 6
    } else if  (nYearH >= 14) {
      nMonSinceFirstMolad += 5
    } else if  (nYearH >= 11) {
      nMonSinceFirstMolad += 4
    } else if  (nYearH >= 8) {
      nMonSinceFirstMolad += 3
    } else if  (nYearH >= 6) {
      nMonSinceFirstMolad += 2
    } else if  (nYearH >= 3) {
      nMonSinceFirstMolad += 1
    }
    return nMonSinceFirstMolad
  }

  // This function returns if a given year is a leap year.
  function IsLeapYear(nYearH) {
     var nYearInCycle

    // Find out which year we are within the cycle.  The 19th year of
    // the cycle will return 0
    nYearInCycle = nYearH % 19
    return ( nYearInCycle ==  3 ||
             nYearInCycle ==  6 ||
             nYearInCycle ==  8 ||
             nYearInCycle == 11 ||
             nYearInCycle == 14 ||
             nYearInCycle == 17 ||
             nYearInCycle == 0)
  }

  // This function figures out the Gregorian Date that corresponds to
  // the first day of Tishrei, the first month of the Hebrew
  // calendar, for a given Hebrew year.
  function Tishrei1(nYearH) {
    var nMonthsSinceFirstMolad
    var nChalakim
    var nHours
    var nDays
    var nDayOfWeek
    var dTishrei1

    // We want to calculate how many days, hours and chalakim it has
    // been from the time of 0 days, 0 hours and 0 chalakim to the
    // molad at the beginning of year nYearH.
    //
    // The period between one new moon to the next is 29 days, 12
    // hours and 793 chalakim. We must multiply that by the amount
    // of months that transpired since the first molad. Then we add
    // the time of the first molad (Monday, 5 hours and 204 chalakim)
    nMonthsSinceFirstMolad = MonSinceFirstMolad(nYearH)
    nChalakim = 793 * nMonthsSinceFirstMolad
    nChalakim += 204
    // carry the excess Chalakim over to the hours
    nHours = Math.floor(nChalakim / 1080)
    nChalakim = nChalakim % 1080

    nHours += nMonthsSinceFirstMolad * 12
    nHours += 5

    // carry the excess hours over to the days
    nDays = Math.floor(nHours / 24)
    nHours = nHours % 24

    nDays += 29 * nMonthsSinceFirstMolad
    nDays += 2

    // figure out which day of the week the molad occurs.
    // Sunday = 1, Moday = 2 ..., Shabbos = 0
    nDayOfWeek = nDays % 7

    // In a perfect world, Rosh Hashanah would be on the day of the
    // molad. The Hebrew calendar makes four exceptions where we
    // push off Rosh Hashanah one or two days. This is done to
    // prevent three situation. Without explaining why, the three
    // situations are:
    //   1) We don't want Rosh Hashanah to come out on Sunday,
    //      Wednesday or Friday
    //   2) We don't want Rosh Hashanah to be on the day of the
    //      molad if the molad occurs after the beginning of 18th
    //      hour.
    //   3) We want to limit years to specific lengths.  For non-leap
    //      years, we limit it to either 353, 354 or 355 days.  For
    //      leap years, we limit it to either 383, 384 or 385 days.
    //      If setting Rosh Hashanah to the day of the molad will
    //      cause this year, or the previous year to fall outside
    //      these lengths, we push off Rosh Hashanah to get the year
    //      back to a valid length.
    // This code handles these exceptions.
    if (!IsLeapYear(nYearH) &&
        nDayOfWeek == 3 &&
        (nHours * 1080) + nChalakim >= (9 * 1080) + 204) {
      // This prevents the year from being 356 days. We have to push
      // Rosh Hashanah off two days because if we pushed it off only
      // one day, Rosh Hashanah would comes out on a Wednesday. Check
      // the Hebrew year 5745 for an example.
      nDayOfWeek = 5
      nDays += 2
    }
    else if ( IsLeapYear(nYearH - 1) &&
              nDayOfWeek == 2 &&
              (nHours * 1080) + nChalakim >= (15 * 1080) + 589 ) {
      // This prevents the previous year from being 382 days. Check
      // the Hebrew Year 5766 for an example. If Rosh Hashanah was not
      // pushed off a day then 5765 would be 382 days
      nDayOfWeek = 3
      nDays += 1
    }
    else {
      // see rule 2 above. Check the Hebrew year 5765 for an example
      if (nHours >= 18) {
        nDayOfWeek += 1
        nDayOfWeek = nDayOfWeek % 7
        nDays += 1
      }
      // see rule 1 above. Check the Hebrew year 5765 for an example
      if (nDayOfWeek == 1 ||
          nDayOfWeek == 4 ||
          nDayOfWeek == 6) {
        nDayOfWeek += 1
        nDayOfWeek = nDayOfWeek % 7
        nDays += 1
      }
    }

    // Here we want to add nDays to creation
    //    dTishrie1 = creation + nDays
    // Unfortunately, Many languages do not handle negative years very
    // well. I therefore picked a Random date (1/1/1900) and figured out
    // how many days it is after the creation (2067025). Then I
    // subtracted 2067025 from nDays.
    nDays -= 2067025
    dTishrei1 = new Date(1900, 0, 1) // 2067025 days after creation
    dTishrei1.setDate(dTishrei1.getDate() + nDays)

    return dTishrei1
   }


  // This function gets the length of a Hebrew year.
  function LengthOfYear(nYearH) {
    var dThisTishrei1
    var dNextTishrei1
    var diff

    // subtract the date of this year from the date of next year
    dThisTishrei1 = Tishrei1(nYearH)
    dNextTishrei1 = Tishrei1(nYearH + 1)
    // Java's dates are stored in milliseconds. To convert it into days
    // we have to divide it by 1000 * 60 * 60 * 24
    diff = (dNextTishrei1 - dThisTishrei1) / ( 1000 * 60 * 60 * 24)
    return Math.round(diff)
  }

  // Overload of HebToGreg only with 1 argument.
  function HebToGregFromCompleteDate(mdyHebDate) {
	var mdyDate = mdyHebDate.split("/");
	return HebToGreg(parseInt(mdyDate[2]),parseInt(mdyDate[0]),parseInt(mdyDate[1]));
  }
  
  // This function converts a Hebrew date into the Gregorian date
  // nYearH - is the Hebrew year
  // nMonth - Tishrei=1
  //          Cheshvan=2
  //          Kislev=3
  //          Teves=4
  //          Shevat=5
  //          Adar A=6 (only valid on leap years)
  //          Adar=7   (Adar B for leap years)
  //          Nisan=8
  //          Iyar=9
  //          Sivan=10
  //          Tamuz=11
  //          Av=12
  //          Elul=13
  function HebToGreg(nYearH, nMonthH, nDateH) {
    var nLengthOfYear
    var bLeap
    var dGreg
    var nMonth
    var nMonthLen
    var bHaser
    var bShalem

    bLeap = IsLeapYear(nYearH)
    nLengthOfYear = LengthOfYear(nYearH)

    // The regular length of a non-leap year is 354 days.
    // The regular length of a leap year is 384 days.
    // On regular years, the length of the months are as follows
    //   Tishrei (1)   30
    //   Cheshvan(2)   29
    //   Kislev  (3)   30
    //   Teves   (4)   29
    //   Shevat  (5)   30
    //   Adar A  (6)   30     (only valid on leap years)
    //   Adar    (7)   29     (Adar B for leap years)
    //   Nisan   (8)   30
    //   Iyar    (9)   29
    //   Sivan   (10)  30
    //   Tamuz   (11)  29
    //   Av      (12)  30
    //   Elul    (13)  29
    // If the year is shorter by one less day, it is called a haser
    // year. Kislev on a haser year has 29 days. If the year is longer
    // by one day, it is called a shalem year. Cheshvan on a shalem
    // year is 30 days.

    bHaser = (nLengthOfYear == 353 || nLengthOfYear == 383)
    bShalem = (nLengthOfYear == 355 || nLengthOfYear == 385)

    // get the date for Tishrei 1
    dGreg = Tishrei1(nYearH)

    // Now count up days within the year
    for (nMonth = 1; nMonth <= nMonthH - 1; nMonth ++) {
      if (nMonth == 1 ||
          nMonth == 5 ||
          nMonth == 8 ||
          nMonth == 10 ||
          nMonth == 12 ) {
        nMonthLen = 30
      } else if (nMonth == 4 ||
                 nMonth == 7 ||
                 nMonth == 9 ||
                 nMonth == 11 ||
                 nMonth == 13 ) {
          nMonthLen = 29
      } else if (nMonth == 6) {
          nMonthLen = (bLeap ? 30 : 0)
      } else if (nMonth == 2) {
          nMonthLen = (bShalem ? 30 : 29)
      } else if (nMonth == 3) {
          nMonthLen = (bHaser ? 29 : 30 )
      }
      dGreg.setDate(dGreg.getDate() + nMonthLen)
    }
    dGreg.setDate(dGreg.getDate() + nDateH - 1)
    return dGreg
  }

  // This function converts a Gregorian date into the Hebrew date.  The
  // function returns the hebrew month as a string in the format M/D/Y.
  // See function HebToGreg() for the definition of the month numbers.
  function GregToHeb(dGreg) {
    var nYearH
    var nMonthH
    var nDateH
    var nOneMolad
    var nAvrgYear
    var nDays
    var dTishrei1
    var nLengthOfYear
    var bLeap
    var bHaser
    var bShalem
    var nMonthLen
    var bWhile
    var d1900 = new Date(1900, 0, 1)

    // The basic algorythm to get Hebrew date for the Gregorian date dGreg.
    // 1) Find out how many days dGreg is after creation.
    // 2) Based on those days, estimate the Hebrew year
    // 3) Now that we a good estimate of the Hebrew year, use brute force to
    //    find the Gregorian date for Tishrei 1 prior to or equal to dGreg
    // 4) Add to Tishrei 1 the amount of days dGreg is after Tishrei 1

    // Figure out how many days are in a month.
    // 29 days + 12 hours + 793 chalakim
    nOneMolad = 29 + (12 / 24) + (793 / (1080 * 24))
    // Figure out the average length of a year. The hebrew year has exactly
    // 235 months over 19 years.
    nAvrgYear = nOneMolad * (235 / 19)
    // Get how many days dGreg is after creation. See note as to why I
    // use 1/1/1900 and add 2067025
    nDays = Math.round((dGreg - d1900) / (24 * 60 * 60 * 1000))
    nDays += 2067025 // 2067025 days after creation
    // Guess the Hebrew year. This should be a pretty accurate guess.
    nYearH = Math.floor(nDays / nAvrgYear) + 1
    // Use brute force to find the exact year nYearH. It is the Tishrei 1 in
    // the year <= dGreg.
    dTishrei1 = Tishrei1(nYearH)

    if (SameDate(dTishrei1, dGreg)) {
      // If we got lucky and landed on the exact date, we can stop here
      nMonthH = 1
      nDateH = 1
    }
    else  {
      // Here is the brute force.  Either count up or count down nYearH
      // until Tishrei 1 is <= dGreg.
      if (dTishrei1 < dGreg) {
        // If Tishrei 1, nYearH is less than dGreg, count nYearH up.
        while (Tishrei1(nYearH + 1) <= dGreg) {
          nYearH += 1
        }
      }
      else {
        // If Tishrei 1, nYearH is greater than dGreg, count nYearH down.
        nYearH -= 1
        while (Tishrei1(nYearH) > dGreg) {
          nYearH -= 1
        }
      }

      // Subtract Tishrei 1, nYearH from dGreg. That should leave us with
      // how many days we have to add to Tishrei 1
      nDays = (dGreg - Tishrei1(nYearH)) / (24 * 60 * 60 * 1000)
      nDays = Math.round(nDays)
      // Find out what type of year it is so that we know the length of the
      // months
      nLengthOfYear = LengthOfYear(nYearH)
      bHaser = nLengthOfYear == 353 || nLengthOfYear == 383
      bShalem = nLengthOfYear == 355 || nLengthOfYear == 385
      bLeap = IsLeapYear(nYearH)

      // Add nDays to Tishrei 1.
      nMonthH = 1
      do {

        switch (nMonthH) {
          case 1:
          case 5:
          case 6:
          case 8:
          case 10:
          case 12:
            nMonthLen = 30
            break
          case 4:
          case 7:
          case 9:
          case 11:
          case 13:
            nMonthLen = 29
            break
          case 6: // Adar A (6) will be skipped on non-leap years
            nMonthLen = 30
            break
          case 2: // Cheshvan, see note above
            nMonthLen = (bShalem ? 30 : 29)
            break
          case 3: // Kislev, see note above
            nMonthLen = (bHaser ? 29: 30)
            break
        }

        if (nDays >= nMonthLen) {
          bWhile = true
          if (bLeap || nMonthH != 5) {
            nMonthH ++
          }
          else {
            // We can skip Adar A (6) if its not a leap year
            nMonthH += 2
          }
          nDays -= nMonthLen
        }
        else {
          bWhile = false
        }
      } while (bWhile)
      //Add the remaining days to Date
      nDateH = nDays + 1
    }
    return nMonthH + "/" + nDateH + "/" + nYearH
  }
	/*
	 * Returns true iff d1==d2
	 */
  function SameDate(d1, d2) {
    return (d1.getFullYear() == d2.getFullYear() && 
            d1.getMonth() == d2.getMonth() && 
            d1.getDate() == d2.getDate())
  } 
  
	//=========================E N D :  H E B R E W  -  G R E G O I A N  D A T E  C O N V E R T O R======================
	//===================================================================================================================

	
	// ==================================================================================================================
	// ===================== Cookies Code
	function GetEvents()
	{
		if (parent.useCookies == true)
		{
			return GetCookie("events");
		}
		return GetEventsFromMySql();
	}
	
	function GetEventsAsList()
	{
		var events = "";
		if (parent.useCookies == true)
		{
			events = GetCookie("events");
		}
		else
		{
			events = GetEventsFromMySql();
		}
		if (events == "")
			return events;
		return events.split("|");
	}
	
	function SetEvents(eventsStr)
	{
		// Using cookies.
		if (parent.useCookies == true)
		{
			SetCookie("events",eventsStr);
			return;
		}
		// Using SQL.
		SetEventsToMySql(eventsStr)
	}
	
	
	// -------------------------------------------------------------------------------------------------------------
	// COOKIE CODE
	// -------------------------------------------------------------------------------------------------------------	
	
	function GetCookie(c_name)
	{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	  {
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
		{
		return unescape(y);
		}
	  }
	  return "";
	}
	
	function SetCookie(c_name,value)
	{
		var exdate=new Date();
		var exdays = 50000;
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}

	
	
	// -------------------------------------------------------------------------------------------------------------	
	// -------------------------------------------------------------------------------------------------------------
	// ------------- FACEBOOOK CODE ----------------
	// -------------------------------------------------------------------------------------------------------------	
	// -------------------------------------------------------------------------------------------------------------	
	
	//var facebookUserId;

	// Sets User Events.
	function SetEventsToMySql(eventsStr)
	{
		
		if (parent.facebookUserId == "")
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
		xmlhttp.open("GET","db/dbset.asp?user="+parent.facebookUserId+"&events="+eventsStr+"&append=0",false);
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
				if (xmlhttp.responseText != "")
				{
					return(xmlhttp.responseText);
				}
			}
		  }
		xmlhttp.open("GET","db/dbget.asp?user="+parent.facebookUserId,false);
		xmlhttp.send();
		console.log("GetUserEvents from mysql " + parent.facebookUserId);
		console.log("GetUserEvents from mysql " + xmlhttp.responseText);
		if (xmlhttp.responseText === "undefined")
			return "";
		return xmlhttp.responseText;
	}