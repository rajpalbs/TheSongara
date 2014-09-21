package com.thesongara.service.security;

import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface ICustomUserDetailService {
	
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException;

}
