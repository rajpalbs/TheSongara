function backEndCallToLogMessage(message, masterbookingid){
			 AsyncService.saveComment(message,masterbookingid,{
				  callback : getCommentResult,
				  errorHandler : handleAddError
			  });
}
function getCommentResult(data){
	var row = '<tr class="rgt-btm"><td>'+data[0]+'</td><td  align="center">'+data[1]+'</td><td>'+data[2]+'</td></tr>';
	$('#agentComments tbody tr:first').after(row);
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
	document.getElementById("agentName").options[0] = new Option("-- Select --", "");
	for(var i=0;i<data.length;i++) {
		var agent = data[i].split("|");
			document.getElementById("agentName").options[i+1] = new Option(agent[1], agent[0]);
	}
}