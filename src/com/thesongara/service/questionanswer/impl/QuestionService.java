package com.thesongara.service.questionanswer.impl;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.thesongara.dao.questionanswer.IQuestionDAO;
import com.thesongara.model.DBValue;
import com.thesongara.model.questionanswer.Answer;
import com.thesongara.model.questionanswer.Question;
import com.thesongara.service.questionanswer.IAnswerService;
import com.thesongara.service.questionanswer.IQuestionService;
import com.thesongara.service.user.IUserAccountService;

@Service
public class QuestionService implements IQuestionService {

	@Autowired
	private IQuestionDAO questionDAO;
	
	@Autowired
	private IAnswerService answerService;
	
	@Autowired
	private IUserAccountService userAccountService;

	@Override
	public Question getQuestionById(long id){
		return questionDAO.load(id);
	}
	
	@Override
	public Map<Question, Set<Answer>> getAllQuestionAndItsAnswer() {
		//List<Question> questions = questionDAO.loadAll();
		String[] columnNames = {"id"};
		Object[] object = new Object[1];
		object[0] = DBValue.NotNull;
		List<Question> questions = questionDAO.findColumnAndValueByOrder(columnNames, object, "questionDate", false, "desc");
		//doing pagination is remian use created findColumnAndValueByOrderPagination method in base dao.
		Map<Question, Set<Answer>> questionAnswerMap = new LinkedHashMap<Question, Set<Answer>>();
		for (Question question : questions) {
			/* the below getAnswers is commented because one to many fetch type is lazy,
			   so at the time question loaded in hibernet answer is not loaded 	
			   so for loading them we have two option
			   1) put fetch type EAGER in question class for answer
			   	  but here disadvantage is in every case when question loaded answer going to loaded.
			   2) loaded the answer of perticular question,explicitly.like we do here.	  
			  */
			
			//questionAnswerMap.put(question, question.getAnswers());
			Set<Answer> answer = answerService.loadAnswerOfQuestion(question);
			questionAnswerMap.put(question,answer);
		}
		return questionAnswerMap;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void SaveQuestion(String username,String strQuestion){
		Question question = new Question();
		question.setUser(userAccountService.getUserAccountByUsername(username));
		question.setQuestion(strQuestion);
		question.setQuestionDate(new Date());
		questionDAO.save(question);
	}
}
