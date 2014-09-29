package com.thesongara.transformer;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import com.thesongara.dto.questionanswer.AnswerDTO;
import com.thesongara.dto.questionanswer.QuestionDTO;
import com.thesongara.model.questionanswer.Answer;
import com.thesongara.model.questionanswer.Question;
import com.thesongara.util.DateTimeUtils;

public class QuestionAnswerDetailDTOTransformer {
	public static Map<QuestionDTO, List<AnswerDTO>> transform(Map<Question,Set<Answer>> questionAnswerMap){
		Map<QuestionDTO, List<AnswerDTO>> resultDTO = new HashMap<QuestionDTO, List<AnswerDTO>>();
		for(Question question : questionAnswerMap.keySet()){
			QuestionDTO questionDTO = new QuestionDTO();
			questionDTO.setQuestionId(question.getId());
			questionDTO.setQuestion(question.getQuestion());
			questionDTO.setQuestionAskedBy(question.getUser().getUsername());
			questionDTO.setPostedDate(DateTimeUtils.changeDateFormat("yyyy-MM-dd HH:mm:ss", "dd/MM/yyyy, hh:mma", question.getQuestionDate()));
			
			List<AnswerDTO> answerDTOs = new ArrayList<AnswerDTO>();
			Set<Answer> answers = questionAnswerMap.get(question);
			for(Answer answer : answers){
				AnswerDTO answerDTO = new AnswerDTO();
				answerDTO.setAnswerId(answer.getId());
				answerDTO.setAnswer(answer.getAnswer());
				answerDTO.setAnswerGivenBy(answer.getUser().getUsername());
				answerDTO.setAnswerDate(DateTimeUtils.changeDateFormat("yyyy-MM-dd HH:mm:ss", "dd/MM/yyyy, hh:mma", answer.getAnswerDate()));
				answerDTOs.add(answerDTO);
				questionDTO.setNoOfAnswer(questionDTO.getNoOfAnswer()+1);
			}
			Comparator<AnswerDTO> comparer = new Comparator<AnswerDTO>() {
		        @Override
		        public int compare(AnswerDTO o1, AnswerDTO o2) {
		            return new Long(o1.getAnswerId()).compareTo(new Long(o2.getAnswerId()));
		    }};
			Collections.sort(answerDTOs, comparer);
			resultDTO.put(questionDTO, answerDTOs);
		}
		
		Comparator<QuestionDTO> comparer = new Comparator<QuestionDTO>() {
	        @Override
	        public int compare(QuestionDTO o1, QuestionDTO o2) {
	            return new Long(o2.getQuestionId()).compareTo(new Long(o1.getQuestionId()));
	    }};
		
		Map<QuestionDTO, List<AnswerDTO>> sortedresultDTO = new TreeMap<QuestionDTO, List<AnswerDTO>>(comparer);
		sortedresultDTO.putAll(resultDTO);
		
		return sortedresultDTO;
	}
}
