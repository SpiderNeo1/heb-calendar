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
	
	fieldNameToSelectBy = "facebookid"
	fieldname= "events"
	tablename = "tblusersandevents"
	
	response.expires=-1
	
	connectstr = "Driver={MySQL ODBC 3.51 Driver};SERVER=" & db_server & ";DATABASE=" & db_name & ";UID=" & db_username & ";PWD=" & db_userpassword

	Set oConn = Server.CreateObject("ADODB.Connection")
	oConn.Open connectstr
		
	DIM mySQL, objRS
	
	set objCommand = Server.CreateObject("ADODB.Command") 
	objCommand.ActiveConnection = oConn
	
	'If empty clear string.
	if (request.querystring("events")="") then
		strSql = "update "&tablename&" set "&fieldname&"='' where "&fieldNameToSelectBy&"="&request.querystring("user")&";"
		objCommand.CommandText = strSql 
		'objCommand.Parameters(0).value = request.querystring("user")
	else
		'Used in loading events for the first time.
		strSql = "insert into "&tablename&" ("&fieldname&", "&fieldNameToSelectBy&") values('"&request.querystring("events")&"', '"&request.querystring("user")&"') on duplicate key "
		if (request.querystring("append")="1") then
			' if append, concat previous
			strSqlUpdate = "update "&fieldname&"=CONCAT_WS('|',NULLIF("&fieldname&", ''),'"&request.querystring("events")&"');"
		else
			' if not append, update to new.
			strSqlUpdate = "update "&fieldname&"='"&request.querystring("events")&"';"
		end if
		response.write strSql & strSqlUpdate
		objCommand.CommandText = strSql & strSqlUpdate
	end if
		
	Set oRS = objCommand.Execute()	

	Set oConn = nothing


If Err.number <> 0 then     'if there is an error
response.write Err.number     'write out the error number
response.write Err.source     'write out the error source
response.write Err.description     'write out the error description
response.write Err.line ' line
End If
%>

