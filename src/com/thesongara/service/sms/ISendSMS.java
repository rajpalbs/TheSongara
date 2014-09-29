package com.thesongara.service.sms;

import com.thesongara.dto.sms.SendSMSDTO;

public interface ISendSMS{
	public void send(SendSMSDTO sendSMSDTO);
}
