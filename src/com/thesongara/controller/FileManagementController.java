package com.thesongara.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class FileManagementController {
	
	static Logger log = Logger.getLogger(LoginController.class);
	
	@RequestMapping(value = "/fileDownload.do", method = {RequestMethod.GET, RequestMethod.POST})
	public void fileDownload(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("application/zip");
		response.setHeader("Content-Disposition","attachment;filename=History.zip");
		ServletContext ctx = request.getServletContext();
		InputStream is = ctx.getResourceAsStream("/resources/download/History.zip");
	 
		int read=0;
		byte[] bytes = new byte[1024];
		OutputStream os = response.getOutputStream();
	 
		while((read = is.read(bytes))!= -1){
			os.write(bytes, 0, read);
		}
		os.flush();
		os.close();
	}
}
