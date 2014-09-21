package com.thesongara.model.questionanswer;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.thesongara.model.BaseEntity;
import com.thesongara.model.user.UserAccount;

@Entity
@Table(name = "question_uesr_notification")
public class QuestionUserNotification extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
	private UserAccount user;

	@ManyToOne
	@JoinColumn(name = "question_id", referencedColumnName = "id", nullable = false)
	private Question question;

	public UserAccount getUser() {
		return user;
	}

	public void setUser(UserAccount user) {
		this.user = user;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	
}
