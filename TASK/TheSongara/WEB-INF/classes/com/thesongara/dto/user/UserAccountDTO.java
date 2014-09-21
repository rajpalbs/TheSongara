package com.thesongara.dto.user;

import org.apache.commons.lang.StringUtils;

import com.thesongara.enums.UserRoleEnum;

public class UserAccountDTO {

	private String username;
	private String password;
	private String surname;
	private String firstName;
	private String lastName;
	private String countryCode1;
	private String contact1;
	private String countryCode2;
	private String contact2;
	private String email;
	private String dob;
	private Boolean active;
	private String address;
	private String aboutMe;
	private String fullName;
	private String phoneNo1;
	private String phoneNo2;
	private UserRoleEnum userRole;
	
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getCountryCode1() {
		return countryCode1;
	}

	public void setCountryCode1(String countryCode1) {
		this.countryCode1 = countryCode1;
	}

	public String getContact1() {
		return contact1;
	}

	public void setContact1(String contact1) {
		this.contact1 = contact1;
	}

	public String getCountryCode2() {
		return countryCode2;
	}

	public void setCountryCode2(String countryCode2) {
		this.countryCode2 = countryCode2;
	}

	public String getContact2() {
		return contact2;
	}

	public void setContact2(String contact2) {
		this.contact2 = contact2;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAboutMe() {
		return aboutMe;
	}

	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	
	public void setPhoneNo1(String phone1) {
		this.phoneNo1 = phone1;
	}
	
	public void setPhoneNo2(String phone2) {
		this.phoneNo2 = phone2;
	}
	
	public String getFullName() {
		if(StringUtils.isEmpty(fullName)){
			this.fullName=StringUtils.upperCase(getSurname()) + " " + StringUtils.upperCase(getFirstName()) + " " + StringUtils.upperCase(getLastName());
		}
		return fullName; 
	}

	public String getPhoneNo1() {
		if(StringUtils.isEmpty(phoneNo1)){
			this.phoneNo1=getCountryCode1() + "-" + getContact1();
		}
		return phoneNo1; 
	}

	public String getPhoneNo2() {
		if(StringUtils.isEmpty(phoneNo2) && getCountryCode2()!=null && getContact2() != null && !StringUtils.isEmpty(getContact2()) ){
			this.phoneNo2=getCountryCode2() + "-" + getContact2();
		}
		return phoneNo2; 
	}

	public UserRoleEnum getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRoleEnum userRole) {
		this.userRole = userRole;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserAccountDTO [username=");
		builder.append(username);
		builder.append(", password=");
		builder.append(password);
		builder.append(", surname=");
		builder.append(surname);
		builder.append(", firstName=");
		builder.append(firstName);
		builder.append(", lastName=");
		builder.append(lastName);
		builder.append(", countryCode1=");
		builder.append(countryCode1);
		builder.append(", contact1=");
		builder.append(contact1);
		builder.append(", countryCode2=");
		builder.append(countryCode2);
		builder.append(", contact2=");
		builder.append(contact2);
		builder.append(", email=");
		builder.append(email);
		builder.append(", dob=");
		builder.append(dob);
		builder.append(", active=");
		builder.append(active);
		builder.append(", address=");
		builder.append(address);
		builder.append(", aboutMe=");
		builder.append(aboutMe);
		builder.append(", fullName=");
		builder.append(fullName);
		builder.append(", phoneNo1=");
		builder.append(phoneNo1);
		builder.append(", phoneNo2=");
		builder.append(phoneNo2);
		builder.append(", userRole=");
		builder.append(userRole);
		builder.append("]");
		return builder.toString();
	}
	
}
