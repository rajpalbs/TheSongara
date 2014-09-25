<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>

<div style="width:700px; float: right; font-family:Serif;">
	<h1 class="colouredLabel" style="font-size: 19px; text-decoration: underline;"><spring:message code="label.chauhan.title"/></h1>
	<br>
	<label class="text" style="font-size: 17px;"><spring:message code="label.chauhan.line1"/></label>
	<br>
	<br>
	&nbsp;&nbsp;
	<label class="text" style="font-size: 17px;"><spring:message code="label.chauhan.line2"/></label>
	<br>
	<br>
	&nbsp;&nbsp;
	<label class="text" style="font-size: 17px;" ><spring:message code="label.chauhan.line3"/></label>
	<br>
	<br>
	&nbsp;&nbsp;
	<label class="text" style="font-size: 17px;"><spring:message code="label.chauhan.line4"/></label>
	
	<br>
	<br>
	<br>
	
	<h1 class="colouredLabel" style="font-size: 19px; text-decoration: underline;"><spring:message code="label.songara.title"/></h1>
	<br>
	<label class="text" style="font-size: 17px;"><spring:message code="label.songara.line1"/></label>
	<br>
	<br>
	&nbsp;&nbsp;
	<label class="text" style="font-size: 17px;"><spring:message code="label.songara.line2"/></label>
	<br>
	<br>
	&nbsp;&nbsp;
	<label class="text" style="font-size: 17px;"><spring:message code="label.songara.line3"/></label>
	<br>
	<br>
	<br>
	 
	<div id="details">
    		<h1 class="colouredLabel" style="font-size: 19px; text-decoration: underline;"><spring:message code="label.details"/></h1>
    		<br>
    		<div id="leftPart" style="float: left; width: 250px;" >
    			<label class="colouredLabel" style="font-size: 17px;"><spring:message code="label.gens"/>:</label>
    			<font style="font-size: 17px;"><spring:message code="label.gens.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 17px;"><spring:message code="label.vansh"/>:</label>
    			<font style="font-size: 17px;"><spring:message code="label.vansh.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 17px;"><spring:message code="label.kuldevta"/>:</label>
    			<font style="font-size: 17px;"><spring:message code="label.kuldevta.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 17px;"><spring:message code="label.kuldevi"/>:</label>
    			<font style="font-size: 17px;"><spring:message code="label.kuldevi.value"/></font>
    			<br><br>
    		</div>
    		<div  id="rightPart" style="float: left; width: 450px;">
    			<label class="colouredLabel" style="font-size: 17px;"><spring:message code="label.mahadev"/>:</label>
    			<font style="font-size: 17px;"><spring:message code="label.mahadev.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 17px;"><spring:message code="label.ishtdevi"/>:</label>
    			<font style="font-size: 17px;"><spring:message code="label.ishtdevi.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 17px;"><spring:message code="label.aadyashakti"/>:</label>
    			<font style="font-size: 17px;"><spring:message code="label.aadyashakti.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 17px;"><spring:message code="label.aadyapurush"/>:</label>
    			<font style="font-size: 17px;"><spring:message code="label.aadyapurush.value"/></font>
    			<br>
    			<br>
    		</div>
    	</div>
    	<a href="fileDownload.do" style="font-size: 20px; font-style: italic;">Download Detail History</a>	
</div>
