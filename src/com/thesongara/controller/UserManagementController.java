package com.thesongara.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.thesongara.dto.user.ActivateUserAccountDTO;
import com.thesongara.dto.user.ChangePasswordDTO;
import com.thesongara.dto.user.UserAccountDTO;
import com.thesongara.model.user.UserAccount;
import com.thesongara.service.user.IUserAccountService;
import com.thesongara.util.DateFormatter;
import com.thesongara.util.DateTimeUtils;

@Controller
public class UserManagementController {

	private static Logger log = Logger.getLogger(UserManagementController.class); 
	
	@Autowired
	private IUserAccountService userAccountService;
	
	@RequestMapping(value = "/signUp.do", method = RequestMethod.GET)
	public String createUserAcccount() {
		return "signUp";
	}
	
	@RequestMapping(value = "/checkUsername.do", method = RequestMethod.GET)
	public @ResponseBody Boolean checkUsername(@RequestParam String username){
		UserAccount userAccount = userAccountService.getUserAccountByUsername(username);
		if(userAccount == null){
			return false;
		}
		return true;
	}
	

	@RequestMapping(value = "/createUser.do", method = RequestMethod.POST)
	public String saveUserAcccount(UserAccountDTO userAccountDTO) {
		
		userAccountService.createUserAcount(
				userAccountDTO.getUsername(),
				userAccountDTO.getPassword(),
				userAccountDTO.getFullName(),
				DateTimeUtils.parseDate(DateFormatter.getddMMyyyyFormat(),userAccountDTO.getDob()),
				userAccountDTO.getPhoneNo1(),
				userAccountDTO.getPhoneNo2(),
				userAccountDTO.getEmail(),
				userAccountDTO.getAddress(),
				userAccountDTO.getAboutMe()
		);		
		return "signUpSuccess";
	}
	
	@RequestMapping(value = "/showAllUsers.do", method = RequestMethod.GET)
	public String showAllSyatemUsers(ModelMap map) {
		List<UserAccountDTO> userAccountDTOs = userAccountService.getAllUserAccount();
		map.put("allUsers", userAccountDTOs);
		return "members";
	}
	
	@RequestMapping(value = "/activateUser.do",method = RequestMethod.POST)
	public String activateUser(ActivateUserAccountDTO activateUserAccountDTO,ModelMap map){
		log.debug("ActivateUserAccountDTO is : "+activateUserAccountDTO);
		//Make Admin
		if(activateUserAccountDTO.getMakeAdmin() != null){
			for(int i=0; i<activateUserAccountDTO.getMakeAdmin().length; i++){
				userAccountService.makeUserAdmin(activateUserAccountDTO.getMakeAdmin()[i]);
			}	
		}
		
		//Activate
		if(activateUserAccountDTO.getActivate() != null){
			for(int i=0; i<activateUserAccountDTO.getActivate().length; i++){
				userAccountService.activateDeactivateUserAccount(activateUserAccountDTO.getActivate()[i],Boolean.TRUE);
			}
		}
		//Deactivate
		if(activateUserAccountDTO.getDeactivate() != null){
			for(int i=0; i<activateUserAccountDTO.getDeactivate().length; i++){
				userAccountService.activateDeactivateUserAccount(activateUserAccountDTO.getDeactivate()[i],Boolean.FALSE);
			}	
		}
		return "redirect:/showAllUsers.do";
	}
	
	@RequestMapping(value="/changePassword.do",method=RequestMethod.GET)
	public String changePassword(HttpServletRequest request,ModelMap map){
		if(null == request.getSession().getAttribute("userAccount")){
			return "redirect:/home.do";
		}
		return "changePassword";
	}
	@RequestMapping(value="/saveChangePassword.do",method=RequestMethod.POST)
	public String saveChangePassword(HttpServletRequest request,ChangePasswordDTO changePasswordDTO,ModelMap map){
		if(StringUtils.isNotEmpty(changePasswordDTO.getOldPassword())){
			UserAccount userAccount = (UserAccount) request.getSession().getAttribute("userAccount");
			if(!userAccount.equals(changePasswordDTO.getOldPassword())){
				userAccount.setPassword(changePasswordDTO.getNewPassword());
				userAccountService.update(userAccount);
				map.put("message", "Password Changes Successfully.");
			}
			return "redirect:/home.do";
		}
		return "redirect:/home.do";
	}
	
	@RequestMapping(value="/editProfile.do",method=RequestMethod.GET)
	public String editProfile(HttpServletRequest request, ModelMap map){
		if(null == request.getSession().getAttribute("userAccount")){
			return "redirect:/home.do";
		}
		UserAccountDTO userAccountDTO = userAccountService.getDTO((UserAccount)request.getSession().getAttribute("userAccount"));
		map.put("userAccountDTO", userAccountDTO);
		return "editProfile";
		
	}
	
	@RequestMapping(value="/saveEditProfile.do",method=RequestMethod.POST)
	public String saveEditProfile(HttpServletRequest request, UserAccountDTO userAccountDTO, ModelMap map){
		UserAccount userAccount =  (UserAccount)request.getSession().getAttribute("userAccount");
		if(userAccount !=null){
			userAccount.setFullName(userAccountDTO.getFullName());
			userAccount.setPhoneNo1(userAccountDTO.getPhoneNo1());
			userAccount.setPhoneNo2(userAccountDTO.getPhoneNo2());
			userAccount.setEmailAddress(userAccountDTO.getEmail());
			userAccount.setDateOfBirth(DateTimeUtils.parseDate(DateFormatter.getddMMyyyyFormat(),userAccountDTO.getDob()));
			userAccount.setAddress(userAccountDTO.getAddress());
			userAccount.setAboutMe(userAccountDTO.getAboutMe());
			userAccountService.update(userAccount);
		}
		return "redirect:/home.do";
	}
}
