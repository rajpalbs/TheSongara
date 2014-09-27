package com.thesongara.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class NavigationController {

static Logger log = Logger.getLogger(LoginController.class);
	@RequestMapping(value = "/history.do", method = RequestMethod.GET)
	public String showHistoryPage() {
		return "history";
	}	
}
