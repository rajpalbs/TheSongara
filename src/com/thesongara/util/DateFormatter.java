package com.thesongara.util;

import java.text.SimpleDateFormat;

public class DateFormatter {
	
	public static SimpleDateFormat getMMddyyyyFormat(){
		return new SimpleDateFormat("MM/dd/yyyy");
	}
	
	public static SimpleDateFormat getMMddyyyyhhmmssFormat(){
		return new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	}
	
	public static SimpleDateFormat getddMMyyyyFormat(){
		return new SimpleDateFormat("dd/MM/yyyy");
	}
	
	
	public static SimpleDateFormat getYYYYMMddFormat(){
		return new SimpleDateFormat("yyyy-MM-dd");
	}
	
}
