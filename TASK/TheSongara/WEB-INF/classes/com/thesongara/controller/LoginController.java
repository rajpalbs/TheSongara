package com.thesongara.controller;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.thesongara.dto.user.LoginDTO;
import com.thesongara.mail.EmailSender;
import com.thesongara.model.user.UserAccount;
import com.thesongara.service.user.IUserAccountService;

@Controller
public class LoginController {

	@Autowired
	private IUserAccountService userAccountService;
	
	@Autowired
	private EmailSender emailSender;

	static Logger log = Logger.getLogger(LoginController.class);
	@RequestMapping(value = "/home.do", method = {RequestMethod.GET, RequestMethod.POST})
	public String showHomePage(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		HttpSession session = request.getSession(false); 
		if(session == null || request.getSession(false).getAttribute("userAccount") == null){
			Cookie[] cookies = request.getCookies();
			if(cookies != null && cookies.length > 0){
				for(Cookie cookie : cookies){
					if(cookie.getName().equals("username")){
						UserAccount userAccount = userAccountService.getUserAccountByUsername(cookie.getValue());
						request.getSession().setAttribute("userAccount", userAccount);
						break;
					}
				}
			}
		}
		map.put("message",request.getParameter("message"));
		return "home";
	}

	@RequestMapping(value = "/signIn.do", method = RequestMethod.GET)
	public String signIn(HttpServletRequest request) {
		if(null != request.getSession(false).getAttribute("userAccount")){
			return "redirect:/home.do";
		}
		Locale locale = LocaleContextHolder.getLocale();
	    String  language = locale.getLanguage();
	    System.out.println("language is : "+language);
		return "login";
	}
	
	@RequestMapping(value = "/login.do", method = RequestMethod.POST)
	public String doLogin(HttpServletRequest request,HttpServletResponse response,LoginDTO loginDTO, ModelMap map){
		if(null == request.getSession(false).getAttribute("userAccount")){
			UserAccount userAccount = userAccountService.validateLogin(loginDTO.getLoginUsername(),loginDTO.getLoginPassword());
			if (null == userAccount || userAccount.getUserRole() == null) {
				map.put("message", "Wrong Username/Password.");
				return "login";
			}
			request.getSession().setAttribute("userAccount", userAccount);
			//Remember Me Functionality
			if(null != loginDTO.getRememberMe()){
		           Cookie cookie=new Cookie("username",userAccount.getUsername());
		           cookie.setHttpOnly(true);
		           cookie.setMaxAge(365 * 24 * 60 * 60 * 10);
		           response.addCookie(cookie);
			}
		}else{
			map.put("message", "You Are Already Logged In");
		}
		return "redirect:/home.do";
	}
	
	@RequestMapping(value = "/login.do", method = RequestMethod.GET)
	public String doLogin(){
		return "redirect:/home.do";
	}
	
	@RequestMapping(value = "/logout.do", method = RequestMethod.GET)
	public String doLogout(HttpServletRequest request,HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();
		// REMOVE COOKIE.
		if(cookies !=null && cookies.length > 0){
			for(Cookie cookie : cookies){
				if(cookie.getName().equals("username")){
					cookie.setValue(null);
                	cookie.setMaxAge(0);
                	response.addCookie(cookie);
                	break;
				}
			}
		}
		request.getSession().invalidate();
		return "redirect:/home.do";
	}
	
	@RequestMapping(value = "/forgotPassword.do", method = RequestMethod.POST)
	public String forgotPassword(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		String email = request.getParameter("email").trim();
		if(StringUtils.isNotEmpty(email)){
			UserAccount userAccount = userAccountService.getUserAccountByEmail(email);
			Map<String, Object> data = new HashMap<String, Object>();
			data.put("fullName",userAccount.getFullName());
			data.put("username", userAccount.getUsername());
			data.put("password", userAccount.getPassword());
			emailSender.sendEmail(email, "Password Of thesongara.com", "templates/forgotPassword.vm", data);
			map.put("message", "Your Username & Password is Send to your registered email Address.");
		}
		return "redirect:/home.do";
	}
}
