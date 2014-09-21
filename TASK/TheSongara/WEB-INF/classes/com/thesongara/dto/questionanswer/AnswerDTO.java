package com.thesongara.dto.questionanswer;

public class AnswerDTO {
	
	private long answerId;
	private String answer;
	private String answerGivenBy;
	private String answerDate;

	public AnswerDTO() {
	}

	public AnswerDTO(String answer, String answerGivenBy) {
		super();
		this.answer = answer;
		this.answerGivenBy = answerGivenBy;
	}

	public long getAnswerId() {
		return answerId;
	}

	public void setAnswerId(long answerId) {
		this.answerId = answerId;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getAnswerGivenBy() {
		return answerGivenBy;
	}

	public void setAnswerGivenBy(String answerGivenBy) {
		this.answerGivenBy = answerGivenBy;
	}

	public String getAnswerDate() {
		return answerDate;
	}

	public void setAnswerDate(String answerDate) {
		this.answerDate = answerDate;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("AnswerDTO [answer=");
		builder.append(answer);
		builder.append(", answerGivenBy=");
		builder.append(answerGivenBy);
		builder.append(", answerDate=");
		builder.append(answerDate);
		builder.append("]");
		return builder.toString();
	}

}
