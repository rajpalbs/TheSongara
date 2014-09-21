package com.thesongara.service.security.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.thesongara.dao.security.ICustomUserDetailsDAO;
import com.thesongara.service.security.ICustomUserDetailService;

public class CustomUserDetailService  implements ICustomUserDetailService{

	@Autowired
	private ICustomUserDetailsDAO customUserDetailsDAO;
	
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException{
		return customUserDetailsDAO.loadUserByUsername(username);
	}
}
