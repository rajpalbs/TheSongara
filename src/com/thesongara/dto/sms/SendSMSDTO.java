package com.thesongara.dto.sms;

import java.util.Arrays;

public class SendSMSDTO {

	private String[] name;
	private String[] username;
	private String[] sendTo;
	private String smsText;

	public String[] getName() {
		return name;
	}

	public void setName(String[] name) {
		this.name = name;
	}

	public String[] getUsername() {
		return username;
	}

	public void setUsername(String[] username) {
		this.username = username;
	}

	public String[] getSendTo() {
		return sendTo;
	}

	public void setSendTo(String[] sendTo) {
		this.sendTo = sendTo;
	}

	public String getSmsText() {
		return smsText;
	}

	public void setSmsText(String smsText) {
		this.smsText = smsText;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("SendSMSDTO [name=");
		builder.append(Arrays.toString(name));
		builder.append(", username=");
		builder.append(Arrays.toString(username));
		builder.append(", sendTo=");
		builder.append(Arrays.toString(sendTo));
		builder.append(", smsText=");
		builder.append(smsText);
		builder.append("]");
		return builder.toString();
	}

}
