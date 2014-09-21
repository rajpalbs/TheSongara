package com.thesongara.service.user.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.thesongara.dao.user.IUserRoleDAO;
import com.thesongara.enums.UserRoleEnum;
import com.thesongara.model.user.UserAccount;
import com.thesongara.model.user.UserRole;
import com.thesongara.service.user.IUserRoleService;

@Service
public class UserRoleService implements IUserRoleService {
	
	@Autowired
	private IUserRoleDAO userRoleDAO;
	
	public void saveUserRole(UserRoleEnum roleEnum,UserAccount userAccount){
		UserRole userRole = new UserRole();
		userRole.setUserAccount(userAccount);
		userRole.setRoleEnum(roleEnum);
		userRoleDAO.saveOrUpdate(userRole);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void updateUserRole(UserRole userRole){
		userRoleDAO.update(userRole);
	}
}
