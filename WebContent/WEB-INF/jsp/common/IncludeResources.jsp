<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9 " />

<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css" type="text/css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/flick/fn-ui-1.8.11.css" type="text/css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/redmond.datepick.css" type="text/css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/jquery.alerts.css" type="text/css">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/resources/images/favicon.ico" type="image/x-icon" />

<%-- JavaScript 
<script type="text/javascript" 
	src="${pageContext.request.contextPath}/resources/js/all_brow.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath}/resources/js/jquery/jquery-1.7.2.js"></script>
	<script type="text/javascript" 
	src="${pageContext.request.contextPath}/resources/js/jquery/plugins/jquery-ui.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath}/resources/js/jquery/plugins/jquery.datepick.js"></script>
<script type="text/javascript" 
	src="${pageContext.request.contextPath}/resources/js/jquery/plugins/jquery.alerts.js"></script>
--%>

<!-- DWR Specific -->
<%-- <script type="text/javascript"
	src="<%=request.getContextPath()%>/dwr/engine.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/dwr/util.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/dwr/interface/AsyncService.js"></script>--%>



<div style="display: block;" class="keyboardCheck">
	<label class="add-on active on btn"> <input id="keycheck"
		checked="" type="checkbox"> <span class="labeltext">ON</span>
	</label>
</div>
<script type="text/javascript">
	head
			.ready("layouts",
					function() {
						VirtualKeyboard.switchLayout("IN Gujarati");
						VirtualKeyboard.toggle(document
								.querySelectorAll(".defaultvkinput")[0].id,
								'keyboard');
					});
</script>
