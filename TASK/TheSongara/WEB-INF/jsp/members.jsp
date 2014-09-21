<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>

<script type="text/javascript"> 
$(function(){
    $('.head').click(function(){
        $(this).next('div.row').stop(true, true).slideToggle();
    });
});

</script>
<div id="memdiv">
	<form action="activateUser.do" method="post">
	<c:forEach items="${allUsers}" var="user" varStatus="status" >
		<c:if test="${user.active || sessionScope.userAccount.userRole.roleEnum eq 'ADMIN'}">
		
		<div class="head" style="cursor:pointer;">
			<label class="colouredLabel" style="cursor: pointer;">${user.fullName}</label>
		</div>
		<div class="row" style="display: none; font-size: 15px;">
			<br>
			<label style="color: #688dad;">Address:</label>
			<br>
				<div style="width: 300px;">
				${user.address}
				</div>
			<br>
			<label style="color: #688dad;">Phone Nos:</label>
			<br>
			${user.phoneNo1}
			<c:if test="${not empty user.phoneNo2}">
			& ${user.phoneNo2}
			</c:if>	
			<br>
			<br>
			<label style="color: #688dad;">About ${user.username}:</label>
			<br>
			${user.aboutMe}
			<br>
			<br>
    		<c:if test="${sessionScope.userAccount.userRole.roleEnum eq 'ADMIN'}">
    			<%-- For Active/Deactive Account --%>
    			<c:choose>
    				<c:when test="${user.active}">
    					<input type="checkbox" id="deactivate" name="deactivate" value="${user.username}">Deactivate ${user.username}
    					<c:if test="${user.userRole ne 'ADMIN'}">
    						<input type="checkbox" id="makeAdmin" name="makeAdmin" value="${user.username}">Make ${user.username} As Admin
    					</c:if>
    				</c:when>
    				<c:otherwise>
    					<input type="checkbox" id="activate" name="activate" value="${user.username}">Activate ${user.username}
    				</c:otherwise>
    			</c:choose>
    		</c:if>
		</div>
		<br>
		</c:if>
	</c:forEach>
	<c:if test="${sessionScope.userAccount.userRole.roleEnum eq 'ADMIN'}">
				<input type="submit" id="activateUser" name="activateUser" value="Apply Changes">
	</c:if>
	</form>
</div>