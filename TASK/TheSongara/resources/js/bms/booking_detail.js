
//java scripts for booking detail page

$(document).ready(function() {
	$('#backtolist').click(function() {
		if(checkConfirm()){
			parent.history.back();
			return false;	
		}		
	});
	$('#bookingDetailCancel').click(function() {
		if(checkConfirm()){
			parent.history.back();
			return false;	
		}		
	});
	$('#searchagain').click(function(){
		if(checkConfirm()){
			location.href="../searchPage.htm";
		}
	});
	
	$('#closeMe').live('click',function(){
		window.open('','_self');
		window.close();
	});
	
	$(":input").change(function(){
	    $('#fieldchange').val('true');
	});
	
	if($("[id^='airCanadaTicket']").length >0  && $("[id^='westJetTicket']").length >0){
		if($('#currentMasterStatus').val() != "Booked"){
			$('#status').change(function(){
				if($('#status').val() == "Booked"){
					alert("Please enter the required E-ticket Numbers\nBefore Changing The Booking Status.");
					$('#PassangerDetailTbl tr').each(function(){
						if ($('#' + 'click' + this.id).text() == '[+]') {
							$('#' + 'click' + this.id).text('[-]');
						} else {
							$('#' + 'click' + this.id).text('[+]');
						}
						$(this).nextAll('#TR'+this.id).each(function() {
							$(this).toggle();
						});
						$(this).nextAll('#TR'+'_'+this.id).each(function() {
			            		$(this).toggle();
						});
					});
				}
			});
		}
	}
	$('#bookingdetailForm').click(function() {
		if($('#currentMasterStatus').val() == "Abandoned" && $('#status').val() == "Abandoned"){
			alert("Please change the booking status prior to saving the record.");
			return false;
		}
	});
	
	function checkConfirm(){
		if($('#fieldchange').val()=='true'){
			return confirm("Changes made to booking will be lost. Do you want to continue ?");
		}
		return true;
	}
	
	
	// Validation For Ticketnumber in Passanger Details - start
	$("[id^='airCanadaTicket']").keypress(function (e){
		if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57)){
			return false;
		}
	});
	
	$("[id^='westJetTicket']").keypress(function (e){
		if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57)){
			return false;
		}
	});
	
	$("#bookingdetailForm").live('click', function(e){
		var visible = false;
		var firstTime = true;
		var returnvalue = true;
		$('#PassangerDetailTbl tr').each(function(){
			$("#"+this.id).is(":visible");
			if(this.id.indexOf("_") != -1){
				visible = $("#"+this.id).is(":visible");
			}
		});
		
		$('#PassangerDetailTbl tr').each(function(){
			if($("#currentMasterStatus").val() != "Booked" && $("#status").val() == "Booked" && firstTime &&($('[id^=airCanadaTicket1]').val().length+$('[id^=airCanadaTicket2]').val().length+$('[id^=airCanadaTicket3]').val().length)==0){
				alert("Please Enter Air Canada Ticket Number");
				$('[id^=airCanadaTicket1]').focus();
				firstTime = false;
				returnvalue = false;
			}
		});
		
		if($('#activatecommission').is(':checked') && $('#agentName').prop("selectedIndex")==0){
			alert("Please select agent Name.");
			$('#agentName').focus();
			return false;
		}
		if($('#agentName').prop("selectedIndex") != undefined && $('#agentName').prop("selectedIndex")!=0 && !$('#activatecommission').is(':checked')){
			alert("Please select Activate FN Air Commission checkbox.");
			$('#activatecommission').focus();
			return false;
		}
		return returnvalue; 
	});
	
	
	function isNumberKey(evt)
	 {
	   var charCode = (evt.which) ? evt.which : event.keyCode;
	   if (charCode > 31 && (charCode < 48 || charCode > 57))
	      return false;

	   return true;
	 }
});


function saveLogMessage() { 	  
	 if(dwr.util.getValue("commentMessage").length > 0){
		 backEndCallToLogMessage(dwr.util.getValue("commentMessage"),dwr.util.getValue("masterbookingid"));
		 $('#commentMessage').val('');
	 }else{
		 alert("Enter log message.");
		 $('#commentMessage').focus();
	 }
}
 
 function handleAddError(){
	 alert("Error while saving message, please try again.");
 }

 $(document).ready(function(){
 	$("[id*='departDate']").each(function() {
 		$('#'+this.id).datepick({showTrigger:'<img src="../resources/images/calendar.gif" class="trigger">'});
 		$('#'+this.id).datepicker("enable");
 	});
 	$("[id*='arriveDate']").each(function() {
 		$('#'+this.id).datepick({showTrigger:'<img src="../resources/images/calendar.gif" class="trigger">'});
 		$('#'+this.id).datepicker("enable");
 	});
 });