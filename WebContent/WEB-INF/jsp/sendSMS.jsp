<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>

<script type="text/javascript">
$(document).ready(function() {
    $('#checkAll').click(function(event) {  //on click
        if(this.checked) { // check select status
            $('.smsCheckbox').each(function() { //loop through each checkbox
                this.checked = true;  //select all checkboxes with class "checkbox1"              
            });
        }else{
            $('.smsCheckbox').each(function() { //loop through each checkbox
                this.checked = false; //deselect all checkboxes with class "checkbox1"                      
            });        
        }
    });
   
});

/* $('#sendSMSForm').validate({
    rules: {
        fieldname: {
            require_from_group: [1, '.require-one']
        },
    }
}); */

</script>

<div id="sendSMSDiv" style="font-size: 15px;">
	<label class="colouredLabel"><spring:message code="label.chooseReceiver"/></label>
	<br>
	<form id="sendSMSForm" name="sendSMSForm" action="sendSMS.do" method="post">
		<table>
			<tr>
				<th class="colouredLabel"><input type="checkbox" id="checkAll" name="checkAll">All</th>			
				<%--<td>Sr.No</td> --%>
				<th class="colouredLabel centerText">Name</th>
				<th class="colouredLabel centerText">Contact No(S)</th>
			</tr>
			<c:forEach items="${users}" var="user" varStatus="status" >
				<tr>
					<td class="centerText"><input class="smsCheckbox" value="${user.phoneNo1}#${user.phoneNo2}" type="checkbox" name="sendTo" id="sendTo${status.index}"></td>
					<%-- <td class="centerText">${status.index+1}</td> --%>
					<td>${user.fullName}</td>
					<td class="centerText">${user.phoneNo1}<br> & <br> ${user.phoneNo2}</td>
				</tr>
			</c:forEach>
		</table>
		<%-- PU TEXT AREA FOR NON SENDING SMS TO NON-SYSTEM USERS --%>
		<textarea id="smsText" name="smsText" style="white-space: pre-wrap;width: 670px; height: 50px;" placeholder="Write SMS Text Here."></textarea>
		<input type="submit" value="Send" id="submitSendSMS" name="submitSendSMS">
	</form>
</div>