package com.thesongara.transformer;

import com.thesongara.dto.user.UserAccountDTO;
import com.thesongara.model.user.UserAccount;
import com.thesongara.util.DateTimeUtils;

public class UserAccountTransformer {
	public static UserAccountDTO tansform(UserAccount userAccount){
		UserAccountDTO userAccountDTO = new UserAccountDTO();
		if(userAccount != null){
			userAccountDTO.setUsername(userAccount.getUsername()==null ? "" : userAccount.getUsername());
			userAccountDTO.setUserRole(userAccount.getUserRole()==null? null : userAccount.getUserRole().getRoleEnum());
			
			if(userAccount.getFullName() != null){
				userAccountDTO.setSurname(userAccount.getFullName().split("\\s+")[0]);
				userAccountDTO.setFirstName(userAccount.getFullName().split("\\s+")[1]);
				userAccountDTO.setLastName(userAccount.getFullName().split("\\s+")[2]);
			}
			userAccountDTO.setFullName(userAccount.getFullName()==null ? "" : userAccount.getFullName());
			
			userAccountDTO.setDob(userAccount.getDateOfBirth()==null ? "" :
				DateTimeUtils.changeDateFormat("yyyy-MM-dd", "dd/MM/yyyy",userAccount.getDateOfBirth()));
			userAccountDTO.setActive(userAccount.getActive());
			
			if(userAccount.getPhoneNo1() != null){
				int index = userAccount.getPhoneNo1().indexOf("-");
				userAccountDTO.setCountryCode1(userAccount.getPhoneNo1().substring(0,index));
				userAccountDTO.setContact1(userAccount.getPhoneNo1().substring(index+1));
			}
			userAccountDTO.setPhoneNo1(userAccount.getPhoneNo1()==null ? "" : userAccount.getPhoneNo1());
			
			if(userAccount.getPhoneNo2() != null){
				int index = userAccount.getPhoneNo2().indexOf("-");
				userAccountDTO.setCountryCode2(userAccount.getPhoneNo2().substring(0,index));
				userAccountDTO.setContact2(userAccount.getPhoneNo2().substring(index+1));	
			}
			userAccountDTO.setPhoneNo2(userAccount.getPhoneNo2()==null ? "" : userAccount.getPhoneNo2());
			
			userAccountDTO.setEmail(userAccount.getEmailAddress()==null ? "" : userAccount.getEmailAddress());
			userAccountDTO.setAddress(userAccount.getAddress()==null ? "" : userAccount.getAddress());
			userAccountDTO.setAboutMe(userAccount.getAboutMe()==null ? "" : userAccount.getAboutMe());
		}
		return userAccountDTO;
	}

}
