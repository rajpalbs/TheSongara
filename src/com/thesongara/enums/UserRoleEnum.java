package com.thesongara.enums;

public enum UserRoleEnum {

	ADMIN("ADMIN"), MANAGER("MANAGER"), USER("USER"), GUEST("GUEST");

	private String roleName;

	private UserRoleEnum(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleName() {
		return this.roleName;
	}
}
