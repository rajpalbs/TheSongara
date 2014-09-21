<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>

<script type="text/javascript"> 
	function showMessage(){
		alert('${message}');
	}
</script>

	<div id="content" onload="showMessage();">
		<div class="intro">
		<p>
		<spring:message code="label.welcome1"/>
		</p>
		<p>	
		<spring:message code="label.welcome2"/>
		</p>
		<p>
		<spring:message code="label.welcome3"/>
		</p>
		</div>
		<div id="slider">
			<div class="flexslider">
		    <ul class="slides">
		    	<li><img src="${pageContext.request.contextPath}/resources/images/1.jpg" /></li>
		    	<li><img src="${pageContext.request.contextPath}/resources/images/2.jpg"/></li>
		    	<li><img src="${pageContext.request.contextPath}/resources/images/3.jpg"/></li>
		    	<%-- <li><img src="${pageContext.request.contextPath}/resources/images/slide1.jpg"/></li>
		    	<li><img src="${pageContext.request.contextPath}/resources/images/slide2.jpg"/></li>
		    	<li><img src="${pageContext.request.contextPath}/resources/images/slide3.jpg"/></li>
		    	<li><img src="${pageContext.request.contextPath}/resources/images/slide4.jpg"/></li> --%>
		    </ul>
		  </div>
		</div>
    	<%-- End Slider --%>
    	<%-- Actual Content To Display 
    	<div id="details" style="font-family: amaranth;">
    		<h1 class="colouredLabel" style="font-size: 25px;"><spring:message code="label.details"/></h1>
    		<div id="leftPart" style="float: left; width: 250px;" >
    			<label class="colouredLabel" style="font-size: 20px;"><spring:message code="label.gens"/>:</label>
    			<font style="font-size: 20px;"><spring:message code="label.gens.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 20px;"><spring:message code="label.vansh"/>:</label>
    			<font style="font-size: 20px;"><spring:message code="label.vansh.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 20px;"><spring:message code="label.kuldevta"/>:</label>
    			<font style="font-size: 20px;"><spring:message code="label.kuldevta.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 20px;"><spring:message code="label.kuldevi"/>:</label>
    			<font style="font-size: 20px;"><spring:message code="label.kuldevi.value"/></font>
    			<br><br>
    		</div>
    		<div  id="rightPart" style="float: left;">
    			<label class="colouredLabel" style="font-size: 20px;"><spring:message code="label.mahadev"/>:</label>
    			<font style="font-size: 20px;"><spring:message code="label.mahadev.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 20px;"><spring:message code="label.ishtdevi"/>:</label>
    			<font style="font-size: 20px;"><spring:message code="label.ishtdevi.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 20px;"><spring:message code="label.aadyashakti"/>:</label>
    			<font style="font-size: 20px;"><spring:message code="label.aadyashakti.value"/></font>
    			<br>
    			<label class="colouredLabel" style="font-size: 20px;"><spring:message code="label.aadyapurush"/>:</label>
    			<font style="font-size: 20px;"><spring:message code="label.aadyapurush.value"/></font>
    			<br>
    			<br>
    		</div>
    	</div> --%>
	</div>
	
<jsp:include page="common/footer.jsp"/>
    
    