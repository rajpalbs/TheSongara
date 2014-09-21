<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>
	
<script type="text/javascript">
$(document).ready(function() {
	$("#openForgotPasswordDialog").click(function () {
        $("#forgotPasswordDialog").dialog({
        	modal : true,
        	height : 100,
        	width: 410
        });
    });
});
</script>	

 <%-- Forgot PasswordDialog --%>		
 <div id="forgotPasswordDialog" title="Forgot Password" style="font-family: serif;" class="ui-helper-hidden">
 	<form method="post" action="forgotPassword.do">
 		<label class="colouredLabel">e-mail</label>
   		<input type="email" name="email" id="email" maxlength="50">				
   		<button style="font-family:serif;"><spring:message code="label.login"/></button>
   	</form>
 </div>		
 
 <div class="login">
	<form method="post" action="login.do">
		<c:if test="${not empty message}">
			<span class="red_txt" id="invalid_user"><spring:message code="label.wrongUserNamePassword"/></span>
		</c:if>
		<p>
			<input type="text" id="loginUsername" name="loginUsername" placeholder="Username" title='<spring:message code="label.enterUserName"/>' required="required">
		</p>
		<p>
			<input type="password" id="loginPassword" name="loginPassword" placeholder="Password" title='<spring:message code="label.enterPassword"/>' required="required">
		</p>
		<p class="remember_me">
			<label>
			 <input type="checkbox" name="rememberMe" id="remember_me" checked="checked" ><spring:message code="label.rememberMe"></spring:message>
			</label>
		</p>
		<button style="margin-right: 194px"><spring:message code="label.login"/></button>
		<button type="reset" style="margin-right: 5px"><spring:message code="label.reset"/></button>
	</form>
	<br>
	<br>
	<p style="text-align: center; font-family: serif;" ><spring:message code="label.forgotPassword"/><a id="openForgotPasswordDialog" href="#"><spring:message code="label.resetPassword"/></a></p>
</div> 
