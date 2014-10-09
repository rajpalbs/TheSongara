$(document).ready(function(){
	//NOT ALLOW SPACE VALIDATION 
	$(".spaceNotAllowed").keypress(function (evt) {
		var keycode = evt.charCode || evt.keyCode;
		  if (keycode  == 32){
			alert("Space Not Allowed Here");  
		    return false;
		  }
	});
});
	


$(function() {
	$( ".dob15yrbefore" ).datepicker({
		dateFormat: "dd/mm/yy",
		defaultDate : '-180m',
		changeMonth: true,
        changeYear: true
	});
});