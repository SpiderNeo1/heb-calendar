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
	'db_server="localhost"
	'db_name = "jewishcalendardb"
	'db_username = "jewishcalendardb"
	'db_userpassword = "Afdz!2f89A1"
	
	db_server  = "jewishcalendar.db.10779042.hostedresource.com"
	db_name = "jewishcalendar"
	db_username = "jewishcalendar"
	db_userpassword = "Afdz!2f89A"
	
	fieldname = "events"
	fieldNameToSelectBy = "facebookid"
	tablename = "tblusersandevents"

	response.expires=-1
	
	connectstr = "Driver={MySQL ODBC 3.51 Driver};SERVER=" & db_server & ";DATABASE=" & db_name & ";UID=" & db_username & ";PWD=" & db_userpassword

	Set oConn = Server.CreateObject("ADODB.Connection")
	oConn.Open connectstr
	
	strSql = "SELECT "&fieldname&" FROM "&tablename&" WHERE "&fieldNameToSelectBy&" = ?;" 
	set objCommand = Server.CreateObject("ADODB.Command") 
	objCommand.ActiveConnection = oConn
	objCommand.CommandText = strSql 
	objCommand.Parameters(0).value = request.querystring("user")
	
	Set oRS = objCommand.Execute()	


	if not oRS.EOF then
	while not oRS.EOF
		response.write oRs.Fields(fieldname)
	oRS.movenext
	wend
	
	oRS.close
	end if

	Set oRs = nothing
	Set oConn = nothing



If Err.number <> 0 then     'if there is an error
response.write Err.number     'write out the error number
response.write Err.source     'write out the error source
response.write Err.description     'write out the error description
End If
%>
