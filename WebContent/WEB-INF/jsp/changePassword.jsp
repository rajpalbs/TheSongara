<%@ include file="./common/include.jsp"%>
<%@ page language="java" pageEncoding="UTF-8"%>

<jsp:include page="common/header.jsp"/>
<jsp:include page="common/menu.jsp"/>
<jsp:include page="common/loginHeader.jsp"/>

<script type="text/javascript">
	var isPasswordChecked = false;
    $(document).ready(function(){
   		$('#oldPassword').blur(function(){
   			if($.trim($(this).val()).length > 0){
   				$.ajax({
   					url: "checkPassword.do",
   					type: "GET",//default is also get 
   					data:'password='+$(this).val(),
   					cache: false,
   					success: function(data){
   						if(data){
   							isPasswordChecked = false;
   							alert("Old password is incorrect !!! ");
   							$('#oldPassword').focus();
   						}else{
   							isPasswordChecked = true;
   						}
   					},
   					error: function (xhr, status) {
   			            alert("Server Error ! While Validation Old Password STATUS : "+status);
   			        },
   			        complete: function (xhr, status) {
   			        }
   				});
   			}
   		});

        $("#saveChangedPassword").click(function(event){
        	if(!isPasswordChecked){
        		alert("Old password is incorrect !!!! ");
        		event.preventDefault();
        		return;
        	}
        	var isEmpty=false;
        	if($("#oldPassword").val() == '' || $("#newPassword").val() == '' || $("#confirmPassword").val() == ''){
        		isEmpty=true;
        	}
            if(!isEmpty && $("#oldPassword").val() == $("#newPassword").val()){
        		alert("Old Password And New Password Is Same.");
        		$("#newPassword").focus();
        		event.preventDefault();
        		return;
        	}
        	if(!isEmpty && $("#confirmPassword").val() != $("#newPassword").val()){
        		alert("New Password And Confirm Password Is Different.");
        		$("#confirmPassword").focus();
        		event.preventDefault();
        		return;
        	} 
        }); 
    });
</script>
<div style="padding-left:270px;">
	<form id="changePassword" action="saveChangePassword.do" method="post">
		<ul>
 			<li>
 				<input type="password" id="oldPassword" name="oldPassword" title="Enter Old Password" autofocus required placeholder="Enter Old Password" class="spaceNotAllowed">
 				<br><br><br>
 				<input type="password" id="newPassword" name="newPassword" title="Enter New Password" required placeholder="Enter New Password" class="spaceNotAllowed">
 				<br><br>
 				<input type="password" id="confirmPassword" name="confirmPassword" title="Enter Confirm Password" required placeholder="Re-type New Password" class="spaceNotAllowed">
 			</li>
 		</ul>
 		<ul>
 			<li>
 				<button style="float: left;" type="reset"><spring:message code="label.reset"/></button>
 				<button style="float: left; margin-left: 10px;" id="saveChangedPassword"><spring:message code="label.done"/></button>
 			</li>
 		</ul>
	</form>
