package com.thesongara.util;

/**
 * DateTimeUtils.java is used for user define date functions. (like convert string date to Date class data type.) 
 * @author Alpesh Lodhari  
 */

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.joda.time.DateTime;
import org.joda.time.Minutes;
import org.joda.time.Years;

public class DateTimeUtils {

	public static int yearsBetween(Date dateEarlier, Date dateLater) {
		DateTime dateTimeEarlier = new DateTime(dateEarlier);
		DateTime dateTimeLater = new DateTime(dateLater);
		return Years.yearsBetween(dateTimeEarlier, dateTimeLater).getYears();
	}

	public static int minutesBetween(Date dateEarlier, Date dateLater) {
		DateTime dateTimeEarlier = new DateTime(dateEarlier);
		DateTime dateTimeLater = new DateTime(dateLater);
		return Minutes.minutesBetween(dateTimeEarlier, dateTimeLater).getMinutes();
	}

	public static String getFormattedDate(Date date, String pattern) {
		if (date == null)
			return "";
		SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
		return dateFormat.format(date);
	}

	public static Date parseDate(SimpleDateFormat sdf, String stringDate) {
		Date date = null;
		try {
			date = sdf.parse(stringDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	public static String changeDateFormat(String fromPattern,String toPattern,Date date){
		SimpleDateFormat sdf = new SimpleDateFormat(fromPattern);
		sdf.applyPattern(toPattern);
		return sdf.format(date);
	}
	
	public static String changeDateFormatISTTimeZone(String fromPattern,String toPattern,Date date){
		SimpleDateFormat sdf = new SimpleDateFormat(fromPattern);
		sdf.applyPattern(toPattern);
		sdf.setTimeZone(TimeZone.getTimeZone("EST"));
		return sdf.format(date);
	}
}