package com.thesongara.service.sms.impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.stereotype.Service;

import com.thesongara.dto.sms.SendSMSDTO;
import com.thesongara.service.sms.ISendSMS;
import com.thesongara.util.Constants;

@Service
public class SendSMS implements ISendSMS {
	
	@Override
	public void send(SendSMSDTO sendSMSDTO) {
		// http://premiumsms.highspeedsms.com/sendsms.jsp?user=rajpal&password=rajpal&mobiles=91xxxxxxxxxx&sms=testmsg&unicode=0&senderid=SONGRA&version=3
		String URL = generateURL(sendSMSDTO);
		HttpClient client = new DefaultHttpClient();
	    HttpPost post = new HttpPost(URL);
	    try {
	      HttpResponse response = client.execute(post);
	      BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
	      String line = "";
	      while ((line = rd.readLine()) != null) {
	    	  //LOG THE RESPONSE IN FILE.
	    	  System.out.println(line);
	      }
	    }catch(Exception e){
	    	e.printStackTrace();
	    } 
	}
	
	private String generateURL(SendSMSDTO sendSMSDTO){
		Set<String> mobileNumberSet = new HashSet<String>();
		if(sendSMSDTO.getSendTo() == null){
			return null;
		}
		for(String mobileNumbers : sendSMSDTO.getSendTo()){
			for(String number : mobileNumbers.split(Constants.MOBILE_NUMBER_SAPARATOR)){
				String[] actualNumber = number.split(Constants.COUNTRYCODE_MOBILE_NUMBER_SAPARATOR);
				if(actualNumber.length > 1){
					mobileNumberSet.add(Constants.INDIA_COUNTRY_CODE+actualNumber[1]);
				}
			}
		}
		String mobileNumbers = StringUtils.join(mobileNumberSet, ',');
		String URL = "";
		try {
			URL = Constants.SMS_URL_HEAD+
					 Constants.CHAR_AMPERCENT+
					 Constants.SMS_MOBILE_NUMBERS+mobileNumbers+
					 Constants.CHAR_AMPERCENT+
					 Constants.SMS_CONTENT+URLEncoder.encode(sendSMSDTO.getSmsText(),"UTF-8")+
					 Constants.CHAR_AMPERCENT+
					 Constants.SMS_URL_TAIL;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return URL;
	}
}
