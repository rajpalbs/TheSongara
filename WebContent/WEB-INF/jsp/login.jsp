<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>
	
 <div class="login">
	<form:form method="post" action="j_spring_security_check">
		<c:if test="${not empty message}">
			<span class="red_txt" id="invalid_user"><spring:message code="label.wrongUserNamePassword"/></span>
		</c:if>
		<p>
			<input type="text" id="j_username" name="j_username" placeholder="Username(Only In English)" title='<spring:message code="label.enterUserName"/>' required="required">
		</p>
		<p>
			<input type="password" id="j_password" name="j_password" placeholder="Password(Only In English)" title='<spring:message code="label.enterPassword"/>' required="required">
		</p>
		 
		<p class="remember_me">
		<%-- TODO: Implements Remember Me Using Spring using persistant token
			<label>
			 <input type="checkbox" name="rememberMe" id="remember_me" checked="checked" ><spring:message code="label.rememberMe"></spring:message>
			</label>
			 --%>
		</p>
		<button style="margin-right: 194px"><spring:message code="label.login"/></button>
		<button type="reset" style="margin-right: 5px"><spring:message code="label.reset"/></button>
		<!-- </p> -->
		<!-- TODO Later <div class="login-help">
			<p>Forgot your password? <a href="index.html">Click here to reset it</a>.</p>
		</div> -->
	</form:form>
</div> 