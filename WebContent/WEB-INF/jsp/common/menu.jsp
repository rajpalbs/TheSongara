<%@ include file="include.jsp"%>
<%@ page language="java" pageEncoding="utf-8"%>

<div id="sidebar">
	
	<%-- Begin Logo --%>
	<div id="logo">
		<img src="${pageContext.request.contextPath}/resources/images/PrithvirajChauhanAjaymeru.jpeg"/>
	</div>
	<%-- End Logo --%>
	
	<%-- Begin Menu --%>
    <div id="menu" class="menu-v">
  		<ul>
		    <li><a href="home.do" class="active"><spring:message code="label.home"/></a></li>
    		<li><a href="history.do" class="active"><spring:message code="label.history"/></a></li>
    		<!-- Create two sub menu under it first download contact file & show members. -->
    		<li><a href="showAllUsers.do" class="active"><spring:message code="label.contact_members"/></a></li>
    		<%-- <li><a href="showAllUsers.do" class="active"><spring:message code="label.documents"/></a></li> --%>
    		<li><a href="discussion.do" class="active"><spring:message code="label.discussion"/></a></li>
    		<li><a href="showAllUsers.do" class="active"><spring:message code="label.recentActivity"/></a></li>
    		<li><a href="showAllUsers.do" class="active"><spring:message code="label.contactUs"/></a></li>
    		<li><a href="showAllUsers.do" class="active"><spring:message code="label.aboutUs"/></a></li>
    		<%-- <li><a href="showAllUsers.do" class="active"><spring:message code="label.siteMap"/></a></li> --%>
    	<%-- 	<li><a href="buttons-boxes-images.html">Documents</a></li>
    		<li><a href="contact.html">Contact Us</a></li>
    		<li><a href="contact.html">About Us</a></li>
    		<li><a href="contact.html">Recent Activity</a></li>
    		<li><a href="contact.html">Site Map</a></li>--%>
  		</ul>
  	</div>
  	<%-- End Menu --%>

	<%-- Begin Menu for reference -%>
    <div id="menu" class="menu-v">
  		<ul>
		    <li><a href="index.html" class="active">Home</a>
    			<ul>
    				<li><a href="index.html">Home w/ Carousel</a></li>
		    		<li><a href="index2.html">Home w/ Portfolio</a></li>
    				<li><a href="index3.html">Home w/ Testimonials</a></li>
    			</ul>
    		</li>
    		<li><a href="portfolio.html">Portfolio</a>
		    	<ul>
		    		<li><a href="portfolio.html">Portfolio 4 Columns</a></li>
    				<li><a href="portfolio2.html">Portfolio 3 Columns</a></li>
		    		<li><a href="portfolio3.html">Portfolio 2 Columns</a></li>
		    		<li><a href="portfolio4.html">Portfolio 1 Column</a></li>
		    		<li><a href="portfolio-post.html">Portfolio Post</a></li>
    			</ul>
		    </li>
    		<li><a href="blog.html">Blog</a>
		    	<ul>
		    		<li><a href="blog.html">Blog</a></li>
		    		<li><a href="blog2.html">Blog w/ Sidebar</a></li>
		    		<li><a href="post.html">Post</a></li>
		    		<li><a href="post2.html">Post w/ Sidebar</a></li>
		    	</ul>
		    </li>
    		<li><a href="buttons-boxes-images.html">Features</a>
		    	<ul>
		    		<li><a href="buttons-boxes-images.html">Buttons Boxes Images</a></li>
		    		<li><a href="tabs-toggle-table.html">Tabs Toggle Tables</a></li>
		    		<li><a href="testimonials.html">Testimonials</a></li>
		    		<li><a href="typography.html">Typography</a></li>
		    		<li><a href="service-icons.html">Service Icons</a></li>
		    	</ul>
    		</li>
    		<li><a href="contact.html">Contact Us</a>
			</li>
  		</ul>
  	</div>
  	<%-- End Menu --%>



			<%-- FUTURE TASK  

				<div class="sidebox">
				<ul class="share">
					<li><a href="#"><img src="style/images/icon-rss.png" alt="RSS" /></a></li>
					<li><a href="#"><img src="style/images/icon-facebook.png" alt="Facebook" /></a></li>
					<li><a href="#"><img src="style/images/icon-twitter.png" alt="Twitter" /></a></li>
					<li><a href="#"><img src="style/images/icon-dribbble.png" alt="Dribbble" /></a></li>
					<li><a href="#"><img src="style/images/icon-linkedin.png" alt="LinkedIn" /></a></li>
				</ul>
				</div>
			--%>
</div>