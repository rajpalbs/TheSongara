package com.thesongara.mail;

import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.apache.commons.lang.StringUtils;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.ui.velocity.VelocityEngineUtils;

@Component("emailSender")
public class EmailSender {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private VelocityEngine velocityEngine;
    
    @Async
    public void sendEmail(final String toEmailAddresses,
    					  final String subject,
    					  final String template,
    					  final Map<String, Object> data) {
    	sendEmail(toEmailAddresses, subject, template, data, null, null);
    }

    @Async
	public void sendEmailWithAttachment(final String toEmailAddresses,										
										final String subject,
										final String template,
				    					final Map<String, Object> data,
										final String attachmentPath,
										final String attachmentName) {
		sendEmail(toEmailAddresses, subject, template, data, attachmentPath, attachmentName);
	}

    @Async
	private void sendEmail(final String toEmailAddresses,
						   final String subject,
						   final String template,
	    				   final Map<String, Object> data,
						   final String attachmentPath,
						   final String attachmentName) {
		MimeMessagePreparator preparator = new MimeMessagePreparator() {
			public void prepare(MimeMessage mimeMessage) throws Exception {
				MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true);
				message.setTo(toEmailAddresses);
				message.setSubject(subject);
				String body = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, template, "UTF-8", data);
				message.setText(body, true);
				if (!StringUtils.isBlank(attachmentPath)) {
					FileSystemResource file = new FileSystemResource(attachmentPath);
					message.addAttachment(attachmentName, file);
				}
			}
		};
		this.mailSender.send(preparator);
	}
}
