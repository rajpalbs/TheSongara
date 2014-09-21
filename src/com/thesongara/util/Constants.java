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

	/* Product Name Consonants */
	public static final String AIR_PRODUCT = "Air";
	public static final String INSURANCE_PRODUCT = "Insurance";

	/* Ascending order Constant */
	public static final String ASCENDING_ORDER = "asc";

	/* Descending order Constant */
	public static final String DESCENDING_ORDER = "desc";

	public static final String ROLE_ADMIN = "admin";

	public static final String ROLE_MANAGER = "manager";

	public static final String ROLE_AGENT = "agent";

	// User Flight Network Vendor code for fees
	public static final String PROVIDER_FOR_FEE = "FEE";

	// Default database values
	public static final String NONE = "none";

	public static final String NO_SPECIAL_ASSITANCE = "No Special Assistance";

	/* Manual booking Services */
	public static final String LOCALHOST = "localhost";
	public static final String LOCAL_IP = "127.0.0.1";
	public static final String MANUAL_BOOKING = "Manual-Booking";
	public static final String LANGUAGE = "EN";

	public static final String PDP_UNLIMITED = "Unlimited";
	
	public static final SimpleDateFormat SDF = new SimpleDateFormat(Constants.SQL_DATE);

}
