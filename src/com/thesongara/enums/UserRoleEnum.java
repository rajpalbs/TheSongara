package com.thesongara.enums;

public enum UserRoleEnum {

	ADMIN("ADMIN"), MANAGER("MANAGER"), USER("USER");

	private String roleName;

	private UserRoleEnum(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleName() {
		return this.roleName;
	}
}
