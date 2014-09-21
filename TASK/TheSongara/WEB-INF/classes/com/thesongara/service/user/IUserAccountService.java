package com.thesongara.service.user;

import java.util.Date;
import java.util.List;

import com.thesongara.dto.user.UserAccountDTO;
import com.thesongara.model.user.UserAccount;

public interface IUserAccountService {

	public UserAccount validateLogin(String username, String password);
	public UserAccount getUserAccountByUsername(String username);
	public UserAccount getUserAccountByEmail(String email);
	public void createUserAcount(String username, String password,
			String fullName,Date dateOfBirth, String homePhone,
			String mobilePhone, String emailAddress, String localAddress, String aboutMe);
	
	public List<UserAccountDTO> getAllUserAccount();
	public List<UserAccountDTO> getUserAccountByActiveStatus(Boolean active);
	public void activateDeactivateUserAccount(UserAccount userAccount,Boolean toActivate);
	public UserAccountDTO getDTO(UserAccount userAccount); 
	public void makeUserAdmin(UserAccount userAccount);
	public void update(UserAccount userAccount);
	

}
