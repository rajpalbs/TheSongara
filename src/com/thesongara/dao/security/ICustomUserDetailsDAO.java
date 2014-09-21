package com.thesongara.dao.security;

import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface ICustomUserDetailsDAO {

	UserDetails loadUserByUsername(final String username)
			throws UsernameNotFoundException, DataAccessException;
}
