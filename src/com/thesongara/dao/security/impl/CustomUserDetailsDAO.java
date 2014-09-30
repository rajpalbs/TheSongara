package com.thesongara.dao.security.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.thesongara.dao.security.ICustomUserDetailsDAO;
import com.thesongara.dao.user.IUserAccountDAO;
import com.thesongara.dao.user.IUserRoleDAO;
import com.thesongara.dto.user.TheSongaraUserDTO;
import com.thesongara.model.user.UserRole;
import com.thesongara.util.CommonUtility;

@Repository
public class CustomUserDetailsDAO implements ICustomUserDetailsDAO {

	@Autowired
	private IUserAccountDAO userAccountDAO;
	
	@Autowired
	private IUserRoleDAO userRoleDAO; 
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException {

		String[] columnNames = new String[] { "username", "active" };
		Object[] columnValues = new Object[] { username, true};

		com.thesongara.model.user.UserAccount userAccount = userAccountDAO
				.getSafeSingleEntityByColumnAndValue(columnNames, columnValues);

		List<UserRole> userRoles = null;
		List<String> roleList = new ArrayList<String>();
		userRoles = userRoleDAO.findByColumnAndValue("userAccount.id",
				userAccount.getId());
		for (UserRole userRole : userRoles) {
			roleList.add(userRole.getRoleEnum().getRoleName());
		}

		TheSongaraUserDTO user = new TheSongaraUserDTO(userAccount.getId(), userAccount.getFullName()
				, userAccount.getFullName()
				, username, userAccount.getPassword(),
				userAccount.getActive(), getAuthoritiesForUser(roleList),
				roleList);

		return user;
	}

	private GrantedAuthority[] getAuthoritiesForUser(List<String> roleList) {
		Collection<GrantedAuthority> authorities = CommonUtility.getAuthorities(roleList);
		return authorities.toArray(new GrantedAuthority[authorities.size()]);
	}
}
