package com.thesongara.service.questionanswer;

import java.util.Map;
import java.util.Set;

import com.thesongara.model.questionanswer.Answer;
import com.thesongara.model.questionanswer.Question;

public interface IQuestionService {

	public Map<Question, Set<Answer>> getAllQuestionAndItsAnswer();
	public Question getQuestionById(long id);
	public void SaveQuestion(String userName,String Question);

}
