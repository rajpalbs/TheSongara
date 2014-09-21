var NAME_PATTERN = /[^a-zA-Z ]/;
var lastnames = [];
var passengerTypes = [];
var pdppassengeramounts = [];
var distinctpaxtypeswithcount = [];
var passengerids = [];
var contactPassengerIds=[];
var subtraveller = {};
var gdsDataLocatorwise = {};
//air vendors vars
var selectedairvendors = [];
var selectedairvendorval = [];
var flightLocators= [];
var selectedairvendorPrice = {};
//insurance vendors vars
var selectedinsvendors = [];
var selectedinsvendorval = [];
var insurancelocators=[];

//insurance price details vars
var inspassengerid = [];
var inspassengername = [];
var inspolicynumber = [];
var inspaxType = [];
var distinctinspaxtypewithcount = [];

var couponcodes = [];

var insurancemsg = "Please enter all the insurance details.";
var numericerrmsg = "The field value should be numeric.";
//Contains Validations For Manual Booking
 var counter = 0;
 
 //For Flight Detail
 var isSingelVendorReturn = false;
 var isflightDetailValidate = false;
 var maxClone = 0;
 var isGDSError = false; 
 var disableLink = function(){ return false;};
 var filesize = 0;

 //var EMAIL_PATTERN = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
          var EMAIL_PATTERN=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
 
 var aiportName = "";
 
 function enableDisableLink(element, isEnable){
	 $('#'+element + " a").each(function(){
		if($.trim($(this).text())=='Delete' || $.trim($(this).text()=='Add')  ) {
			if(isEnable) {$(this).bind('click', disableLink);}
			else {$(this).unbind('click', disableLink);}
			
		}
	 });
	 
	 $('#'+element + " label").each(function(){
			if($.trim($(this).text())=='Delete' || $.trim($(this).text()=='Add Passenger') ) {
				if(isEnable) {$(this).bind('click', disableLink);}
				else {$(this).unbind('click', disableLink);}
				
			}
		 });
 }

 function validateAlphaNumeric(e){
		if(e.which!=8 && e.which!=0 &&!(e.which>64 && e.which<91) && !(e.which>96 && e.which<123) && !(e.which>47 && e.which<58)){
			return false;
		}
 }
function validateNumeric(e){
	if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57)){
		return false;
	}
}

//Function to prevent number key input
function validateName(e){
	if(e.which!=13 && e.which!=32 && e.which != 8 && e.which != 0 && !(e.which>64 && e.which<91) && !(e.which>96 && e.which<123)){
		return false;
	}
	return true;
}

var autoCompleteOptions = {
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
};

 /**
  * Binding Events for all page Details
  */
