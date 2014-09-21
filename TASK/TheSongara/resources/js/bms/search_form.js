// adv_search_form_validation.js used to validation and java-script for whole Advance booking system.
var IPADDRESS_PATTERN = /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/;
var twoMinMsg = "Please note due to the limited information provided we are unable to process this search." +
				"To prevent this, please add additional parameters like Departure Country or any other fields to proceed.";
var keyFieldEntered=false;
var NUMBER_PATTERN = /[^0-9]/;
var AMOUNT_PATERN = /^[0-9]+(\.[0-9]{1,2})?$/;
var PHONE_PATTERN = /[^0-9\(\)\+ \-]/;
var STRING_PATTERN = /[^a-zA-Z0-9 ]/;
var NAME_PATTERN = /[^a-zA-Z ]/;
//var EMAIL_PATTERN = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
var EMAIL_PATTERN=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
var ctrlDown = false;
var ctrlKey = 17, vKey = 118, cKey = 67;
/**
 * @author BMS Team
 * @returns Boolean Validates Key fields. Any one of the key fields is entered
 *          then returns true else false.
 */
function isKeyFieldEntered(){
	if($('#bookingDate').val() == "" && $('#fnBookingId').val() == "" && $('#bookingLocator').val() == "" &&
	   $('#insurancePolicyNumber').val() == ""	&& $('#insuranceBookingDate').val() == "" && $('#paymentDate').val() == "" &&
	   $('#departDate').val() == "" && $('#returnDate').val() == "" &&
	   $('#CCHolderFirstName').val() == ""  &&	$('#CCHolderLastName').val() == "" && 
	   $('#contactFirstName').val() == "" && $('#contactLastName').val() == "" && $('#contactPhoneNumber').val() == "" && $('#contactEmail').val() == "" &&
	   $('#paxFirstName').val() == "" && $('#paxLastName').val() == "" && 
	   $('#selCouponCode').val() == "" && $('#txtCouponCode').val() == "" &&
	   $('#selPromoCode').val() == "" && $('#txtPromoCode').val() == ""){
		return false;
	}
	return true;
}

function resetForm(){
	$("#quickSearchForm").trigger('reset');
	$("#advanceSearchForm").trigger('reset');
	//enabling coupon and promo drop down
	$('#selCouponCode').removeAttr('disabled');
	$('#txtCouponCode').removeAttr('disabled');
	$('#selPromoCode').removeAttr('disabled');
	$('#txtPromoCode').removeAttr('disabled');
	
	//disabling all input in report sections
	$('.reportDiv input[type=text]').each(function(){
		$(this).attr('disabled','disabled');
		if($(this).attr('id').search("Range") == '-1'){
			$(this).datepick('disable');
		}
	});
	
	//enabling report sections checkboxes
	$('.reportDiv input[type=checkbox]').each(function(){
		$(this).removeAttr('disabled');
	});
	
	//disabling all date range fields
	$("[id$='DateRange']").each(function() {
		$(this).attr('disabled','disabled');
	});
	
	$('#isManagerAgentLinkReport').attr("disabled", "disabled");
	$('#clientName').attr("disabled", "disabled");

	//reseting action
	$('#advanceSearchForm').attr("action","advanceBookingResult.htm");
}

$(document).ready(function(){
	
	$(".toggle_container").hide();
	$("#quicksearch").show();
	$("#locator").focus();
	$(".formReset").click(function(){
		resetForm();
	});
	
	$(document).keydown(function(e){
		if (e.keyCode == ctrlKey) ctrlDown = true;
	});
	$(document).keyup(function(e){
		if (e.keyCode == ctrlKey) ctrlDown = false;
    });
	
	$('#insurancePolicyNumber').keypress(function(e){
		if(e.which!=13 &&(e.which!=8 && e.which!=0 &&!(e.which>64 && e.which<91) && !(e.which>96 && e.which<123) && !(e.which>47 && e.which<58))){
			return false;
		}
	});
	
	$("h2.trigger").click(function(){
		var id =$(this).attr('id');
		$(this).toggleClass("active").next().slideToggle("slow",function(){
			foucusSettingforSearchSections(id);
		});
	});
	
	function foucusSettingforSearchSections(id){
		switch(id){
			case "bookingHeader":
				$('#fnBookingId').focus();break;
			case "contactHeader":
				$('#contactFirstName').focus();break;
			case "traveltypeHeader":
				$('#departCity').focus();break;
			case "paxdetailHeader":
				$('#paxFirstName').focus();break;
			case "couponHeader":
				$('#selCouponCode').focus();break;
			case "insuranceHeader":
				$('#insurancePolicyNumber').focus();break;
			case "paymentHeader":
				$('#CCHolderFirstName').focus();break;
		}
	}

	//Auto completer for Depart and Return city
	$( ".completeMe" ).autocomplete({		
		source:"/bms/getAirport.htm", 		
		autoFocus: true,
		minLength:3,
		open: function () {
			$(this).data("autocomplete").menu.element.width(350);
		},
		select: function (event, ui) {
			code = ui.item.value.split("").reverse().join("").substring(1,4).split("").reverse().join("");
			$(this).val(code);
			return false;
		}
	});
	
	//Submit Quick or Advance Search form if User hits Enter
	$("#quickSearchForm input").keypress(function(event) {
	    if (event.which == 13) 
	        $("#quickSearchSubmit").click();
	});
	
	$("#advanceSearchForm input").keypress(function(event) {
	    if (event.which == 13) 
	        $("#advanceSearchFormSubmit").click();
	});
	
	// validation to prevent other than alphabet input for all First Name and Last Name fields
	$("[id$='stName']").keypress(function (e){
		return validateName(e);
	});
	$("[id^='contactPostalCode']").keypress(function (e){
		if(e.which!=13 &&(e.which!=8 && e.which!=0 &&!(e.which>64 && e.which<91) && !(e.which>96 && e.which<123) && !(e.which>47 && e.which<58))){
			return false;
		}
	});
	$("[id^='departCity']").keypress(function (e){
		return validateName(e);
	});
	$("[id^='returnCity']").keypress(function (e){
		return validateName(e);
	});
});

