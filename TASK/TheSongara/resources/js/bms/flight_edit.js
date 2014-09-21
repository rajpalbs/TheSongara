	var i = 1;
	var j = 1;
	$(document).ready(
			function(){
	$('.deleteMe').live('click',function(){
		$(this).parent().parent().remove();
	});
	$("#addoutBound").live('click',function() {
		//var row = $('#outBound tr:last').clone();
		var row = $('#outBound tr:nth-child(3)').clone();
 		previousRow = 	$('#outBound tr:last');
		previousRow.find("[id^='addoutBound']").remove();
		
		row.attr('id','outBound'+i);
		row.find("input[type='text']").val("");
		row.find("[id*='carrierName']").attr("id",'outBound_carrierName'+i).attr("value",'');
		row.find("[id*='newFlightNumber']").attr("id",'outBound_newFlightNumber'+i).attr("value",'');
		row.find("[id*='departDate']").attr("id",'outBound_departDate'+i).attr("value",'');
		row.find("[id*='departCity']").attr("id",'outBound_departCity'+i).attr("value",'').autocomplete(autoCompleteOptions);
		row.find("[id*='arriveCity']").attr("id",'outBound_arriveCity'+i).attr("value",'').autocomplete(autoCompleteOptions);
		row.find("[id*='departHour']").attr("id",'outBound_departHour'+i).attr("value",'');
		row.find("[id*='departMinute']").attr("id",'outBound_departMinute'+i).attr("value",'');
		row.find("[id*='departAmPm']").attr("id",'outBound_departAmPm'+i).attr("value",'');
		row.find("[id^='delete_']").attr('id','deleteMe').attr('class','deleteMe').removeAttr('onClick');
		row.find("[id*='arriveDate']").attr("id",'outBound_arriveDate'+i).attr("value",'');
		row.find("[id*='arriveHour']").attr("id",'outBound_arriveHour'+i).attr("value",'');
		row.find("[id*='arriveMinute']").attr("id",'outBound_arriveMinute'+i).attr("value",'');
		row.find("[id*='arriveAmPm']").attr("id",'outBound_arriveAmPm'+i).attr("value",'');
		row.find("[id*='bookingClass']").attr("id",'outBound_bookingClass'+i).attr("value",'');
		row.find("[id*='fareBasis']").attr("id",'outBound_fareBasis'+i).attr("value",'');
		row.find("[id*='operatedBy']").attr("id",'outBound_operatedBy'+i).attr("value",'');
		row.find('img').remove();
		
		row.insertAfter('#outBound tr:last');
		
		$('#outBound_departDate'+i).removeClass('hasDatepick').datepick({yearRange: 'c-100:c+1',showTrigger:'<img src="../resources/images/calendar.gif" class="trigger">'});
	    $('#outBound_arriveDate'+i).removeClass('hasDatepick').datepick({yearRange: 'c-100:c+1',showTrigger:'<img src="../resources/images/calendar.gif" class="trigger">'});
		i++;
	});
	
	$('#addinBound').live('click',function() {
		var row = $('#inBound tr:last').clone();
		//var row = $('#inBound tr:nth-child(3)').clone();
		previousRow = 	$('#inBound tr:last');
		previousRow.find("[id^='addinBound']").remove();
		
		row.attr('id','inBound'+i);
		row.find("input[type='text']").val("");
		row.find("[id*='carrierName']").attr("id",'inBound_carrierName'+j).attr("value",'');
		row.find("[id*='newFlightNumber']").attr("id",'inBound_newFlightNumber'+j).attr("value",'');
		row.find("[id*='departDate']").attr("id",'inBound_departDate'+j).attr("value",'');
		row.find("[id*='departCity']").attr("id",'inBound_departCity'+j).attr("value",'').autocomplete(autoCompleteOptions);
		row.find("[id*='arriveCity']").attr("id",'inBound_arriveCity'+j).attr("value",'').autocomplete(autoCompleteOptions);
		row.find("[id*='departHour']").attr("id",'inBound_departHour'+j).attr("value",'');
		row.find("[id*='departMinute']").attr("id",'inBound_departMinute'+j).attr("value",'');
		row.find("[id*='departAmPm']").attr("id",'inBound_departAmPm'+j).attr("value",'');
		row.find("[id^='delete_']").attr('id','deleteMe').attr('class','deleteMe').removeAttr('onClick');
		row.find("[id*='arriveDate']").attr("id",'inBound_arriveDate'+j).attr("value",'');
		row.find("[id*='arriveHour']").attr("id",'inBound_arriveHour'+j).attr("value",'');
		row.find("[id*='arriveMinute']").attr("id",'inBound_arriveMinute'+j).attr("value",'');
		row.find("[id*='arriveAmPm']").attr("id",'inBound_arriveAmPm'+j).attr("value",'');
		row.find("[id*='bookingClass']").attr("id",'inBound_bookingClass'+j).attr("value",'');
		row.find("[id*='fareBasis']").attr("id",'inBound_fareBasis'+j).attr("value",'');
		row.find("[id*='operatedBy']").attr("id",'inBound_operatedBy'+j).attr("value",'');
		
		row.find('img').remove();
		
		row.insertAfter('#inBound tr:last');
		
		$('#inBound_departDate'+j).removeClass('hasDatepick').datepick({yearRange: 'c-100:c+1',showTrigger:'<img src="../resources/images/calendar.gif" class="trigger">'});
	    $('#inBound_arriveDate'+j).removeClass('hasDatepick').datepick({yearRange: 'c-100:c+1',showTrigger:'<img src="../resources/images/calendar.gif" class="trigger">'});
		j++;
	});				
	
	$('#cancelFlightEdit').click(function($){
		jQuery('#flightInfo').hide();
		jQuery('#flightInfo').dialog("close");
		jQuery('.ui-widget-overlay').removeClass('.ui-widget-overlay');
	 	return false;
	});
	
	});
	
	
	function hideCurrentRow(rowId){
		document.getElementById("row"+rowId).style.display = 'none';
		document.getElementById("deleteSegment"+rowId).value = true;
	}
	
	var autoCompleteOptions = {
			source:"/bms/getAirport.htm", 		
			autoFocus: true,
			delay:500,
			minLength:3,
			open: function () {
				$(this).data("autocomplete").menu.element.width(350);
			},
			select: function (event, ui) {
				code = ui.item.value.split("").reverse().join("").substring(1,4).split("").reverse().join("");
				$(this).val(code);
				return false;
			}
	};
	
	$(document).ready(function(){
		$( ".completeMe" ).autocomplete(autoCompleteOptions);	
		$('#saveAndClose').live('click',function(){
			var valid = true;
			$('#outBound > tbody  > tr').each(function(){
				//for flight Number 
				if(this.id != "" && valid){
					if(($(this).find("[id*='newFlightNumber']").val().length)==0){
						alert("please Enter Flight Number");
						$(this).find("[id*='newFlightNumber']").focus();
						valid = false;
					}
				}
				//for flight Depart Date 
				if(this.id != "" && valid){
					if(($(this).find("[id*='departDate']").val().length)==0){
						alert("please Enter Depart Date");
						$(this).find("[id*='departDate']").focus();
						valid = false;
					}
				}
				//for flight Depart city
				if(this.id != "" && valid){
					if(($(this).find("[id*='departCity']").val().length)==0){
						alert("please Enter Depart City");
						$(this).find("[id*='departCity']").focus();
						valid = false;
					}
				}
				//for flight Arrive city 
				if(this.id != "" && valid){
					if(($(this).find("[id*='arriveCity']").val().length)==0){
						alert("please Enter Arrive City");
						$(this).find("[id*='arriveCity']").focus();
						valid = false;
					}
				}
				//for flight Arrive Date 
				if(this.id != "" && valid){
					if(($(this).find("[id*='arriveDate']").val().length)==0){
						alert("please Enter Arrive Date");
						$(this).find("[id*='arriveDate']").focus();
						valid = false;
					}
				}
				//for date correct date 
				if(this.id != "" && valid){
					if (Date.parse($(this).find("[id*='departDate']").val()) > Date.parse($(this).find("[id*='arriveDate']").val())) {
						alert("Arrive Date Not Less Than Depart Date");
						$(this).find("[id*='arriveDate']").focus();
						valid = false;
					} 
				}
			});
			
			$('#inBound > tbody  > tr').each(function(){
				//for flight Number 
				if(this.id != "" && valid){
					if(($(this).find("[id*='newFlightNumber']").val().length)==0){
						alert("please Enter Flight Number");
						$(this).find("[id*='newFlightNumber']").focus();
						valid = false;
					}
				}
				//for flight Depart Date 
				if(this.id != "" && valid){
					if(($(this).find("[id*='departDate']").val().length)==0){
						alert("please Enter Depart Date");
						$(this).find("[id*='departDate']").focus();
						valid = false;
					}
				}
				//for flight Depart city 
				if(this.id != "" && valid){
					if(($(this).find("[id*='departCity']").val().length)==0){
						alert("please Enter Depart City");
						$(this).find("[id*='departCity']").focus();
						valid = false;
					}
				}
				//for flight Arrive city 
				if(this.id != "" && valid){
					if(($(this).find("[id*='arriveCity']").val().length)==0){
						alert("please Enter Arrive City");
						$(this).find("[id*='arriveCity']").focus();
						valid = false;
					}
				}
				//for flight Arrive Date 
				if(this.id != "" && valid){
					if(($(this).find("[id*='arriveDate']").val().length)==0){
						alert("please Enter Arrive Date");
						$(this).find("[id*='arriveDate']").focus();
						valid = false;
					}
				}
				if(this.id != "" && valid){
					if (Date.parse($(this).find("[id*='departDate']").val()) > Date.parse($(this).find("[id*='arriveDate']").val())) {
						alert("Arrive Date Not Less Than Depart Date");
						$(this).find("[id*='arriveDate']").focus();
						valid = false;
					} 
				}
			});
			if(!valid){
				return;
			}else{
				$('#flightInfoSave').submit();	
			}
				
		});
	});