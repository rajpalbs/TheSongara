package com.thesongara.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
	
	private static Logger log = Logger.getLogger(LoginController.class);
	
	@RequestMapping(value={"/","home.do"}, method=RequestMethod.GET)
	public String showHomePageGET(){
		log.info("Calling Home Page By:");
		return "home";
	}
	
	/*@RequestMapping(method=RequestMethod.POST)
	public String showHomePagePOST(){
		return "home";
	}*/
}
