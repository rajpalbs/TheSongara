package com.thesongara.service.user.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.thesongara.dao.user.IUserAccountDAO;
import com.thesongara.dto.user.UserAccountDTO;
import com.thesongara.enums.UserRoleEnum;
import com.thesongara.model.user.UserAccount;
import com.thesongara.model.user.UserRole;
import com.thesongara.service.user.IUserAccountService;
import com.thesongara.service.user.IUserRoleService;
import com.thesongara.transformer.UserAccountTransformer;

@Service
public class UserAccountService implements IUserAccountService {

	private static Logger log = Logger.getLogger(UserAccountService.class);

	@Autowired
	private IUserAccountDAO userAccountDAO;

	@Autowired
	private IUserRoleService userRoleService;

	@Override
	public UserAccount validateLogin(String username, String password) {
		String[] columnNames = { "username", "password", "active" };
		Object[] columnValues = { username, password, Boolean.TRUE };
		return userAccountDAO.getSafeSingleEntityByColumnAndValue(columnNames,
				columnValues);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void createUserAcount(String username, String password,
			String fullName, Date dateOfBirth, String PhoneNo1,
			String PhoneNo2, String emailAddress, String localAddress,
			String aboutMe) {
		UserAccount userAccount = new UserAccount();
		userAccount.setUsername(username);
		userAccount.setPassword(password);
		userAccount.setFullName(fullName);
		userAccount.setDateOfBirth(dateOfBirth);
		// when user request for account activeness is false admin activates it.
		userAccount.setActive(Boolean.FALSE);
		userAccount.setPhoneNo1(PhoneNo1);
		userAccount.setPhoneNo2(PhoneNo2);
		userAccount.setEmailAddress(emailAddress);
		userAccount.setAddress(localAddress);
		userAccount.setAboutMe(aboutMe);
		userAccountDAO.save(userAccount);
	}

	@Override
	public List<UserAccountDTO> getAllUserAccount() {
		List<UserAccount> userAccounts = userAccountDAO.loadAll();
		List<UserAccountDTO> userAccountDTDtos = new ArrayList<UserAccountDTO>();
		for (UserAccount userAccount : userAccounts) {
			userAccountDTDtos.add(UserAccountTransformer.tansform(userAccount));
		}
		return userAccountDTDtos;
	}

	@Override
	public List<UserAccountDTO> getUserAccountByActiveStatus(Boolean active) {
		String[] columnNames = { "active" };
		Object[] columnValues = { active };
		List<UserAccount> userAccounts = userAccountDAO.findByColumnAndValue(
				columnNames, columnValues);
		List<UserAccountDTO> userAccountDTDtos = new ArrayList<UserAccountDTO>();
		for (UserAccount userAccount : userAccounts) {
			userAccountDTDtos.add(UserAccountTransformer.tansform(userAccount));
		}
		return userAccountDTDtos;
	}

	@Override
	public UserAccount getUserAccountByUsername(String username) {
		String[] columnNames = { "username" };
		Object[] columnValues = { username };
		return userAccountDAO.getSafeSingleEntityByColumnAndValue(columnNames,
				columnValues);
	}

	@Override
	public UserAccountDTO getDTO(UserAccount userAccount){
		return UserAccountTransformer.tansform(userAccount);
	}
	
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void activateDeactivateUserAccount(String username,Boolean toActivate) {
		UserAccount userAccount = getUserAccountByUsername(username);
		if(toActivate){
			userAccount.setActive(Boolean.TRUE);
		}else{
			userAccount.setActive(Boolean.FALSE);
		}
		userAccountDAO.update(userAccount);
		if (toActivate && userAccount.getUserRole() == null) {
			userRoleService.saveUserRole(UserRoleEnum.USER, userAccount);
		}
		log.debug("Activate The User Account = " + username);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void makeUserAdmin(String username){
		UserRole userRole = getUserAccountByUsername(username).getUserRole();
		userRole.setRoleEnum(UserRoleEnum.ADMIN);
		userRoleService.updateUserRole(userRole);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void update(UserAccount userAccount){
		userAccountDAO.update(userAccount);
	}
}
