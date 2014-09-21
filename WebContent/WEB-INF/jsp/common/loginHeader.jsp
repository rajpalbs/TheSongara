<%@ include file="include.jsp"%>
<%@ page language="java" pageEncoding="utf-8"%>

<%-- Login Page Start --%>
<div id="loginLocale">
	<a class="localeAnchor" href="?language=gu">
		<spring:message code="label.gujatariLanguage"/>
	</a> | 
	<a class="localeAnchor" href="?language=en">
		<spring:message code="label.englishLanguage"/>
	</a>
	<c:choose>
		<c:when test="${not empty sessionScope.userAccount}">
			<div style="float: right;" id='cssmenu'>
				<ul class="menubar">
      				<li class="menubar-li"><a href="#"><spring:message code="label.jayMataji"/> ${sessionScope.userAccount.username}</a>
            			<ul class="menubar-sub">
            				<li class="menubar-sub-li"><a href="changePassword.do">Change Password</a>
              				<li class="menubar-sub-li"><a href="editProfile.do">Edit Profile</a>
              				<li class="menubar-sub-li"><a href="logout.do">Log Out</a>
            			</ul>
      				</li>
				</ul>
			</div>
		</c:when>
		<c:otherwise>
			<button onclick="location.href='signUp.do'">
				<spring:message code="label.signUp"/>
			</button>
			<button onclick="location.href='signIn.do'" style="margin-right: 5px">
				<spring:message code="label.login"/>
			</button>	
		</c:otherwise>
	</c:choose>

	<div class="line" style="margin-top:25px;"></div>
</div>
<%-- Login Page Ends --%>