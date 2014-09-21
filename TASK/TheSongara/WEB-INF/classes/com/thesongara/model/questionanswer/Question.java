package com.thesongara.model.questionanswer;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.thesongara.model.BaseEntity;
import com.thesongara.model.user.UserAccount;

@Entity
@Table(name = "question")
public class Question extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "question")
	private String question;
	
	@Column(name="question_date")
	private Date questionDate;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
	private UserAccount user;

	@OneToMany(mappedBy = "question")
	private Set<Answer> answers;

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}
	
	public Date getQuestionDate() {
		return questionDate;
	}

	public void setQuestionDate(Date questionDate) {
		this.questionDate = questionDate;
	}

	public UserAccount getUser() {
		return user;
	}

	public void setUser(UserAccount user) {
		this.user = user;
	}

	public Set<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(Set<Answer> answers) {
		this.answers = answers;
	}

}
