package com.thesongara.model.questionanswer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.thesongara.model.BaseEntity;
import com.thesongara.model.user.UserAccount;

@Entity
@Table(name = "question")
public class Question extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "question")
	private String question;

	@ManyToOne
	@JoinColumn(name = "user", referencedColumnName = "id", nullable = false)
	private UserAccount user;

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public UserAccount getUser() {
		return user;
	}

	public void setUser(UserAccount user) {
		this.user = user;
	}

}