$(document).ready(function(){
	
	//Autocompleter	
	$( ".completeMe" ).autocomplete(autoCompleteOptions);
	
	$('#cancel').live('click',function(){
		if(cancelManualBooking()){
			window.open('','_self');
			window.close();
		}
	});
	
	$('#btngetContact').live('click',function(){		
		getContactPassengers();
	});

	$('#cancelBooking').live('click',function(){
		if(cancelManualBooking()){
			window.close();
		}
	});
	
	function cancelManualBooking(){
		return confirm("You will loose all filled data. Do you want to cancel?");
	}

	$('#supplierConformationFile').bind('change', function() {
		filesize = this.files[0].size;		  
	});
	
	$('#manulaBookingSave').live('click',function(){
		if(!validatePaymentDetails())return;
		if(filesize > 1048576){
			  alert('File Size Is More Than 1Mb,Please Upload Smaller File.');
			  return;
		}
		$('[id*=template]').remove();
		$('#manualBookingForm input').removeAttr('disabled');
		$('#manualBookingForm select').removeAttr('disabled');
		$('#manualBookingForm radio').removeAttr('disabled');
	
		//Remove Unwanted Hidden TRs
		if(selectedairvendors.length==0){
			$('#tdflightheader').remove();
			$('#trairpaymentdetail1').remove();
		}
	
		if(selectedinsvendors.length==0){
			$('#trinsurance').remove();
			$('#trinsurancepaymentdetail1').remove();
		}
		$('#manualBookingForm').submit();
	});
	
	
	$("#continue").live('click', function(){
		if($('#trflightdetails').css('display') == 'none' && $('#trinsurancepassengerdetails').css('display') == 'none'){
			/*Validate and disable Booking details, Contact details & passenger details*/
			if(!validateBookingDetail())return;
			if(!validateContactDetail())return;
			if(!validatePassengerDetails())return ;
			
			var tripType=$('#flightDetailTripType option:selected').text();
			$('#labelTripType').text(tripType);
			getFlightSegmentsFromGDS();
			populateVendors();
			populatePassengers();
			
			enableDisableLink("trbookingdetails", true);
			$('#trbookingdetails input').attr('readonly',true);
			$('#trbookingdetails select').attr('disabled',true);
			$('#trbookingdetails radio').attr('disabled',true);
			
			$('#trcontactdetails input').attr('readonly',true);			
			$('#trcontactdetails select').attr('disabled',true);
			
			enableDisableLink("trpassengerdetails", true);
			$('#trpassengerdetails input').attr('readonly',true);
			$('#trpassengerdetails select').attr('disabled',true);
			
			if(selectedairvendors.length > 0){
				$("#trflightdetails").css('display','table-row');
				$('#hide_af').css('display','table-row');
				showFlightDetails();
			}
			
			if($('#insuranceaccepted').is(':checked') ){
				populateInsurancePassengers();
				populateInsuranceVendor();
				$('#trinsurancepassengerdetails').css('display','table-row');
			}
			$("#tdprevious").css('display','table-cell');
			$('#mailContactEmail').attr('disabled',true);
			$('#btngetContact').attr('disabled',true);
			
			$("[id^='dateofbirth']").each(function(){
				 $(this).datepick('disable'); 
			});
		}else if($('#trfarecalculation').css('display') == 'none'){
			if (selectedairvendors.length > 0 && !validateFlightDetails())  return;
//			logic for the airport code check
			if(!validatesAirport()){
				return;
			}
			if($('#insuranceaccepted').is(':checked') && !validateInsuranceDetails())return;
			if(selectedairvendors.length > 0){
				airFareGenerateRows();
				$('#trflightfare').css('display','table-row');
				populateSpendPDP();
				$('#trmanualpdpdetails').css('display','table-row');
			}
			
			if($('#insuranceaccepted').is(':checked')){
				enableDisableLink("trinsurancepassengerdetails", true);
				insuranceFareGenerateRows();
				$('#trinsurancefare').css('display','table-row');
				$('#trinsurancepassengerdetails select').attr('disabled',true);
			}
			$('#trfarecalculation').css('display','table-row');
		}else if($('#trpaymentdetails').css('display') == 'none'){
				$('#tblspendpdpdetails input').attr('readonly',true);
				$('#trfarecalculation input').attr('readonly',true);
				$('#applyCouponcode').attr('disabled','disabled');
				enableDisableLink("flightfaredetails", true);
				populatePaymentDetail();
				populateCouponRefund();
				populateAirVendor();
				$('#trpaymentdetails').css('display','table-row');
				$('#trcustdtls').css('display','table-row');
				$("#tdcontinue").css('display','none');
				$('#trhistoricalnote').css('display','table-row');
				$('#cancelsave').css('display','table-row');
		}
	});
	
	$("#previoussection").live('click', function(){
		if($('#trpaymentdetails').css('display') != 'none'){
			resetThirdSection();
		}else if($('#trfarecalculation').css('display') == 'table-row'){
			resetSecondSection();
		}else if(($('#trinsurancepassengerdetails').css('display') == 'table-row') || ($('#trflightdetails').css('display') != 'none')){
			resetFirstSection();
		}
	});

	$.extend({
	    distinct : function(anArray) {
	       var result = [];
	       $.each(anArray, function(i,v){
	           if ($.inArray(v, result) == -1) result.push(v);
	       });
	       return result;
	    }
	});
	
	//Date Picker For On option date
	$('#onOptionDate').datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
	
	/**
	 * Binding events for booking details
	 */
	//Adding Booking detail row
	$("[id^='locator']").keypress(function (e){
		if(e.which!=8 && e.which!=0 &&!(e.which>64 && e.which<91) && !(e.which>96 && e.which<123) && !(e.which>47 && e.which<58)){
			return false;
		}
	});
	
	
	$("#addvendor").live('click',function() {
		var row = $('#bookingdetails tr:last').prev('tr').clone();
		row.attr("id",'trvendor'+vendorCount);
		row.find('.clearme').each(function(){
			$(this).html('');
		});
		row.find('#adddelete').html('<a class="redlink" id="deletevendor" name="deletevendor">Delete </a>');
		row.find("[id^='typevendor']").attr("id","typevendor"+vendorCount);
		row.find("[id^='locator']").attr("id","locator"+vendorCount).val('').bind('keypress',function(e){return validateAlphaNumeric(e);});
		row.find("[id^='vendor']").attr("id","vendor"+vendorCount).empty();		
		row.find("[id^='vendor']").attr("id","vendor"+vendorCount).append('<option value="" >--Select--</option>');
		
		row.find("[id^='supplier']").attr("id","supplier"+vendorCount).css('visibility','hidden');
		row.find("[id^='namesupplier']").attr("id","namesupplier"+vendorCount).css('visibility','hidden');
		row.find("[id^='subvendor']").attr("id","subvendor"+vendorCount);	
		
		row.insertBefore($('#trlastaddvendor'));
		vendorCount++;
		itemCounter++;
	});
	
	//Removing Booking detail row
	$('#deletevendor').live('click', function(){
		if(itemCounter>2){
			$(this).closest("tr").remove();			
			itemCounter--;
		}
	});
	
	
	//on option date
	$("[id^='masterstatus']").live('change',function() {
		if(this.value=="Option"){
			$("#onOptionDateLabel").show();
			$('#onOptionDatePicker').show();
		}
		else{
			$("#onOptionDateLabel").hide();
			$('#onOptionDatePicker').hide();
		}
		 
	});
	
	
	
	/**Validation For alll Charecter fields like Name, Spacial Request.
	 * It validates that key press is either alphabet or space. 
	 * Set class "characterField" to make this validation active**/ 
	$('.characterField').live('keypress',function (e){return validateName(e);});
	
	$("[id^='contactDetailZipCode']").keypress(function (e){
		if(e.which!=8 && e.which!=0 &&!(e.which>64 && e.which<91) && !(e.which>96 && e.which<123) && !(e.which>47 && e.which<58)){
			return false;
		}
	});
	
	$("[id$='PhoneAreaCode']").keypress(function (e){
		if(e.which!=8 && e.which!=0 && !(e.which>47 && e.which<58)){
			return false;
		}
	});
	$("[id$='PhoneCityCode']").keypress(function (e){
		if(e.which!=8 && e.which!=0 && !(e.which>47 && e.which<58)){
			return false;
		}
	});
	$("[id$='PhoneNumber']").keypress(function (e){
		if(e.which!=8 && e.which!=0 && !(e.which>47 && e.which<58)){
			return false;
		}
	});
	$("[id='contactDetailBusinessPhoneExt']").keypress(function (e){
		if(e.which!=8 && e.which!=0 && !(e.which>47 && e.which<58)){
			return false;
		}	
	});
	
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
	// Validation For Ticketnumber in Passanger Details - Ends
	
	$("[id^='mileage']").keypress(function (e){
		if(e.which!=8 && e.which!=0 &&!(e.which>64 && e.which<91) && !(e.which>96 && e.which<123) && !(e.which>47 && e.which<58)){
			return false;
		}
	});
	
	//validation for flight Detail
	$("[id*='FlightNumber']").keypress(function (e){
		if(e.which!=8 && e.which!=0 && !(e.which>47 && e.which<58)){
			return false;
		}	
	});
	
	//Setting The canada as first and us as second Country
	$('#contactDetailCountryName  option[value=CA]').insertBefore('#contactDetailCountryName  option[value=AF]');
	$('#contactDetailCountryName  option[value=US]').insertAfter('#contactDetailCountryName  option[value=CA]');
	
	/** coupon code function start **/
	/**
	 *Coupon details 
	**/
	function applyCoupon(coupon){
		AsyncService.getCouponDetails(coupon,{
			callback : showCoupon,
			errorHandler : handleAddError
		});
	}
	function showCoupon(data){
		if(data == ''){
			alert("Invalid Coupon.");
		}else{
			var coupondata = data.split("|");
			var coupondetails = coupondata[0].split("-");
			var row = $('#templatepromocodeapplied').clone();
			var discount = parseFloat(coupondata[1].trim());
			row.attr("id",coupondetails[0].trim());
			row.find("[id=couponcodehidden]").val(coupondetails[0].trim());
			row.css('display','table-row');
			row.attr('class','appliedcoupontr rgt-btm');
			row.find("[id=promocodedetails]").html(coupondata[0]);
			row.insertBefore('#promocodeinput');
			if(coupondetails[2].trim() == "PER PASSENGER"){
				row.find('[class=prmocodeamount]').attr('class','couponamount').css('display','none').html(discount);
				for(var i=0;i<distinctpaxtypeswithcount.length;i++){
					var paxpromo = parseFloat($('.'+distinctpaxtypeswithcount[i][0]+'paxpromo').html());
					$('.'+distinctpaxtypeswithcount[i][0]+'paxpromo').html((paxpromo+discount).toFixed(2));
					var paxtotal=parseFloat($('.'+distinctpaxtypeswithcount[i][0]+'paxtotal').html());
					$('.'+distinctpaxtypeswithcount[i][0]+'paxtotal').html((paxtotal-discount).toFixed(2));
					
					var paxtypediscount = discount*distinctpaxtypeswithcount[i][1];
					$('#'+distinctpaxtypeswithcount[i][0]+'paxtypepromototal').html((paxtypediscount+parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypepromototal').html())).toFixed(2));
					
					var total = parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypetotal').html());
					$('#'+distinctpaxtypeswithcount[i][0]+'paxtypetotal').html((total-paxtypediscount).toFixed(2));
					
					var promototal = parseFloat($('#totalpromo').html());
					$('#totalpromo').html((promototal+paxtypediscount).toFixed(2));
					var maintotal = parseFloat($('#totaltotal').html());
					$('#totaltotal').html((maintotal-paxtypediscount).toFixed(2));
				}
			}else{
				row.find('[class=prmocodeamount]').attr('class','prmocodefullamount').html(discount.toFixed(2));
				var promototal = parseFloat($('#totalpromo').html());
				$('#totalpromo').html((promototal+discount).toFixed(2));
				var maintotal = parseFloat($('#totaltotal').html());
				$('#totaltotal').html((maintotal-discount).toFixed(2));
			}
		}
	}
	$('#couponcode').live('change',function(){
		var coupon = $(this).val();
		if(/[&\/\\#!@^\-\= ,+()$~%.'":;*?<>{}]/.test(coupon) == true){
			alert("Special charecter are not allowed.");
			$(this).val("");
		}
	});
	$('#applyCouponcode').live('click',function(){
		var coupon = $('#couponcode').val();
		if(coupon == ''){
			alert("Please enter Coupon Value.");
		}else if(parseFloat($('#totaltotal').html())<=0){
			alert("Please Enter vendor Price Details. Then Apply Coupon.");
		}else if($('#'+coupon).length > 0){
			alert("Coupon already applied.");
			$('#couponcode').val('');
		}else{
			applyCoupon(coupon);
			$('#couponcode').val('');
		}
	});
	
	$('.deletecoupon').live('click',function(){
		var row = $(this).parent().parent();
		var type = (row.find('[id=promocodedetails]').html()).split("-")[2].trim();
		if(type == "PER PASSENGER"){
			var discount = parseFloat(row.find("[class='couponamount']").html());
			for(var i=0;i<distinctpaxtypeswithcount.length;i++){
				var paxpromo = parseFloat($('.'+distinctpaxtypeswithcount[i][0]+'paxpromo').html());
				$('.'+distinctpaxtypeswithcount[i][0]+'paxpromo').html((paxpromo-discount).toFixed(2));
				var paxtotal=parseFloat($('.'+distinctpaxtypeswithcount[i][0]+'paxtotal').html());
				$('.'+distinctpaxtypeswithcount[i][0]+'paxtotal').html((paxtotal+discount).toFixed(2));
				
				var paxtypediscount = discount*distinctpaxtypeswithcount[i][1];
				$('#'+distinctpaxtypeswithcount[i][0]+'paxtypepromototal').html((parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypepromototal').html())-paxtypediscount).toFixed(2));
				
				var paxtypetotal = parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypetotal').html());
				$('#'+distinctpaxtypeswithcount[i][0]+'paxtypetotal').html((paxtypetotal+paxtypediscount).toFixed(2));
				
				var promototal = parseFloat($('#totalpromo').html());
				$('#totalpromo').html((promototal-paxtypediscount).toFixed(2));
				var maintotal = parseFloat($('#totaltotal').html());
				$('#totaltotal').html((maintotal+paxtypediscount).toFixed(2));
			}
			
		}else{
			var discount = parseFloat(row.find("[class='prmocodefullamount']").html());
			var total = parseFloat($('#totaltotal').html());
			var totaldiscount = parseFloat($('#totalpromo').html());
			$('#totalpromo').html((totaldiscount-discount).toFixed(2));
			$('#totaltotal').html((total+discount).toFixed(2));
		}
		row.remove();
	});
	/** coupon code function end **/
	
	/** Populate air fare details **/
	function airFareGenerateRows(){
		var vendors = selectedairvendors;
		var vendorvals =selectedairvendorval;
		var vendorlocators = flightLocators;
		if(vendors.length > 0){
		//Pax type rows created
		var totalPax = 0;
			for(var i=0;i<distinctpaxtypeswithcount.length;i++){
				var row = $('#templatepaxtype').clone();
				totalPax+=distinctpaxtypeswithcount[i][1];
				row.attr("id",distinctpaxtypeswithcount[i][0]+'air');
				row.css('display','table-row');
				row.find("[id^=paxtypedisplay]").text(distinctpaxtypeswithcount[i][0]);
				row.find("[id^='paxtypenumber']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypenumber').text(distinctpaxtypeswithcount[i][1]);
				row.find("[id^='paxtypesellingtotal']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypesellingtotal');
				row.find("[id^='paxtypesurchargetotal']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypesurchargetotal');
				row.find("[id^='paxtypetaxtotal']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypetaxtotal');
				row.find("[id^='paxtypehsttotal']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypehsttotal');
				row.find("[id^='paxtypeqsttotal']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypeqsttotal');
				row.find("[id^='paxtypegsttotal']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypegsttotal');
				row.find("[id^='paxtypeservicetotal']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypeservicetotal');
				row.find("[id^='paxtypesftaxtotal']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypesftaxtotal');
				row.find("[id^='paxtypepromototal']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypepromototal');
				row.find("[id^='paxtypetotal']").attr("id",distinctpaxtypeswithcount[i][0]+'paxtypetotal');
				if(i==0){
					row.insertAfter('#templatepaxtype');
				}else{
					row.insertAfter('#'+ distinctpaxtypeswithcount[i-1][0]+'air');
				}
			}
			//Passengers rows created below corresponding pax type rows created above
			for(var j=firstnames.length-1;j>=0;j--){
						var row = $('#templatepax').clone();
						row.attr("id",passengerTypes[j]+ 'airpassengertr' +passengerids[j]);
						row.css('display','table-row');
						row.find("[id^=paxname]").text(firstnames[j] + ' ' + lastnames[j]);
						row.find("[id^='vendorsellingtotal']").attr("id",passengerTypes[j]+'vendorselling'+j+'total').attr("class",passengerTypes[j]+'sellingtotal');
						row.find("[id^='vendorsurchargetotal']").attr("id",passengerTypes[j]+'vendorsurcharge'+j+'total').attr("class",passengerTypes[j]+'surchargetotal');
						row.find("[id^='vendortaxtotal']").attr("id",passengerTypes[j]+'vendortax'+j+'total').attr("class",passengerTypes[j]+'taxtotal');
						row.find("[id^='vendorhsttotal']").attr("id",passengerTypes[j]+'vendorhst'+j+'total').attr("class",passengerTypes[j]+'hsttotal');
						row.find("[id^='vendorqsttotal']").attr("id",passengerTypes[j]+'vendorqst'+j+'total').attr("class",passengerTypes[j]+'qsttotal');
						row.find("[id^='vendorgsttotal']").attr("id",passengerTypes[j]+'vendorgst'+j+'total').attr("class",passengerTypes[j]+'gsttotal');
						row.find("[id^='vendorservicetotal']").attr("id",passengerTypes[j]+'vendorservice'+j+'total').attr("class",passengerTypes[j]+'servicetotal');
						row.find("[id^='vendorsftaxtotal']").attr("id",passengerTypes[j]+'vendorsftax'+j+'total').attr("class",passengerTypes[j]+'sftaxtotal');
						row.find("[id^='paxpromo']").attr("id",passengerTypes[j]+'paxpromo').attr("class",passengerTypes[j]+'paxpromo');
						row.find("[id^='paxtotal']").attr("id",passengerTypes[j]+'paxtotal').attr("class",passengerTypes[j]+'paxtotal');
						row.insertAfter('#'+passengerTypes[j]+'air');
			}
			//Vendor rows created below Passengers rows created above
			for(var i=0;i<distinctpaxtypeswithcount.length;i++){
				flag = false;
				$('[id^='+distinctpaxtypeswithcount[i][0]+'airpassengertr]').each(function(){
					var inputflag=false;
					for(var k=0;k<vendors.length;k++){
						var row;	
						if(flag){
							row = $('#templatevendor').clone();
							row.find("[id^='vendorselling']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorselling'+vendorvals[k]).attr("class",distinctpaxtypeswithcount[i][0]+'vendorselling'+vendorvals[k]+vendorlocators[k]);
							row.find("[id^='vendorsurcharge']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorsurcharge'+vendorvals[k]).attr("class",distinctpaxtypeswithcount[i][0]+'vendorsurcharge'+vendorvals[k]+vendorlocators[k]);
							row.find("[id^='vendortax']").attr("id",distinctpaxtypeswithcount[i][0]+'vendortax'+vendorvals[k]).attr("class",distinctpaxtypeswithcount[i][0]+'vendortax'+vendorvals[k]+vendorlocators[k]);
							row.find("[id^='vendorhst']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorhst'+vendorvals[k]).attr("class",distinctpaxtypeswithcount[i][0]+'vendorhst'+vendorvals[k]+vendorlocators[k]);
							row.find("[id^='vendorqst']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorqst'+vendorvals[k]).attr("class",distinctpaxtypeswithcount[i][0]+'vendorqst'+vendorvals[k]+vendorlocators[k]);
							row.find("[id^='vendorgst']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorgst'+vendorvals[k]).attr("class",distinctpaxtypeswithcount[i][0]+'vendorgst'+vendorvals[k]+vendorlocators[k]);
							row.find("[id^='vendorservice']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorservice'+vendorvals[k]).attr("class",distinctpaxtypeswithcount[i][0]+'vendorservice'+vendorvals[k]+vendorlocators[k]);
							row.find("[id^='vendorsftax']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorsftax'+vendorvals[k]).attr("class",distinctpaxtypeswithcount[i][0]+'vendorsftax'+vendorvals[k]+vendorlocators[k]);
							row.find("[id='vendortotal']").attr("id",distinctpaxtypeswithcount[i][0]+'vendortotal'+vendorvals[k]).attr("class",distinctpaxtypeswithcount[i][0]+'vendortotal'+vendorvals[k]+vendorlocators[k]);
						}else{
							row = $('#templatevendorinput').clone();
							row.find('[id=airfarepaxtype]').val(distinctpaxtypeswithcount[i][0]);
							row.find('[id=airfarevendor]').val(vendorvals[k]);
							row.find('[id=airfarelocator]').val(vendorlocators[k]);
							row.find("[id='vendorselling']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorselling');
							row.find("[id='vendorsurcharge']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorsurcharge');
							row.find("[id='vendortax']").attr("id",distinctpaxtypeswithcount[i][0]+'vendortax');
							row.find("[id='vendorhst']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorhst');
							row.find("[id='vendorqst']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorqst');
							row.find("[id='vendorgst']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorgst');
							row.find("[id='vendorservice']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorservice');
							row.find("[id='vendorsftax']").attr("id",distinctpaxtypeswithcount[i][0]+'vendorsftax').attr('class',distinctpaxtypeswithcount[i][0]+'vendorsftax'+vendorvals[k]+vendorlocators[k]);
							row.find("[id='vendortotal']").attr("id",distinctpaxtypeswithcount[i][0]+'vendortotal'+vendorvals[k]).attr("class",distinctpaxtypeswithcount[i][0]+'vendortotal'+vendorvals[k]+vendorlocators[k]);
						}
						row.attr("id",this.id+'vendor'+k);
						row.css('display','table-row');
						row.find("[id^=vendorname]").text(vendors[k] + ' - ' + vendorlocators[k]);
						if(inputflag){
							row.insertAfter('#'+ this.id + 'vendor' + (k-1));
						}else{
							row.insertAfter('#'+this.id);
							inputflag=true;
						}
					}
					flag=true;
				});
			}
			$('#totalpassengers').text(totalPax);
			$('#totalselling').text("0.00");
			$('#totalsurcharge').text("0.00");
			$('#totaltax').text("0.00");
			$('#totalhst').text("0.00");
			$('#totalqst').text("0.00");
			$('#totalgst').text("0.00");
			$('#totalservice').text("0.00");
			$('#totalsftax').text("0.00");
			$('#totaltotal').text("0.00");
		}
	}
	
	
	/** Air Fare calculation Start **/
	function getNoofPax(type){
		return parseFloat($('#'+type+'paxtypenumber').html());
	}
	function updateVendorTotal(row,paxtype,vendor,locator){
		var selling = parseFloat(row.find('[id='+paxtype+'vendorselling]').val());
		var surcharge = parseFloat(row.find('[id='+paxtype+'vendorsurcharge]').val());
		var tax = parseFloat(row.find('[id='+paxtype+'vendortax]').val());
		var hst = parseFloat(row.find('[id='+paxtype+'vendorhst]').val());
		var qst = parseFloat(row.find('[id='+paxtype+'vendorqst]').val());
		var gst = parseFloat(row.find('[id='+paxtype+'vendorgst]').val());
		var service = parseFloat(row.find('[id='+paxtype+'vendorservice]').val());
		var sftax = parseFloat(row.find('[id='+paxtype+'vendorsftax]').html());
		$('.'+paxtype+'vendortotal'+vendor+locator).html((selling+surcharge+tax+hst+qst+gst+service+sftax).toFixed(2));
	}
	function updatePaxTotal(row,paxtype){
		var selling = parseFloat(row.find('[class='+paxtype+'sellingtotal]').html());
		var surcharge = parseFloat(row.find('[class='+paxtype+'surchargetotal]').html());
		var tax = parseFloat(row.find('[class='+paxtype+'taxtotal]').html());
		var hst = parseFloat(row.find('[class='+paxtype+'hsttotal]').html());
		var qst = parseFloat(row.find('[class='+paxtype+'qsttotal]').html());
		var gst = parseFloat(row.find('[class='+paxtype+'gsttotal]').html());
		var service = parseFloat(row.find('[class='+paxtype+'servicetotal]').html());
		var sftax = parseFloat(row.find('[class='+paxtype+'sftaxtotal]').html());
		var discount = parseFloat(row.find('[class='+paxtype+'paxpromo]').html());
		$('.'+paxtype+'paxtotal').html((selling+surcharge+tax+hst+qst+gst+service+sftax-discount).toFixed(2));
	}
	function updatePaxTypeTotal(type){
		var selling = parseFloat($('#'+type+'paxtypesellingtotal').html());
		var surcharge = parseFloat($('#'+type+'paxtypesurchargetotal').html());
		var tax = parseFloat($('#'+type+'paxtypetaxtotal').html());
		var hst = parseFloat($('#'+type+'paxtypehsttotal').html());
		var qst = parseFloat($('#'+type+'paxtypeqsttotal').html());
		var gst = parseFloat($('#'+type+'paxtypegsttotal').html());
		var service = parseFloat($('#'+type+'paxtypeservicetotal').html());
		var sftax = parseFloat($('#'+type+'paxtypesftaxtotal').html());
		var discount = parseFloat($('#'+type+'paxtypepromototal').html());
		var total = selling+surcharge+tax+hst+qst+gst+service+sftax-discount;
		$('#'+type+'paxtypetotal').html(total.toFixed(2));
		updateAirtotal();
	}
	function updateAirtotal(){
		var selling = 0.0;
		var surcharge = 0.0;
		var tax = 0.0;
		var hst = 0.0;
		var qst = 0.0;
		var gst = 0.0;
		var service = 0.0;
		var sftax = 0.0;
		var discount = 0.0;
		for(var i=0;i<distinctpaxtypeswithcount.length;i++){
			selling = selling + parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypesellingtotal').html());
			surcharge = surcharge + parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypesurchargetotal').html());
			tax = tax + parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypetaxtotal').html());
			hst = hst + parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypehsttotal').html());
			qst = qst + parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypeqsttotal').html());
			gst = gst + parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypegsttotal').html());
			service = service + parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypeservicetotal').html());
			sftax = sftax + parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypesftaxtotal').html());
			discount = discount + parseFloat($('#'+distinctpaxtypeswithcount[i][0]+'paxtypepromototal').html());
		}
		$('#totalselling').html(selling.toFixed(2));
		$('#totalsurcharge').html(surcharge.toFixed(2));
		$('#totaltax').html(tax.toFixed(2));
		$('#totalhst').html(hst.toFixed(2));
		$('#totalqst').html(qst.toFixed(2));
		$('#totalgst').html(gst.toFixed(2));
		$('#totalservice').html(service.toFixed(2));
		$('#totalsftax').html(sftax.toFixed(2));
		$('#totalpromo').html(discount.toFixed(2));
		var totalpricediscount = 0.0;
		if($('[class=prmocodefullamount]').length > 0){
			$('.prmocodefullamount').each(function(){
				var temp = parseFloat($(this).html());
				if(isNaN(temp)){
					temp = 0.0;
				}
				totalpricediscount += temp;
			});
		}
		$('#totalpromo').html((discount+totalpricediscount).toFixed(2));
		$('#totaltotal').html((selling+surcharge+tax+hst+qst+gst+service+sftax-discount-totalpricediscount).toFixed(2));
	}
	/**
	 * Common Function for numeric value
	 */
	function validateNumericPrice(element){
		var price = parseFloat(element.value);
		if(isNaN(price) || price < 0){
			price = 0.00;
			element.value = "0.00";
			alert(numericerrmsg);
		}
		return price;
	}
	$('.sellingchange').live('change',function(){
		var total = 0.0;
		var price = validateNumericPrice(this); 
		var row = $(this).parent().parent();
		var type = row.find('[id=airfarepaxtype]').val();
		var vendor = row.find('[id=airfarevendor]').val();
		var locator = row.find('[id=airfarelocator]').val();
		$('[id='+this.id+']').each(function(){
				total= total + parseFloat(this.value);
		});
		$('.'+type+'vendorselling'+vendor+locator).html(price.toFixed(2));
		$('.'+ type +'sellingtotal').html(total.toFixed(2));
		var noofpax =  getNoofPax(type);
		$('#'+type+'paxtypesellingtotal').html((total*noofpax).toFixed(2));
		updatePaxTotal($('.'+ type +'sellingtotal').first().parent(),type);
		updateVendorTotal($(this).parent().parent(),type,vendor,locator);
		updatePaxTypeTotal(type);
		updateSpendPDP(type);
	});
	$('.surchargechange').live('change',function(){
		var total = 0.0;
		var price = validateNumericPrice(this); 
		var row = $(this).parent().parent();
		var type = row.find('[id=airfarepaxtype]').val();
		var vendor = row.find('[id=airfarevendor]').val();
		var locator = row.find('[id=airfarelocator]').val();
		$('[id='+this.id+']').each(function(){
				total= total + parseFloat(this.value);
		});
		$('.'+type+'vendorsurcharge'+vendor+locator).html(price.toFixed(2));
		$('.'+ type +'surchargetotal').html(total.toFixed(2));
		var noofpax =  getNoofPax(type);
		$('#'+type+'paxtypesurchargetotal').html((total*noofpax).toFixed(2));
		updatePaxTotal($('.'+ type +'surchargetotal').first().parent(),type);
		updateVendorTotal($(this).parent().parent(),type,vendor,locator);
		updatePaxTypeTotal(type);
	});
	$('.taxchange').live('change',function(){
		var total = 0.0;
		var price = validateNumericPrice(this);
		var row = $(this).parent().parent();
		var type = row.find('[id=airfarepaxtype]').val();
		var vendor = row.find('[id=airfarevendor]').val();
		var locator = row.find('[id=airfarelocator]').val();
		$('[id='+this.id+']').each(function(){
				total= total + parseFloat(this.value);
		});
		$('.'+type+'vendortax'+vendor+locator).html(price.toFixed(2));
		$('.'+ type +'taxtotal').html(total.toFixed(2));
		var noofpax =  getNoofPax(type);
		$('#'+type+'paxtypetaxtotal').html((total*noofpax).toFixed(2));
		updatePaxTotal($('.'+ type +'taxtotal').first().parent(),type);
		updateVendorTotal($(this).parent().parent(),type,vendor,locator);
		updatePaxTypeTotal(type);
	});
	$('.hstchange').live('change',function(){
		var total = 0.0;
		var price = validateNumericPrice(this);
		var row = $(this).parent().parent();
		var type = row.find('[id=airfarepaxtype]').val();
		var vendor = row.find('[id=airfarevendor]').val();
		var locator = row.find('[id=airfarelocator]').val();
		$('[id='+this.id+']').each(function(){
				total= total + parseFloat(this.value);
		});
		$('.'+type+'vendorhst'+vendor+locator).html(price.toFixed(2));
		$('.'+ type +'hsttotal').html(total.toFixed(2));
		var noofpax =  getNoofPax(type);
		$('#'+type+'paxtypehsttotal').html((total*noofpax).toFixed(2));
		updatePaxTotal($('.'+ type +'hsttotal').first().parent(),type);
		updateVendorTotal($(this).parent().parent(),type,vendor,locator);
		updatePaxTypeTotal(type);
	});
	$('.qstchange').live('change',function(){
		var total = 0.0;
		var price = validateNumericPrice(this);
		var row = $(this).parent().parent();
		var type = row.find('[id=airfarepaxtype]').val();
		var vendor = row.find('[id=airfarevendor]').val();
		var locator = row.find('[id=airfarelocator]').val();
		$('[id='+this.id+']').each(function(){
				total= total + parseFloat(this.value);
		});
		$('.'+type+'vendorqst'+vendor+locator).html(price.toFixed(2));
		$('.'+ type +'qsttotal').html(total.toFixed(2));
		var noofpax =  getNoofPax(type);
		$('#'+type+'paxtypeqsttotal').html((total*noofpax).toFixed(2));
		updatePaxTotal($('.'+ type +'qsttotal').first().parent(),type);
		updateVendorTotal($(this).parent().parent(),type,vendor,locator);
		updatePaxTypeTotal(type);
	});
	$('.gstchange').live('change',function(){
		var total = 0.0;
		var price = validateNumericPrice(this);
		var row = $(this).parent().parent();
		var type = row.find('[id=airfarepaxtype]').val();
		var vendor = row.find('[id=airfarevendor]').val();
		var locator = row.find('[id=airfarelocator]').val();
		$('[id='+this.id+']').each(function(){
				total= total + parseFloat(this.value);
		});
		$('.'+type+'vendorgst'+vendor+locator).html(price.toFixed(2));
		$('.'+ type +'gsttotal').html(total.toFixed(2));
		var noofpax =  getNoofPax(type);
		$('#'+type+'paxtypegsttotal').html((total*noofpax).toFixed(2));
		updatePaxTotal($('.'+ type +'gsttotal').first().parent(),type);
		updateVendorTotal($(this).parent().parent(),type,vendor,locator);
		updatePaxTypeTotal(type);
	});
	$('.servicechange').live('change',function(){
		var total = 0.0;
		var price = validateNumericPrice(this);
		var row = $(this).parent().parent();
		var type = row.find('[id=airfarepaxtype]').val();
		var vendor = row.find('[id=airfarevendor]').val();
		var locator = row.find('[id=airfarelocator]').val();
		$('[id='+this.id+']').each(function(){
				total= total + parseFloat(this.value);
		});
		$('.'+type+'vendorservice'+vendor+locator).html(price.toFixed(2));
		$('.'+ type +'servicetotal').html(total.toFixed(2));
		var noofpax =  getNoofPax(type);
		$('#'+type+'paxtypeservicetotal').html((total*noofpax).toFixed(2));
		
		//calculate service fee tax
		var sftaxprice = 0;
		var sftaxtotal = 0;
		var code = $('#contactDetailProvinceName').val();
		if(code=='NS'){
			sftaxprice= price * 0.15;
			sftaxtotal = total * 0.15;
		}else if(code=='NL' || code =='ON' || code =='NB'){
			sftaxprice= price * 0.13;
			sftaxtotal = total * 0.13;
		}else if(code=='BC'){
			sftaxprice= price * 0.12;
			sftaxtotal = total * 0.12; 
		}else if(code =='AB' || code =='MB' || code =='NT' || code =='NU' || code =='PE' || code =='QC' || code =='SK' || code =='YT'){
			sftaxprice= price * 0.05;
			sftaxtotal = total* 0.05;
		}
		$('.'+type+'vendorsftax'+vendor+locator).html(sftaxprice.toFixed(2));
		row.find('[name=vendorSFTax]').val(sftaxprice.toFixed(2));
		$('.'+ type +'sftaxtotal').html(sftaxtotal.toFixed(2));
		$('#'+type+'paxtypesftaxtotal').html((sftaxtotal*noofpax).toFixed(2));
		
		updatePaxTotal($('.'+ type +'servicetotal').first().parent(),type);
		updateVendorTotal($(this).parent().parent(),type,vendor,locator);
		updatePaxTypeTotal(type);
	});
	//update spend PDP section based on price change.
	function updateSpendPDP(paxType){
		var sellingPrice = parseFloat($('#'+ paxType +'paxtypesellingtotal').html())/parseFloat($('#'+paxType+'paxtypenumber').html());
		$('.'+paxType+'spendpdptr').each(function(){
			var elementMaxDollar =$(this).find("[id^='pdpmaxdollar']"); 
			var price =Math.min(parseFloat($(this).find('[id^=pdpdollaravailable]').html()),sellingPrice);
			elementMaxDollar.html(price.toFixed(2));
			if(price>0){$(this).find("[id^=pdpused]").removeAttr('disabled');}
			else {$(this).find("[id^=pdpused]").attr('disabled','disabled');}
			
		});
	}
	/** Air Fare calculation End **/
	/**
	 * Populate Insurance Fare details
	 */
	function insuranceFareGenerateRows(){
		$('.selectedinspassengerschange').each(function(){
				var selected = $('#' + this.id + ' option:selected');
				inspassengerid.push(selected.val());
				inspassengername.push(selected.text());
				inspolicynumber.push($(this).parent().parent().find('[id=inslocatorHidden]').val());
				inspaxType.push(passengerTypes[passengerids.indexOf(selected.val())]);
		});
		var distinctinspaxtype = $.distinct(inspaxType);
		for(var i=0;i<distinctinspaxtype.length;i++){
			var noofpax=0;
			for(var j=0;j<inspaxType.length;j++){
				if(distinctinspaxtype[i] == inspaxType[j]){
					noofpax+=1;
				}
			}
			distinctinspaxtypewithcount[i] =  [];
			distinctinspaxtypewithcount[i].push(distinctinspaxtype[i]);
			distinctinspaxtypewithcount[i].push(noofpax);
		}
		var totalinspax = 0;
		for(var i=0;i<distinctinspaxtypewithcount.length;i++){
			var row = $('#templateinspaxtype').clone();
			totalinspax+=distinctinspaxtypewithcount[i][1];
			row.attr("id",distinctinspaxtypewithcount[i][0]+'ins');
			row.css('display','table-row');
			row.find("[id^=inspaxtypedisplay]").text(distinctinspaxtypewithcount[i][0]);
			row.find("[id^='inspaxtypenumber']").attr("id",distinctinspaxtypewithcount[i][0]+'inspaxtypenumber').text(distinctpaxtypeswithcount[i][1]);
			row.find("[id^='inssellingpaxtypetotal']").attr("id",distinctinspaxtypewithcount[i][0]+'inssellingpaxtypetotal');
			row.find("[id^='instaxpaxtypetotal']").attr("id",distinctinspaxtypewithcount[i][0]+'instaxpaxtypetotal');
			row.find("[id^='inspaxtypetotal']").attr("id",distinctinspaxtypewithcount[i][0]+'inspaxtypetotal');
			if(i==0){
				row.insertAfter('#templateinspaxtype');
			}else{
				row.insertAfter('#'+ distinctinspaxtypewithcount[i-1][0]+'ins');
			}
		}
		//Passengers rows created below corresponding pax type rows created above
		for(var j=inspassengername.length-1;j>=0;j--){
					var row = $('#templateinspax').clone();
					row.attr("id",inspaxType[j]+ 'inspassengertr' +inspassengerid[j]);
					row.css('display','table-row');
					row.find('[id=inspassengerid]').val(inspassengerid[j]);
					row.find("[id^=inspaxname]").text(inspassengername[j]);
					row.find("[id^='inspolicynumber']").html(inspolicynumber[j]);
					row.find("[id^='insselling']").attr("id",inspaxType[j]+'insselling');
					row.find("[id^='instax']").attr("id",inspaxType[j]+'instax');
					row.insertAfter('#'+inspaxType[j]+'ins');
		}
		$('#instotalpassengers').html(totalinspax);
		$('#instotalselling').html("0.00");
		$('#instotaltax').html("0.00");
		$('#instotaltotal').html("0.00");
	}
	/** Insurance fare calculation start**/
	function updateinspaxtypeTotal(id){
		validateNumericPrice(id);
		var total=0.0;
		$('[id='+id.id+']').each(function(){
			total += parseFloat(this.value);
		});
		$('#'+id.id+'paxtypetotal').html(total.toFixed(2));
		//paxtotal calculation
		var currentrow= $(id).parent().parent();
		var paxselling=parseFloat(currentrow.find("[id$='insselling']").val());
		var paxtax=parseFloat(currentrow.find("[id$='instax']").val());
		currentrow.find('[id=inspaxtotal]').html((paxselling+paxtax).toFixed(2));
		
		//paxtype total calculation
		var paxtyperow = $('#'+id.id+'paxtypetotal').parent();
		var selling=parseFloat(paxtyperow.find("[id$='inssellingpaxtypetotal']").html());
		var tax=parseFloat(paxtyperow.find("[id$='instaxpaxtypetotal']").html());
		paxtyperow.find('[id='+paxtyperow.attr('id')+'paxtypetotal]').html((selling+tax).toFixed(2));
		updateinstotal();
	}
	function updateinstotal(){
		var selling = 0.0, tax = 0.0;
		$('[id$=insselling]').each(function(){
			selling += parseFloat(this.value);
		});
		$('[id$=instax]').each(function(){
			tax += parseFloat(this.value);
		});	
		$('#instotalselling').html(selling.toFixed(2));
		$('#instotaltax').html(tax.toFixed(2));
		$('#instotaltotal').html((selling+tax).toFixed(2));
	}
	$('.inssellingchange').live('change',function(){
		updateinspaxtypeTotal(this);
	});
	$('.instaxchange').live('change',function(){
		updateinspaxtypeTotal(this);
	});
	/** Insurance fare calculation end**/
	
	//Populated vendor Information based on flight/insurance
	$('.vendortype').live('change',function(){
		var providers =  [];
		
		//hide and reset subvendor list
		$('#subvendor'+$(this).attr('id').substring(10)).attr('selectedIndex', 0);			 
		$('#supplier'+$(this).attr('id').substring(10)).css('visibility','hidden');
		$('#namesupplier'+$(this).attr('id').substring(10)).css('visibility','hidden');
		
		if($(this).val()=='Air'){
			airVendors = airVendors.replace('[', '').replace(']','');
			providers = airVendors.split(",");
		}else if($(this).val()=='Insurance'){
			insuranceVendors = insuranceVendors.replace('[', '').replace(']','');
			providers = insuranceVendors.split(",");
			
		}else{
			 $( '#vendor' +$(this).attr('id').substring(10)).empty();
			 $('#vendor' +$(this).attr('id').substring(10)).append('<option value="" >--Select--</option>');
			 return;
		}
		
		var vendorId = '#vendor' +$(this).attr('id').substring(10); 
		 $(vendorId).empty();
		 if($(this).val()!='Insurance'){
			 $(vendorId).append('<option value="" >--Select--</option>');
		 }
		 for(var cnt=0;cnt<providers.length;cnt++){
			var provider = providers[cnt].split("|");
			$(vendorId).append('<option value="'+ provider[1] +'" >'+provider[1] + " - " + provider[0]+'</option>');
		}
	});
	
	
	$('.vendor').live('change',function(){
		var currentElementID = $(this).attr('id').substring(6);

		AsyncService.getTourOperator($(this).val(),{
			callback :  function(data) { populateSubVendor(data,currentElementID);},
			errorHandler : handleAddError
		});
		
		var isAirCanada = false;
		var isWestjet = false;
		$('.vendor').each(function(){
			if($(this).val()=='C1'  || $(this).val()=='C4'  || $(this).val()=='C1A'  || $(this).val()=='C1H' || $(this).val()=='C1-T'  || $(this).val()=='C1A-T' ){
				isAirCanada=true;
			}
			if($(this).val()=='C2'){
				isWestjet = true;
			}
			isAirCanada ? $(".traircanadaticket").show() : $(".traircanadaticket").hide();
			isWestjet ? $(".trwestjetticket").show() : $(".trwestjetticket").hide();
		});
		
	});
	
	function populateSubVendor(data,thisId){		
		if(data.length>0){
			$('#subvendor' +thisId).empty();
			$('#subvendor' +thisId).append('<option value="" >--Select--</option>');
			
			var subVendorId = '#subvendor' +thisId; 
			
			for(var cnt=0;cnt<data.length;cnt++){
				var subvendor = data[cnt].split("|");
				$(subVendorId).append('<option value="'+ subvendor[0] +'" >'+ subvendor[1]+'</option>');
			}
			$('#supplier'+thisId).css('visibility','visible');
			$('#namesupplier'+thisId).css('visibility','visible');
		}else{
			$('#subvendor' + thisId).empty();
			$('#subvendor' + thisId).append('<option value="" >--Select--</option>');
						 
			$('#supplier'+ thisId).css('visibility','hidden');
			$('#namesupplier'+ thisId).css('visibility','hidden');
		}
		
	}
	
	/****** Flight Detail Related Jquery Starts *****/
	//Shows Flight Sagement
	$('#flightDetailTripType').change(function(){
		if($('#'+this.id).val() == 'OneWay'){
			$("#flightDetailReturndate").datepick("disable");
		}else{
			$("#flightDetailReturndate").datepick("enable");
		}
	});
	
	function showFlightDetails(){
		$('#hide_af').hide();
		$("#flightDetailTripType").prop("disabled", true);
		var val = $('#flightDetailTripType').val();
			if(selectedairvendors.length == 1 ){
				val = $('#flightDetailTripType').val();
				$('input[name=flightDetailvendorCode]').val(selectedairvendorval[0]);
				$('input[name=flightDetailLocator]').val(flightLocators[0]);
				$('#tdFlightDetailTripType').append($("<td></td>").text(selectedairvendors[0]));
				$('#tdFlightDetailLocator').append($("<td></td>").text(flightLocators[0]));
				
				if(val == "Return" || val == "MultiCity"){
					var radioOutbound = $('<label> <input type="radio" id="tripTypeO" name="tripType" value="Outbound" checked /> Outbound</label>');
					var radioReturn = $('<label> <input type="radio" id="tripTypeR" name="tripType"  value="Return"/> Return </label>');
					if(val == "MultiCity"){
						radioOutbound = $('<label> <input type="radio" id="tripTypeO" name="tripType" value="Outbound" checked /> Outbound 1</label>');
						radioReturn = $('<label> <input type="radio" id="tripTypeR" name="tripType"  value="Return"/> Outbound 2 </label>');
					}
					radioOutbound.appendTo('#segmentType');
					radioReturn.appendTo('#segmentType');
					
					if(selectedairvendorval[0]!="C8" || isGDSError){
						//For Fare_Class Related Changes
						if(selectedairvendorval[0]=="C1"  || selectedairvendorval[0]=="C1A"){
							$('#fareBasisTextBox').hide();
							$('#fareBasisDropDown').css('display','table-row');
							$('#fareBasisDropDown').width(57);
						}else{
							$('#fareBasisDropDown').css('display','none');
							$('#fareBasisTextBox').show();
						}
						//For Select Air Line According To Vendor
						switch (selectedairvendorval[0]){
							case "C1"  :
							case "C1A"  :
							case "C1H"  :
							case "C1-T"  :
							case "C1A-T"  :
								$("#flightDetailAirline option[value=AC]").attr('selected', 'selected'); break;
							case "C2"  : $("#flightDetailAirline option[value=WS]").attr('selected', 'selected'); break;
							case "C19" : $("#flightDetailAirline option[value=WN]").attr('selected', 'selected'); break;
							case "C21" : $("#flightDetailAirline option[value=FL]").attr('selected', 'selected'); break;
							case "C28" : $("#flightDetailAirline option[value=NK]").attr('selected', 'selected'); break;
							case "C43" : $("#flightDetailAirline option[value=G4]").attr('selected', 'selected'); break;
							case "C45" : $("#flightDetailAirline option[value=9M]").attr('selected', 'selected'); break;
							case "C46" : $("#flightDetailAirline option[value=BH]").attr('selected', 'selected'); break;
						}
						
					}

					var i=1;
					var j=1;
					if(selectedairvendorval[0]=="C8" && !isGDSError){
						j = gdsDataLocatorwise[flightLocators[0]].length - 1 ;
					}
					while(j>=1){
						var rowSegmentType = $('#trSegmentType').clone();
						rowSegmentType.attr('id','trSegmentType'+i);
						rowSegmentType.find("[id^='tripTypeO']").attr("id",'tripTypeO'+(i*10+1));
						rowSegmentType.find("[id^='tripTypeR']").attr("id",'tripTypeR'+(i*10+1));
						rowSegmentType.find("[id^='tripTypeO']").attr("name",'tripType'+(i*10+1));
						rowSegmentType.find("[id^='tripTypeR']").attr("name",'tripType'+(i*10+1));
						if(i==1){
							rowSegmentType.insertAfter("#tmpltOutBountRow");
						}else{
							rowSegmentType.insertAfter('#tmpltOutBountRow'+(i*10-9));	
						}
						var rowSegment = $('#tmpltOutBountRow').clone();
						
						rowSegment.css('display','table-row');
						rowSegment.find("[id^='addSegment']").attr("id",'addSegment'+(i*10+1)) ;
						rowSegment.find('[id^=flightDetailFlightNumber]').attr('id','flightDetailFlightNumber'+(i*10+1)).bind('keypress',function(e){return validateNumeric(e);});
						rowSegment.find('[id^=flightDetailAirline]').attr('id','flightDetailAirline'+(i*10+1));
						rowSegment.find('[id^=flightDetailDepartDateSegment]').attr('id','flightDetailDepartDateSegment'+(i*10+1)).val('');
						rowSegment.find('[id^=flightDetailDeaprtCity]').attr('id','flightDetailDeaprtCity'+(i*10+1)).val('').autocomplete(autoCompleteOptions);
						rowSegment.find('[id^=flightDetailArvCity]').attr('id','flightDetailArvCity'+(i*10+1)).val('').autocomplete(autoCompleteOptions);
						rowSegment.find('[id^=flightDetailArriveDateSegment]').attr('id','flightDetailArriveDateSegment'+(i*10+1)).val('');
						rowSegment.find('[id^=tblFlightDetail]').attr('id','tblFlightDetail'+(i*10+1)).val('');
						//changes trelated to Fare_class
						rowSegment.find('[id^=fareBasisTextBox]').attr('id','fareBasisTextBox'+(i*10+1)).val('');
						rowSegment.find('[id^=fareBasisDropDown]').attr('id','fareBasisDropDown'+(i*10+1)).val('');
						//changes ends here
						
						rowSegment.find('img').remove();
						rowSegment.find('[id^=flightDetailDepartDateSegment]').removeClass('hasDatepick').datepick({yearRange: 'c-100:c+1',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
						rowSegment.find('[id^=flightDetailArriveDateSegment]').removeClass('hasDatepick').datepick({yearRange: 'c-100:c+1',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
						
						rowSegment.attr('id','tmpltOutBountRow'+(i*10+1));
						rowSegment.insertAfter("#trSegmentType"+i);
						j--;
						i++;
					}
					if(selectedairvendorval[0]=="C8" && !isGDSError){
						var row;
						for(var i=0;i<flightLocators.length;i++){
							segments = gdsDataLocatorwise[flightLocators[i]];
							var isFirst = false;
							for(var j=0 ;j < segments.length;j++){
								if(j==0){
									$('#flightDetailDeapartCity').val(gdsDataLocatorwise[flightLocators[i]][j].departCity);
									$('#flightDetailDepartDate').val(gdsDataLocatorwise[flightLocators[i]][j].departDate);
									row =  $('#tmpltOutBountRow');
									isFirst = true;
								}else{
									row =  $('#tmpltOutBountRow'+((j*10)+1));
									isFirst = true;
								}
								c8vendorRow(row,gdsDataLocatorwise[flightLocators[i]][j],'tblFlightDetail',isFirst);
							}
						}
					}
				}
				else{
					$('#segmentType').append($("<td></td>").text('OutBound'));
					//bifurgate GDS and non-GDS booking
					if(selectedairvendorval[0]!="C8" || isGDSError){
						//For Fare_Class Related Changes
						if(selectedairvendorval[0]=="C1"  || selectedairvendorval[0]=="C1A"){
							$('#fareBasisTextBox').hide();
							$('#fareBasisDropDown').css('display','table-row');
							$('#fareBasisDropDown').width(57);
						}else{
							$('#fareBasisDropDown').css('display','none');
							$('#fareBasisTextBox').show();
						}
						//For Select Air Line According To Vendor
						switch (selectedairvendorval[0]){
							case "C1"  :
							case "C1A"  :
							case "C1H"  :
							case "C1-T"  :
							case "C1A-T"  :
								$("#flightDetailAirline option[value=AC]").attr('selected', 'selected'); break;
							case "C2"  : $("#flightDetailAirline option[value=WS]").attr('selected', 'selected'); break;
							case "C19" : $("#flightDetailAirline option[value=WN]").attr('selected', 'selected'); break;
							case "C21" : $("#flightDetailAirline option[value=FL]").attr('selected', 'selected'); break;
							case "C28" : $("#flightDetailAirline option[value=NK]").attr('selected', 'selected'); break;
							case "C43" : $("#flightDetailAirline option[value=G4]").attr('selected', 'selected'); break;
							case "C45" : $("#flightDetailAirline option[value=9M]").attr('selected', 'selected'); break;
							case "C46" : $("#flightDetailAirline option[value=BH]").attr('selected', 'selected'); break;
						}
						
					}else{
						//FOR C8 - Single Vendor - OneWay
						var row;
						for(var i=0;i<flightLocators.length;i++){
							segments = gdsDataLocatorwise[flightLocators[i]];
							var isFirst = false;
							for(var j=0 ;j < segments.length;j++){
								if(j==0){
									$('#flightDetailDeapartCity').val(gdsDataLocatorwise[flightLocators[i]][j].departCity);
									$('#flightDetailDepartDate').val(gdsDataLocatorwise[flightLocators[i]][j].departDate);
									row =  $('#tmpltOutBountRow');
									isFirst = true;
								}else{
									row =  $('#tmpltOutBountRow').clone();
									isFirst = false;
								}
								c8vendorRow(row,gdsDataLocatorwise[flightLocators[i]][j],'tblFlightDetail',isFirst);
							}
						}
					}
				}
			}else{
				//First Fill The Select Box
				//name="flightDetailvendorCode"
				var s = $('<select id = "dynamicVendorDropDown"  style=" width:350px; margin-top:4px;" />');
				s.append('<option value="" selected="selected"> -- Select --</option>');
				for(var val in selectedairvendors) {
					$('<option />', {value: selectedairvendorval[val]+'_'+flightLocators[val], text: selectedairvendors[val]+' - '+flightLocators[val]}).appendTo(s);
				}
				s.appendTo('#tdFlightDetailTripType');
				
				if($('#flightDetailTripType').val() == "Return" || $('#flightDetailTripType').val() == "MultiCity"){
					var radioOutbound = $('<label> <input type="radio" id="tripTypeO" name="tripType" value="Outbound" checked /> Outbound</label>');
					var radioReturn = $('<label> <input type="radio" id="tripTypeR" name="tripType"  value="Return"/> Return </label>');
					if($('#flightDetailTripType').val() == "MultiCity"){
						radioOutbound = $('<label> <input type="radio" id="tripTypeO" name="tripType" value="Outbound" checked /> Outbound 1</label>');
						radioReturn = $('<label> <input type="radio" id="tripTypeR" name="tripType"  value="Return"/> Outbound 2 </label>');
					}
					radioOutbound.appendTo('#segmentType');
					radioReturn.appendTo('#segmentType');
				}else{
					$('#segmentType').append($("<td></td>").text('OutBound'));
				}
				//Clone And Add The Row
				maxClone = 0; //reset count for previous section and than continue
				for(var i=1;i<selectedairvendors.length;i++){
					var row = $('#tmpltFlightinnerdtls').clone();
					row.attr('id','tmpltFlightinnerdtls'+(i*10));
					row.css('display','table-row');
					row.find("[id^='tmpltOutBountRow']").attr("id",'tmpltOutBountRow'+(i*10));
					row.find("[id^='addSegment']").attr("id",'addSegment'+(i*10)) ;
					
					row.find("[id^='tripTypeO']").attr("id",'tripTypeO'+(i*10));
					row.find("[id^='tripTypeR']").attr("id",'tripTypeR'+(i*10));
					
					row.find("[id^='tripTypeO']").attr("name",'tripType'+(i*10));
					row.find("[id^='tripTypeR']").attr("name",'tripType'+(i*10));
					
					row.find('[id^=flightDetailAirline]').attr('id','flightDetailAirline'+(i*10));
					row.find('[id^=flightDetailDepartDateSegment]').attr('id','flightDetailDepartDateSegment'+(i*10)).val('');
					row.find('[id^=flightDetailDeaprtCity]').attr('id','flightDetailDeaprtCity'+(i*10)).val('').autocomplete(autoCompleteOptions);
					row.find('[id^=flightDetailArvCity]').attr('id','flightDetailArvCity'+(i*10)).val('').autocomplete(autoCompleteOptions);
					row.find('[id^=flightDetailArriveDateSegment]').attr('id','flightDetailArriveDateSegment'+(i*10)).val('');
					row.find('[id^=dynamicVendorDropDown]').attr('id','dynamicVendorDropDown'+(i*10)).val('');
					row.find('[id^=singleVendor]').attr('id','singleVendor'+(i*10));
					row.find('[id^=tdFlightDetailLocator]').attr('id','tdFlightDetailLocator'+(i*10)).val('');
					row.find('[id^=tblFlightDetail]').attr('id','tblFlightDetail'+(i*10)).val('');
					//changes trelated to Fare_class
					row.find('[id^=fareBasisTextBox]').attr('id','fareBasisTextBox'+(i*10)).val('');
					row.find('[id^=fareBasisDropDown]').attr('id','fareBasisDropDown'+(i*10)).val('');
					//changes ends here
					
					row.find('[id^="flightDetailType"]').attr('id','flightDetailType'+(i*10)).val('');
					row.find('[id^="flightDetailType"]').val('outbound');
	
					
					row.find('img').remove();
					if(maxClone > 0){
						row.insertAfter('#tmpltFlightinnerdtls'+(maxClone*10));
					}else{
						row.insertAfter('#tmpltFlightinnerdtls');
					}
				    
				    $('#flightDetailDepartDateSegment'+(i*10)).removeClass('hasDatepick').datepick({yearRange: 'c-100:c+1',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
				    $('#flightDetailArriveDateSegment'+(i*10)).removeClass('hasDatepick').datepick({yearRange: 'c-100:c+1',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
				    maxClone++;
				}
				//for air line depart date and arrive and depart city
				$('#flightDetailDepartDateSegment').val($('#flightDetailDepartDate').val());
				$('#flightDetailArriveDateSegment').val($('#flightDetailDepartDate').val());
				
				$('#flightDetailDepartDateSegment10').val($('#flightDetailReturndate').val());
				$('#flightDetailArriveDateSegment10').val($('#flightDetailReturndate').val());
				
				//for city from flight detail
				$('#flightDetailDeaprtCity').val($('#flightDetailDeapartCity').val());
				var type = $('#flightDetailTripType').val();
				if(type == 'Return'){
					$('#flightDetailArvCity').val($('#flightDetailArriveCity').val());
					$('#flightDetailDeaprtCity10').val($('#flightDetailArriveCity').val());
				}
				if(type != 'Return'){
					$('#flightDetailArvCity10').val($('#flightDetailArriveCity').val());
				}else{
					$('#flightDetailArvCity10').val($('#flightDetailDeapartCity').val());
				}
				//code for paste ends here
			}
			$('#tmpltFlightinnerdtls').show();
			isGDSError = false;
	}
	
	function c8vendorRow(row,segmentDetail,tableName,isFirst){
		row.find("[id^='flightDetailAirline']").val(segmentDetail.airline);
		row.find("[id^='flightDetailFlightNumber']").val(segmentDetail.flightNumber);
		row.find("[id^='flightDetailDepartDateSegment']").val(segmentDetail.departDate);
		row.find("[id^='flightDetailDeaprtCity']").val(segmentDetail.departCity).autocomplete(autoCompleteOptions);
		row.find("[id^='flightDetailArvCity']").val(segmentDetail.arriveCity).autocomplete(autoCompleteOptions);
		row.find("[id^='flightDetailArriveDateSegment']").val(segmentDetail.arriveDate);
		row.find("[id^='flightDetailDepartHours']").val(segmentDetail.departHours);
		row.find("[id^='flightDetailDepartMinutes']").val(segmentDetail.departMinutes);
		row.find("[id^='flightDetailDepartAmPm']").val(segmentDetail.departAmPm);
		row.find("[id^='flightDetailArriveDateSegment']").val(segmentDetail.arriveDate);
		row.find("[id^='flightDetailArriveHours']").val(segmentDetail.arriveHours);
		row.find("[id^='flightDetailArriveinutes']").val(segmentDetail.arriveMinutes);
		row.find("[id^='flightDetailArriveAmPm']").val(segmentDetail.arriveAmPm);
		row.find("[id^='flightDetailBookingClass']").val(segmentDetail.bookingClass);
		row.find("[id^='fareBasisDropDown']").css('display','none');
		row.find("[id^='fareBasisTextBox']").show();
		row.find("[id^='fareBasisTextBox']").val(segmentDetail.fareBasis);
		row.find("[id^='flightDetailOperatedBy']").val(segmentDetail.operatedBy);
		if(!isFirst){
			var id = $("#"+tableName+" tr:last").attr('id');
			id = (id.substring(16));
			if(id==""){id=0;}
			id = parseInt(id, 10);
			id = id+1;
			row.attr('id','tmpltOutBountRow'+id);
			row.find('[id^=flightDetailDeleteSegment]').attr('id','flightDetailDeleteSegment'+id)
			.html('<a id="addSegment'+id+'" name="addSegment" class="redlink">Add</a> <br/>'+
				  '<a id="deleteSegment" name="deleteSegment" class="redlink">Delete</a>');
			row.insertAfter("#"+tableName+" tr:last");
		}
	}
	
	// Locator add
	$("[id^='dynamicVendorDropDown']").live('change',function() {
		$('#'+this.id).prop('disabled',true);
		var result = (this.id.substring(21));
		var num=result; 
		var index = (this.selectedIndex);
		result = result == null ? "" : result;
		$('#tdFlightDetailLocator'+result).empty();
		$('#tdFlightDetailLocator'+result).append($("<td></td>").text(flightLocators[index-1]));
		
		$('#tmpltOutBountRow'+num).find('[id^=flightDetailvendorCode]').val(selectedairvendorval[index-1]);
		$('#tmpltOutBountRow'+num).find('[id^=flightDetailLocator]').val(flightLocators[index-1]);
		
		//For Fare_Class Related Changes
		if(selectedairvendorval[index-1]!="C8" || isGDSError){
			if(selectedairvendorval[index-1]=="C1" || selectedairvendorval[index-1]=="C1A"){
				$('#fareBasisTextBox'+num).hide();
				$('#fareBasisDropDown'+num).css('display','table-row');
				$('#fareBasisDropDown'+num).width(57);
			}else{
				$('#fareBasisTextBox'+num).show();
				$('#fareBasisDropDown'+num).css('display','none');
			}
			
			switch (selectedairvendorval[index-1]){
				case "C1"  :
				case "C1A"  :
				case "C1H"  :
				case "C1-T"  :
				case "C1A-T"  :
					$("#flightDetailAirline"+num+" option[value=AC]").attr('selected', 'selected'); break;
				case "C2"  : $("#flightDetailAirline"+num+" option[value=WS]").attr('selected', 'selected'); break;
				case "C19" : $("#flightDetailAirline"+num+" option[value=WN]").attr('selected', 'selected'); break;
				case "C21" : $("#flightDetailAirline"+num+" option[value=FL]").attr('selected', 'selected'); break;
				case "C28" : $("#flightDetailAirline"+num+" option[value=NK]").attr('selected', 'selected'); break;
				case "C43" : $("#flightDetailAirline"+num+" option[value=G4]").attr('selected', 'selected'); break;
				case "C45" : $("#flightDetailAirline"+num+" option[value=9M]").attr('selected', 'selected'); break;
				case "C46" : $("#flightDetailAirline"+num+" option[value=BH]").attr('selected', 'selected'); break;
			}
		}else{
			//code added for GDS
			$('#tblFlightDetail'+result+' > tbody  > tr').each(function() {
				if($(this).is('[id^="tmpltOutBountRow"]') ){
					segments = gdsDataLocatorwise[flightLocators[index-1]];
					var isFirst = false;
					for(var j=0 ;j < segments.length;j++){
						if(j==0){
							row =  $('#tmpltOutBountRow'+result);
							isFirst = true;
						}else{
							row =  $('#tmpltOutBountRow'+result).clone();
							isFirst = false;
						}
						c8vendorRow(row,gdsDataLocatorwise[flightLocators[index-1]][j],'tblFlightDetail'+result,isFirst);
					}
				}
			});
		}
		
	});
	
	$("[id^='tripType']").live('change',function() {
		var result = (this.id.substring(9));
		if(result==null){
			result="";
		}
		if(this.id.substring(9,8) == 'R'){
			var num = 0;
			if(result != "" ){num = result;}
			else{num = 1;}
			
			var nextTripType = parseInt(num,10);
			nextTripType = nextTripType+10;
			jQuery("#tripTypeR"+nextTripType).attr('checked', 'checked');
			$("#tripTypeR"+nextTripType).change();
		}else if(this.id.substring(9,8) == 'O'){
			var num = 0;
			if(result != "" ){
				num = result;
			}
			var nextTripType = parseInt(num,10);
			nextTripType = nextTripType-10;
			if(nextTripType == 1){
				nextTripType="";
			}
			jQuery("#tripTypeO"+nextTripType).attr('checked', 'checked');
			$("#tripTypeO"+nextTripType).change();
		}
		for(var k=0 ;k<10 ;k++){
			$('#tmpltOutBountRow'+result).find('[id^=flightDetailType]').val(this.value);
			result++;
		}
		
		var firstReturn = true;
		$('#tblFlightDetail > tbody  > tr').each(function() {
			if($(this).is('[id^="trSegmentType"]') ){
				var rowIdNum = (this.id.substring(13));
				if(rowIdNum != ""){
					rowIdNum = (rowIdNum*10)+1;
				}
				if($('#tripTypeO'+rowIdNum).is(':checked')){
					$('#flightDetailArriveCity').val($('#flightDetailArvCity'+rowIdNum).val());
				}
				if(firstReturn && $('#tripTypeR'+rowIdNum).is(':checked')){
					$('#flightDetailReturndate').val($('#flightDetailDepartDateSegment'+rowIdNum).val());
					firstReturn = false;
				}
			}
		});
		
	});
	
	//Add Segment Click
	var segmentCount = 1;
	$("[id^='addSegment']").live('click',function() {
		var result = /\d+(?:\.\d+)?/.exec(this.id);
		result = result == null ? 0 : result;
		var row;
		if(result == 0){
			 row= $('#tmpltOutBountRow').clone();
		}else{
			row = $('#tmpltOutBountRow'+result).clone();
		}
		
		result = parseInt(result,10);
		segmentCount= parseInt(segmentCount,10);
		
		row.css('display','table-row');
		row.attr('id','tmpltOutBountRow'+(result+1));
		row.find('[id^=flightDetailFlightNumber]').attr('id','flightDetailFlightNumber'+segmentCount).val('').bind('keypress',function(e){return validateNumeric(e);});
		row.find('[id^=flightDetailDepartDateSegment]').attr('id','flightDetailDepartDateSegment'+segmentCount).val('');
		row.find('[id^=flightDetailArriveDateSegment]').attr('id','flightDetailArriveDateSegment'+segmentCount).val('');
		row.find('[id^=flightDetailDeaprtCity]').attr('id','flightDetailDeaprtCity'+segmentCount).val('').autocomplete(autoCompleteOptions);
		row.find('[id^=flightDetailArvCity]').attr('id','flightDetailArvCity'+segmentCount).val('').autocomplete(autoCompleteOptions);
		
		row.find('[id^=flightDetailDeleteSegment]').attr('id','flightDetailDeleteSegment'+segmentCount)
		.html('<a id="addSegment'+(result+1)+'" name="addSegment" class="redlink">Add</a> <br/>'+
			  '<a id="deleteSegment" name="deleteSegment" class="redlink">Delete</a>');
		row.find('[id^=flightDetailBookingClass]').attr('id','flightDetailBookingClass'+segmentCount).val('');
		
		row.find('img').remove();
		row.find('input:text').val('');
		if(result == 0){
			row.insertAfter('#tmpltOutBountRow');
		}else{
			row.insertAfter('#tmpltOutBountRow'+ result);
		}
		
	    $('#flightDetailDepartDateSegment'+segmentCount).removeClass('hasDatepick').datepick({yearRange: 'c-100:c+1',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
	    $('#flightDetailArriveDateSegment'+segmentCount).removeClass('hasDatepick').datepick({yearRange: 'c-100:c+1',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
	    segmentCount ++;

	});
	
	$("[id^='deleteSegment']").live('click',function() {
		$(this).closest('tr').remove();
	});
	
	/*flightDetailDepartDate
	$( "#from" ).datepicker({
	flightDetailReturndate*/
	$("#flightDetailDepartDate").datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
			onClose: function() {
				$('#flightDetailReturndate').datepick('option', 'minDate', $(this).val());
			}
		});
	
	$("#flightDetailReturndate").datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">',
			onClose: function() {
				$('#flightDetailDepartDate').datepick('option', 'maxDate', $(this).val());
			}
	});
	
	$("#[id*='DepartDate']").datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
	$("#[id*='Returndate']").datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
	$("#[id*='ArriveDate']").datepick({showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});

	
	/****** Flight Detail Related Jquery Ends *****/
	
	/**
	 * passenger Information starts 
	 */
	
	$('.classPaxTypeSelect').live('change', function(){
		var titleselect = $(this).parent().parent().find('.classTitleTypeSelect');
		var selectedpaxtype = $(this).val();
		if(selectedpaxtype == 'Adult'){
			titleselect.empty();
			titleselect.append('<option value="Mr" selected="selected">Mr.</option>');
			titleselect.append('<option value="Miss">Miss.</option>');
			titleselect.append('<option value="Mrs">Mrs.</option>');
			titleselect.append('<option value="Ms">Ms.</option>');
		}else if(selectedpaxtype == 'Child'){
			titleselect.empty();
			titleselect.append('<option value="Mstr" selected="selected">Mstr.</option>');
			titleselect.append('<option value="Miss">Miss.</option>');
		}else{
			titleselect.empty();
			titleselect.append('<option value="MSTR" selected="selected">Male</option>');
			titleselect.append('<option value="MISS">Female</option>');
		}
	});
	//Load passenger details on selection
	$("[id^='bookingpassengers']").live('change',function(){
		var row = $(this).parent().parent();
		var nextTr = $(this).parent().parent().next('tr');
		var thirdRow = $(this).parent().parent().next('tr').next('tr');
		//resetting all values before load.
		row.find("[id^='passengertype']").val('Adult');
		row.find("[id^='titletype']").val('Mr.');
		row.find("[id^='passengerfirstname']").val('');
		row.find("[id^='passengermiddlename']").val('');
		row.find("[id^='passengerlastname']").val('');
		row.find("[id^='dateofbirth']").val('');
		row.find("[id^='pdpamount']").val(0.0);
		nextTr.find("[id^='dvpdpinfo']").hide();
		nextTr.find("[id^='pdpprice']").html('');
		nextTr.find("[id^='freqflyer']").val('');
		
		if($(this).prop("selectedIndex")>0){
			var subid = $('#'+ $(this).attr('id') +' option:selected').val();
			if(subtraveller[subid] != undefined){
				fillPassengerDetail(subtraveller[subid],row,nextTr,thirdRow,subid);
			}else{
				AsyncService.getContactData(subid,{
					async : false,
					callback : function(data){
							fillPassengerDetail(data,row,nextTr,thirdRow,subid);
					},
 					errorHandler : handleAddError
				});
			}
		}
	});
	function fillPassengerDetail(data,row,nextTr,thirdRow,subid){
		if(data.length>0){
			var details = data.split("|");
			row.find("[id^='passengertype']").val(details[0]);
			row.find("[id^='titletype']").val(details[1]);
			row.find("[id^='passengerfirstname']").val(details[2]);
			if(details[3]!='null') row.find("[id^='passengermiddlename']").val(details[3]);
			row.find("[id^='passengerlastname']").val(details[4]);
			row.find("[id^='dateofbirth']").val(details[5]);
			row.find("[id^='pdpamount']").val(details[6]);
			nextTr.find("[id^='dvpdpinfo']").show();
			nextTr.find("[id^='pdpprice']").html('<strong>$'+ parseFloat(details[6]).toFixed(2) + '</strong> avaliable in');
			
			nextTr.find("[id^='seatpreference']").val(details[7]);
			nextTr.find("[id^='mealpreference']").val(details[8]);
			thirdRow.find("[id^='requirements']").val(details[9]);
			if(details[10]!='None') thirdRow.find("[id^='specialrequest']").val(details[10]);
			
			if(details[11].length>0) nextTr.find("[id^='freqflyer']").val(details[11]);
			if(details[12].length>0) nextTr.find("[id^='mileage']").val(details[11]);
			if(subtraveller[subid] == undefined){
				subtraveller[subid] = data;
			}
		}
	}
	
	$('#addpassenger').live('click',function() {
		var zeroRow =  $('#tblpassengerdetails tr:nth-child(1)').clone();
		var firstrow = $('#tblpassengerdetails tr:nth-child(2)').clone();
		var secondrow = $('#tblpassengerdetails tr:nth-child(3)').clone();
		var thirdrow = $('#tblpassengerdetails tr:nth-child(4)').clone();
		var forthrow = $('#tblpassengerdetails tr:nth-child(5)').clone();
		var fifthrow = $('#tblpassengerdetails tr:nth-child(6)').clone();

		firstrow.find('[id^=bookingpassengers]').attr('id','bookingpassengers1'+passengerCount).attr('selectedIndex', 0);
		firstrow.find('[id^=passengerid]').attr('id','passengerid'+passengerCount).val(passengerCount);
		firstrow.find('[id^=pdpamount]').attr('id','pdpamount'+passengerCount).val('0.0');
		firstrow.find('[id^=passengertype]').attr('id','passengertype'+passengerCount).attr('selectedIndex', 0);
		firstrow.find('[id^=titletype]').attr('id','titletype'+passengerCount).attr('selectedIndex', 0);
		firstrow.find('[id^=passengerfirstname]').attr('id','passengerfirstname'+passengerCount).val('').attr('class','characterField');//.bind('keypress',function(e){return validateName(e);});
		firstrow.find('[id^=passengermiddlename]').attr('id','passengermiddlename'+passengerCount).val('');//.bind('keypress',function(e){return validateName(e);});
		firstrow.find('[id^=passengerlastname]').attr('id','passengerlastname'+passengerCount).val('');//.bind('keypress',function(e){return validateName(e);});
		firstrow.find('[id^=dateofbirth]').attr('id','dateofbirth'+passengerCount).val('');		
		firstrow.find('img').remove();
		
		secondrow.find('[id^=seatpreference]').attr('id','seatpreference'+passengerCount).attr('selectedIndex', 0);
		secondrow.find('[id^=mealpreference]').attr('id','mealpreference'+passengerCount).attr('selectedIndex', 0);
		secondrow.find('[id^=freqflyer]').attr('id','freqflyer'+passengerCount).attr('selectedIndex', 0);
		secondrow.find('[id^=mileage]').attr('id','mileage'+passengerCount).val('').bind('keypress',function(e){return validateAlphaNumeric(e);});
		secondrow.find('[id^=dvpdpinfo]').attr('id','dvpdpinfo'+passengerCount).hide();
		secondrow.find('[id^=pdpprice]').html('$0.0');
		
		thirdrow.find('[id^=specialrequest]').attr('id','specialrequest'+passengerCount).val('');//.bind('keypress',function(e){return validateName(e);});
		thirdrow.find('[id^=requirements]').attr('id','requirements'+passengerCount).attr('selectedIndex', 0);
		thirdrow.find('[id^=tddeletepassenger]').attr('id','tddeletepassenger'+passengerCount)
				.html('<a id="deletepassenger" name="deletepassenger" class="redlink" style="padding-left: 20px;">Delete</a>');
		
		zeroRow.insertBefore('#trlastaddpassenger');
		firstrow.insertBefore('#trlastaddpassenger');
		secondrow.insertBefore('#trlastaddpassenger');
		thirdrow.insertBefore('#trlastaddpassenger');
		forthrow.insertBefore('#trlastaddpassenger');
		fifthrow.insertBefore('#trlastaddpassenger');
		
		//Add datepicker
		$('#dateofbirth'+passengerCount).removeClass('hasDatepick').datepick({yearRange: 'c-150:c+150',maxDate:'today',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
		
		passengerCount++;itemPassengerCounter++;
	});
	
	$('[id^=deletepassenger]').live('click',function() {
		if(itemPassengerCounter>2){
			$(this).closest("tr").prev('tr').prev('tr').prev('tr').prev('tr').prev('tr').remove();
			$(this).closest("tr").prev('tr').prev('tr').prev('tr').prev('tr').remove();	
			$(this).closest("tr").prev('tr').prev('tr').prev('tr').remove();	
			$(this).closest("tr").prev('tr').prev('tr').remove();	
			$(this).closest("tr").prev('tr').remove();
			$(this).closest("tr").remove();
			
			itemPassengerCounter--;
		}
			
	});
	
	$('#dateofbirth1').datepick({yearRange: '2013:-100',maxDate:'today',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
	
	/**
	 * Insurance Passenger details
	 */
	$('#addInsuredPpassenger').live('click',function() {
		var row = $('#insurancedetails tr:last').clone();
		var policy = row.find('[class=inspolicycode]');
		policy.empty();
		policy.append('<option value="" selected="selected">'+'-- Select --' + '</option>');
		row.attr('id','trinsurancedetails'+insuranceCount);
		row.find('[id^=insuredpassenger]').attr('id','insuredpassenger'+insuranceCount).attr('selectedIndex', 0);
		row.find('[id^=insurancevendor]').attr('id','insurancevendor'+insuranceCount).attr('selectedIndex', 0);
		row.find('[id^=policynumber]').attr('id','policynumber1'+insuranceCount).val('');
		row.find('[id=inslocator]').html('');
		row.find('[id=inspaxage]').html('');
		row.find('[id=deletelink]').css('display','table-cell');
		row.insertAfter('#insurancedetails tr:last');
		
		insuranceCount++;itemInsuranceCounter++;
	});
	
	$('.deleteins').live('click',function(){
			$(this).parent().parent().remove();
			itemInsuranceCounter--;
	});
	$('.selectedinspassengerschange').live('change',function(){
		if(this.value != ""){
			var dob=$('#'+'dateofbirth'+this.value).val();
			if(dob != "" ){
				var age = Math.floor((new Date()- new Date(dob)) / (365.25 * 24 * 60 * 60 * 1000));
				$(this).parent().parent().find('[id=inspaxage]').html(age);
			}
			else{
				$(this).parent().parent().find('[id=inspaxage]').html('');
			}
		}else{
			$(this).parent().parent().find('[id=inspaxage]').html('');
		}
	});
	$('.insvendorchange').live('change',function(){
			var row=$(this).parent().parent();
			var vendorcode = $('#'+this.id+' option:selected').val();
			var locator = ($('#'+this.id+' option:selected').text().split('-')[2]).trim();
			row.find('[id=inslocator]').html(locator);
			row.find('[id=inslocatorHidden]').val(locator);
			var policy = row.find('[class=inspolicycode]');
			if(vendorcode == "RBC"){
				policy.empty();
				policy.append('<option value="" selected="selected"> -- Select -- </option>');
				policy.append('<option value="Cancellation & Interruption|TCI">Cancellation & Interruption</option>');
				policy.append('<option value="Classic Medical|HME">Classic Medical</option>');
				policy.append('<option value="Deluxe Package|PT">Deluxe Package</option>');
				policy.append('<option value="Classic Annual Medical|HM1">Classic Annual Medical</option>');
				policy.append('<option value="Deluxe Annual Package (Prior)|PU1">Deluxe Annual Package (Prior)</option>');
				policy.append('<option value="Non-Medical Package|NT">Non-Medical Package</option>');
				policy.append('<option value="Visitors to Canada|HV1">Visitors to Canada</option>');
			}else if(vendorcode == "CSA"){
				policy.empty();
				policy.append('<option value="" selected="selected"> -- Select -- </option>');
				policy.append('<option value="Travel Protector Basic|TPB">Travel Protector Basic</option>');
				policy.append('<option value="Travel Protector Deluxe|TPD">Travel Protector Deluxe</option>');
				policy.append('<option value="Travel Protector Preferred|TPP">Travel Protector Preferred</option>');
			}else{
				policy.empty();
				policy.append('<option value="" selected="selected">'+'-- Select --' + '</option>');
				policy.append('<option value="">' + 'Medical Package not Found' +'</option>');
			}
	});
	/**
	 * Date Picker for payment details
	 */
	$('#airccpaymentdate1').datepick({yearRange: '2013:+100',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
	$('#insuranceccpaymentdate1').datepick({yearRange: '2013:+100',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
	
	$('#addFlightPayment').live('click', function(){
		var row = $(this).closest("tr").clone();
		row.attr('id','trairpaymentdetail1' + paymentDetailCount);
		row.find('[id^=airccvendors]').attr('id','airccvendors'+paymentDetailCount);
		row.find('[id^=airmerchant]').attr('id','airmerchant'+paymentDetailCount);
		row.find('[id^=aircctype]').attr('id','aircctype'+paymentDetailCount);
		
		row.find('[id^=aircccardfirstname]').attr('id','aircccardfirstname'+paymentDetailCount);//.bind('keypress',function(e){return validateName(e);});
		row.find('[id^=aircccardlastname]').attr('id','aircccardlastname'+paymentDetailCount);//.bind('keypress',function(e){return validateName(e);});		
		row.find('[id^=airccnumber]').attr('id','airccnumber'+paymentDetailCount);
		
		row.find('[id^=airccexpirymonth]').attr('id','airccexpirymonth'+paymentDetailCount);
		row.find('[id^=airccexpiryyear]').attr('id','airccexpiryyear'+paymentDetailCount);
		
		row.find('[id^=airccpaymentdate]').attr('id','airccpaymentdate'+paymentDetailCount);
		row.find('[id^=airauth]').attr('id','airauth'+paymentDetailCount).val('');
		row.find('[id^=airamount]').attr('id','airamount'+paymentDetailCount).val('');
		row.find('[id^=tdpaymentdetails]').attr('id','tdpaymentdetails'+paymentDetailCount)
			.html('<label id="addFlightPayment" class="redlink">Add</label><br/><label id="deleteFlightPayment" class="redlink">Delete</label>');

		row.find('img').remove();
		
		row.insertBefore('#trinsurance');
		
		//Add DatePicker
		$('#airccpaymentdate'+paymentDetailCount).removeClass('hasDatepick').datepick({yearRange: '2013:+100',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
		
		paymentDetailCount++;itemPaymentDetailCounter++;
	});
	
	$('[id^=deleteFlightPayment]').live('click',function() {
		if(itemPaymentDetailCounter>2){
			$(this).closest("tr").remove();
			itemPaymentDetailCounter--;
			updateFlightPaymentTotal();
		}
	});
	
	//Adding Refund Coupon Information
	$('[id^=addCouponRefund]').live('click', function(){
		var row = $(this).closest("tr").clone();
		row.attr('id','couponrefundtr' + couponrefundDetailCount);
		row.find('[id^=couponrefundcccode]').attr('id','couponrefundcccode'+couponrefundDetailCount);
		row.find('[id^=couponrefundmerchant]').attr('id','couponrefundmerchant'+couponrefundDetailCount);
		row.find('[id^=couponrefundcctype]').attr('id','couponrefundcctype'+couponrefundDetailCount);
		
		row.find('[id^=couponrefundcccardfirstname]').attr('id','couponrefundcccardfirstname'+couponrefundDetailCount);
		row.find('[id^=couponrefundcccardlastname]').attr('id','couponrefundcccardlastname'+couponrefundDetailCount);		
		row.find('[id^=couponrefundccnumber]').attr('id','couponrefundccnumber'+couponrefundDetailCount);
		
		row.find('[id^=couponrefundccexpirymonth]').attr('id','couponrefundccexpirymonth'+couponrefundDetailCount);
		row.find('[id^=couponrefundccexpiryyear]').attr('id','couponrefundccexpiryyear'+couponrefundDetailCount);
		
		row.find('[id^=couponccrefunddate]').attr('id','couponccrefunddate'+couponrefundDetailCount);
		row.find('[id^=couponrefundauth]').attr('id','couponrefundauth'+couponrefundDetailCount);
		row.find('[id^=couponrefundamount]').attr('id','couponrefundamount'+couponrefundDetailCount).val("0");
		row.find('[id^=tdcouponrefundamount]').html("0");
		row.find('[id^=couponrefundAddDelete]').attr('id','couponrefundAddDelete'+couponrefundDetailCount)
			.html('<label id="addCouponRefund1" class="redlink">Add</label>  <label id="deleteCouponRefund1" class="redlink">Delete</label>');

		row.find('img').remove();
		
		row.insertBefore('#trspendpdptemplateheader');
		
		//Add DatePicker
		$('#couponccrefunddate'+couponrefundDetailCount).removeClass('hasDatepick').datepick({yearRange: '2013:+100',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
		
		couponrefundCount++;couponrefundDetailCount++;
	});
	
	//Deleting Refund Coupon Rows
	$('[id^=deleteCouponRefund]').live('click',function() {
		if(couponrefundDetailCount>2){
			$(this).closest("tr").remove();
			couponrefundDetailCount--;
			updateCouponRefundTotal();
		}
	});
	
	//Add-delete Insurance 
	$('#addInsurancePayment').live('click', function(){
		var row = $(this).closest("tr").clone();
		row.attr('id','trinsurancepaymentdetail' + paymentDetailCount);
		row.find('[id^=insuranceccvendors]').attr('id','insuranceccvendors'+insurancePaymentDetailCount);
		row.find('[id^=insurancemerchant]').attr('id','insurancemerchant'+insurancePaymentDetailCount);
		row.find('[id^=insurancecctype]').attr('id','insurancecctype'+insurancePaymentDetailCount);
		
		row.find('[id^=insurancecccardfirstname]').attr('id','insurancecccardfirstname'+insurancePaymentDetailCount);
		row.find('[id^=insurancecccardlastname]').attr('id','insurancecccardlastname'+insurancePaymentDetailCount);
		row.find('[id^=insuranceccnumber]').attr('id','insuranceccnumber'+insurancePaymentDetailCount);
		
		row.find('[id^=insuranceccexpirymonth]').attr('id','insuranceccexpirymonth'+paymentDetailCount);
		row.find('[id^=insuranceccexpiryyear]').attr('id','insuranceccexpiryyear'+paymentDetailCount);

		row.find('[id^=insuranceccpaymentdate]').attr('id','insuranceccpaymentdate'+insurancePaymentDetailCount);
		row.find('[id^=insuranceauth]').attr('id','insuranceauth'+insurancePaymentDetailCount);
		row.find('[id^=insuranceamount]').attr('id','insuranceamount'+insurancePaymentDetailCount);
		row.find('[id^=tdpaymentdetails]').attr('id','tdpaymentdetails'+insurancePaymentDetailCount)
			.html('<a id="addInsurancePayment" class="redlink">Add</a><a id="deleteInsurancePayment" class="redlink">Delete</a>');
		
		row.find('img').remove();
		
		row.insertAfter('#tblpaymentdetails tr:last');
		
		//Add DatePicker
		$('#insuranceccpaymentdate'+insurancePaymentDetailCount).removeClass('hasDatepick').datepick({yearRange: '2013:+100',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
		
		insurancePaymentDetailCount++;itemInsurancePaymentDetailCounter++; 
	});
	
	$('[id^=deleteInsurancePayment]').live('click',function() {
		if(itemInsurancePaymentDetailCounter>2){
			$(this).closest("tr").remove();
			itemInsurancePaymentDetailCounter--;
		}
	});
	
	
	
	//Updaing amount total amount
	$(".flightamountchange").live('change', function(){
		validateNumericPrice(this);
		updateFlightPaymentTotal();
	});
	function updateFlightPaymentTotal(){
		var totalAir = 0.0;
		//Update Price
		$(".flightamountchange").each(function(){
			totalAir += parseFloat($(this).val());
		});
		$('#tdflightvendortotal').html('CAD$'+totalAir.toFixed(2));
	}
	$(".airccvendorsClass").live('change', function(){
		var selectedAirCCVendor = $('#' + this.id + ' option:selected').val();
		var selectedVal = 0.0;
		if(selectedAirCCVendor.length > 0){
			selectedVal = selectedairvendorPrice[selectedAirCCVendor];
		}
		var row = $(this).parent().parent();
		row.find('[id^=airamount]').val(parseFloat(selectedVal).toFixed(2));
		updateFlightPaymentTotal();
	});
	$(".insuranceamountchange").live('change', function(){
		validateNumericPrice(this);
		
		var totalAir = 0.0;
		//Update Price
		$(".insuranceamountchange").each(function(){
			totalAir += parseFloat($(this).val());
		});
		$('#tdinsurancevendortotal').html('CAD$'+totalAir.toFixed(2));
	});
	
	$('.changecouponrefund').live('change',function(){
		var row = $(this).parent().parent();
		if($(this).val() != ''){
			var selectedCoupon = $(this).val();
			for(var i = 0;i<couponcodes.length;i++){
				if(selectedCoupon == couponcodes[i][0]){
					row.find('[name=couponrefundamount]').val(couponcodes[i][1]);
					row.find('[id=tdcouponrefundamount]').html(couponcodes[i][1]);
					break;
				}
			}
		}else{
			row.find('[name=couponrefundamount]').val(0);
			row.find('[id=tdcouponrefundamount]').html(0);
		}
		updateCouponRefundTotal();
	});
	function updateCouponRefundTotal(){
		var total=0.0;
		$('[id^=tdcouponrefundamount]').each(function(){
			total = total + parseFloat($(this).html());
		});
		$('#couponrefundtotal').html('CAD $'+total);
	}
});
	
/**
 * Populates Spend PDP Passenger information based on Use and Don't User
 */
function populatePaymentDetail(){
	//Hide-show Air and Insurance Payment details
	if(selectedairvendors.length==0){
		$('#tdflightheader').css('display','none');
		$('#trairpaymentdetail1').css('display','none');
	}else{
		$('#tdflightheader').css('display','table-row');
		$('#trairpaymentdetail1').css('display','table-row');
	}
	
	if(selectedinsvendors.length==0){
		$('#trinsurance').css('display','none');
		$('#trinsurancepaymentdetail1').css('display','none');
	}else{
		$('#trinsurance').css('display','table-row');
		$('#trinsurancepaymentdetail1').css('display','table-row');
	}
	
	var header = false;
	var i =1;
	var pdpTotal = 0.0;
	$("[id^=pdpused]:checked").each(function(){
		var spendPDProw = $(this).parent().parent();
		i++;
		var row = $('#tdspendpdptemplate').clone();
		row.css('display','table-row');
		
		row.attr('id','tdpdpPassenger'+i);
		
		row.find('#tdpdppassengername').attr('id','tdpdppassengername' + i).html(spendPDProw.find("[id^=pdppassenger]").html());
		
		row.find('[id^=pdpmerchant]').attr('id','pdpmerchant'+i);
		row.find('[id^=pdpcctype]').attr('id','pdpcctype'+i);
		
		row.find('[id^=pdpcccardfirstname]').attr('id','pdpcccardfirstname'+i);
		row.find('[id^=pdpcccardlastname]').attr('id','pdpcccardlastname'+i);
		row.find('[id^=pdpccnumber]').attr('id','pdpccnumber'+i);
		
		row.find('[id^=pdpccexpirymonth]').attr('id','pdpccexpirymonth'+i);
		row.find('[id^=pdpccexpiryyear]').attr('id','pdpccexpiryyear'+i);

		row.find('[id^=pdpccpaymentdate]').attr('id','pdpccpaymentdate'+i);
		row.find('[id^=pdpauth]').attr('id','pdpauth'+i);
		pdpTotal += parseFloat(spendPDProw.find("[id^=pdpmaxdollar]").html());
		row.find('[id^=pdpamount]').attr('id','pdpamount'+i).val(spendPDProw.find("[id^=pdpmaxdollar]").html());
		
		row.find('#tdspendpassenderamount1').attr('id','tdspendpassenderamount' + i).html(spendPDProw.find("[id^=pdpmaxdollar]").html());
		
		row.find('[id^=rfnpdppassengerids]').attr('id','rfnpdppassengerids' + i).val(spendPDProw.find("[id^=spendpdppassengerid]").val());
		row.find('[id^=pdppassengername]').attr('id','pdppassengername' + i).val($(spendPDProw.find("[id^=pdppassenger]").html()));
		header = true;
		row.insertAfter('#tblrefundpaymentdetail tr:last');
		
		$('#pdpccpaymentdate'+i).datepick({yearRange: '2013:+100',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
				
	});
	
	$('#tdpdppassengertotal').html('CAD$' + pdpTotal);
	
	if(header){
		$('#trspendpdptemplateheader').css('display','table-row');
	}
}
function populateCouponRefund(){
	if($('[class^=appliedcoupontr]').length > 0){
		var row = $('#couponrefundtr1');
		couponcodes = new Array($('[class=appliedcoupontr]').length);
		var coupon = [];
		var i=0;
		$('.appliedcoupontr').each(function(){
			couponcodes[i] = [];
			coupon = ($(this).find('[id=promocodedetails]').html()).split("-");
			couponcodes[i].push(coupon[0].trim());
			if((coupon[2].trim())=="PER PASSENGER"){
				couponcodes[i].push(parseFloat($(this).find('[class=couponamount]').html()) * parseFloat($('#totalpassengers').html()));
			}else{
				couponcodes[i].push($(this).find('[class=prmocodefullamount]').html());
			}
			i++;
		});
		var coupondropdown = row.find('[id=couponrefundcccode1]');
		$(coupondropdown).empty();
		$(coupondropdown).append('<option value="" >--Select--</option>');
		for(var j=0;j<couponcodes.length;j++){
			$(coupondropdown).append('<option value="'+ couponcodes[j][0] +'" >'+ couponcodes[j][0] +'</option>');
		}
		$('#couponccrefunddate1').datepick({yearRange: '2013:+100',showTrigger:'<img src="resources/images/calendar.gif" class="trigger">'});
		row.css('display','table-row');
		$('#trpromototal').css('display','table-row');
	}
}
/** GDS related functions **/
function getFlightSegmentsFromGDS(){
	$('.vendor').each(function(){
		if($(this).val()=='C8'){
			var pnr = $(this).parent().parent().find('[id^=locator]').val();
			if(gdsDataLocatorwise[pnr] == undefined){
				AsyncService.getGDSSegmentDetails(pnr,{
					callback : function(data){populateSegmentArray(data,pnr);},
					async: false,
					errorHandler : gdsError
				});
			}else if(gdsDataLocatorwise [pnr][0]['error'] == 'yes'){
				alert("There was an error in retrieving details from GDS for PNR \""+ pnr.toUpperCase() +"\".\nPlease enter the fields manually. Sorry for the inconvenience.");
			}
		}
	});
}
function populateSegmentArray(data,pnr){
	gdsDataLocatorwise [pnr] = JSON.parse(data);
	if(gdsDataLocatorwise [pnr][0]['error'] == 'yes'){
		alert("There was an error in retrieving details from GDS for PNR \""+ pnr.toUpperCase() +"\".\nPlease enter the fields manually. Sorry for the inconvenience.");
	}
}
function gdsError(){
	alert("Error while calling GDS Service.");
	isGDSError = true;
} 

/**
 * Validated Booking detail section
 * 
 * @returns {Boolean}
 */
function validateBookingDetail(){
	var validate = true;
	var insurance = false;
	
	//Check for input vendor type, vendor and Locator
	$('[id^="typevendor"]').each(function(){
		if($(this).prop("selectedIndex")==0){
			alert('Please select vendor type.');
			$(this).focus();
			validate=false;
			return validate;
		}
		if($(this).prop("selectedIndex")==2){
			insurance=true;
		}
	});
	if(!validate) return validate;
	
	$('.vendor').each(function(){
		if($(this).val()==''){
			alert('Please select vendor.');
			$(this).focus();
			validate=false;
			return validate;
		}
	});
	if(!validate) return validate;
	
	$('[id^="subvendor"]').each(function(){
		if($(this).parent().attr("style")!='visibility: hidden;'){
			if($(this).prop("selectedIndex")==0){
				alert('Please select subvendor.');
				$(this).focus();
				validate=false;
				return validate;
			}
		}
	});
	if(!validate) return validate;
	
	$('[id^="locator"]').each(function(){
		if($(this).val()==""){
			alert('Please enter vendor locator/policy.');
			$(this).focus();
			validate=false;
			return validate;
		}
	});
	if(!validate) return validate;
	
	
	//Check for duplicate vendor Input
	$('[id^="locator"]').each(function() {
	    var $current = $(this);
	    $('[id^="locator"]').each(function() {
	        if ($(this).val() == $current.val() && $(this).attr('id') != $current.attr('id'))
	        {
	            alert('There seems to be duplication in Vendor name. Please chose another vendor');
	            $(this).focus();
	            validate=false;
	            return validate;
	        }
	    });
	    if(!validate) return validate;
	  });
	 if(!validate) return validate;
	
	//check for insurance accepted or declined
	var insuranceaccepted = $('input[name=insurance]:checked').val();
	if(typeof insuranceaccepted =='undefined'){
		alert('Please select the insurance value.');
		$('#insuranceaccepted').focus();
		return false;
	}else if(insuranceaccepted == 'accepted' && !insurance){
		alert('Please enter the Insurance vendor details or deselect “Accepted” for Insurance.');
		$('#insuranceaccepted').focus();
		return false;
	}else if(insuranceaccepted == 'declined' && insurance){
		alert('Please remove the Insurance vendor details or deselect “Declined” for Insurance.');
		$('#insuranceaccepted').focus();
		return false;
		
	}
	
	return validate;
}

function validateContactDetail(){
		if($('#contactDetailFirstName').val().trim().length <= 0){
			alert('Please Enter The First Name');
			$('#contactDetailFirstName').val($('#contactDetailFirstName').val().trim());
			$('#contactDetailFirstName').focus();
			return false;
		}
		if(NAME_PATTERN.test($('#contactDetailFirstName').val()) == true){
			$('#contactDetailFirstName').focus();
			alert("Contact Detail First Name is invalid.");
			return false;
		}
		if($('#contactDetailLastName').val().trim().length <= 0){
			alert('Please Enter The Last Name');
			$('#contactDetailLastName').val($('#contactDetailLastName').val().trim());
			$('#contactDetailLastName').focus();
			return false;
		}
		if(NAME_PATTERN.test($('#contactDetailLastName').val()) == true){
			$('#contactDetailLastName').focus();
			alert("Contact Detail Last Name is invalid.");
			return false;
		}
		if($('#contactDetailAddress').val().length <= 0){
			alert('Please Enter The Address');
			$('#contactDetailAddress').focus();
			return false;
		}
		if($('#contactDetailPrimaryEmail').val().length <= 0){
			alert('Please Enter The Email(main)');
			$('#contactDetailPrimaryEmail').focus();
			return false;
		}
		primaryEmail = validateEmail('contactDetailPrimaryEmail');
		if(!primaryEmail){
			return false;
		}
		if($('#contactDetailSecondaryEmail').val().length > 0){
			primaryEmail = validateEmail('contactDetailSecondaryEmail');
		}
		
		if(!primaryEmail){
			return false;
		}
		
		var length = $('#contactDetailHomePhoneAreaCode').val().length + $('#contactDetailHomePhoneCityCode').val().length + $('#contactDetailHomePhoneNumber').val().length;
		if(length == 0){
			alert("Please Enter The Home Phone Number");
			return false;
		}else if(length > 0 && length <= 9 ){
			alert("Please Enter minimum 10 digit for Home Phone Number");
			$('#contactDetailHomePhoneAreaCode').focus();
			return false;
		}
		
		length = $('#contactDetailBusinessPhoneAreaCode').val().length + $('#contactDetailBusinessPhoneCityCode').val().length + $('#contactDetailBusinessPhoneNumber').val().length; 
		
		if(length > 0 && length <= 9 ){
			alert("Please Enter minimum 10 digit for Business Phone Number");
			$('#contactDetailBusinessPhoneNumber').focus();
			return false;
		}
		length = $('#contactDetailCellPhoneAreaCode').val().length + $('#contactDetailCellPhoneCityCode').val().length + $('#contactDetailCellPhoneNumber').val().length;
		if(length > 0 && length <= 9 ){
			alert("Please Enter minimum 10 digit for Cell Number");
			$('#contactDetailCellPhoneAreaCode').focus();
			return false;
		}
		
		
		if($('#contactDetailCountryName').val()==""){
			alert('please Select The Country');
			$('#contactDetailCountryName').focus();
			return false;
		}
		
		if($('#contactDetailProvinceName').val()==""){
			alert('please Select Province');
			$('#contactDetailProvinceName').focus();
			return false;
		}
		
		if($('#contactDetailZipCode').val().length <= 0){
			alert('Please Enter Zip Code');
			$('#contactDetailZipCode').focus();
			return false;
		}
		return true;
}


/**
 * Validate Flight Detail
 */
function validateFlightDetails(){
	isflightDetailValidate = true;
	aiportName = "";
	aiportName = $('#flightDetailDeapartCity').val().toUpperCase();
	aiportName =aiportName + "," + $('#flightDetailArriveCity').val().toUpperCase();
	
	if((jQuery.trim($('#flightDetailDeapartCity').val().length) == 0)){
		alert("please Enter Depart City");
		$('#flightDetailDeapartCity').focus();
		return false;
	}
	if((jQuery.trim($('#flightDetailArriveCity').val().length) == 0)){
		alert("please Enter Arrive City");
		$('#flightDetailArriveCity').focus();
		return false;
	}
	
	if(jQuery.trim($('#flightDetailDeapartCity').val()).toUpperCase() ===  jQuery.trim($('#flightDetailArriveCity').val()).toUpperCase()){
		alert("Depart City And Return City Should Not Same.");
		$('#flightDetailArriveCity').val('');
		$('#flightDetailArriveCity').focus();
		return false;
	}
	
	if(($('#flightDetailDepartDate').val().length) == 0){
		alert("please Enter Depart Date");
		$('#flightDetailDepartDate').focus();
		return false;
	}
	
	if(($('#flightDetailReturndate').val().length) == 0 && !($('#flightDetailTripType').val()=='OneWay')){
		alert("please Enter Return Date");
		$('#flightDetailReturndate').focus();
		return false;
	}
	
	if (!($('#flightDetailReturndate').val().length == 0) && Date.parse($('#flightDetailDepartDate').val()) > Date.parse($('#flightDetailReturndate').val())) {
		alert("Please note the Return Date cannot be less than the"+
		" Departure date, please correct and then continue");
		$('#flightDetailReturndate').focus();
	    return false;
	} 

	var valid = true;
	
		var outBoundCheck = false;
		var returnCheck = false;
		
		for (var i=0;i <= maxClone ;i++){
			if(i == 0){i="";}
			else{
				i=i*10;
			}
			
			$('#tmpltFlightinnerdtls'+i+' select').each(function() {
				if(this.id.indexOf("dynamicVendorDropDown") == 0 && ($(this).val()=="")){
					alert('Please Select The Vendor');
					$(this).focus();
					valid = false;
					return valid;
				}
			});
			if(!valid){
				return false;
			}
			$('#tblFlightDetail'+i+' input, select').each(function() {
				if(this.id.indexOf("flightDetailFlightNumber") == 0 && ($(this).val().length==0)){
					alert("please Enter Flight Number");
					$(this).focus();
					valid = false;
					return valid;
				}
				if(this.id.indexOf("flightDetailDepartDateSegment") == 0 && ($(this).val().length==0)){
					alert("please Enter Deaprt Date");
					$(this).focus();
					valid = false;
					return valid;
				}
				
				if(this.id.indexOf("flightDetailDeaprtCity") == 0 && ($(this).val().length==0)){
					alert("please Enter Depart City");
					$(this).focus();
					valid = false;
					return valid;
				}else if(this.id.indexOf("flightDetailDeaprtCity") == 0){
					aiportName = aiportName + "," + $(this).val().toUpperCase();
				}
				
				if(this.id.indexOf("flightDetailArvCity") == 0 && ($(this).val().length==0)){
					alert("please Enter Arrive City");
					$(this).focus();
					valid = false;
					return valid;
				}else if(this.id.indexOf("flightDetailArvCity") == 0){
					var substr = this.id.substring(19);
					if($(this).val().toUpperCase() == $('#flightDetailDeaprtCity'+substr).val().toUpperCase() ){
						alert("Deaprt City And Arrive City Is Same.");
						$(this).focus();
						valid = false;
						return valid;
					}else{
						aiportName = aiportName + "," + $(this).val().toUpperCase();
					}
				}
				
				if(this.id.indexOf("flightDetailArriveDateSegment") == 0 && ($(this).val().length==0)){
					alert("please Enter Arrive Date");
					$(this).focus();
					valid = false;
					return valid;
				}else if(this.id.indexOf("flightDetailArriveDateSegment") == 0){
					var substr = this.id.substring(29);
					if (Date.parse($(this).val()) < Date.parse($('#flightDetailDepartDateSegment'+substr).val())) {
						alert("Arrive Date Not Less Than Depart Date");
						$(this).focus();
						valid = false;
						return valid;
					} 
				}
				
				if($('#flightDetailTripType').val() != "OneWay"){
					if(this.id.indexOf("tripTypeO") == 0 && ($(this).is(":checked")) && !outBoundCheck){
						outBoundCheck = true;
					}
					if(this.id.indexOf("tripTypeR") == 0 && ($(this).is(":checked")) && !returnCheck){
						returnCheck = true;
					}
				}
			});
			if(!valid){
				return false;
			}
		}
		if($('#flightDetailTripType').val() != "OneWay"){
			if(!(outBoundCheck && returnCheck)){
				alert('All Segment Are Of Same Type Journey(Outbound/Return)');
				return false;
			}
		}
	return true;
}






/**
 * Validating Passenger Details 
 * @returns {Boolean}
 */
function validatePassengerDetails(){
	var validate=true;
	var ageValidationMessage = "";
	var firstName="";
	var lastName="";
	var passangerType = "";
	
	$('#tblpassengerdetails input, #tblpassengerdetails select').each(function(){
		
		if(this.id.indexOf("passengertype") == 0){
			passangerType=$(this).val();
		}
		
	    if(this.id.indexOf("passengerfirstname") == 0 && ($(this).val().trim().length==0 || NAME_PATTERN.test($(this).val()) == true)){
	    	alert('Please enter Valid passenger first name');
	    	$(this).val($(this).val().trim());
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }else if(this.id.indexOf("passengerfirstname") == 0){
	    	firstName=$(this).val();
	    }
	    if(this.id.indexOf("passengermiddlename") == 0 && (NAME_PATTERN.test($(this).val()) == true)){
	    	alert('Please enter Valid passenger middle name');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("passengerlastname") == 0 && ($(this).val().trim().length==0 || NAME_PATTERN.test($(this).val()) == true)){
	    	alert('Please enter Valid passenger last name');
	    	$(this).val($(this).val().trim());
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }else if(this.id.indexOf("passengerlastname") == 0){
	    	lastName=$(this).val();
	    }
	    
	    if(this.id.indexOf("dateofbirth") == 0 && $(this).val().length==0){
	    	alert('Please enter Date Of Birth');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("dateofbirth") == 0){
	    	if(passangerType != checkPassangerType($(this).val())){
	    		if(ageValidationMessage == ""){
	    			ageValidationMessage = "The Age And Pax Type Don't Match For Passanger(s.)\n";
	    		}
	    		ageValidationMessage+=firstName+",";
	    		ageValidationMessage+=lastName+"\n";
	    	}
	    }
	    
	    if($('#TRAirCanadaTicket').css('display') != 'none' && this.id.indexOf("airCanadaTicket1") == 0 && $(this).val().length==0){
	    	alert('Please enter Ticket Number');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	});
	
	if(ageValidationMessage != "" && validate){
		validate = confirm(ageValidationMessage+'Do You Still Want To Continue ?');
	}
	return validate;
}

function  getJconfirmResult(ageValidationMessage){
	var returnValue = false;
	jConfirm(ageValidationMessage+'Do You Want To Change The Pax Type ?', 'Please Confirm ...',function(result) {
		alert(result);
	    if (result) {                    
	    	returnValue = false;
	    }else{
	    	returnValue = true;
	    }  
	});
	return returnValue;
}

function checkPassangerType(dateOfBirth){
	var age = Math.floor((new Date()- new Date(dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));
	if(age > 16){
		return "Adult";
	}else if(age >= 2 && age <= 16){
		return "Child";
	}else if(age < 2){
		return "Infant";
	}
}

/**
 * Validates Payment detail section
 * @returns {Boolean}
 */
function validatePaymentDetails(){
	var curDate = new Date();
	var validate=true;
	$('#trpaymentdetails input, select').each(function(){
	if(selectedairvendors.length>0){
	    if(this.id.indexOf("airccvendors") == 0 && $(this).prop("selectedIndex")==0){
	    	alert('Please select flight vendor');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("airmerchant") == 0 && $(this).prop("selectedIndex")==0){
	    	alert('Please select payment merchant');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("aircctype") == 0  && $(this).prop("selectedIndex")==0){
	    	alert('Please select creadit card type');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	     
	    if(this.id.indexOf("aircccardfirstname") == 0 && ($(this).val().trim().length==0 || NAME_PATTERN.test($(this).val()) == true)){
	    	alert('Please enter valid credit card holder first name');
	    	$(this).val($(this).val().trim());
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("aircccardlastname") == 0 && ($(this).val().trim().length==0 || NAME_PATTERN.test($(this).val()) == true)){
	    	alert('Please enter valid credit card holder last name');
	    	$(this).val($(this).val().trim());
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("airccnumber") == 0 && ($(this).val().length==0 || (/[^0-9]/.test($(this).val()) == true) || $(this).val().length < 16)){
	    	$(this).focus();
	    	validate=false;
	    	if($(this).val().length==0){
	    		alert('Please enter credit card number');
	    		return validate;
	    	}
	    	if(/[^0-9]/.test($(this).val()) == true || $(this).val().length < 16){
	    		alert("Credit Card Number is invalid.");
	    		return validate;
	    	}
	    	return validate;
	    }
	    
	    if(this.id.indexOf("airccpaymentdate") == 0 && $(this).val().length==0){
	    	alert('Please enter credit card payment date');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("airamount") == 0  && $(this).val().length==0){
	    	alert('Please enter amount.');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }else if(this.id.indexOf("airamount") == 0 && !$(this).val().match(/^[0-9]{1,6}(\.[0-9]{0,2})?$/)){
	    	alert('Please enter prorper amount.');
	    }
	    if(this.id.indexOf("airccexpiryyear") == 0 &&  $(this).val()==curDate.getFullYear()){	    	
	    	var month = $('#airccexpirymonth' + this.id.substring(15)).prop("selectedIndex");	    	
	    	if(month<curDate.getMonth()){
	    		alert('The date has already passed and the card is expired');
	    		$(this).focus();
		    	validate=false;
		    	return validate;
	    	}	    		
	    }	    
	}
	
	if(selectedinsvendors.length>0 && validate){
	    //Insurance Vendors validation
	    if(this.id.indexOf("insuranceccvendors") == 0 && $(this).prop("selectedIndex")==0){
	    	alert('Please select insurance vendor');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }	    

	    if(this.id.indexOf("insurancecctype") == 0  && $(this).prop("selectedIndex")==0){
	    	alert('Please select creadit card type');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("insurancecccardfirstname") == 0 && ($(this).val().trim().length==0 || NAME_PATTERN.test($(this).val()) == true)){
	    	alert('Please enter credit card holder first name');
	    	$(this).val($(this).val().trim());
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("insurancecccardlastname") == 0 && ($(this).val().trim().length==0 || NAME_PATTERN.test($(this).val()) == true)){
	    	alert('Please enter credit card holder last name');
	    	$(this).val($(this).val().trim());
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("insuranceccnumber") == 0 && ($(this).val().length==0 || (/[^0-9]/.test($(this).val()) == true) || $(this).val().length < 16)){
	    	$(this).focus();
	    	validate=false;
	    	if($(this).val().length==0){
	    		alert('Please enter credit card number');
	    		return validate;
	    	}
	    	if(/[^0-9]/.test($(this).val()) == true || $(this).val().length < 16){
	    		alert("Credit Card Number is invalid.");
	    		return validate;
	    	}
	    	return validate;
	    }
	    
	    if(this.id.indexOf("insuranceccpaymentdate") == 0 && $(this).val().length==0){
	    	alert('Please enter credit card payment date');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("insuranceamount") == 0  && $(this).val().length==0){
	    	alert('Please enter amount.');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("insuranceccexpiryyear") == 0 && $(this).val()==curDate.getFullYear()){
	    	var month = $('#insuranceccexpirymonth' + this.id.substring(21)).prop("selectedIndex");	    	
	    	if(month<curDate.getMonth()){
	    		alert('The date has already passed and the card is expired');
	    		$(this).focus();
		    	validate=false;
		    	return validate;
	    	}	    		
	    }	
	}
	
	//Validate Coupon/Promo Code
	if(typeof $(this).parent().parent() === undefined || $(this).parent().parent().css("display") != "none"){
	    if(this.id.indexOf("couponrefundcctype") == 0  && $(this).prop("selectedIndex")==0){
	    	alert('Please select creadit card type');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("couponrefundcccardfirstname") == 0 && ($(this).val().trim().length==0 || NAME_PATTERN.test($(this).val()) == true)){
	    	alert('Please enter credit card holder first name');
	    	$(this).val($(this).val().trim());
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("couponrefundcccardlastname") == 0 && ($(this).val().trim().length==0 || NAME_PATTERN.test($(this).val()) == true)){
	    	alert('Please enter credit card holder last name');
	    	$(this).val($(this).val().trim());
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("couponrefundccnumber") == 0 && ($(this).val().length==0 || (/[^0-9]/.test($(this).val()) == true) || $(this).val().length < 16)){
	    	$(this).focus();
	    	validate=false;
	    	if($(this).val().length==0){
	    		alert('Please enter credit card number');
	    		return validate;
	    	}
	    	if(/[^0-9]/.test($(this).val()) == true || $(this).val().length < 16){
	    		alert("Credit Card Number is invalid.");
	    		return validate;
	    	}
	    	return validate;
	    }
	    
	    if(this.id.indexOf("couponccrefunddate") == 0 && $(this).val().length==0){
	    	alert('Please enter credit card payment date');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("couponrefundamount") == 0  && $(this).val().length==0){
	    	alert('Please enter amount.');
	    	$(this).focus();
	    	validate=false;
	    	return validate;
	    }
	    
	    if(this.id.indexOf("couponrefundccexpiryyear") == 0 && $(this).val()==curDate.getFullYear()){
	    	var month = $('#couponrefundccexpirymonth' + this.id.substring(24)).prop("selectedIndex");	    	
	    	if(month<curDate.getMonth()){
	    		alert('The date has already passed and the card is expired');
	    		$(this).focus();
		    	validate=false;
		    	return validate;
	    	}	    		
	    }
	}
	
	
	if($("[id^=pdpused]:checked").length >0 && validate){
	    //Spend PDP Passenger Validation   .css("display") == "none"; 
		if(typeof $(this).parent().parent() === undefined || $(this).parent().parent().css("display") != "none"){
		    if(this.id.indexOf("pdpcctype") == 0  && $(this).prop("selectedIndex")==0){
		    	alert('Please select creadit card type');
		    	$(this).focus();
		    	validate=false;
		    	return validate;
		    }
		    
		    if(this.id.indexOf("pdpcccardfirstname") == 0 && ($(this).val().trim().length==0 || NAME_PATTERN.test($(this).val()) == true)){
		    	alert('Please enter credit card holder first name');
		    	$(this).val($(this).val().trim());
		    	$(this).focus();
		    	validate=false;
		    	return validate;
		    }
		    
		    if(this.id.indexOf("pdpcccardlastname") == 0 && ($(this).val().trim().length==0 || NAME_PATTERN.test($(this).val()) == true)){
		    	alert('Please enter credit card holder last name');
		    	$(this).val($(this).val().trim());
		    	$(this).focus();
		    	validate=false;
		    	return validate;
		    }
		    
		    if(this.id.indexOf("pdpccnumber") == 0 && ($(this).val().length==0 || (/[^0-9]/.test($(this).val()) == true) || $(this).val().length < 16)){
		    	$(this).focus();
		    	validate=false;
		    	if($(this).val().length==0){
		    		alert('Please enter credit card number');
		    		return validate;
		    	}
		    	if(/[^0-9]/.test($(this).val()) == true || $(this).val().length < 16){
		    		alert("Credit Card Number is invalid.");
		    		return validate;
		    	}
		    	return validate;
		    }
		    
		    if(this.id.indexOf("pdpccpaymentdate") == 0 && $(this).val().length==0){
		    	alert('Please enter credit card payment date');
		    	$(this).focus();
		    	validate=false;
		    	return validate;
		    }
		    
		    if(this.id.indexOf("pdpamount") == 0  && $(this).val().length==0){
		    	alert('Please enter amount.');
		    	$(this).focus();
		    	validate=false;
		    	return validate;
		    }
		    
		    if(this.id.indexOf("pdpccexpiryyear") == 0 && $(this).val()==curDate.getFullYear()){
		    	var month = $('#pdpccexpirymonth' + this.id.substring(24)).prop("selectedIndex");	    	
		    	if(month<curDate.getMonth()){
		    		alert('The date has already passed and the card is expired');
		    		$(this).focus();
			    	validate=false;
			    	return validate;
		    	}	    		
		    }
		}
	}
	});
	return validate;
}

//validate Number Allow Only Numbers and control key
$(document).ready(function(){
	$(".numeric").keypress(function(event) {
	  var controlKeys = [8, 9, 13, 35, 36, 37, 39];
	  var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
	  if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
	      (49 <= event.which && event.which <= 57) || // Always 1 through 9
	      (48 == event.which && $(this).attr("value")) || // No 0 first digit
	      isControlKey) { // Opera assigns values for control keys.
	    return;
	  } else {
	    event.preventDefault();
	  }
	});	
	
});


//validate Email
function validateEmail(elementId){
	var sEmail = $('#'+elementId).val();
	if($.trim(sEmail).length>0){
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (filter.test(sEmail)) {
			return true;
		}
		else {
			alert("Please enter a valid email address");
			$('#'+elementId).focus();
			return false;
		}
	}else{
		return true;
	}
}

function getContactPassengers(){
	var email = $('#mailContactEmail').val().trim();
	
	if($.trim(email).length <= 3 || !EMAIL_PATTERN.test(email)){
		alert("Please enter a valid email address");
		$('#mailContactEmail').focus();
		return false;
	}
	
	$('#mailContactEmail').val(email);
	AsyncService.getContactPassengers(email,{
		callback : contactPassengerData,
		errorHandler : handleAddError
	});
}

function contactPassengerData(data){
	if(data.length>0){
		subtraveller = {};
		var contact=JSON.parse(data);

		//Clear Contact Details before load
		$('#tblinnerContactDetails input').each(function(){
			$(this).val('');
		});
		
		$('#tblinnerContactDetails select').each(function(){
			$(this).get(0).selectedIndex = 0;
		});
		
		//Clear passenger details before load
		 $('#tblpassengerdetails input[type=text]').each(function(){
			 $(this).val('');
		 });		 
		 
		 $('#tblpassengerdetails select').each(function(){
			 $(this).get(0).selectedIndex = 0;
			 if(this.id.indexOf('bookingpassengers')==0){
				 $(this).children('option:not(:first)').remove();
			 }
		 });
		 
		 $('#tblpassengerdetails').find("[id^='pdpamount']").val(0.0);
		 $('#tblpassengerdetails').find("[id^='dvpdpinfo']").hide();
		 $('#tblpassengerdetails').find("[id^='pdpprice']").html('');
		 
		 $("#tblpassengerdetails").find("tr:gt(5)").remove();
		 passengerCount=2;
		 itemPassengerCounter=2;
		 
		 var addRow = '<tr id="trlastaddpassenger"><td align="right" colspan="11"><a href="#" id="addpassenger" name="addpassenger" class="red_txt" style="padding-left: 110px;">Add</a>&nbsp;&nbsp;	</td></tr>';
		 $(addRow).appendTo("#tblpassengerdetails");
		
			 
		if(contact.hasOwnProperty('error')){
			alert('No Profile found for '+$('#mailContactEmail').val() + '\n\nPress Ok to proceed.');
			return;
		}
		
		$('#contactDetailFirstName').val(contact["firstName"]);
		$('#contactDetailLastName').val(contact["lastName"]);
		
		if(contact.hasOwnProperty('mainEmail')) $('#contactDetailPrimaryEmail').val(contact["mainEmail"]);
		if(contact.hasOwnProperty('alternateEmail')) $('#contactDetailSecondaryEmail').val(contact["alternateEmail"]);
		
		if(contact.hasOwnProperty('address')) $('#contactDetailAddress').val(contact["address"]);
		
		if(contact.hasOwnProperty('homePhone') && JSON.stringify(contact['homePhone']).length > 6){
			var homePhone = JSON.stringify(contact['homePhone']).replace(/"/g, '');
			$('#contactDetailHomePhoneAreaCode').val(homePhone.substring(0,3));
			$('#contactDetailHomePhoneCityCode').val(homePhone.substring(3,6));
			$('#contactDetailHomePhoneNumber').val(homePhone.substring(6));
		}
		
		if(contact.hasOwnProperty('country')) {
			$("#contactDetailCountryName").val(contact["country"]);
			getProvinceList();
		}		
		
		if(contact.hasOwnProperty('state') && contact["state"].length>0){
			if(contact["state"]=='xx' || contact["state"]=='XX'){				
				$("#contactDetailProvinceName").get(0).selectedIndex = 1;
			}else{
				$("#contactDetailProvinceName").val(contact["state"]);
			}
		}
		if(contact.hasOwnProperty('city')) $('#contactDetailCityName').val(contact["city"]);
		if(contact.hasOwnProperty('postal')) $('#contactDetailZipCode').val(contact["postal"]);
		
		var data = contact["subtravellers"];		
		if(data.length>0){
			var passengerArray = JSON.stringify(data).replace('[', '').replace(']', '').replace(/"/g, '');
			passengers = passengerArray.split(',');
			
			$("#bookingpassengers1").empty();
			 $("#bookingpassengers1").append('<option value="">Enter New Passenger</option>');
			for(var count=0;count<passengers.length;count++){
				var passenger = passengers[count].split("|");
				$("#bookingpassengers1").append('<option value="'+ passenger[0] +'" >'+passenger[1]+'</option>');
			}
		}
		
		//$('#mailContactEmail').attr('disabled',true);
	}
}

//dwr code for getting province 
function getProvinceList(){
	var countryCode = $('#contactDetailCountryName').val();
	if(countryCode!="" && countryCode.length>0){	
		AsyncService.getProvinceOfCountryByCode(countryCode,{
			 async: false,
			callback : provinceResultData,
			errorHandler : handleAddError
		});
	}else{
		//Clear Province List
		$('#contactDetailProvinceName').empty();
		$('#contactDetailProvinceName').append('<option value="" >Select Country</option>');
	}
}

function provinceResultData(data) {
	$('#contactDetailProvinceName option').each(function(index, option) {
		if(index != 0 ){
	    $(option).remove();
		}
	});
	for(var i=0;i<data.length;i++) {
		var province = data[i].split("|");
			document.getElementById("contactDetailProvinceName").options[i+1] = new Option(province[0], province[1]);
	}
}

//common Handle Error
function handleAddError() {
	  alert("We can't add those values!");
}

function populateSpendPDP(){
	$('[id^=pdpamount]').each(function(){
		pdppassengeramounts.push(this.value);
	});
	for(var i=0;i<firstnames.length;i++){
		var row = $('#templatepdpPassenger').clone();
		row.css('display','table-row');
		row.attr('id','trpdppassenger'+i).attr('class','rgt-btm ' +passengerTypes[i]+ 'spendpdptr');
		
		row.find("[id^='pdpused']").attr('id','pdpused'+i).attr('name','pdppassenger' +i);
		row.find("[id^='pdpnotused']").attr('id','pdpnotused'+i).attr('name','pdppassenger' +i).attr('checked','checked');
		
		row.find("[id^='spendpdppassengerid']").attr('id','spendpdppassengerid'+i).val(contactPassengerIds[i]);
		
		row.find("[id^='pdppassenger']").attr('id','pdppassenger' + i).html(firstnames[i] + ' ' + lastnames[i]);
		row.find("[id^='pdpdollaravailable']").attr('id','pdpdollaravailable' + i).html(parseFloat(pdppassengeramounts[i]).toFixed(2));
		row.find("[id^='pdpmaxdollar']").attr('id','pdpmaxdollar' + i);
		
		row.find("[id^='pdpused']").attr('disabled',true);
		
		row.insertAfter('#tblspendpdpdetails tr:last');
	}
}

function populatePassengers(){
	firstnames = [];
	$('[id^=passengerfirstname]').each(function(){
		firstnames.push(this.value);
	});
	lastnames = [];
	$('[id^=passengerlastname]').each(function(){
		lastnames.push(this.value);
	});
	passengerids = [];
	$('[id^=passengerid]').each(function(){
		passengerids.push(this.value);
	});
	contactPassengerIds=[];
	$('[id^=bookingpassenger]').each(function(){
		contactPassengerIds.push(this.value);
	});
	
	passengerTypes = [];
	$('[id^=passengertype]').each(function(){
		passengerTypes.push($(this).val());
	});
	
	var distinctpaxtypes = $.distinct(passengerTypes);
	distinctpaxtypeswithcount = new Array(distinctpaxtypes.length);
	for(var i=0;i<distinctpaxtypes.length;i++){
		var noofpax=0;
		for(var j=0;j<passengerTypes.length;j++){
			if(passengerTypes[j] == distinctpaxtypes[i]){
				noofpax+=1;
			}
		}
		distinctpaxtypeswithcount[i] =  [];
		distinctpaxtypeswithcount[i].push(distinctpaxtypes[i]);
		distinctpaxtypeswithcount[i].push(noofpax);
	}
}
function populateInsurancePassengers(){
	$('#insuredpassenger1').empty();
	$('#insuredpassenger1').append('<option value="" selected="selected"> -- Select --</option>');
	for(var i=0;i<firstnames.length;i++){
			$('#insuredpassenger1').append('<option value="' + passengerids[i] + '" >' + firstnames[i] + ' ' + lastnames[i] +'</option>');
	}
}
/**
 * Populate air & insurance vendors details
 */
function populateVendors(){
	$('.bookingvendor').each(function(){
		if($('#typevendor'+ this.id.substring(6)+' option:selected').text()=='Flight'){
			var vendorName = $('#' + this.id + ' option:selected').text();
			var subVendorElement = $(this).parent().parent().find('[name=subvendor]').attr('id');
			var subVendorName=$('#'+ subVendorElement + ' option:selected').text();
			if(subVendorName.indexOf('--Select--')<0){
				vendorName  += '-' +  subVendorName;
			}
			
			selectedairvendorval.push($('#' + this.id + ' option:selected').val());
			selectedairvendors.push(vendorName);
			flightLocators.push($('#locator'+ this.id.substring(6)).val());
		}else if($('#typevendor'+ this.id.substring(6)+' option:selected').text()=='Insurance'){
			selectedinsvendorval.push($('#' + this.id + ' option:selected').val());
			selectedinsvendors.push($('#' + this.id + ' option:selected').text());
			insurancelocators.push($('#locator'+ this.id.substring(6)).val());
		}
	});}



/**
 * Populating Insurance Vendors
 */
function populateInsuranceVendor(){
	var vendors = $.distinct(selectedinsvendors);
	var vendorsvals = $.distinct(selectedinsvendorval);
	
	$('#insurancevendor1').empty();
	$('#insurancevendor1').append('<option value="" selected="selected"> -- Select -- </option>');
	
	$('#insuranceccvendors1').empty();
	$('#insuranceccvendors1').append('<option value="" selected="selected"> -- Select -- </option>');
	
	//Populating insurance vendor for Insruance Details Section
	for(var k=0;k<selectedinsvendors.length;k++){
		$('#insurancevendor1').append('<option value="' + selectedinsvendorval[k] + '" >' + selectedinsvendors[k] + ' - ' + insurancelocators[k] +'</option>');
	}
	
	//Populating insurance vendor for Payment Details Section
	for(var k=0;k<vendors.length;k++){
		$('#insuranceccvendors1').append('<option value="' + vendorsvals[k] + '" >' + vendors[k] +'</option>');
	}
}

/**
 * Populating air Vendors 
 */
function populateAirVendor(){
	$('#airccvendors1').empty();
	$('#airccvendors1').append('<option value="" selected="selected"> -- Select -- </option>');
	var totalsf = (parseFloat($('#totalservice').html()) + parseFloat($('#totalsftax').html()));
	if(totalsf > 0){
		selectedairvendorPrice["SF"]= totalsf;
		$('#airccvendors1').append('<option value="SF">Service Fee</option>');
	}
	var priceLocator,pricepaxtype;
	var pselling =0.0,psur=0.0,ptax=0.0,phst=0.0,pqst=0.0,pgst=0.0,total = 0.0;;
	for(var k=0;k<selectedairvendors.length;k++){
		total = 0.0;
		$('.airfarevendor').each(function(){
			parenttr = $(this).parent().parent();
			priceLocator = parenttr.find('[id=airfarelocator]').val();
			pricepaxtype = parenttr.find('[id=airfarepaxtype]').val();
			if(priceLocator == flightLocators[k]){
				for(var j=0;j<distinctpaxtypeswithcount.length;j++){
					if(distinctpaxtypeswithcount[j][0] == pricepaxtype){
						pselling = parseFloat(parenttr.find('[name=vendorSelling]').val());
						psur = parseFloat(parenttr.find('[name=vendorSurcharge]').val());
						ptax = parseFloat(parenttr.find('[name=vendorTax]').val());
						phst = parseFloat(parenttr.find('[name=vendorHst]').val());
						pqst = parseFloat(parenttr.find('[name=vendorQst]').val());
						pgst = parseFloat(parenttr.find('[name=vendorGst]').val());
						total = total + ((pselling+psur+ptax+phst+pqst+pgst) * parseFloat(distinctpaxtypeswithcount[j][1]));
					}
				}
			}
		});
		$('#airccvendors1').append('<option value="' + selectedairvendorval[k] + '" >' + selectedairvendors[k] +'-'+ flightLocators[k]+'</option>');
		selectedairvendorPrice[selectedairvendorval[k]]= total;
	}
}
/*
 * Added For Flight Detail For thwe Getting The All Airline Data
 */
function getAllAirlines() {
	AsyncService.getAllAirlines({
		callback : getAllAirlinesResult,
		errorHandler : handleAddError
	});
}


function getAllAirlinesResult(data) {
	var j = 0; 
	for(var i=0;i<data.length;i++) {
		var airline = data[i].split("|");
		if(!(airline[0] == "Not Available" || airline[0] == "Not Found")){
			document.getElementById("flightDetailAirline").options[i-j] = new Option(airline[0], airline[1]);
		}else{
			j++;
		}
	}
}

/*
 * Reset Functions for all Sections
 */
function resetFirstSection(){
	$("#tdprevious").css('display','none');
	$('#trpassengerdetails input').removeAttr('readonly');
	$('#trpassengerdetails select').removeAttr('disabled');
	enableDisableLink("trpassengerdetails", false);
	firstnames = [];
	lastnames = [];
	passengerTypes = [];
	pdppassengeramounts = [];
	distinctpaxtypeswithcount = [];
	passengerids = [];
	$('#flightDetailReturndate').datepick('option', 'minDate', '');
	$('#flightDetailDepartDate').datepick('option', 'maxDate', '');
	if(selectedairvendors.length > 0){
		resetFlightDetail();
		$('#trflightdetails').css('display','none');
		$('#tmpltFlightinnerdtls').css('display','none');
		$('#manualBookingtbl tr').each(function(){
			var result = /\d+(?:\.\d+)?/.exec(this.id);
			if(result != null){
				$("#tmpltFlightinnerdtls"+result).remove();
			}
		});
		enableDisableLink("trpassengerdetails", false);
	}
	if($('#insuranceaccepted').is(':checked') ){
		resetInsurancePassengerDetails();
		$('#trinsurancepassengerdetails').css('display','none');
	}
//	gdsDataLocatorwise = {};
	selectedairvendors = [];
	selectedairvendorval = [];
	flightLocators= [] ;
	selectedinsvendors = [];
	selectedinsvendorval = [];
	insurancelocators=[];
	enableDisableLink("trbookingdetails", false);
	
	$('#trcontactdetails input').removeAttr('readonly');
	 $('#trcontactdetails select').removeAttr('disabled');
	
	$('#trbookingdetails input').removeAttr('readonly');
	$('#trbookingdetails select').removeAttr('disabled');
	$('#trbookingdetails radio').removeAttr('disabled');
	
	$('#mailContactEmail').attr('disabled',false);
	$('#btngetContact').attr('disabled',false);
	
	$("[id^='dateofbirth']").each(function(){
		 $(this).datepick('enable'); 
	});
}
function resetSecondSection(){
	enableDisableLink("trinsurancepassengerdetails", false);
	resetFareCalculation();
	$('#trfarecalculation').css('display','none');
	couponcodes = [];
	resetSpendPDPPassengers();
	$('#trmanualpdpdetails').css('display','none');
}
function resetThirdSection(){
	enableDisableLink("flightfaredetails", false);
	$('#commentMessage').val("");
	$("#tdcontinue").css('display','table-cell');
	$('#cancelsave').css('display','none');
	$('#trhistoricalnote').css('display','none');
	$('#trcustdtls').css('display','none');
	
	$('#tdflightvendortotal').html('CAD$0.00');
	$('[id^=trairpaymentdetail]').each(function(){
		if($(this).attr('id')!= 'trairpaymentdetail1'){ $(this).remove();}
	});
	
	$('[id^=trinsurancepaymentdetail]').each(function(){
		if($(this).attr('id')!= 'trinsurancepaymentdetail1') {$(this).remove();}
	});
	$('.flightamountchange').val('');
	
	$('#tdflightheader').css('display','table-row');
	$('#trairpaymentdetail1').css('display','table-row');
	$('#trinsurance').css('display','table-row');
	$('#trinsurancepaymentdetail1').css('display','table-row');
	
	$('#trspendpdptemplateheader').css('display','none');
	$('[id^=tdpdpPassenger]').remove();
	
	$('#tblspendpdpdetails input').attr('readonly',false);
	
	selectedairvendorPrice = {};
	$('#trpaymentdetails').css('display','none');
	$('#trfarecalculation input').removeAttr('readonly');
	$('#applyCouponcode').removeAttr('disabled');
	
}
function resetContactDetails(){
	$('#trcontactdetails input').each(function(){
		$(this).val('');
	});
	
	$('#trcontactdetails select').each(function(){
		$(this).get(0).selectedIndex = 0;
	});
}

function resetPassengerDetails(){
	//remove all newly added passengers
	enableDisableLink("trpassengerdetails", false);
	 $("#tblpassengerdetails").find("tr:gt(5)").remove();
	 passengerCount=2;
	 itemPassengerCounter=2;
	 
	 //Reset first passenger details
	 $('#tblpassengerdetails input[type=text]').each(function(){
		 $(this).val('');
	 });
	 var titletypeselect = $('#titletype1');
	 titletypeselect.empty();
	 titletypeselect.append('<option value="Mr" selected="selected">Mr.</option>');
	 titletypeselect.append('<option value="Miss">Miss.</option>');
	 titletypeselect.append('<option value="Mrs">Mrs.</option>');
	 titletypeselect.append('<option value="Ms">Ms.</option>');
	 
	 $('#tblpassengerdetails select').each(function(){
		 $(this).get(0).selectedIndex = 0;
	 });
	 $('#trcontactdetails input').removeAttr('readonly');
	 $('#trcontactdetails select').removeAttr('disabled');
	 $('#dvpdpinfo1').hide();
	 $('#pdpprice1').html('$0.0');
}
function resetFareCalculation(){
	if($('#insuranceaccepted').is(':checked')){
		$('#trinsurancepassengerdetails select').removeAttr('disabled');
		for(var i=0;i<distinctinspaxtypewithcount.length;i++){
			$('#'+distinctinspaxtypewithcount[i][0]+'ins').remove();
		}
		for(var j=0;j<inspassengerid.length;j++){
			$('#'+inspaxType[j]+ 'inspassengertr' +inspassengerid[j]).remove();
		}
		inspassengerid = [];
		inspassengername = [];
		inspolicynumber = [];
		inspaxType = [];
		distinctinspaxtypewithcount = [];
		$('#trinsurancefare').css('display','none');
	}
	for(var i=0;i<distinctpaxtypeswithcount.length;i++){
		$('#'+distinctpaxtypeswithcount[i][0]+'air').remove();
	}
	for(var j=0;j<firstnames.length;j++){
		$('[id^='+passengerTypes[j]+ 'airpassengertr' +passengerids[j]+']').remove();
	}
	$('.appliedcoupontr').remove();
	$('#trflightfare').css('display','none');
}
function resetInsurancePassengerDetails(){
	$("#insurancedetails").find("tr:gt(1)").remove();
	$('#insuredpassenger1').empty();
	$('#insuredpassenger1').append('<option value="" selected="selected"> -- Select --</option>');
	$('#insurancevendor1').empty();
	$('#insurancevendor1').append('<option value="" selected="selected"> -- Select --</option>');
	$('#policycode1').empty();
	$('#policycode1').append('<option value="" selected="selected"> -- Select --</option>');
	$('#inslocator').html("");
}

function resetFlightDetail(){
	$("#flightDetailTripType").prop("disabled", false);
	$('#tblFlightBaseDetail input').each(function(){
		 $(this).val('');
	});
	$('#tblFlightBaseDetail select').each(function(){
		 $(this).get(0).selectedIndex = 0;
	});
	
	
	$('#tdFlightDetailReturnSingleVendorTripType').contents().remove();
	$('#flightDetailReturnSingleVendorLocator').contents().remove();
	//for one vendor return ans multicity
	$("#flightDetailReturnSingleVendorOutBound").find("tr:gt(1)").remove();
	$('#flightDetailReturnSingleVendorOutBound input').each(function(){
		 $(this).val('');
	});
	
	$('#flightDetailReturnSingleVendorOutBound select').each(function(){
		 $(this).get(0).selectedIndex = 0;
	});

	$("#flightDetailReturnSingleVendorInBound").find("tr:gt(1)").remove();
	$('#flightDetailReturnSingleVendorInBound input').each(function(){
		 $(this).val('');
	});
	
	$('#flightDetailReturnSingleVendorInBound select').each(function(){
		 $(this).get(0).selectedIndex = 0;
	});
	
	
	$('[id^=dynamicVendorDropDown]').remove();
	$('#tdFlightDetailTripType').contents().remove();
	$('#tdFlightDetailLocator').contents().remove();
	$('#segmentType').contents().remove();
	$('#tblFlightDetail tr').each(function(){
		var result = /\d+(?:\.\d+)?/.exec(this.id);
		if(result != null){
			$("#tmpltFlightinnerdtls"+result).remove();
		}
	});
	
	$("#tblFlightDetail").find("tr:gt(2)").remove();
	$('#tblFlightDetail input').each(function(){
		$(this).val('');
	});
	 
	$('#tblFlightDetail select').each(function(){
		$(this).get(0).selectedIndex = 0;
	});
}

function resetSpendPDPPassengers(){
	$("#tblspendpdpdetails").find("tr:gt(1)").remove();
}

function resetPaymentDetails(){
	
	$('[id^=trairpaymentdetail]').each(function(){
		if($(this).attr('id')!= 'trairpaymentdetail1'){ $(this).remove();}
	});
	
	$('[id^=trinsurancepaymentdetail]').each(function(){
		if($(this).attr('id')!= 'trinsurancepaymentdetail1') {$(this).remove();}
	});
	
	$('#tdflightheader').css('display','table-row');
	$('#trairpaymentdetail1').css('display','table-row');
	$('#trinsurance').css('display','table-row');
	$('#trinsurancepaymentdetail1').css('display','table-row');
	
	$('#trspendpdptemplateheader').css('display','none');
	$('[id^=tdpdpPassenger]').remove();
	
//	enableDisableLink("trpaymentdetails", false);
}

function validateInsuranceDetails(){
	var validated = true;
	if($('#insuranceaccepted').is(':checked')){
		$('[id^=trinsurancedetails]').each(function(){
			if($(this).find('[name=insuredPassenger]').val()==''){
				alert(insurancemsg);
				$(this).focus();
				validated = false;
				return false;
			}
			if($(this).find('[name=insuranceVendor]').val()==''){
				alert(insurancemsg);
				$(this).focus();
				validated = false;
				return false;
			}
			if($(this).find('[name=policyCode]').val()==''){
				alert(insurancemsg);
				$(this).focus();
				validated = false;
				return false;
			}
		});
	}
	return validated;
}

function validatesAirport(){
	var status= true;
	AsyncService.getSelectedAirLine(aiportName,{
		async:false,
		callback : function showWrongAirport(data){
						if(data != ""){
							alert("The following airport code is not found\n"+data);
							status = false;
						}
						
					},
		errorHandler : handleAddError
	});
	return status;	
}