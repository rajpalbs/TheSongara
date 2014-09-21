package com.thesongara.dto.questionanswer;

public class PostQuestionDTO {

	private String question;

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("PostQuestionDTO [question=");
		builder.append(question);
		builder.append("]");
		return builder.toString();
	}

}
