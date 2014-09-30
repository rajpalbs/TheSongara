package com.thesongara.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class CommonUtility {
	public static Collection<GrantedAuthority> getAuthorities(List<String> roles) {
		List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
		for (String role : roles) {
			authList.add(new SimpleGrantedAuthority(role));
		}
		return authList;
	}
}
