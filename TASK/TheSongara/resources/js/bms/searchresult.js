/* Hide show agent commission information */
function hideShow() {
	var clickvalue = $("#showhide").val();
	if (clickvalue == "Show Agent") {
		$("#showhide").val("Hide Agent");
		$("#morewidth").width("1720");
		$(".disp").css("display","table-cell");
        $("td#adddisp").addClass("green-bg-tile");
        $("td#adddisp").removeClass("green-bg-tile-radius-rgt");
	} else {
		$("#showhide").val("Show Agent");
		$("#morewidth").width("1262");
		$(".disp").css("display","none");
        $("td#adddisp").removeClass("green-bg-tile");
        $("td#adddisp").addClass("green-bg-tile-radius-rgt");
	}
}
/*Loads agent Commission popup*/
jQuery(document).ready(function ($) {		 	
	$("*[id*='modify']").click(function(){		
	 	var page = "quick";
	 	if(document.URL.indexOf("advance")!=-1){
	 		page="advance";
	 	}

	 	$("#dialog").dialog("open");
        $("#dialog" ).load('agentCommission.htm?id='+$(this).attr("id").substring(6)+'&page='+page).dialog('open');
        //$(".ui-dialog-titlebar").hide();
    	return false;
		
	});
	
	$('#closepopup').click(function($){
		jQuery('#dialog').hide();
		jQuery('#dialog').dialog('close');
		jQuery('.ui-widget-overlay').removeClass('.ui-widget-overlay');
	 	return false;
	});
});

function updateTB(chkBoxObj){
	//alert($('#airCommission').length);
	var chkBoxName = chkBoxObj.name;
	var chkBoxes = document.getElementsByName(chkBoxName);
	var length = chkBoxes.length;
	for(var i=0;i<length;i++){
		if(chkBoxObj == chkBoxes[i]){
			var txtBoxObjs = document.getElementsByName(chkBoxName+"Hid");
			var hidBoxObjs = document.getElementsByName(chkBoxName+"Val");
			var hidChkBoxs = document.getElementsByName(chkBoxName+"Chk");
			if($(chkBoxObj).is(':checked')){
				$(txtBoxObjs[i]).removeAttr("readonly");
				$(txtBoxObjs[i]).focus();
				$(hidChkBoxs[i]).attr("value", "true");
			}else{
				$(txtBoxObjs[i]).attr("readonly", "readonly");
				$(hidChkBoxs[i]).attr("value", "false");
				$(txtBoxObjs[i]).val(hidBoxObjs[i].value);
			}
			break;
		}
	}
}	

