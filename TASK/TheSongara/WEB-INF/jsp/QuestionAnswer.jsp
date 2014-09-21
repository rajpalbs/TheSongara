<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>

<script type="text/javascript"> 
$(function(){
    $(".head").click(function(){
    	$(this).next('div.row').stop(true, true).slideToggle();
    });
});

$(document).ready(function() {
	$('[id^=postAnswer]').click(function(event){
		questionId = ($(this).attr("id").substring(10));
		var trimAnswer = $.trim($("#answer"+questionId).val());
		if(trimAnswer.length>0){
			var answerData = new Object();
			answerData.questionId = questionId;
		    answerData.answer = trimAnswer;
		  	$('.loading-gif').show();
		    $.ajax({
				url: "putAnswer.do",
				type: "GET", 
				data: "questionId=" + questionId + "&answer=" +trimAnswer,
				cache: false,
				success: function(data){
					html="<div id='temp' style='width: 700px;'><label style='color: #688dad;'>&nbsp;&nbsp;&nbsp;"+data.answerGivenBy+" Says : </label>"+data.answer+"</div>";
					html+="&nbsp;&nbsp;&nbsp; On <label style='color: #688dad;font-size: 15px;'>"+data.answerDate+"</label>";
					$("#divPostAnswer"+questionId).before(html);
					$("#answer"+questionId).val('');
				},
				error: function (xhr, status) {
		            alert("Error ! While Putting Answer."+status);
		            event.preventDefault();
		        },
		        complete: function (xhr, status) {
		        	//this is kind of finally block, always executes.
		        	$('.loading-gif').hide();
		        }
			});	
		}else{
			alert("Please Enter Aswer");
			$("#answer"+answerId).focus();
			event.preventDefault();
		}
		
	});	
	/* Opne Question Dialog.  */
	$(document).ready(function() {
		$("#postQuestionBtn").click(function () {
	        $("#postQuestionDialog").dialog({
	        	modal : true,
	        	height : 200,
	        	width: 460
	        });
	    });
		
		$("#postQuestion").click(function(event){
			var trimQuestion = $.trim($("#question").val());
			if(trimQuestion.length == 0){
				alert("Please Enter Question.");
				event.preventDefault();	
			}
		});
	});
});
</script>

<%-- Post Question --%>		
 <div id="postQuestionDialog" title="Start New Discussion" style="font-family: serif;" class="ui-helper-hidden">
 	<form method="post" action="postQuestion.do">
 		<textarea id="question" name="question" style="font-family: serif; white-space: pre-wrap;width: 400px; height: 100px;"></textarea>				
   		<button id="postQuestion" name="postQuestion" style="font-family:serif;">Post Question</button>
   	</form>
 </div>



<div id="questionAnswerDiv">
	<div id="postQuestionDiv" style="float: right;">
		<button id="postQuestionBtn" name="postQuestionBtn">Start New Discussion.</button>	
	</div>
	<br><br><br><br>
	<img src="${pageContext.request.contextPath}/resources/images/loader.gif" alt="Loading" class="loading-gif" style="display:none"/>		
	<c:forEach items="${resultDTO}" var="resultMap" varStatus="i">
		<div class="head" style="cursor:pointer;">
			<label class="colouredLabel" style="cursor: pointer;">${resultMap.key.question}</label>
			- By <label style="color: #688dad;font-size: 15px;">${resultMap.key.questionAskedBy}</label>
			- On <label style="color: #688dad;font-size: 15px;">${resultMap.key.postedDate}</label>
			<%--
			 Later pahse. --%>
			 <label style="color: #688dad;font-size: 15px;float:right;">${resultMap.key.noOfAnswer}</label>
			
		</div>
		<div class="row" style="display: none; font-size: 15px;">
			<c:forEach items="${resultMap.value}" var="answerList" varStatus="j">
				<br>
				<div style="width: 700px;">
					<label style="color: #688dad;">&nbsp;&nbsp;&nbsp;${answerList.answerGivenBy} Says : </label>${answerList.answer}
					<br>&nbsp;&nbsp;&nbsp; On <label style="color: #688dad;font-size: 15px;">${answerList.answerDate}</label>
				</div>
				<c:set var="answerNo" value="${j.index}"></c:set>
			</c:forEach>
			<br>
			<%-- for putting answer --%>	
			<div id="divPostAnswer${resultMap.key.questionId}">		
				<input type="hidden" value="${resultMap.key.questionId}" name="questionId">	
				&nbsp;&nbsp;&nbsp;<textarea id="answer${resultMap.key.questionId}" name="answer" style="white-space: pre-wrap;width: 650px; height: 50px;" placeholder="Write Your View Here."></textarea>
				<br>
				<div style="float: left;">&nbsp;&nbsp;&nbsp;
					<button id="postAnswer${resultMap.key.questionId}" name="postAnswer">Post Answer</button>
				</div>
			</div>
			<br><br><br>
		</div>
		<br>
	</c:forEach>
</div>