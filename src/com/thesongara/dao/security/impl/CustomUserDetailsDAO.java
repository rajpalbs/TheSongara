package com.thesongara.dao.security.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.thesongara.dao.security.ICustomUserDetailsDAO;
import com.thesongara.dao.user.IUserAccountDAO;

@Repository
public class CustomUserDetailsDAO implements ICustomUserDetailsDAO {

	@Autowired
	private IUserAccountDAO userAccountDAO;
	
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException {
		//userAccountDAO.
		return null;
	}

	
}
