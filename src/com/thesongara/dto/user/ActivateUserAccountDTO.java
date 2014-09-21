package com.thesongara.dto.user;

import java.util.Arrays;

public class ActivateUserAccountDTO {

	private String[] activate;
	private String[] deactivate;
	private String[] makeAdmin;

	public String[] getActivate() {
		return activate;
	}

	public void setActivate(String[] activate) {
		this.activate = activate;
	}

	public String[] getDeactivate() {
		return deactivate;
	}

	public void setDeactivate(String[] deactivate) {
		this.deactivate = deactivate;
	}

	public String[] getMakeAdmin() {
		return makeAdmin;
	}

	public void setMakeAdmin(String[] makeAdmin) {
		this.makeAdmin = makeAdmin;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ActivateUserAccountDTO [activate=");
		builder.append(Arrays.toString(activate));
		builder.append(", deactivate=");
		builder.append(Arrays.toString(deactivate));
		builder.append(", makeAdmin=");
		builder.append(Arrays.toString(makeAdmin));
		builder.append("]");
		return builder.toString();
	}

}
