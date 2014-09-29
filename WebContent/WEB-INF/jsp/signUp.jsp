<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>

<script type="text/javascript">
$(document).ready(function() {
	$('#username').blur(function() {
		var originalValue = $(this).val();
		var trimValue = $.trim($(this).val());
		//not allowed leading or trailing space character 
		if(originalValue != trimValue){
			alert('Please Remove Leading And Trailing Space.');
			$('#username').focus();	
			return;
		}
		//not allowed space 
		if(trimValue.indexOf(' ') != -1){
			alert('Space Not Allowed Here.');
			$('#username').focus();
			return;
		}
		//ajax call for validate the username 
		$.ajax({
			url: "checkUsername.do",
			type: "GET",//default is also get 
			data:'username='+trimValue,
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
	});
	$("[id^=contact]").keypress(function(event){
		//alert(this.id);
		//event.preventDefault();
	});
});
</script>
	
 <div class="signUp" style="padding-left: 277px;padding-top: 25px;">
	<form method="post" action="createUser.do">
			<%-- Setting Username & Password --%>
			<h1 class="colouredLabel">User Details</h1>
			<div class="line"></div>
			<ul>
   				<li><label class="colouredLabel">Username    </label>
   					<input type="text" id="username" name="username" required pattern=".*\S+.*" maxlength="15" placeholder="usernam">
   					&nbsp; &nbsp;
   					<label class="colouredLabel">Password    </label>
   					<input type="password" id="password" name="password" required maxlength="15" placeholder="password">
   				</li>
   			</ul>

   			<br>
   			<br>
   			
   			<%-- Setting Contact & Other Details --%>
   			<h1 class="colouredLabel">Contact & Other Details</h1>
			<div class="line"></div>
			<ul>		
				<li><label class="colouredLabel">Name</label>
					<input type="text" id="surname" name="surname" style="width: 100px; text-transform:uppercase;" placeholder="Surname" required maxlength="8">
   					&nbsp;
   					<input type="text" id="firstName" name="firstName" style="text-transform:uppercase;" placeholder="Name" required maxlength="26">    					
   					<input type="text" id="lastName" name="lastName" style="text-transform:uppercase;" placeholder="Father/Husband's Name" required maxlength="26">
   				</li>
   				<br>
   				<li><label class="colouredLabel">Contact Nos</label>
   					<input type="text" id="countryCode1" name="countryCode1" style="width: 25px" value="+91">
					<input type="text" id="contact1" name="contact1" style="width: 180px" placeholder="Primary Phone Number" required maxlength="15">
   					&nbsp;
   					<label class="colouredLabel">&</label>
   					&nbsp;
   					<input type="text" id="countryCode2" name="countryCode2" style="width: 25px" name="signUpCountryCode2" value="+91">
					<input type="text" id="contact2" name="contact2" style="width: 180px" placeholder="Secondary Phone Number" maxlength="15">
   				</li>
   				<br>
   				<li>
   					<label class="colouredLabel">e-mail</label>
   					<input type="email" name="email">
   					&nbsp;
   					&nbsp;
   					<div style="float: right;">
   						<label class="colouredLabel" >Date Of Birth</label>
   						<input type="text" id="dob" name="dob" placeholder="dd/mm/yyyy" maxlength="10">
   					</div>
   				</li>
   				<br>
   				<li>
   					<label class="colouredLabel">Address</label>
   					<label class="colouredLabel" style="float: right;margin-right: 262px;">About Me</label>
   					<br>
					<textarea rows="5" cols="10" maxlength="300" id="address" name="address" style="white-space: pre-wrap;"></textarea>
					<textarea rows="5" cols="10" maxlength="1000" id="aboutMe" name="aboutMe" style="float: right;white-space: pre-wrap;" placeholder="Something about you(Job,Qualification etc ...)"></textarea>
   				</li> 
   			</ul>
   			
   			<div style="float: right;">
				<button><spring:message code="label.login"/></button>
				<button type="reset"><spring:message code="label.reset"/></button>
			</div>
   		</form>
</div> 
