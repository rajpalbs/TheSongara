package com.thesongara.model.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.thesongara.enums.UserRoleEnum;
import com.thesongara.model.BaseEntity;

@Entity
@Table(name = "user_role")
public class UserRole extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Enumerated(EnumType.STRING)
	@Column(name = "role_name")
	private UserRoleEnum roleEnum;

	@OneToOne
	@JoinColumn(name = "user_account_id", referencedColumnName = "id")
	private UserAccount userAccount;

	public UserRoleEnum getRoleEnum() {
		return roleEnum;
	}

	public void setRoleEnum(UserRoleEnum roleEnum) {
		this.roleEnum = roleEnum;
	}

	public UserAccount getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(UserAccount userAccount) {
		this.userAccount = userAccount;
	}

}
