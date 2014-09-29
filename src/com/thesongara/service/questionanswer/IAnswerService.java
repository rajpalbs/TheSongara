package com.thesongara.service.questionanswer;

import java.util.Set;

import com.thesongara.model.questionanswer.Answer;
import com.thesongara.model.questionanswer.Question;
import com.thesongara.model.user.UserAccount;

public interface IAnswerService {
	public Set<Answer> loadAnswerOfQuestion(Question question);
	public void saveAnswer(UserAccount account,Question question,String answer);
}
