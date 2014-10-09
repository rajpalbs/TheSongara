package com.thesongara.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.thesongara.dto.user.TheSongaraUserDTO;

public class CommonUtility {
	public static Collection<GrantedAuthority> getAuthorities(List<String> roles) {
		List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
		for (String role : roles) {
			authList.add(new SimpleGrantedAuthority(role));
		}
		return authList;
	}
	public static TheSongaraUserDTO getLoggedInUserContext() {
		return getPrincipal(getAuthentication());
	}
	
	private static Authentication getAuthentication() {
		return SecurityContextHolder.getContext().getAuthentication();
	}
	
	private static TheSongaraUserDTO getPrincipal(Authentication auth) {
		if(auth.getPrincipal() instanceof TheSongaraUserDTO){
			return (TheSongaraUserDTO) auth.getPrincipal();
		}
		return null;
		//TODO : set null not anonymousUser in security
		//return auth == null ? null : (TheSongaraUserDTO) auth.getPrincipal();
	}
}
