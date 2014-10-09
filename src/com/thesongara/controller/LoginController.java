package com.thesongara.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.thesongara.service.user.IUserAccountService;
import com.thesongara.util.CommonUtility;

@Controller
public class LoginController {

	@Autowired
	private IUserAccountService userAccountService;

	static Logger log = Logger.getLogger(LoginController.class);
	
	@RequestMapping(value = "/signIn.do", method = RequestMethod.GET)
	public String signIn(HttpServletRequest request) {
		if(null != CommonUtility.getLoggedInUserContext()){
			return "home";
		}
		Locale locale = LocaleContextHolder.getLocale();
	    String  language = locale.getLanguage();
	    System.out.println("language is : "+language);
		return "login";
	}
	
	@RequestMapping(value = "/login.do", method = RequestMethod.GET)
	public String doLogin(){
		return "redirect:/home.do";
	}
	
	@RequestMapping(value = "/logout.do", method = RequestMethod.GET)
	public String doLogout(HttpServletRequest request,HttpServletResponse response) {
		request.getSession().invalidate();
		return "home";
	}
	
	@RequestMapping(value = "/denied.do", method = RequestMethod.GET)
	public String doDenied(HttpServletRequest request,HttpServletResponse response) {
		return "denied";
	}
}