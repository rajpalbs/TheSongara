<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>

<div style="padding-left:270px;">
	<form action="saveEditProfile.do" method="post">
		<ul>		
			<li>
				<label class="colouredLabel">Name</label>
				<input type="text" id="surname" name="surname" style="width: 100px; text-transform:uppercase;" placeholder="Surname" required pattern="[a-zA-Z]+" maxlength="8" title="Only characters Are allowed here" value="${userAccountDTO.surname}">
  				&nbsp;
  				<input type="text" id="firstName" name="firstName" style="text-transform:uppercase;" placeholder="Name" required pattern="[a-zA-Z]+" maxlength="26" title="Only characters Are allowed here" value="${userAccountDTO.firstName}">   					
  				<input type="text" id="lastName" name="lastName" style="text-transform:uppercase; float: right;" placeholder="Middle Name" required pattern="[a-zA-Z]+" maxlength="26" title="Only characters Are allowed here" value="${userAccountDTO.lastName}">
  			</li>
  			<br>
  			<li>
  				<label class="colouredLabel">Phone</label>
  				<input type="text" id="countryCode1" name="countryCode1" style="width: 30px" value="+91" maxlength="4" title="Only Numbers and + sign allow here" value="${userAccountDTO.countryCode1}">
				<input type="text" id="contact1" name="contact1" placeholder="Primary Phone Number" required pattern="[0-9]+" maxlength="10" title="Only Numbers 0-9 Allowed Here" value="${userAccountDTO.contact1}">
  				&nbsp;
  				<label class="colouredLabel">&</label>
  				&nbsp;
  				<div style="float: right;">
  					<input type="text" id="countryCode2" name="countryCode2" style="width: 30px" value="+91" maxlength="4" pattern="[0-9+]+" title="Only Numbers and + sign allow here" value="${userAccountDTO.countryCode2}">
					<input type="text" id="contact2" name="contact2" placeholder="Secondary Phone Number" pattern="[0-9]+" maxlength="10" title="Only Numbers 0-9 Allowed Here" value="${userAccountDTO.contact2}">
				</div>
  			</li>
  			<br>
  			<li>
  				<label class="colouredLabel">e-mail</label>
  				<input type="text" id="email" name="email" value="${userAccountDTO.email}">
  				&nbsp;
  				&nbsp;
  				<div style="float: right;">
  					<label class="colouredLabel" >Date Of Birth</label>
  					<input type="text" id="dob" name="dob" class="dob15yrbefore" placeholder="dd/mm/yyyy" value="${userAccountDTO.dob}"/>
  				</div>
  			</li>
  			<br>
  			<li>
  				<label class="colouredLabel">Address</label>
  				<label class="colouredLabel" style="float: right;margin-right: 262px;">About Me</label>
  				<br>
				<textarea rows="5" cols="10" maxlength="300" id="address" name="address" style="white-space: pre-wrap;"  placeholder="Your postal address">${userAccountDTO.address}</textarea>
				<textarea rows="5" cols="10" maxlength="1000" id="aboutMe" name="aboutMe" style="float: right;white-space: pre-wrap;" placeholder="Something about your identity(e.g job,study ...)">${userAccountDTO.aboutMe}</textarea>
  			</li> 
  		</ul>	
  		<div style="float: right;">
			<button><spring:message code="label.done"/></button>
		</div>
	</form>
</div>