</div>
<!-- <div id="branah-keyboard"><button id="branah-k0" class="branah-key"><div class="branah-label-reference">`</div><div class="branah-label-natural">&nbsp;</div></button><button id="branah-k1" class="branah-key"><div class="branah-label-reference">1</div><div class="branah-label-natural">1</div></button><button id="branah-k2" class="branah-key"><div class="branah-label-reference">2</div><div class="branah-label-natural">2</div></button><button id="branah-k3" class="branah-key"><div class="branah-label-reference">3</div><div class="branah-label-natural">3</div></button><button id="branah-k4" class="branah-key"><div class="branah-label-reference">4</div><div class="branah-label-natural">4</div></button><button id="branah-k5" class="branah-key"><div class="branah-label-reference">5</div><div class="branah-label-natural">5</div></button><button id="branah-k6" class="branah-key"><div class="branah-label-reference">6</div><div class="branah-label-natural">6</div></button><button id="branah-k7" class="branah-key"><div class="branah-label-reference">7</div><div class="branah-label-natural">7</div></button><button id="branah-k8" class="branah-key"><div class="branah-label-reference">8</div><div class="branah-label-natural">8</div></button><button id="branah-k9" class="branah-key"><div class="branah-label-reference">9</div><div class="branah-label-natural">9</div></button><button id="branah-k10" class="branah-key"><div class="branah-label-reference">0</div><div class="branah-label-natural">0</div></button><button id="branah-k11" class="branah-key"><div class="branah-label-reference">-</div><div class="branah-label-natural">-</div></button><button id="branah-k12" class="branah-key"><div class="branah-label-reference">=</div><div class="branah-label-natural">ૃ</div></button><button id="branah-backspace"><span>Backspace</span></button><div class="branah-clear"></div><button id="branah-tab"><span>Tab</span></button><button id="branah-k13" class="branah-key"><div class="branah-label-reference">q</div><div class="branah-label-natural">ૌ</div></button><button id="branah-k14" class="branah-key"><div class="branah-label-reference">w</div><div class="branah-label-natural">ૈ</div></button><button id="branah-k15" class="branah-key"><div class="branah-label-reference">e</div><div class="branah-label-natural">ા</div></button><button id="branah-k16" class="branah-key"><div class="branah-label-reference">r</div><div class="branah-label-natural">ી</div></button><button id="branah-k17" class="branah-key"><div class="branah-label-reference">t</div><div class="branah-label-natural">ૂ</div></button><button id="branah-k18" class="branah-key"><div class="branah-label-reference">y</div><div class="branah-label-natural">બ</div></button><button id="branah-k19" class="branah-key"><div class="branah-label-reference">u</div><div class="branah-label-natural">હ</div></button><button id="branah-k20" class="branah-key"><div class="branah-label-reference">i</div><div class="branah-label-natural">ગ</div></button><button id="branah-k21" class="branah-key"><div class="branah-label-reference">o</div><div class="branah-label-natural">દ</div></button><button id="branah-k22" class="branah-key"><div class="branah-label-reference">p</div><div class="branah-label-natural">જ</div></button><button id="branah-k23" class="branah-key"><div class="branah-label-reference">[</div><div class="branah-label-natural">ડ</div></button><button id="branah-k24" class="branah-key"><div class="branah-label-reference">]</div><div class="branah-label-natural">઼</div></button><button id="branah-k25"><div class="branah-label-reference">\</div><div class="branah-label-natural">ૉ</div></button><div class="branah-clear"></div><button id="branah-caps-lock"><span>Caps Lock</span></button><button id="branah-k26" class="branah-key"><div class="branah-label-reference">a</div><div class="branah-label-natural">ો</div></button><button id="branah-k27" class="branah-key"><div class="branah-label-reference">s</div><div class="branah-label-natural">ે</div></button><button id="branah-k28" class="branah-key"><div class="branah-label-reference">d</div><div class="branah-label-natural">્</div></button><button id="branah-k29" class="branah-key"><div class="branah-label-reference">f</div><div class="branah-label-natural">િ</div></button><button id="branah-k30" class="branah-key"><div class="branah-label-reference">g</div><div class="branah-label-natural">ુ</div></button><button id="branah-k31" class="branah-key"><div class="branah-label-reference">h</div><div class="branah-label-natural">પ</div></button><button id="branah-k32" class="branah-key"><div class="branah-label-reference">j</div><div class="branah-label-natural">ર</div></button><button id="branah-k33" class="branah-key"><div class="branah-label-reference">k</div><div class="branah-label-natural">ક</div></button><button id="branah-k34" class="branah-key"><div class="branah-label-reference">l</div><div class="branah-label-natural">ત</div></button><button id="branah-k35" class="branah-key"><div class="branah-label-reference">;</div><div class="branah-label-natural">ચ</div></button><button id="branah-k36" class="branah-key"><div class="branah-label-reference">'</div><div class="branah-label-natural">ટ</div></button><button id="branah-enter" class="branah-enter"><span>Enter</span></button><div class="branah-clear"></div><button class="" id="branah-left-shift"><span>Shift</span></button><button id="branah-k47" class="branah-key"><div class="branah-label-reference">\</div><div class="branah-label-natural">\</div></button><button id="branah-k37" class="branah-key"><div class="branah-label-reference">z</div><div class="branah-label-natural">&nbsp;</div></button><button id="branah-k38" class="branah-key"><div class="branah-label-reference">x</div><div class="branah-label-natural">ં</div></button><button id="branah-k39" class="branah-key"><div class="branah-label-reference">c</div><div class="branah-label-natural">મ</div></button><button id="branah-k40" class="branah-key"><div class="branah-label-reference">v</div><div class="branah-label-natural">ન</div></button><button id="branah-k41" class="branah-key"><div class="branah-label-reference">b</div><div class="branah-label-natural">વ</div></button><button id="branah-k42" class="branah-key"><div class="branah-label-reference">n</div><div class="branah-label-natural">લ</div></button><button id="branah-k43" class="branah-key"><div class="branah-label-reference">m</div><div class="branah-label-natural">સ</div></button><button id="branah-k44" class="branah-key"><div class="branah-label-reference">,</div><div class="branah-label-natural">,</div></button><button id="branah-k45" class="branah-key"><div class="branah-label-reference">.</div><div class="branah-label-natural">.</div></button><button id="branah-k46" class="branah-key"><div class="branah-label-reference">/</div><div class="branah-label-natural">ય</div></button><button class="" id="branah-right-shift"><span>Shift</span></button><div class="branah-clear"></div><button id="branah-left-ctrl"><span>Ctrl</span></button><button id="branah"><span>branah</span></button><button id="branah-left-alt"><span>Alt</span></button><button id="branah-space"><span>Space</span></button><button id="branah-right-alt"><span>Alt</span></button><button id="branah-escape" title="Turn on/off keyboard input conversion"><span>Esc</span></button><button id="branah-right-ctrl"><span>Ctrl</span></button><div class="branah-clear"></div></div> -->
