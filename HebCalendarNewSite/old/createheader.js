$(document).ready(function() {


var pathname = window.location.pathname
var arrClassLists = new Array("NotCurrent","NotCurrent","NotCurrent","NotCurrent","NotCurrent","NotCurrent","NotCurrent");
if (pathname.search("index") != -1)
{
	arrClassLists[0] = "current";
}
else if (pathname.search("hd_members") != -1)
{
	arrClassLists[1] = "current";
}
else if (pathname.search("hd_prospectives") != -1)
{
	arrClassLists[2] = "current";
}
else if (pathname.search("hd_careers") != -1)
{
	arrClassLists[3] = "current";
}
else if (pathname.search("hd_events") != -1)
{
	arrClassLists[4] = "current";
}
else if (pathname.search("hd_alumni") != -1)
{
	arrClassLists[5] = "current";
}
else if (pathname.search("hd_sponsors") != -1)
{
	arrClassLists[6] = "current";
}
else
{
	arrClassLists[0] = "current";
}

$('#Header').replaceWith("<img src='logo.jpg' alt='Cluster Q - Columbia Business School LGBT Organization' />"+
			"<ul class='lavaLampNoImage' id='2'>"+
				 "<li class='"+arrClassLists[0]+"'><a href='index.html'>Home</a></li>"+
				 "<li class='"+arrClassLists[1]+"'><a href='hd_members.html'>Members</a></li>"+
				 "<li class='"+arrClassLists[2]+"'><a href='hd_prospectives.html'>Prospectives</a></li>"+
				 "<li class='"+arrClassLists[3]+"'><a href='hd_careers.html'>Careers</a></li>"+
				 "<li class='"+arrClassLists[4]+"'><a href='hd_events.html'>Events</a></li>"+
				 "<li class='"+arrClassLists[5]+"'><a href='hd_alumni.html'>Alumni</a></li>"+
				 "<li class='"+arrClassLists[6]+"'><a href='hd_sponsors.html'>Sponsors</a></li>"+
			 "</ul>"
)})
