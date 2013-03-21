<%
	On Error Resume Next

	Dim oConn, oRs
	Dim qry, connectstr
	Dim db_name, db_username, db_userpassword
	Dim db_server
	dim fieldNameToSelectBy
	dim fieldname
	dim tablename
	
	'db_server = "jewishcalendardb.db.10779042.hostedresource.com"
	' db_server="localhost"
	' db_name = "jewishcalendardb"
	' db_username = "jewishcalendardb"
	' db_userpassword = "Afdz!2f89A1"
	
	db_server  = "jewishcalendar.db.10779042.hostedresource.com"
	db_name = "jewishcalendar"
	db_username = "jewishcalendar"
	db_userpassword = "Afdz!2f89A"
	
	fieldNameToSelectBy = "facebookId"
	fieldname= "events"
	tablename = "tblusersandevents"
	
	response.expires=-1
	
	connectstr = "Driver={MySQL ODBC 3.51 Driver};SERVER=" & db_server & ";DATABASE=" & db_name & ";UID=" & db_username & ";PWD=" & db_userpassword

	Set oConn = Server.CreateObject("ADODB.Connection")
	oConn.Open connectstr
		
	DIM mySQL, objRS
	
	set objCommand = Server.CreateObject("ADODB.Command") 
	objCommand.ActiveConnection = oConn

	' If empty clear string.
	if (request.querystring("events")="") then
		strSql = "update "&tablename&" set "&fieldname&"='' where "&fieldNameToSelectBy&"=?;"
		objCommand.CommandText = strSql 
		objCommand.Parameters(0).value = request.querystring("user")
	else
		' Used in loading events for the first time.
		if (request.querystring("append")="1") then
			' complicated sql command:
			' Inserts if empty
			' updates if exists
			' concatenates with "|" if exists and isn't empty.			
			strSql = "insert into "&tablename&" ("&fieldname&", "&fieldNameToSelectBy&") values(?, ?) on duplicate key update "&fieldname&"=CONCAT_WS('|',NULLIF("&fieldname&", ''),?);"
			objCommand.CommandText = strSql 
			objCommand.Parameters(0).value = request.querystring("events")
			objCommand.Parameters(1).value = request.querystring("user")
			objCommand.Parameters(2).value = request.querystring("events")			
		' Used in calendar most of the time.
		else
			' regular update.
			strSql = "update "&tablename&" set "&fieldname&"=? where "&fieldNameToSelectBy&"=?;"
			objCommand.CommandText = strSql 
			objCommand.Parameters(0).value = request.querystring("events")
			objCommand.Parameters(1).value = request.querystring("user")			
		end if
	end if
	
	

	
	Set oRS = objCommand.Execute()	

	Set oConn = nothing

If Err.number <> 0 then     'if there is an error
response.write Err.number     'write out the error number
response.write Err.source     'write out the error source
response.write Err.description     'write out the error description
End If
%>

