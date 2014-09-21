$(document).ready(function(){
	$("#nonRevenue").dialog({
		autoOpen : false,
		closeOnEscape : true,
		draggable : true,
		resizable : false,
		modal : true,
		width : 'auto',
		show  : "slide",
		hide  : "slide",
	    buttons:{
	    		'Cancel' : {
	    			text: "Cancel",
	    			class:'dialogbutton',
	    	 		click: function() {
	    				$( this ).dialog( "close" );
	    			},
	    		}
	    }
	});
	$('#nonRevenueLink').live('click',function(){
		$( "#nonRevenue" ).dialog( "open" );
	});
	$("#nonRevenueUpdate").live('click',function(){
		$(".nonRevenueClass input[type=checkbox]").each(function() {
			if(this.checked){
				$('#commentMessage').val($('#commentMessage').val() + ($(this).parent().text().substring(3) + "\n"));
				$(this).removeAttr('checked');
	       }
		});
		$( "#nonRevenue" ).dialog( "close" );
	});
	
	$("#newBooking").dialog({
		autoOpen : false,
		closeOnEscape : true,
		draggable : true,
		resizable : false,
		modal : true,
		width : 'auto',
		show  : "slide",
		hide  : "slide",
	    buttons:{
	    		'Cancel' : {
	    			text: "Cancel",
	    			class:'dialogbutton',
	    	 		click: function() {
	    				$( this ).dialog( "close" );
	    			},
	    		}
	    }
	});
	$('#newBookingLink').live('click',function(){
		$( "#newBooking" ).dialog( "open" );
	});
	$("#newBookingUpdate").live('click',function(){
		$(".newBookingClass input[type=checkbox]").each(function() {
			if(this.checked){
				$('#commentMessage').val($('#commentMessage').val() + ($(this).parent().text().substring(3) + "\n"));
				$(this).removeAttr('checked');
	       }
		});
		$( "#newBooking" ).dialog( "close" );
	});
	
	$("#changeCancel").dialog({
		autoOpen : false,
		closeOnEscape : true,
		draggable : true,
		resizable : false,
		modal : true,
		width : 'auto',
		show  : "slide",
		hide  : "slide",
	    buttons:{
	    		'Cancel' : {
	    			text: "Cancel",
	    			class:'dialogbutton',
	    	 		click: function() {
	    				$( this ).dialog( "close" );
	    			},
	    		}
	    }
	});
	$('#changeCancelLink').live('click',function(){
		$( "#changeCancel" ).dialog( "open" );
	});
	
	$("#changeCacnelUpdate").live('click',function(){
		$(".changeCancelClass input[type=checkbox]").each(function() {
			if(this.checked){
				$('#commentMessage').val($('#commentMessage').val() + ($(this).parent().text().substring(3) + "\n"));
				$(this).removeAttr('checked');
	       }
		});
		$( "#changeCancel" ).dialog( "close" );
	});
});