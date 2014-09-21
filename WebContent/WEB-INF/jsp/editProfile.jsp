<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>

<div style="padding-left:270px;">
	<form action="saveEditProfile.do" method="post">
		<ul>		
			<li><label class="colouredLabel">Name</label>
				<input type="text" id="surname" name="surname" style="width: 136px; text-transform:uppercase;" placeholder="Surname" value="${userAccountDTO.surname}">
  					&nbsp;
  					<input type="text" id="firstName" name="firstName" style="text-transform:uppercase;" placeholder="Name" value="${userAccountDTO.firstName}">   					
  					<input type="text" id="lastName" name="lastName" style="text-transform:uppercase;" placeholder="Father/Husband's Name" value="${userAccountDTO.lastName}">
  				</li>
  				<br>
  				<li><label class="colouredLabel">Contact Nos</label>
  					<input type="text" id="countryCode1" name="countryCode1" style="width: 25px" value="${userAccountDTO.countryCode1}">
				<input type="text" id="contact1" name="contact1" style="width: 192px" placeholder="Primary Phone Number" value="${userAccountDTO.contact1}">
  					&nbsp;
  					<label class="colouredLabel">&</label>
  					&nbsp;
  					<input type="text" id="countryCode2" name="countryCode2" style="width: 25px" name="signUpCountryCode2" value="${userAccountDTO.countryCode2}">
				<input type="text" id="contact2" name="contact2" style="width: 192px" placeholder="Secondary Phone Number" value="${userAccountDTO.contact2}">
  				</li>
  				<br>
  				<li>
  					<label class="colouredLabel">e-mail</label>
  					<input type="text" id="email" name="email" value="${userAccountDTO.email}">
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
				<button><spring:message code="label.login"/></button>
				<button><spring:message code="label.reset"/></button>
			</div>
	
	</form>
</div>