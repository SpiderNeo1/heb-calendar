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
	fieldname= "events"
	tablename = "tblusersandevents"
	
	response.expires=-1
	
	connectstr = "Driver={MySQL ODBC 3.51 Driver};SERVER=" & db_server & ";DATABASE=" & db_name & ";UID=" & db_username & ";PWD=" & db_userpassword

	Set oConn = Server.CreateObject("ADODB.Connection")
	oConn.Open connectstr
		
	DIM mySQL, objRS
	
	' complicated sql command:
	' Inserts if empty
	' updates if exists
	' concatenates with "|" if exists and isn't empty.
	strSql = "insert into "&tablename&" ("&fieldname&", "&fieldNameToSelectBy&") values(?, ?) on duplicate key update "&fieldname&"=CONCAT_WS('|',NULLIF("&fieldname&", ''),?);"

	set objCommand = Server.CreateObject("ADODB.Command") 
	objCommand.ActiveConnection = oConn
	objCommand.CommandText = strSql 
	objCommand.Parameters(0).value = request.querystring("events")
	objCommand.Parameters(1).value = request.querystring("user")
	objCommand.Parameters(2).value = request.querystring("events")

	
	Set oRS = objCommand.Execute()	

	Set oConn = nothing

%>

<%	' Error Handler
 		If Err.Number = 0  Then
			response.write "1"
		Else
 
 			' Clear response buffer
 			Response.Clear
 			
 			' Display Error Message to user	%>

 
 		<HTML>
 
 		<HEAD>
 		<TITLE></TITLE>
 		</HEAD>
 
 		<BODY BGCOLOR="#C0C0C0">
 
 		<FONT FACE="ARIAL">An error occurred in the execution of this ASP page<BR>

 		Please report the following information to the support desk<P>
 <B>Page Error Object</B><BR>
 Error Number <%= Err.Number %><BR>
 Error Description <%= Err.Description %><BR>		
 			Source <%= Err.Source %><BR>

 			LineNumber <%= Err.Line %><BR>
 
 	</FONT>
 
 	</BODY>
 	</HTML>
 
 <%	End If
 
 	%>
