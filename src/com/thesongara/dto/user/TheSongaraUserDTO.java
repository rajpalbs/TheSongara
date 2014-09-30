package com.thesongara.dto.user;

import java.util.Collection;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.thesongara.util.CommonUtility;

public class TheSongaraUserDTO implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Long userAccountId;
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private GrantedAuthority[] authorities;
	private boolean active;
	private List<String> roles;
	
	
	public TheSongaraUserDTO(Long userAccountId, String firstname, String lastname,
			String username, String password, boolean active,
			GrantedAuthority[] authorities, List<String> roles) {
		super();
		this.userAccountId = userAccountId;
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.password = password;
		this.active = active;
		setCopy(authorities);
		this.roles = roles;
	}
	public TheSongaraUserDTO(){
		super();
	}

	private void setCopy(GrantedAuthority[] authorities) {
		this.authorities = getCopy(authorities);
	}
	
	private GrantedAuthority[] getCopy(GrantedAuthority[] authorities) {
		GrantedAuthority[] copy = new GrantedAuthority[authorities.length];
		System.arraycopy(authorities, 0, copy, 0, authorities.length);
		return copy;
	}
	
	public Long getUserAccountId() {
		return userAccountId;
	}

	public void setUserAccountId(Long userAccountId) {
		this.userAccountId = userAccountId;
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public GrantedAuthority[] getauthorities() {
		return getCopy(authorities);
	}

	public void setauthorities(GrantedAuthority[] authorities) {
		setCopy(authorities);
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setPermissions(List<String> roles) {
		this.roles = roles;
	}

	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		return CommonUtility.getAuthorities(roles);
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getFirstname() {
		return firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getFullName() {
		return (StringUtils.isNotBlank(firstname) ? firstname + " " : "")
				+ (StringUtils.isNotBlank(lastname) ? lastname : "").trim();
	}

}
