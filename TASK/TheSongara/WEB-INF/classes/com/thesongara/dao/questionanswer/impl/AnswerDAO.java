package com.thesongara.dao.questionanswer.impl;

import org.springframework.stereotype.Repository;

import com.thesongara.dao.impl.BaseDAO;
import com.thesongara.dao.questionanswer.IAnswerDAO;
import com.thesongara.model.questionanswer.Answer;

@Repository
public class AnswerDAO extends BaseDAO<Answer> implements IAnswerDAO {
}
