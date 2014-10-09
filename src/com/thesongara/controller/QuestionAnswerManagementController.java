package com.thesongara.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.thesongara.dto.questionanswer.AnswerDTO;
import com.thesongara.dto.questionanswer.QuestionDTO;
import com.thesongara.model.questionanswer.Answer;
import com.thesongara.model.questionanswer.Question;
import com.thesongara.model.user.UserAccount;
import com.thesongara.service.questionanswer.IAnswerService;
import com.thesongara.service.questionanswer.IQuestionService;
import com.thesongara.service.user.IUserAccountService;
import com.thesongara.transformer.QuestionAnswerDetailDTOTransformer;
import com.thesongara.util.CommonUtility;
import com.thesongara.util.Constants;
import com.thesongara.util.DateTimeUtils;

@Controller
public class QuestionAnswerManagementController {
		
	@Autowired
	private IQuestionService questionService;
	
	@Autowired
	private IAnswerService answerService;

	@Autowired
	private IUserAccountService userAccountService;
	
	@RequestMapping(value = "/postQuestion.do", method = RequestMethod.POST)
	public String postQuestion(HttpServletRequest request) {
		String userName = CommonUtility.getLoggedInUserContext() == null ? Constants.ROLE_GUEST : CommonUtility.getLoggedInUserContext().getUsername();
		UserAccount account = userAccountService.getUserAccountByUsername(userName);
		if(account != null){
			questionService.SaveQuestion(account.getUsername(), request.getParameter("question"));
		}
		return "redirect:/discussion.do";
	}
	
	@RequestMapping(value = "/discussion.do", method = RequestMethod.GET)
	public String showQuestionAnswer(ModelMap map){
		Map<Question,Set<Answer>> questions = questionService.getAllQuestionAndItsAnswer();
		Map<QuestionDTO, List<AnswerDTO>> resultDTO = QuestionAnswerDetailDTOTransformer.transform(questions);
		map.put("resultDTO", resultDTO);
		return "QuestionAnswer";
	}
	
	@RequestMapping(value = "/putAnswer.do", method = RequestMethod.GET)
	public @ResponseBody AnswerDTO postAnswer(HttpServletRequest request){
		String userName = CommonUtility.getLoggedInUserContext() == null ? Constants.ROLE_GUEST : CommonUtility.getLoggedInUserContext().getUsername();
		UserAccount account = userAccountService.getUserAccountByUsername(userName);
		if(account != null){
			Question question = questionService.getQuestionById(Long.parseLong(request.getParameter("questionId")));
			answerService.saveAnswer(account, question, request.getParameter("answer"));
		}
		AnswerDTO answerDTO = new AnswerDTO();
		answerDTO.setAnswer(request.getParameter("answer"));
		answerDTO.setAnswerGivenBy(userName);
		answerDTO.setAnswerDate(DateTimeUtils.changeDateFormatISTTimeZone("E MMM dd hh:mm:ss Z yyyy", "dd/MM/yyyy, hh:mma", new Date()));
		return answerDTO;
	}
}
