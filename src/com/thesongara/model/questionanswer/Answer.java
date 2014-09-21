package com.thesongara.model.questionanswer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.thesongara.model.BaseEntity;
import com.thesongara.model.user.UserAccount;

@Entity
@Table(name = "answer")
public class Answer extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "answer")
	private String answer;

	@ManyToOne
	@JoinColumn(name = "question_id", referencedColumnName = "id", nullable = false)
	private Question question;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
	private UserAccount user;

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public UserAccount getUser() {
		return user;
	}

	public void setUser(UserAccount user) {
		this.user = user;
	}

}
