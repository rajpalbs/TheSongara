package com.thesongara.controller;

import org.apache.log4j.Logger;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.thesongara.util.Constants;

@Controller
public class NavigationController {

static Logger log = Logger.getLogger(LoginController.class);
	@RequestMapping(value = "/history.do", method = RequestMethod.GET)
	public String showHistoryPage() {
		return "history";
	}
	
	@Secured({Constants.ROLE_ADMIN})
	@RequestMapping(value = "/aboutUs.do", method = RequestMethod.GET)
	public String showAboutUsPage() {
		return "aboutUs";
	}	
}
