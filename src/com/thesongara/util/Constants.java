package com.thesongara.util;

import java.text.SimpleDateFormat;

/**
 * Application-wide constants
 */
public class Constants {

	/* Display date format on Web pages */
	public static final String DISPLAY_DATE_FORMAT = "yyyy-MM-dd hh:mm:ss.SSSSSS";

	public static final String SQL_DATE = "yyyy-MM-dd HH:mm:ss";

	public static final String PASSENGER_DOB = "yyyy-MM-dd";

	public static final String DATE_PICKER = "MM/dd/yyyy";

	/* Ascending order Constant */
	public static final String ASCENDING_ORDER = "asc";

	/* Descending order Constant */
	public static final String DESCENDING_ORDER = "desc";

	public static final String ROLE_ADMIN = "ADMIN";

	public static final String ROLE_MANAGER = "MANAGER";

	public static final String ROLE_USER = "USER";
	
	public static final String ROLE_GUEST = "GUEST";
	
	// Default database values
	public static final String NONE = "none";
		
	public static final SimpleDateFormat SDF = new SimpleDateFormat(Constants.SQL_DATE);
	
	//Mobile Number Related Constants
	public static final String MOBILE_NUMBER_SAPARATOR= "#";
	public static final String COUNTRYCODE_MOBILE_NUMBER_SAPARATOR="-";
	public static final String INDIA_COUNTRY_CODE="91";

	//SMS Related Constants
	public static final String SMS_URL_HEAD="http://premiumsms.highspeedsms.com/sendsms.jsp?user=rajpal&password=rajpal";
	public static final String SMS_MOBILE_NUMBERS="mobiles=";
	public static final String SMS_CONTENT="sms=";
	public static final String SMS_URL_TAIL="unicode=UTF-8&senderid=SONGRA&version=3";
	
	
	public static final String CHAR_AMPERCENT="&";
}