var anySelected=false;
function doBlankCheck(objname,formattedName){
	var txtBoxObjs = document.getElementsByName(objname+"Hid");
	var hidBoxObjs = document.getElementsByName(objname+"Val");
	var selectedAgents = document.getElementsByName("agentUserId");
	
	for(var i=0;i<txtBoxObjs.length;i++){
	        if(document.getElementsByName(objname)[i].checked){
	        	anySelected=true;
        		var index=selectedAgents[i].selectedIndex;
        		if(txtBoxObjs[i].value=="" && selectedAgents[i].options[index].text=="--"){
        			alert("Please select Agent and Please enter value for "+formattedName);
        			$(selectedAgents[i]).focus();
        			return false;
	        	}
	        	if(txtBoxObjs[i].value=="" && selectedAgents[i].options[index].text!="--"){
	        		alert("Please enter "+formattedName+" for Agent "+selectedAgents[i].options[index].text);
	        		$(txtBoxObjs[i]).focus();
	        		return false;
	        	}
	        	if(selectedAgents[i].options[index].text=="--"){
        			alert("Please select Agent.");
        			$(selectedAgents[i]).focus();
        			return false;
        		}
	        	if(hidBoxObjs[i].value == 0.0 && (txtBoxObjs[i].value=="" || txtBoxObjs[i].value <= 0.0)){
	        		alert("Please enter "+formattedName+" for Agent "+selectedAgents[i].options[index].text);
	        		$(txtBoxObjs[i]).focus();
	        		return false;
	        	}
	        	if(hidBoxObjs[i].value > 0.0 && (txtBoxObjs[i].value == hidBoxObjs[i].value)){
	        		alert("Please Change "+formattedName+" for Agent "+selectedAgents[i].options[index].text);
	        		$(txtBoxObjs[i]).focus();
	        		return false;
	        	}
	    	    if(!txtBoxObjs[i].value.match(/^\d*(.\d{0,2})?$/)){
	    	    	alert("Please enter valid "+formattedName+" for Agent "+selectedAgents[i].options[index].text);
	    	    	$(txtBoxObjs[i]).focus();
		    	    return false;
	    	    }
	        }
//			hidBoxObjs[i].value = txtBoxObjs[i].value;
	}
	return true;
}
function validateForm(){
		anySelected=false;
		if(!doBlankCheck("airCommission","Air Commission"))
			return false;
		if(!doBlankCheck("extraCommission","Extra Commssion"))
			return false;
		if(!doBlankCheck("rbcCommission","RBC Commission"))
			return false;
		if(!doBlankCheck("changeFee","Change Fee"))
			return false;	
		if(!doBlankCheck("cancelFee","Cancel Fee"))
			return false;
		if(!anySelected){
			alert("Please enter the fields to be Updated/Saved");
			return false;
		}
		$('#templateBox').remove();
		$('.existingAgentId').removeAttr('disabled');
}
function closeBox(refLink){
//	var closeMeLinks = document.getElementsByName("close_me");
//	var divBoxes = document.getElementsByName("dynadiv");
//	
//	for(var i=0;i<closeMeLinks.length;i++){
//		if(closeMeLinks[i] == refLink ){			
//			divBoxes[i].style.display = "none";
//		}
//	}
//	return false;
	$(refLink).parent().remove();
}
function doRemove(){
	anySelected=false;
	if(!setValNull("airCommission"))
		return false;
	if(!setValNull("extraCommission"))
		return false;
	if(!setValNull("rbcCommission"))
		return false;
	if(!setValNull("changeFee"))
		return false;
	if(!setValNull("cancelFee"))
		return false;
	if(!anySelected){
		alert("Please enter the fields to be Removed");
		return false;
	}
	$('#templateBox').remove();
	document.agentCommission.removeAction.value=true;
	$('.existingAgentId').removeAttr('disabled');
	document.agentCommission.submit();
}
function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : event.keyCode;
   if (charCode > 31 && (charCode != 46 && charCode < 48 || charCode > 57))
      return false;

   return true;
}
function setValNull(chkBoxName){
	var chkBoxes = document.getElementsByName(chkBoxName);
	var txtBoxes = document.getElementsByName(chkBoxName+"Hid");
	var hidChkBoxs = document.getElementsByName(chkBoxName+"Chk");
	var hidTxtBoxes = document.getElementsByName(chkBoxName+"Val");

	for(var i=0;i<chkBoxes.length;i++){
		if(chkBoxes[i].checked){
			anySelected=true;
			if(txtBoxes[i].value=="" || hidTxtBoxes[i].value == 0 ){
				alert("The agent doesn’t have the entered commission. Please choose the correct commission to be removed.");
				$(txtBoxes[i]).focus();
				return false;
			}
			if(txtBoxes[i].value != hidTxtBoxes[i].value){
				alert("Partial commission amount can't be removed.");
				txtBoxes[i].value = hidTxtBoxes[i].value;
				$(txtBoxes[i]).focus();
				return false;
			}
			//txtBoxes[i].value="";
			txtBoxes[i].value = hidTxtBoxes[i].value;
			txtBoxes[i].readonly=true;
//			hidTxtBoxes[i].value="-1";
			hidChkBoxs[i].checked=true;
		}
	}
	return true;
}


function getAllAgents() { 
	if($('#agentName option').size() == 1 ){
		AsyncService.getAllAgents({
			callback : getAllAgentsResult,
			errorHandler : handleAddError
		});
	}
}

function getAllAgentsResult(data) {
	document.getElementById("agentUserId").options[0] = new Option("--", "0");
	document.getElementById("agentUserId").options[1] = new Option("All Agents", "");
	for(var i=0;i<data.length;i++) {
		var agent = data[i].split("|");
			document.getElementById("agentUserId").options[i+2] = new Option(agent[1], agent[0]);
	}
}