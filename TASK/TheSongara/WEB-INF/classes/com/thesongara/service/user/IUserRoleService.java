package com.thesongara.service.user;

import com.thesongara.enums.UserRoleEnum;
import com.thesongara.model.user.UserAccount;
import com.thesongara.model.user.UserRole;

public interface IUserRoleService {
	public void saveUserRole(UserRoleEnum roleEnum,UserAccount userAccount);
	public void updateUserRole(UserRole userRole);
}
