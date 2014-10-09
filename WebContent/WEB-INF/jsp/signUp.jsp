<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>

<script type="text/javascript">
$(document).ready(function() {
	$('#username').blur(function(){
		if($.trim($(this).val()).length > 0){
			$.ajax({
				url: "checkUsername.do",
				type: "GET",//default is also get 
				data:'username='+$(this).val(),
				cache: false,
				success: function(data){
					if(data){
						alert("Username Already Present In System,Please Use Other One.");
						$('#username').focus();
					}
				},
				error: function (xhr, status) {
		            alert("Error ! While Checking Username validity"+status);
		        },
		        complete: function (xhr, status) {
		        	//this is kind of finally block, always executes. 
		        }
			});
		}
	});
});
</script>
	
 <div class="signUp" style="padding-left: 277px;padding-top: 25px;">
	<form method="post" action="createUser.do">
		<%-- Setting Username & Password --%>
		<h1 class="colouredLabel">User Details</h1>
		<div class="line"></div>
		<ul>
			<li>
				<label class="colouredLabel">Username</label>
	 			<input type="text" id="username" name="username" autofocus required pattern="[a-zA-Z]+" class="spaceNotAllowed" maxlength="15" placeholder="username" title="Please Enter Only Characters">
	 			&nbsp; &nbsp;
	 			<label class="colouredLabel">Password</label>
	 			<input type="password" id="password" name="password" required maxlength="15" class="spaceNotAllowed" placeholder="password">
			</li>
		</ul>
   		<br>
   		<br>
   		
   		<%-- Setting Contact & Other Details --%>
   		<h1 class="colouredLabel">Contact & Other Details</h1>
		<div class="line"></div>
		<ul>		
			<li>
				<label class="colouredLabel">Name</label>
				<input type="text" id="surname" name="surname" style="width: 100px; text-transform:uppercase;" placeholder="Surname" required pattern="[a-zA-Z]+" maxlength="8" title="Only characters Are allowed here">
   				&nbsp;
   				<input type="text" id="firstName" name="firstName" style="text-transform:uppercase;" placeholder="Name" required pattern="[a-zA-Z]+" maxlength="26" title="Only characters Are allowed here">    					
   				<input type="text" id="lastName" name="lastName" style="text-transform:uppercase; float: right;" placeholder="Middle Name" required pattern="[a-zA-Z]+" maxlength="26" title="Only characters Are allowed here" >
			</li>
   			<br>
   			<li>
   				<label class="colouredLabel">Phone</label>
   				<input type="text" id="countryCode1" name="countryCode1" style="width: 30px" value="+91" maxlength="4">
				<input type="text" id="contact1" name="contact1" placeholder="Primary Phone Number" required pattern="[0-9]+" maxlength="10" title="Only Numbers 0-9 Allowed Here">
   				&nbsp;
   				<label class="colouredLabel">&</label>
   				&nbsp;
   				<div style="float: right;">
   					<input type="text" id="countryCode2" name="countryCode2" style="width: 30px" value="+91" maxlength="4" pattern="[0-9+]+">
					<input type="text" id="contact2" name="contact2" placeholder="Secondary Phone Number" pattern="[0-9]+" maxlength="10" title="Only Numbers 0-9 Allowed Here">
				</div>
   			</li>
   			<br>
   			<li>
   				<label class="colouredLabel">e-mail</label>
   				<input type="email" name="email" placeholder="your email address">
   				&nbsp;
   				&nbsp;
   				<div style="float: right;">
   					<label class="colouredLabel">Date Of Birth</label>
   					<input type="text" id="dob" name="dob" class="dob15yrbefore" placeholder="dd/mm/yyyy" maxlength="10">
   				</div>
   			</li>
   			<br>
   			<li>
   				<label class="colouredLabel">Address</label>
   				<label class="colouredLabel" style="float: right;margin-right: 262px;">About Me</label>
   				<br>
				<textarea rows="5" cols="10" maxlength="300" id="address" name="address" style="white-space: pre-wrap;" placeholder="Your postal address"></textarea>
				<textarea rows="5" cols="10" maxlength="1000" id="aboutMe" name="aboutMe" style="float: right;white-space: pre-wrap;" placeholder="Something about your identity(e.g job,study ...)"></textarea>
   			</li> 
		</ul>
   			
   		<div style="float: right;">
			<button><spring:message code="label.signUp"/></button>
			<button type="reset"><spring:message code="label.reset"/></button>
		</div>
   	</form>
</div>