package com.thesongara.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.thesongara.dto.sms.SendSMSDTO;
import com.thesongara.dto.user.UserAccountDTO;
import com.thesongara.service.sms.ISendSMS;
import com.thesongara.service.user.IUserAccountService;
import com.thesongara.util.Constants;

@Controller
public class SMSController {
	
	@Autowired
	private ISendSMS sendSMS;
	
	@Autowired
	private IUserAccountService userAccountService;
	
	@Secured({Constants.ROLE_ADMIN})
	@RequestMapping(value = "/sendSMS.do", method = RequestMethod.GET)
	public String showSendSMSPage(ModelMap map){
		List<UserAccountDTO> userAccounts = userAccountService.getAllUserAccount();
		map.put("users", userAccounts);
		return "sendSMS"; 
	}
	
	@Secured({Constants.ROLE_ADMIN})
	@RequestMapping(value = "/sendSMS.do", method = RequestMethod.POST)
	public String sendSMS(ModelMap map,SendSMSDTO sendSMSDTO){
		sendSMS.send(sendSMSDTO);
		return "redirect:/sendSMS.do";
	}

}
