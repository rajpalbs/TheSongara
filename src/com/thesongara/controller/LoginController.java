package com.thesongara.controller;

import java.util.Locale;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.thesongara.dto.user.LoginDTO;
import com.thesongara.model.user.UserAccount;
import com.thesongara.service.user.IUserAccountService;

@Controller
public class LoginController {

	static{
		System.out.println("*********************************************");
	}	
	
	@Autowired
	private IUserAccountService userAccountService;

	static Logger log = Logger.getLogger(LoginController.class);
	
	/*@RequestMapping(method = RequestMethod.GET)
	public String showHomePage(HttpServletRequest request) {
		//checking Remeber Me		
		if(null != request.getSession().getAttribute("userAccount")){
			Cookie[] cookies = request.getCookies();
			if(cookies.length > 0){
				for(Cookie cookie : cookies){
					if(cookie.getName().equals("username")){
						UserAccount userAccount = userAccountService.getUserAccountByUsername(cookie.getValue());
						request.getSession().setAttribute("userAccount", userAccount);
						break;
					}
				}
			}
		}
		return "home";
	}*/

	@RequestMapping(value = "/signIn.do", method = RequestMethod.GET)
	public String signIn(HttpServletRequest request) {
		if(null != request.getSession().getAttribute("username")){
			return "home";
		}
		Locale locale = LocaleContextHolder.getLocale();
	    String  language = locale.getLanguage();
	    System.out.println("language is : "+language);
		return "login";
	}
	
	@RequestMapping(value = "/login.do", method = RequestMethod.POST)
	public String doLogin(HttpServletRequest request,HttpServletResponse response,LoginDTO loginDTO, ModelMap map) {
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
		return "home";
	}
}
