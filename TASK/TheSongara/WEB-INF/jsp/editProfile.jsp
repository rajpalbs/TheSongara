<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>

<script type="text/javascript">
$(document).ready(function() {
	$("#dob").datepicker({
		changeMonth: true,//this option for allowing user to select month 
	    changeYear: true, //this option for allowing user to select from year range 
	    dateFormat: 'dd/mm/yy',
	    yearRange: "-100:+0",
	    maxDate: '0'
	});
});

</script>

<div id="editProfile">
	<form action="saveEditProfile.do" method="post">
		<ul>		
			<li><label class="colouredLabel">Name</label>
				<input type="text" id="surname" name="surname" style="width: 136px; text-transform:uppercase;" placeholder="Surname" value="${userAccountDTO.surname}" required maxlength="8">
  					&nbsp;
  					<input type="text" id="firstName" name="firstName" style="text-transform:uppercase;" placeholder="Name" value="${userAccountDTO.firstName}" required maxlength="26">   					
  					<input type="text" id="lastName" name="lastName" style="text-transform:uppercase;" placeholder="Father/Husband's Name" value="${userAccountDTO.lastName}" required maxlength="26">
  				</li>
  				<br>
  				<li><label class="colouredLabel">Contact Nos</label>
  					<input type="tel" id="countryCode1" name="countryCode1" style="width: 25px" value="${userAccountDTO.countryCode1}" required maxlength="5" pattern="^[0-9,+]+$">
					<input type="tel" id="contact1" name="contact1" style="width: 192px" placeholder="Primary Phone Number" value="${userAccountDTO.contact1}" required maxlength="15" pattern="^[0-9,-]+$">
  					<label class="colouredLabel">&</label>
  					<input type="tel" id="countryCode2" name="countryCode2" style="width: 25px" name="signUpCountryCode2" value="${userAccountDTO.countryCode2}" maxlength="5" pattern="^[0-9,+]+$">
					<input type="tel" id="contact2" name="contact2" placeholder="Secondary Phone Number" value="${userAccountDTO.contact2}" maxlength="15" pattern="^[0-9,-]+$">
  				</li>
  				<br>
  				<li>
  					<label class="colouredLabel">e-mail</label>
  					<input type="email" id="email" name="email" value="${userAccountDTO.email}" maxlength="50">
  					&nbsp;
  					&nbsp;
  					<div style="float: right;">
  						<label class="colouredLabel" >Date Of Birth</label>
  						<input type="text" id="dob" name="dob" placeholder="dd/mm/yyyy" value="${userAccountDTO.dob}"/>
  					</div>
  				</li>
  				<br>
  				<li>
  					<label class="colouredLabel">Address</label>
  					<label class="colouredLabel" style="float: right;margin-right: 262px;">About Me</label>
  					<br>
				<textarea rows="5" cols="10" maxlength="300" id="address" name="address" style="white-space: pre-wrap;">${userAccountDTO.address}</textarea>
				<textarea rows="5" cols="10" maxlength="1000" id="aboutMe" name="aboutMe" style="float: right;white-space: pre-wrap;" placeholder="Something about you(Job,Qualification etc ...)">${userAccountDTO.aboutMe}</textarea>
  				</li> 
  			</ul>	
  			<div style="float: right;">
				<button>OK,Done</button>
			</div>
	
	</form>
</div>