$(function() {
	// Date Pickers
	function withinDaysEventHandler(dateElement){
		if($(dateElement).attr('disabled') == 'disabled' || $(dateElement).val() == ""){
				if($(dateElement).attr('disabled') == 'disabled'){
					$(dateElement).val('');
				}
				$('#'+dateElement.id+'Range').attr("disabled", "disabled");
				$('#'+dateElement.id+'Range').val('');
			}else{
				$('#'+dateElement.id+'Range').removeAttr("disabled");
				$('#'+dateElement.id+'Range').val(0);
				$('#'+dateElement.id+'Range').focus();
			}
	}
	
	//Added On 4/3/13 For Adding Booking Date In Quick Search
	$('#quickSearchBookingDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger" style="margin:0 0 0 0;">',
		onClose : function(){withinDaysEventHandler(this); updateAdvBookingDate();}});	
	
	// Search By Insurance Date Pickers Start
	$('#insuranceBookingDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});	
	// Search By Insurance Date Pickers End
	
	// Manager Reports Date Pickers Start
	$('#managerLogDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	
	$('#logTransactionDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});

	$('#callBackDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	
	$('#paxNotProtectedDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	
	$('#affiliateBookingDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});	

	// Travel Type Date Picker Starts
	$('#returnDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	
	$('#departDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	
	// Payment Details Date Picker
	$('#paymentDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	

	$('#departDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	$('#returnDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	$('#paymentDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	
	
	// Agent Report Date Pickers starts
	$('#agentLogDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	
	$('#agentBookingDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});	
	
	$('#callBackDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	
	// Booking Details Date Pickers starts
	$('#bookingDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);updateQuickBookingDate();}}); 

	// agent report callback date picker
	$('#agentCallBackDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});
	
	$('#bookingOptionDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
		onClose : function(){withinDaysEventHandler(this);}});	
	
	//Quick Search Form Submit
	$('#quickSearchSubmit').click(function(){
		submitSearchForm("quickSearchForm");
		if(document.quickSearchForm.locator.value == "" && document.quickSearchForm.bookingId.value == "" &&
				document.quickSearchForm.email.value == "" && document.quickSearchForm.phone.value == ""  &&
				document.quickSearchForm.firstName.value == "" && document.quickSearchForm.lastName.value== "" &&
				document.quickSearchForm.quickSearchBookingDate.value == ""	) {
			alert ("Please enter any field to search");
			return false;
		}else if($('#locator').val().length > 0 && STRING_PATTERN.test($('#locator').val()) == true){
			$('#locator').focus();
			alert("Locator is invalid.");
			return false;
		}else if($('#bookingId').val().length > 0 && NUMBER_PATTERN.test(($('#bookingId').val()).trim())){
			$('#bookingId').focus();
			alert("Booking ID is invalid.");
			return false;
		}else if($('#phone').val().length > 0 && PHONE_PATTERN.test(($('#phone').val()).trim())){
			$('#phone').focus();
			alert("Phone Number is invalid.");
			return false;
		}else if(NAME_PATTERN.test($('#firstName').val()) == true){
				$('#firstName').focus();
	    		alert("First Name is invalid.");
	    		return false;
	    }else if(NAME_PATTERN.test($('#lastName').val()) == true){
				$('#lastName').focus();
	    		alert("Last Name is invalid.");
	    		return false;
	    }else if(document.quickSearchForm.email.value != ""){
				if(!validateEmail("email"))return returnVal;
		}else if(document.quickSearchForm.locator.value == "" && document.quickSearchForm.bookingId.value == "" &&
				 document.quickSearchForm.email.value == "" && document.quickSearchForm.phone.value == ""  &&
				 document.quickSearchForm.quickSearchBookingDate.value == "" &&
				 !(document.quickSearchForm.firstName.value != "" && document.quickSearchForm.lastName.value != "")){ 
			alert("There may be many records with this name.\n" +
					"Please enter more parameter to  refine\n" +
					"your search. You can enter the parameters\n" +
					"in advance search");
			$('#advanceSearchHeader').toggleClass("active").next().slideToggle("slow");
			$('#quickSearchHeader').toggleClass("active").next().slideToggle("slow");
			if($('#bookingHeader').hasClass("active")){
				$('#bookingHeader').toggleClass("active").next().slideToggle("slow");	
			}
			if($('#contactHeader').hasClass("active")){
				$('#contactHeader').toggleClass("active").next().slideToggle("slow");	
			}
			$('#advanceSearchFormSubmit').focus();
			return false;
		}
		if(!$('quickSearchBookingDateRange').is(':disabled') && $("#quickSearchBookingDateRange").val() == ""){
				$("#quickSearchBookingDateRange").val(0);
		}
		var quickbuttons = {"Continue": function() {
										$( this ).dialog( "close" );
										$("#quickSearchForm").submit();
									},
								" Refine ": function() {
									$( this ).dialog( "close" );
								}
								};
        	jQuery.ajax({
			      type: "POST",
			      url: "quickSearchCount.htm",
			      async: false,
			      data: jQuery("#quickSearchForm").serialize(),			     
			      success: function (response) {
			    	  var count = parseInt(response);
			    	  if(count <= 500){
			    		  $("#quickSearchForm").submit();
			    	  } else {
			    		  $('#jqueryConfirm').dialog('option','buttons',quickbuttons);
			    		  $('#jqueryConfirm').html("Based on your query we have found " + count + " number of records."
			    				  				   +"<br>This will take more than " + ((0.0028 * count)/60).toFixed(2) + " minutes to display all records." 
			    				  				   +"<br>Would you like to Continue or Refine your search further?");
			    		  $("#jqueryConfirm").dialog("open");
			    	  }
			      }
			});
	});
	
	// Advance Search Form Submit
    $("#advanceSearchFormSubmit").live('click', function(e){
    	submitSearchForm("advanceSearchForm");
    	keyFieldEntered=isKeyFieldEntered();
    	var isValidated = validateManagerReports()
							&& validateAgentReports()
							&& validateBlankForm()
							&& validateDateRangeFields()
							&& isInsuranceEntered()
							&& BookingDetailsValidation()
							&& contactValidation()
							&& couponValidation()
							&& promoValidation()
							&& paxDetailsValidator()
							&& validateDateAndCityForTravelType()
//							&& validateWithinDaysForPaymentDetail() 
							&& validateProviders()
//							&& validateWithInDays(insuranceBookingDateRange)
							&& validateInsurance()
							&& validatePaymentDetails();
        if(isValidated == false){
        	return false;
        }else{
        	var advbuttons = {"Continue": function() {
        								$( this ).dialog( "close" );
        								$("#advanceSearchForm").submit();
									},
								" Refine ": function() {
									$( this ).dialog( "close" );
								}
        					};
            	jQuery.ajax({
				      type: "POST",
				      url: "advanceSearchCount.htm",
				      async: false,
				      data: jQuery('#advanceSearchForm').serialize(),
				      success: function (response) {
				    	  var count = parseInt(response);
				    	  if(count <= 500) {
				    		  $("#advanceSearchForm").submit();
				    	  } else {
				    		  $('#jqueryConfirm').dialog('option','buttons',advbuttons);
				    		  $('#jqueryConfirm').html("Based on your query we have found " + count + " number of records."
				    				  				   +"<br>This will take more than " + ((0.0028 * count)/60).toFixed(2) + " minutes to display all records." 
				    				  				   +"<br>Would you like to Continue or Refine your search further?");
				    		  $("#jqueryConfirm").dialog("open");
				    	  }
				      }
				});
        }
    });
    $( "#jqueryConfirm" ).dialog({
    	autoOpen : false,
		closeOnEscape : false,
		width:"420px",
		draggable : false,
		resizable : false,
    	modal: true    	
    });
    
    // adding Coupon Validation
    $('#txtCouponCode').live('change keyup', handletxtCouponCode);
    $('#txtPromoCode').live('change keyup', handletxtPromoCode);
    
    $('#advanceSearchHeader').live('click', function(){
    	$('#quickSearchHeader').toggleClass("active").next().slideToggle("slow");
    	if(!$('#advanceSearchHeader').hasClass("active")){
    		$('#advanceSearchFormSubmit').focus();
    	}else{
    		$('#locator').focus();
    	}
    });
    
    $('#quickSearchHeader').live('click', function(){
		$('#advanceSearchHeader').toggleClass("active").next().slideToggle("slow");
		if(!$('#advanceSearchHeader').hasClass("active")){
    		$('#advanceSearchFormSubmit').focus();
    	}else{
    		$('#locator').focus();
    	}
    });
    
    $('#locator').live('change',function(){
    	copyContent('locator','bookingLocator');
    });

    $('#bookingId').live('change',function(){
    	copyContent('bookingId','fnBookingId');
    });

    $('#email').live('change',function(){
    	copyContent('email','contactEmail');
    });
    

    $('#phone').live('change',function(){
    	copyContent('phone','contactPhoneNumber');
    });

    $('#firstName').live('change',function(){
    	copyContent('firstName','contactFirstName');
    });
  

    $('#lastName').live('change',function(){
    	copyContent('lastName','contactLastName');
    });
    
    $('#quickSearchBookingDateRange').live('focusout',function(){
    	$('#bookingDateRange').removeAttr("disabled");
    	copyContent('quickSearchBookingDateRange','bookingDateRange');
    });
    
    function updateAdvBookingDate(){
    	if($('#quickSearchBookingDate').val().length < 10){
    		$('#bookingDateRange').val("");
    		$('#bookingDateRange').attr("disabled","disabled");
    	}
    	copyContent('quickSearchBookingDate','bookingDate');
    }
    
    function updateQuickBookingDate(){
    	if($('#bookingDate').val().length < 10){
    		$('#quickSearchBookingDateRange').val("");
    		$('#quickSearchBookingDateRange').attr("disabled","disabled");
    	}
    	copyContent('bookingDate','quickSearchBookingDate');
    }
    
    function copyContent(sourceField,destinationField){
    	$('#'+destinationField).val($('#'+sourceField).val());
    }
    
    $('#bookingDateRange').live('focusout',function(){
    	$('#quickSearchBookingDateRange').removeAttr("disabled");
    	copyContent('bookingDateRange','quickSearchBookingDateRange');
    });
    
    $('#fnBookingId').live('change',function(){
    	copyContent('fnBookingId','bookingId');
    });
    
    $('#bookingLocator').live('change',function(){
    	copyContent('bookingLocator','locator');
    });
    
    $('#contactFirstName').live('change',function(){
    	copyContent('contactFirstName','firstName');
    });
    
    $('#contactLastName').live('change',function(){
    	copyContent('contactLastName','lastName');
    });
    
    $('#contactPhoneNumber').live('change',function(){
    	copyContent('contactPhoneNumber','phone');
    });
    
    $('#contactEmail').live('change',function(){
    	copyContent('contactEmail','email');
    });
});

//Function to prevent number key input
function validateName(e){
	if(e.which!=13 && e.which!=32 && e.which != 8 && e.which != 0 && !(e.which>64 && e.which<91) && !(e.which>96 && e.which<123)){
		return false;
	}
	return true;
}

//Function to prevent alphabet key input
function isNumberKey(event) {
    var key = window.event ? event.keyCode : event.which;
    /** backspace 8, tab 9, enter 13, shift 16, ctrl 17, alt 18, pause/break 19, caps lock 	20, escape 27, page up	33,
     *  page down 34, end 35, home 36, left arrow 37, up arrow 38, right arrow 39, down arrow 40, insert 45, delete 46 **/
    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 16 || event.keyCode == 17 
     || (event.keyCode >= 33 && event.keyCode <= 46) || (event.keyCode >= 112 && event.keyCode <= 123)
     || (ctrlDown && (key == 118 || key == 99 || key == 120))
             ) {
        return true;
    }
    else if ( key < 48 || key > 57 ) {
        return false;
    }
    else return true;
};

function validateEmail(elementId){
	var email = $('#'+elementId).val();
	if($.trim(email).length > 3 && EMAIL_PATTERN.test(email)){
		return true;
	}
	alert("Please enter a valid email address");
	$('#'+elementId).focus();
	return false;
}

function getAllAgents() { 
	if($('#agentName option').size() == 1 ){
		AsyncService.getAllAgents({
			callback : getAllAgentsResult
		});
	}
}

function getAllAgentsResult(data) {
	for(var i=0;i<data.length;i++) {
		if(data[i] != null){
			var agent = data[i].split("|");
			document.getElementById("agentName").options[i+1] = new Option(agent[1], agent[0]);
		}
	}
}


function getAgents() { 
	if($('#agentName option').size() == 1 ){		
		AsyncService.getAllAgents({
			callback : getAgentsResult,
			errorHandler : handleAddError
		});
	}
}

function getAgentsResult(data) {
	document.getElementById("agentName").options[0] = new Option("--", "0");
	for(var i=0;i<data.length;i++) {
		var agent = data[i].split("|");
			document.getElementById("agentName").options[i+1] = new Option(agent[1], agent[0]);
	}
}
	
function getAllAirlines() {
	if($('#airline option').size() == 1 ){
		AsyncService.getAllAirlines({
			callback : getAllAirlinesResult,
			errorHandler : handleAddError
		});
	}
}


function getAllAirlinesResult(data) {
	document.getElementById("airline").options[0] = new Option("All Airlines", "");
	var j=0;
	for(var i=0;i<data.length;i++) {
		var airline = data[i].split("|");
		if( airline[1].toUpperCase() != "YY" ) {
			var optIndex = i+1;
			document.getElementById("airline").options[optIndex-j] = new Option(airline[0], airline[1]);
		}else{
			j=1;
		}
	}
}

function getAllAffiliates() {
	if($('#clientName option').size() == 1 ){
		AsyncService.getAllAffiliates({
			callback : getAllAffiliateResult,
			errorHandler : handleAddError
		});
	}
}

function getAllAffiliateResult(data) {
	document.getElementById("clientName").options[0] = new Option("All Clients", "");
	for(var i=0;i<data.length;i++) {
		var affiliate = data[i].split("|");
			document.getElementById("clientName").options[i+1] = new Option(affiliate[1], affiliate[0]);
	}
}



/* Depart and Arraival Country list box */
function getCountry(country) {
	if($('#' + country +' option').size() == 1 ){		
		AsyncService.getAllCountries({
			callback : CountryResult,
			errorHandler : handleAddError
		});	
	}
}

function CountryResult(data) {
	document.getElementById("departCountry").options[0] = new Option("All Countries", "");
	document.getElementById("arrivalCountry").options[0] = new Option("All Countries", "");
	var j = 0 ;
	for(var i=0;i<data.length;i++) {
		var country = data[i].split("|");
		if(country[1].toUpperCase() != "YY" ) {
			var optIndex = i+1;
			document.getElementById("departCountry").options[optIndex-j] = new Option(country[0], country[1]);
			document.getElementById("arrivalCountry").options[optIndex-j] = new Option(country[0], country[1]);
		}else{
			j=1;
		}
	}
}
 
/* Get All Provider checkbox detail from database */ 
function getProviders() {
	if($('#allProviders').html().length==0) {	
		AsyncService.getProviders({
			callback : getProvidersResult,
			errorHandler : handleAddError
		});	
	}
}

function getProvidersResult(data) {
	var allProviders = "";	
	for(var i=0;i<data.length;i++) {
		var provider = data[i].split("|");
		allProviders = allProviders + "<li class='loginform-part1' ><label>"+ provider[0] +"</label><input type='checkbox' value='"+ provider[1] +"' name='providers' id='providers'/></li>";
	}	
	document.getElementById("allProviders").innerHTML= allProviders;
}

/* Get All booked Coupons */
function getCoupons() {
	if($('#selCouponCode option').size() == 1 ){		
		AsyncService.getCoupons({
			callback : getCouponsResult,
			errorHandler : handleAddError
		});	
	}
}

function getCouponsResult(data) {
	document.getElementById("selCouponCode").options[0] = new Option("Select Coupon Code", "");
	for(var i=0;i<data.length;i++) {		
		var optIndex = i+1;
		document.getElementById("selCouponCode").options[optIndex] = new Option(data[i],data[i]);
	}
}

/* Get All Supplier Promo Codes */
function getPromos() {
	if($('#selPromoCode option').size() == 1 ){		
		AsyncService.getPromos({
			callback : getPromosResult,
			errorHandler : handleAddError
		});	
	}
}

function getPromosResult(data) {
	if(data == null) return;
	document.getElementById("selPromoCode").options[0] = new Option("Select Promo Code", "");
	for(var i=0;i<data.length;i++) {		
		var optIndex = i+1;
		document.getElementById("selPromoCode").options[optIndex] = new Option(data[i],data[i]);
	}
}

$(function(){
	$('#departDate').focusout(function() {
		$("#departDateRange").removeAttr("disabled");
	});

	$('#returnDate').focusout(function() {
		$("#returnDateRange").removeAttr("disabled");
	});
	
	/*
	 * Function For Language Select For Client in Affiliate Report
	 */
	$('#clientName').live('change',function() {
			if($("#clientName").val() == 39 || $("#clientName").val() == 68){
				$('div#languageDiv').removeAttr("style");
			}else{
				$('div#languageDiv').css("display","none");
			}
	});
});

function validateDateAndCityForTravelType(){
	var departDateRange = $('#departDateRange').val();
	var returnDateRange = $('#returnDateRange').val();
	

	if(departDateRange > 0 && $('#departDate').val().length == 0){
		alert("Please Enter The Deaprture Date");
		return false;
	}
	
	if(returnDateRange > 0 && $('#returnDate').val().length == 0){
		alert("Please Enter The Return Date");
		return false;
	}
	
//    if(departDateRange > 90 || returnDateRange > 90){
//		alert(twoMinMsg);
//		return false;
//	}
    
    var departCityLength = $('#departCity').val().length;
    var returnCityLength = $('#returnCity').val().length;
    departCityReturCityFlag = false;
    if(departCityLength >0 && departCityLength < 3){
    	alert("Please enter at least 3 characters In Depart City");
    	return false;
    }else if(departCityLength >= 3){
    	departCityReturCityFlag = true;
    }
    if(returnCityLength >0 && returnCityLength < 3){
    	alert("Please enter at least 3 characters In Return City");
    	return false;
    }else if(returnCityLength >= 3){
    	departCityReturCityFlag = true;
    }
    
    if(jQuery.trim($('#departCity').val())!="" && jQuery.trim($('#returnCity').val())!="" &&  jQuery.trim($('#departCity').val()).toUpperCase() ==  jQuery.trim($('#returnCity').val()).toUpperCase()){
		alert("Depart City And Return City Should Not Same.");
		$('#returnCity').val('');
		$('#returnCity').focus();
		return false;
	}
    
    if (!($('#departDate').val().length == 0)  && !($('#returnDate').val().length == 0) && Date.parse($('#departDate').val()) > Date.parse($('#returnDate').val())) {
	    alert("Please note the Return Date cannot be less than the"+
	    		" Departure date, please correct and then continue");
	    $('#returnDate').focus();
	    return false;
	} 
    
    if(departCityReturCityFlag == true && keyFieldEntered == false && ($('#departDate').val().length == 0 && $('#returnDate').val().length == 0 && $('#bookingDate').val().length == 0)){
    	alert("Please provide additional parameters like "
    			+"departure/Return date(s), booking date or any "
    			+"other fields to proceed.");
    	return false;
    }
    
    var departAirport = $('#departCity').val(); 
    if(departAirport.length != 0){
		departAirport = departAirport.replace(/.*\((...)\)/, "$1").toUpperCase();
		$('#departAirport').val(departAirport);
	}
    
    var returnAirport = $('#returnCity').val();
	if(returnAirport.length != 0){
		returnAirport = returnAirport.replace(/.*\((...)\)/, "$1").toUpperCase();
		$('#returnAirport').val(returnAirport);
	}
    return true;
}

//function validateWithinDaysForPaymentDetail(){
//	var paymentDateRange = $('#paymentDateRange').val();
//	if(paymentDateRange > 90){
//		alert(twoMinMsg);
//		return false;
//	}
//	return true;
//}

function handleAddError() {
	  alert("We can't add those values!");
}

//function quickSearchValidation(){
//	if(document.quickSearchForm.locator.value == "" && document.quickSearchForm.bookingId.value == "" &&
//			document.quickSearchForm.email.value == "" && document.quickSearchForm.phone.value == ""  &&
//			document.quickSearchForm.firstName.value == "" && document.quickSearchForm.lastName.value== "" &&
//			document.quickSearchForm.quickSearchBookingDate.value == ""	) {
//		alert ("Please enter any field to search");
//		return false;
//	}else if(document.quickSearchForm.locator.value == "" && document.quickSearchForm.bookingId.value == "" &&
//			 document.quickSearchForm.email.value == "" && document.quickSearchForm.phone.value == ""  &&
//			 document.quickSearchForm.quickSearchBookingDate.value == "" &&
//			 !(document.quickSearchForm.firstName.value != "" && document.quickSearchForm.lastName.value != "")){ 
//		alert("There may be many records with this name.\n" +
//				"Please enter more parameter to  refine\n" +
//				"your search. You can enter the parameters\n" +
//				"in advance search");
//		$('#advanceSearchHeader').toggleClass("active").next().slideToggle("slow");
//		$('#quickSearchHeader').toggleClass("active").next().slideToggle("slow");
//		if($('#bookingHeader').hasClass("active")){
//			$('#bookingHeader').toggleClass("active").next().slideToggle("slow");	
//		}
//		if($('#contactHeader').hasClass("active")){
//			$('#contactHeader').toggleClass("active").next().slideToggle("slow");	
//		}
//		$('#advanceSearchFormSubmit').focus();
//		return false;
//	}else {
//		if(/[^a-zA-Z ]/.test($('#firstName').val()) == true){
//			$('#firstName').focus();
//    		alert("First Name is invalid.");
//    		return false;
//    	}
//		if(/[^a-zA-Z ]/.test($('#lastName').val()) == true){
//			$('#lastName').focus();
//    		alert("Last Name is invalid.");
//    		return false;
//    	}
//		if(document.quickSearchForm.email.value != ""){
//			var returnVal= validateEmail("email");
//			return returnVal;
//		}
//		if(!$('quickSearchBookingDateRange').is(':disabled') && $("#quickSearchBookingDateRange").val() == ""){
//			$("#quickSearchBookingDateRange").val(0);
//	    }
//	}
//	return true;
//}


/**
 * @author divyaraj This function validates if Special service request is
 *         checked then at least one field is required of paxFirstName or
 *         paxLastname.
 */
function paxDetailsValidator(){
	if(NAME_PATTERN.test($('#paxFirstName').val()) == true){
		$('#paxFirstName').focus();
		alert("Passanger First Name is invalid.");
		return false;
	}
	if(NAME_PATTERN.test($('#paxLastName').val()) == true){
		$('#paxLastName').focus();
		alert("Passanger Last Name is invalid.");
		return false;
	}
	if(!keyFieldEntered && $('#isPaxSpecialRequest').is(':checked') && ($('#paxFirstName').val() == "") && ($('#paxLastName').val()=="")){
		alert("Please enter Passenger's First or Last name or any other key parameters in the form.");
		return false;
	}
	return true;
}

/**
 * Coupon Code & Promo related Validation
 * 
 * @author vinitglobal variable in jquery
 */
function handleCouponCode(sel){
	if(sel.selectedIndex > 0) {
		$("#txtCouponCode").attr("disabled", true);
		$('#couponCode').val($('#selCouponCode option:selected').text());
	}else{
		$("#txtCouponCode").removeAttr("disabled"); 
		$('#couponCode').val('');
	}
}

function handletxtCouponCode(){
	if($('#txtCouponCode').val().length > 0){
		$("#selCouponCode").attr("disabled", true);
	}else{
		$("#selCouponCode").removeAttr("disabled"); 
	}
	$('#couponCode').val($('#txtCouponCode').val());
}

function couponValidation(){
	if($('#txtCouponCode').val().length > 0 && $('#txtCouponCode').val().length < 3){
		alert('Please enter at least 3 characters');
		$('#txtCouponCode').focus();
		return false;
	}
	return true;
}

/* Promo Code validations */
function handlePromoCode(sel){
	if(sel.selectedIndex > 0) {
		$("#txtPromoCode").attr("disabled", true);
		$('#promoCode').val($('#selPromoCode option:selected').text());
	}else{
		$("#txtPromoCode").removeAttr("disabled"); 
		$('#promoCode').val('');
	}
}

function handletxtPromoCode(){
	if($('#txtPromoCode').val().length > 0){
		$("#selPromoCode").attr("disabled", true);
	}else{
		$("#selPromoCode").removeAttr("disabled"); 
	}
	$('#promoCode').val($('#txtPromoCode').val());
}

function promoValidation(){
	if($('#txtPromoCode').val().length > 0 && $('#txtPromoCode').val().length < 3){
		alert('Please enter at least 3 characters');
		$('#txtPromoCode').focus();
		return false;
	}
	return true;
}

// Search by Contact Details
function contactValidation(){
	if(NAME_PATTERN.test($('#contactFirstName').val()) == true){
		$('#contactFirstName').focus();
		alert("Contact First Name is invalid.");
		return false;
	}
	if(NAME_PATTERN.test($('#contactLastName').val()) == true){
		$('#contactLastName').focus();
		alert("Contact Last Name is invalid.");
		return false;
	}
	if($('#contactEmail').val() != ""){
		var returnVal= validateEmail("contactEmail");
		if(returnVal == false) return false;
	}
	if($('#contactPhoneNumber').val().length > 0 && PHONE_PATTERN.test(($('#contactPhoneNumber').val()).trim())){
		$('#contactPhoneNumber').focus();
		alert("Phone Number is invalid.");
		return false;
	}
	
	if(keyFieldEntered == false ){
		if($('#contactCountry').prop("selectedIndex")>0){
			if($('#contactPostalCode').val() == "" ){
				alert('Please enter additional parameters like Booking date, Id, Locator etc. for Search');
				return false;
			}
		}
	}
	return true;
}

// Search by Booking Details
function BookingDetailsValidation(){
	
	if($('#bookingLocator').val().length > 0 && STRING_PATTERN.test($('#bookingLocator').val()) == true){
		$('#bookingLocator').focus();
		alert("Locator is invalid.");
		return false;
	}
	if($('#fnBookingId').val().length > 0 && NUMBER_PATTERN.test(($('#fnBookingId').val()).trim())){
		$('#fnBookingId').focus();
		alert("Booking ID is invalid.");
		return false;
	}
	
	if($('#bookingOptionDate').val().length > 0 && $('#bookingDate').val().length==0){		
			alert("Please select the booking date.");
			$('#bookingDate').focus();
			return false;		
	}
	if($('#totalPriceFrom').val().length > 0 && !AMOUNT_PATERN.test($('#totalPriceFrom').val())){
		$('#totalPriceFrom').focus();
		alert("From Price is invalid.");
		return false;
	}
	if($('#totalPriceTo').val().length > 0 && !AMOUNT_PATERN.test($('#totalPriceTo').val())){
		$('#totalPriceTo').focus();
		alert("To Price is invalid.");
		return false;
	}
	
	if($('#totalPriceFrom').val().length > 0 && $('#totalPriceTo').val().length>0){
		if( parseInt($("#totalPriceFrom").val(), 10) >  parseInt($("#totalPriceTo").val(), 10)){
			alert("The 'From' price can’t be greater than 'To' price");
			$('#totalPriceFrom').focus();
			return false;
		}
	}
	var ip = $('#ipAddress').val();
	if(ip.length > 0 && !(IPADDRESS_PATTERN.test(ip))){
		alert("Invalid IP Address.");
		return false;
	}
	
//  if((keyFieldEntered == false && $('#bookingOptionDateRange').val() > 90) || $('#bookingDateRange').val() > 90){
//		alert(twoMinMsg);
//		return false;
//	}
	return true;
}

function validateProviders(){
	if(!keyFieldEntered){
		for (var i=0;i<document.forms[1].providers.length;i++){
			if(document.forms[1].providers[i].checked == true){
				alert ("Please enter additional parameters like Booking date, Id, Locator etc. for Search");
				return false;
			}
		}
//		if($("#airline").val() != ""){
//			alert(twoMinMsg);
//			return false;
//	    }
	}
	return true;
}

/**
 * @author divyaraj
 * @returns {Boolean} Validates the Advance search from if all Textbox and Drop
 *          down have either default value or empty
 */
function validateBlankForm(){
	var readyForSubmit=false;
	$("#advanceSearchForm input[type=text]").each(function() {
		
	       if(this.value != null && this.value != ""){
	    	   
	    	 //  alert(this.id + ":" + this.value); //don't remove
	    	   readyForSubmit=true;
	    	   return false;
	       }
		});
	if (!readyForSubmit){
		$("#advanceSearchForm select").each(function() {
			if(this.value != "" && this.value != "0"){
		    //	alert(this.id + ":" + this.value); //don't remove
				readyForSubmit=true;
				return false;
	       }
		});
	}
	if(!readyForSubmit){
		$("#advanceSearchForm input[type=checkbox]").each(function() {
			if(this.checked){
		    //	alert(this.id + ":" + this.value); //don't remove
				readyForSubmit=true;
				return false;
	       }
		});
		if(readyForSubmit){
			alert("Insufficient Parameters. Please enter additional parameters like Booking date, Id, Locator etc. for Search");
			readyForSubmit=false;
			return false;
		}
	}
	if(!readyForSubmit){
		alert("Please enter any field to search");
	}
	return readyForSubmit;
}

function validateInsurance(){
	if(/[^a-zA-Z0-9 ]/.test($('#insurancePolicyNumber').val()) == true){
		$('#insurancePolicyNumber').focus();
		alert("Enter valid Insurance policy code.");
		return false;
	}
	return true;
}

function validateAgentSalesReport(){
	if($("#isAgentSalesReport").is(':checked')){
		$('#agentLogDate').removeAttr("disabled");
		$('#agentLogDate').datepick('enable');
		$('#agentLogDate').focus();
		$('#isInsuranceNotPurchased').attr("disabled", "disabled");
		$('#isRBCCallBackReport').attr("disabled", "disabled");
		$('#advanceSearchForm').attr("action","agentReport.htm");
	}else if(! $("#isAgentSalesReport").is(':checked')) {
		$('#agentLogDate').attr("disabled", "disabled");
		$('#agentLogDate').val("");
		$('#agentLogDate').datepick('disable');
		$('#agentLogDateRange').attr("disabled", "disabled");
		$('#agentLogDateRange').val("");
		$('#isInsuranceNotPurchased').removeAttr("disabled");
		$('#isRBCCallBackReport').removeAttr("disabled");
		$('#advanceSearchForm').attr("action","advanceBookingResult.htm");
		return;
	}
}
function validateInsNotPur(){
	if($("#isInsuranceNotPurchased").is(':checked')){
		$('#agentBookingDate').removeAttr("disabled");
		$('#agentBookingDate').datepick('enable');
		$('#agentBookingDate').focus();
		$('#isAgentSalesReport').attr("disabled", "disabled");
		$('#isRBCCallBackReport').attr("disabled", "disabled");
		$('#advanceSearchForm').attr("action","agentReport.htm");
	}else if(! $("#isInsuranceNotPurchased").is(':checked')){
		$('#agentBookingDate').attr("disabled", "disabled");
		$('#agentBookingDate').val("");
		$('#agentBookingDate').datepick('disable');
		$('#agentBookingDateRange').attr("disabled", "disabled");
		$('#agentBookingDateRange').val("");
		$('#isAgentSalesReport').removeAttr("disabled");
		$('#isRBCCallBackReport').removeAttr("disabled");
		$('#advanceSearchForm').attr("action","advanceBookingResult.htm");
	}
} 
function validateCallBackReport(){
	if($("#isRBCCallBackReport").is(':checked')){
		$('#agentCallBackDate').removeAttr("disabled");
		$('#agentCallBackDate').datepick('enable');
		$('#agentCallBackDate').focus();
		$('#isAgentSalesReport').attr("disabled", "disabled");
		$('#isInsuranceNotPurchased').attr("disabled", "disabled");
		$('#advanceSearchForm').attr("action","agentReport.htm");
	}else if(! $("#isRBCCallBackReport").is(':checked')){
		$('#agentCallBackDate').attr("disabled", "disabled");
		$('#agentCallBackDate').val("");
		$('#agentCallBackDate').datepick('disable');
		$('#agentCallBackDateRange').attr("disabled", "disabled");
		$('#agentCallBackDateRange').val("");
		$('#isAgentSalesReport').removeAttr("disabled");
		$('#isInsuranceNotPurchased').removeAttr("disabled");
		$('#advanceSearchForm').attr("action","advanceBookingResult.htm");
	}
}

function validateManagerAffiliateReport(){
	if($("#isAffiliateReport").is(':checked')){
		$('#affiliateBookingDate').removeAttr("disabled");
		$('#affiliateBookingDate').datepick('enable');
		$('#affiliateBookingDate').focus();
		$('#clientName').removeAttr("disabled");
		$('#isManagerAgentSalesReport').attr("disabled", "disabled");
		$('#isManagerRBCCallBackReport').attr("disabled", "disabled");
		$('#isPaxNotProtected').attr("disabled", "disabled");
		$('#advanceSearchForm').attr("action","managerAffiliateReport.htm");
	}else if(! $("#isAffiliateReport").is(':checked')){
		$('#affiliateBookingDate').attr("disabled", "disabled");
		$('#affiliateBookingDate').val("");
		$('#affiliateBookingDate').datepick('disable');
		$('#affiliateBookingDateRange').attr("disabled", "disabled");
		$('#affiliateBookingDateRange').val("");
		$('#clientName').attr("disabled", "disabled");
		$('#isManagerAgentSalesReport').removeAttr("disabled");
		$('#isManagerRBCCallBackReport').removeAttr("disabled");
		$('#isPaxNotProtected').removeAttr("disabled");
		$('#advanceSearchForm').attr("action","advanceBookingResult.htm");
	}
}

function validateAgentReports(){
	if($("#isAgentSalesReport").is(':checked') && $("#agentLogDate").val()==""){
		alert ("Please enter the Log Transaction date.");
		return false;
	}
	if($("#isInsuranceNotPurchased").is(':checked') && $("#agentBookingDate").val()==""){
		alert ("Please enter the Booking date.");
		return false;
	}
	if($("#isRBCCallBackReport").is(':checked') && $("#agentCallBackDate").val()==""){
		alert ("Please enter the Call Back date.");
		return false;
	}
	return true;
}

function validateManagerReports(){
	if($("#isManagerAgentSalesReport").is(':checked') && $("#logTransactionDate").val()==""){
		alert ("Please enter the Log Transaction date.");
		return false;
	}
	if($("#isManagerRBCCallBackReport").is(':checked') && $("#callBackDate").val()==""){
		alert ("Please enter the Call Back date.");
		return false;
	}
	if($("#isPaxNotProtected").is(':checked') && $("#paxNotProtectedDate").val()==""){
		alert ("Please enter the Booking date.");
		return false;
	}
	if($("#isAffiliateReport").is(':checked') && $("#affiliateBookingDate").val()==""){
		alert ("Please enter the Booking date.");
		return false;
	}
	return true;
}


function validateManagerAgentSalesReport(){
	if($("#isManagerAgentSalesReport").is(':checked')){
		$('#logTransactionDate').removeAttr("disabled");
		$('#logTransactionDate').datepick('enable');
		$('#logTransactionDate').focus();
		$('#isManagerAgentLinkReport').removeAttr("disabled");
		$('#isManagerRBCCallBackReport').attr("disabled", "disabled");
		$('#isAffiliateReport').attr("disabled", "disabled");
		$('#isPaxNotProtected').attr("disabled", "disabled");
		$('#advanceSearchForm').attr("action","managerReport.htm");
	}else if(! $("#isAgentSalesReport").is(':checked')) {
		$('#isManagerAgentLinkReport').attr("disabled", "disabled");
		$('#isManagerAgentLinkReport').prop('checked', false);
		$('#logTransactionDate').attr("disabled", "disabled");
		$('#logTransactionDate').val("");
		$('#logTransactionDate').datepick('disable');
		$('#logTransactionDateRange').attr("disabled", "disabled");
		$('#logTransactionDateRange').val("");
		$('#isManagerRBCCallBackReport').removeAttr("disabled");
		$('#isAffiliateReport').removeAttr("disabled");
		$('#isPaxNotProtected').removeAttr("disabled");
		$('#advanceSearchForm').attr("action","advanceBookingResult.htm");
	}
}

function validateManagerRBCCallBackReport(){
	if($("#isManagerRBCCallBackReport").is(':checked')){
		$('#callBackDate').removeAttr("disabled", "disabled");
		$('#callBackDate').datepick('enable');
		$('#callBackDate').focus();
		$('#isManagerAgentSalesReport').attr("disabled", "disabled");
		$('#isAffiliateReport').attr("disabled", "disabled");
		$('#isPaxNotProtected').attr("disabled", "disabled");
		$('#advanceSearchForm').attr("action","managerReport.htm");
	}else if(! $("#isManagerRBCCallBackReport").is(':checked')) {
		$('#callBackDate').attr("disabled", "disabled");
		$('#callBackDate').val("");
		$('#callBackDate').datepick('disable');
		$('#callBackDateRange').attr("disabled", "disabled");
		$('#callBackDateRange').val("");
		$('#isManagerAgentSalesReport').removeAttr("disabled");
		$('#isAffiliateReport').removeAttr("disabled");
		$('#isPaxNotProtected').removeAttr("disabled");
		$('#advanceSearchForm').attr("action","advanceBookingResult.htm");
	}
}
	function validatePaxNotProtectedReport(){
		if($("#isPaxNotProtected").is(':checked')){
			$('#paxNotProtectedDate').removeAttr("disabled");
			$('#paxNotProtectedDate').datepick('enable');
			$('#paxNotProtectedDate').focus();
			$('#isManagerRBCCallBackReport').attr("disabled", "disabled");
			$('#isAffiliateReport').attr("disabled", "disabled");
			$('#isManagerAgentSalesReport').attr("disabled", "disabled");
			$('#advanceSearchForm').attr("action","agentReport.htm");
		}else if(! $("#isPaxNotProtected").is(':checked')) {
			$('#paxNotProtectedDate').attr("disabled", "disabled");
			$('#paxNotProtectedDate').val("");
			$('#paxNotProtectedDate').datepick('disable');
			$('#paxNotProtectedDateRange').attr("disabled", "disabled");
			$('#paxNotProtectedDateRange').val("");
			$('#isManagerRBCCallBackReport').removeAttr("disabled");
			$('#isAffiliateReport').removeAttr("disabled");
			$('#isManagerAgentSalesReport').removeAttr("disabled");
			$('#advanceSearchForm').attr("action","advanceBookingResult.htm");
		}
	
	}


/**
 * @author divyaraj Generalize function to validate WITHIN DAYS. This function
 *         validates Within Days Field and shows Confirm Box. If user clicks OK
 *         then retruns true. If user clicks Cancel then returns false.
 */
//function validateWithInDays(daysField){
//	if(daysField.value > 90){
//		alert(twoMinMsg);
//		return false;
//	}
//	return true;
//}


// Loging Validation

/*
 * @author Alpesh Lodhari
 * 
 * loginValidation function used for user name & password
 * 
 */

function loginValidation() {
	
	// $("#invalid_user").attr("disabled", true);
	$("#invalid_user").css("display","none");
	$("#blank_user").css("display","none");
	if($("#j_username").val()=="" || $("#j_password").val()=="") {
		$("#blank_user").css("display","");		
		$("#j_password").val('');
		
		return false;
	}
}
function isInsuranceEntered(){
	var vendorChecked = false;
	$('#insuranceVendors').each(function() {
	    if ($(this).is(':checked')) {
	        vendorChecked=true;
	        return false;
	    }
	});

	if ( $('#insuranceBookingDate').val() != "" || $('#insurancePolicyNumber').val() != "" ||
		 vendorChecked || $('#isStandaloneInsurance').is(':checked') || $('#isNoInsurance').is(':checked') ){
		$('#insuranceEntered').val("true");
	}else{
		$('#insuranceEntered').val("false");
	}
	return true;
}

function validateDateRangeFields(){
	$("[id$='DateRange']").each(function() {
	    if(this.disabled == false && this.value == ""){
	    	this.value=0;
	    }
	});
	return true;
}

function validatePaymentDetails(){
	if(NAME_PATTERN.test($('#CCHolderFirstName').val()) == true){
		$('#CCHolderFirstName').focus();
		alert("CC Holder First Name is invalid.");
		return false;
	}
	if(NAME_PATTERN.test($('#CCHolderLastName').val()) == true){
		$('#CCHolderLastName').focus();
		alert("CC Holder Last Name is invalid.");
		return false;
	}
	if($('#CCNumber').val().length > 0 && (NUMBER_PATTERN.test($('#CCNumber').val()) || $('#CCNumber').val().length < 16)){
		$('#CCNumber').focus();
		alert("Credit Card Number is invalid.");
		return false;
	}
	return true;
}


function submitSearchForm(formName){
	$("#"+formName+" input[type = text]").each(function(){
		$(this).val($(this).val().trim());
	});
}