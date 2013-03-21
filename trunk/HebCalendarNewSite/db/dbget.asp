<%
	On Error Resume Next
	Dim oConn, oRs
	Dim qry, connectstr
	Dim db_name, db_username, db_userpassword
	Dim db_server
	db_server = "localhost"
	db_name = "jewishcalendar"
	db_username = "root"
	db_userpassword = "a"
	fieldNameToSelectBy = "facebookId"
	fieldNameToReturn = "events"
	tablename = "tblusersandevents"
	
	response.expires=-1
	
	connectstr = "Driver={MySQL ODBC 3.51 Driver};SERVER=" & db_server & ";DATABASE=" & db_name & ";UID=" & db_username & ";PWD=" & db_userpassword

	Set oConn = Server.CreateObject("ADODB.Connection")
	oConn.Open connectstr
	
	strSql = "SELECT "&fieldNameToReturn&" FROM "&tablename&" WHERE "&fieldNameToSelectBy&" = ?;" 
	set objCommand = Server.CreateObject("ADODB.Command") 
	objCommand.ActiveConnection = oConn
	objCommand.CommandText = strSql 
	objCommand.Parameters(0).value = request.querystring("user")
	Set oRS = objCommand.Execute()	

	
	'Set oRS = oConn.Execute(sql)

	if not oRS.EOF then
	while not oRS.EOF
		response.write oRs.Fields(fieldNameToReturn)
	oRS.movenext
	wend
	
	oRS.close
	end if

	Set oRs = nothing
	Set oConn = nothing

%>