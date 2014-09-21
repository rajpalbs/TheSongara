package com.thesongara.dto.questionanswer;


public class QuestionDTO {

	private long questionId;
	private String question;
	private String questionAskedBy;
	private Integer noOfAnswer = 0;
	private String postedDate;

	public long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(long questionId) {
		this.questionId = questionId;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getQuestionAskedBy() {
		return questionAskedBy;
	}

	public void setQuestionAskedBy(String questionAskedBy) {
		this.questionAskedBy = questionAskedBy;
	}

	public Integer getNoOfAnswer() {
		return noOfAnswer;
	}

	public void setNoOfAnswer(Integer noOfAnswer) {
		this.noOfAnswer = noOfAnswer;
	}

	public String getPostedDate() {
		return postedDate;
	}

	public void setPostedDate(String postedDate) {
		this.postedDate = postedDate;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("QuestionDTO [questionId=");
		builder.append(questionId);
		builder.append(", question=");
		builder.append(question);
		builder.append(", questionAskedBy=");
		builder.append(questionAskedBy);
		builder.append(", noOfAnswer=");
		builder.append(noOfAnswer);
		builder.append(", postedDate=");
		builder.append(postedDate);
		builder.append("]");
		return builder.toString();
	}

}
