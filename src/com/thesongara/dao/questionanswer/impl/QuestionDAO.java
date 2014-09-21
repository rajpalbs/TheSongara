package com.thesongara.dao.questionanswer.impl;

import org.springframework.stereotype.Repository;

import com.thesongara.dao.impl.BaseDAO;
import com.thesongara.dao.questionanswer.IQuestionDAO;
import com.thesongara.model.questionanswer.Question;

@Repository
public class QuestionDAO extends BaseDAO<Question> implements IQuestionDAO {

}
