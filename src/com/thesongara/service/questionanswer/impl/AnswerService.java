package com.thesongara.service.questionanswer.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.thesongara.dao.questionanswer.IAnswerDAO;
import com.thesongara.model.questionanswer.Answer;
import com.thesongara.model.questionanswer.Question;
import com.thesongara.model.user.UserAccount;
import com.thesongara.service.questionanswer.IAnswerService;

@Service
public class AnswerService implements IAnswerService {
	
	@Autowired
	private IAnswerDAO answerDAO;
	
	@Override
	public Set<Answer> loadAnswerOfQuestion(Question question){
		return new HashSet<Answer>(answerDAO.findByColumnAndValue("question",question));
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void saveAnswer(UserAccount account,Question question,String strAnswer){
		Answer answer = new Answer();
		answer.setAnswer(strAnswer);
		answer.setQuestion(question);
		answer.setUser(account);
		//TODO : answer with timezone
		answer.setAnswerDate(new Date());
		answerDAO.save(answer);
	}
}