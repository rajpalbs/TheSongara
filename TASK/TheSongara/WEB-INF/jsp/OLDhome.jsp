<%@ include file="./common/include.jsp"%>
<%@ page contentType="text/html" pageEncoding="UTF-8"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
	"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>e-home of songara</title>
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/style.css" />
<style type="text/css">

body
{
	background-image:url('/TheSongara/resorces/images/bkg1.png');
	background-repeat:no-repeat;
	background-attachment:fixed;
	background-position:center;
}

</style>
</head>
<body>
	<jsp:include page="./common/header.jsp"></jsp:include>
	
	<%-- Login --%>
	<c:if test="${not empty message}">
		<span class="red_txt" id="invalid_user">${message}</span>
	</c:if>
	<form action="login.do" method="post">
		<table style="background: orange;">
			<tr>
			
				<td><label><spring:message code="label.userName"/></label>
				<a href="?lang=en">english</a> |
				<a href="?lang=gu">gujarati</a>
				</td>
				
				<td><input type="text" id="loginUsername" name="loginUsername"></td>
			</tr>
			<tr>
				<td><label>password :</label> </td>
				<td><input type="text" id="loginPassword" name="loginPassword"></td>
			</tr>
			<tr >
				<td colspan="1" ><input type="submit" id="loginSubmit" name="loginSubmit"></td>
			</tr>
		</table>
	</form>
	<br>
	<%-- create profile --%>
	<form action="createUser.do" method="post">
		<table style="background: orange;">
			<tr>
				<td><label>Username :</label> </td>
				<td><input type="text" id="username" name="username"></td>
			</tr>
			<tr>
				<td><label>Password :</label> </td>
				<td><input type="text" id="password" name="password"></td>
			</tr>
			<tr>
				<td><label>FullName :</label> </td>
				<td><input type="text" id="fullName" name="fullName"></td>
			</tr>
			<tr>
				<td><label>Date Of Birth :</label> </td>
				<td><input type="text" id="dateOfBirth" name="dateOfBirth"></td>
			</tr>
			<tr>
				<td><label>Home Phone :</label> </td>
				<td><input type="text" id="homePhone" name="homePhone"></td>
			</tr>
			<tr>
				<td><label>Mobile Phone :</label> </td>
				<td><input type="text" id="mobilePhone" name="mobilePhone"></td>
			</tr>
			<tr>
				<td><label>e-mail Address :</label> </td>
				<td><input type="text" id="emailAddress" name="emailAddress"></td>
			</tr>
			<tr>
				<td><label>Local Address :</label> </td>
				<td><input type="text" id="localAddress" name="localAddress"></td>
			</tr>
			<tr>
				<td><label>Permanant Address :</label> </td>
				<td><input type="text" id="permanantAddress" name="permanantAddress"></td>
			</tr>
			<tr>
				<td><label>About Me :</label> </td>
				<td><input type="text" id="aboutMe" name="aboutMe"></td>
			</tr>
			<tr>
				<td colspan="2" ><input type="submit" id="loginSubmit" name="loginSubmit"></td>
			</tr>
		</table>
	</form>
	<br>
	<form action="showAllUsers.do" method="get">
		<input type="submit" name="listAllUsers" id="listAllUsers" value="List All Users">
	</form>
	<br>
	<%-- list users --%>
		<c:if test="${allUsers ne null }">
		<table style="background: orange; border-style: ;">
			<tr>
				<td><label>no</label></td>
				<td><label>Username</label> </td>
				<td><label>Password</label> </td>
				<td><label>Full Name</label> </td>
				<td><label>Date Of Birth</label> </td>
				<td><label>Home Phone</label> </td>
				<td><label>Mobile Phone</label> </td>
				<td><label>e-mail Address</label> </td>
				<td><label>local Address</label> </td>
				<td><label>permananat Address</label> </td>
				<td><label>About</label> </td>
			</tr>
			<c:forEach items="${allUsers}" var="user" varStatus="status" >
			<tr>
				<td><label>${status.index + 1}</label></td>
				<td><label>${user.username}</label> </td>
				<td><label>Password</label> </td>
				<td><label>Full Name</label> </td>
				<td><label>Date Of Birth</label> </td>
				<td><label>Home Phone</label> </td>
				<td><label>Mobile Phone</label> </td>
				<td><label>e-mail Address</label> </td>
				<td><label>local Address</label> </td>
				<td><label>permananat Address</label> </td>
				<td><label>About</label> </td>
			</tr>	
			</c:forEach>
			<tr>

			</tr>
		</table>
		</c:if>
		<br>
		<%-- Post Questions --%>
		<form action="postQuestion.do" method="post">
			<textarea rows="10" cols="10" name="question" id="question">
			</textarea>
			<input type="submit" name="postQuestion" id="postQuestion" value="Post Question">
		</form>
			
</body>
</html>