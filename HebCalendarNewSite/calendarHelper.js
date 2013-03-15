

	//====================================== Convert Date HANDLERS ===================================

	/* function loads the jewish-> gregorian form.
	 * Sets current date (day,month,year) and updates the drop down boxes for
	 * hebrew dates.
	 */
	var useHebrewForMonthsAndDays = false;
	
	function loadForm()
	{
		if (loaded == false)
		{
			setTimeout(loadForm, 500);
			return;
		}
		$("#HebDateForm").html(createForm());

		var now = new Date();
		var hebDate = GregToHeb(now).split('/');
		currHebYear = parseInt(hebDate[2]);	
		currMonth=now.getMonth()
		currYear=now.getUTCFullYear()
		currDay = now.getDate()
		
		updateDropDownBoxesOfJewishDateConversion();
		updateGregDateConvertedFromHebDate();
	}

	function updateDaysAccordingToLanguage()
	{
		updateDays(useHebrewForMonthsAndDays);
	}
	
	/*
	 * Update the drop down boxes for days and months based on the current year (leap or not)
	 *
	 */
	function updateDropDownBoxesOfJewishDateConversion(useHebrew)
	{
		var i;
		var elemYear = document.getElementById("EventYear")
		var elemMonth = document.getElementById("EventMonth")
		var elemDay = document.getElementById("EventDay")
			
		var currYearLeap = IsLeapYear(currHebYear);
		var arrHebDateToUse = arrHebDate;
		var arrHebMonthsToUse = arrHebMonths;
		var ENUM_AdarBetCasesToUse  =  ENUM_AdarBetCases;
		useHebrewForMonthsAndDays =	useHebrew;
		
		if (useHebrew == true)
		{
			arrHebDateToUse = arrHebDateHeb;
			arrHebMonthsToUse = arrHebMonthsHeb;
			ENUM_AdarBetCasesToUse = ENUM_AdarBetCasesHeb;
		}
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
		currentGregOrHeb = "AddHebDate";
			// If the current selected format is hregorian
			// Add 30 days to the days text box.
		for (i=0;i<30;i++){
			elemDay.clear;
			var optn = document.createElement("OPTION");
			optn.text = arrHebDateToUse[i];
			optn.value = i+1;
			elemDay.options.add(optn);
		}
			// Add the hebrew months.
			for (i=0;i<13;i++){
			if (i==5) {
					// if the current year is a leap one add adar bet else modify the fifth array element to be
					// adar (not adar bet)
				if (currYearLeap)
				{
					arrHebMonthsToUse[6]=ENUM_AdarBetCasesToUse[0];
				}
				else 
				{
					arrHebMonthsToUse[6]=ENUM_AdarBetCasesToUse[1];
					continue;
				}
			}
			var optn = document.createElement("OPTION");
			optn.text = arrHebMonthsToUse[i];
			optn.value = i+1;
			elemMonth.options.add(optn);
		}	
		for (i=-100;i<101;i++){
			var optn = document.createElement("OPTION");
			optn.text = Nyear2Hyear(currHebYear + i,useHebrew);
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

	/*
	 * Create the convert date form based on XML names from NAMES.XML.
	 *
	 */
	function createForm()
	{
		var text="<form id='ConvertDate' action='javascript:submitEvent()' Method='GET'>"
		text+="<p dir='"+directionOfForm+"'><span lang='he'>"+ENUM_EventTabText[3]+": <select size='1' id='EventDay' onchange='updateGregDateConvertedFromHebDate();'></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
		text+=ENUM_EventTabText[4]+":&nbsp;<select size='1' id='EventMonth' onchange='updateDaysAccordingToLanguage();updateGregDateConvertedFromHebDate();'></select> &nbsp;&nbsp;&nbsp; </span></p>"
		text+="<p dir='"+directionOfForm+"'><span lang='he'> "+ENUM_EventTabText[5]+":&nbsp;"
		text+="<select size='1' id='EventYear' onchange='updateDaysAccordingToLanguage();updateGregDateConvertedFromHebDate();'></select></span>"
		text+="</font></form>"
		return text;
	}

	/*
	 * Updates the text box for gregorian date converted based on the selected jewish date.
	 */
	function updateGregDateConvertedFromHebDate() 
	{		
			var elemYear = document.getElementById("EventYear")
			var elemMonth = document.getElementById("EventMonth")
			var elemDay = document.getElementById("EventDay")
			var monthSelected = parseInt(elemMonth.options[elemMonth.selectedIndex].value);
			var yearSelected = parseInt(elemYear.options[elemYear.selectedIndex].value)

			var daySelected=parseInt(elemDay.options[elemDay.selectedIndex].value);
					
			var gregDate = HebToGreg(yearSelected, monthSelected, daySelected);
				
			$("#GregorianDateFromHeb").val($.datepicker.formatDate('MM dd, yy',gregDate));
	}		

	//====================================== HOLIDAY HANDLERS ===================================
	function getHolidaysBetweenTwoDates(beginningDate, endDate)
	{	
		return getHolidaysBroadlyFromDateAndAYearForward(beginningDate,endDate);
	}
	
	/*
	 * Get all holidays between the begining date and about a year forward.
	 * the function actually gets holidays two months before the beginning date and
	 * about a year forward
	 * This is done to accomdate moving holidays and making sure they fall between the required dates
	 */
	function getHolidaysBroadlyFromDateAndAYearForward(beginningDate, endDate)
	{
		var YEAR=2 
		var DAY=1 
		var MONTH=0	
		var firstHolidayIndex;
		var arrHolidaysList = new Array();
		var i;
		var fullDateBeingProcessed;
		// Get first holiday.
		var mdyHebDate = beginningDate.split("/");
		
		beginningDateGreg = HebToGregFromCompleteDate(beginningDate);
		
		// save index of first holiday x,y.
		var monthProcessing = parseInt(mdyHebDate[MONTH]-2);
		var yearProcessing = parseInt(mdyHebDate[YEAR]);
		if (monthProcessing < 0)
		{
			monthProcessing = 12 + monthProcessing;
			yearProcessing = yearProcessing-1;
		}
		fullDateBeingProcessed = monthProcessing + "/" + mdyHebDate[1] + "/" + yearProcessing;
		// Holidays start with previous month just in case a holiday moved to the current date 
		// - so that we won't miss it.
		// Run as long as we are before the end dates
		while (compareDates(fullDateBeingProcessed,endDate) < 0)
		{
			//scan all holidays in current holidays[monthProcessing]
			for (k=0 ; k < holidays[monthProcessing].length ; k++) 
			{
				// Return copy of holiday.
				tempholiday =(holidays[monthProcessing][k].isMovable ? cloneholiday(holidays[monthProcessing][k]) : holidays[monthProcessing][k])
				// Set hebrew date for holiday.
				var holidayHebDate = new Array(monthProcessing, tempholiday.Hday, yearProcessing);
				// set Gregorian date for holiday
				var holidayGregDate = HebToGreg(yearProcessing, monthProcessing+1, tempholiday.Hday)
				// Get day of the week (for movable)
				var dayOfTheWeek = holidayGregDate.getDay();
				// Move holiday if necessary
				
				// cell2 = moveEventIfNecessary(tempholiday, cell1) 
				currYear = holidayGregDate.getUTCFullYear();
				 
				 if (tempholiday.isHistoricalEvent)
					  if (!(isValidholiday(holidays[monthProcessing-1][k])))
						continue;  //skip current event since it hasn't occured yet (currYear is older / smaller)
				
				var newHoliday = new holiday(tempholiday.desc,tempholiday.Hmonth,tempholiday.Hday,
											 tempholiday.eventType, tempholiday.isTzom, tempholiday.isMovable,
											 tempholiday.isHistoricalEvent,holidayGregDate,holidayHebDate);
											 

				var changeDateBy = moveEventIfNecessary(newHoliday,newHoliday.gregDate.getDay())
				changeDateBy = changeDateBy - (newHoliday.gregDate.getDay());
				
				// move event by change date by.
				// If changeDateBy = 0 does nothing.
				copyHolidayAndChangeDate(newHoliday,changeDateBy);

				if (beginningDateGreg.getTime() < newHoliday.gregDate.getTime())
				{
					arrHolidaysList.push(newHoliday);
				}
				
			}
			// Increment start Month
			monthProcessing++;
			// If larger than 12 move to the next year.
			if (monthProcessing > 12)
			{
				monthProcessing=0;
				yearProcessing=yearProcessing+1;
			}
			// Update date being processed
			fullDateBeingProcessed = monthProcessing + "/" + mdyHebDate[1] + "/" + yearProcessing;
		}
		// return list of holidays.
		return printHolidayList(arrHolidaysList);
	}
	
	// Prints Holiday List
	function printHolidayList(arrHolidayList)
	{
		var strHolidayList = "";
		var i;
		for (i=0; i < arrHolidayList.length; i++)
		{
			strHolidayList +=printHoliday(arrHolidayList[i]);
		}
		return strHolidayList;
	}
	function printHoliday(holiday)
	{
		var strHolidayList="";
		strHolidayList += "<div id='holidayDiv'>"
		strHolidayList += holiday.desc+ "<br/>"
		strHolidayList += arrHebMonths[holiday.hebDate[0]] + " " + arrHebDate[holiday.hebDate[1]-1] + ", " + Nyear2Hyear(holiday.hebDate[2]) + "<br/>";
		strHolidayList += $.datepicker.formatDate('MM dd, yy',holiday.gregDate	) + "<br/><br/>";	
		strHolidayList += "</div><br/>";
		return strHolidayList;
	}
	
	/*
	 * Changes date of a holiday by changeDateBy
	 */
	function copyHolidayAndChangeDate(holidayToModify,changeDateBy)
	{
		if (changeDateBy == 0)
			return;
		holidayToModify.gregDate.setDate(holidayToModify.gregDate.getDate() + changeDateBy);
		holidayToModify.hebDate = GregToHeb(holidayToModify.gregDate).split("/");
		holidayToModify.hebDate[0]--;
	}
	
	// Compares two jewish dates
	// Returns: -1 , date1 before date2
	//			 0 , date1 = date2
	//			 1 , date1 after date2
	function compareDates(date1,date2)
	{
		var YEAR=2 
		var DAY=1 
		var MONTH=0	

		mdyDate1 = date1.split("/");
		mdyDate2 = date2.split("/");
		// check if year is equal
		if (mdyDate1[YEAR] > mdyDate2[YEAR])
			return 1;
		else if (mdyDate1[YEAR] < mdyDate2[YEAR])
			return -1;
		// year is equal - check month
		if (mdyDate1[MONTH] > mdyDate2[MONTH])
			return 1;
		else if (mdyDate1[MONTH] > mdyDate2[MONTH])
			return -1
		// month is equal check day
		if (mdyDate1[DAY] > mdyDate2[DAY])
			return 1
		else if (mdyDate1[DAY] < mdyDate2[DAY])
			return -1;
		return 0;
		
	}
	
	