package com.thesongara.dao.user.impl;

import org.springframework.stereotype.Repository;

import com.thesongara.dao.impl.BaseDAO;
import com.thesongara.dao.user.ICommentsDAO;
import com.thesongara.model.user.Comments;

@Repository
public class CommentsDAO extends BaseDAO<Comments>  implements ICommentsDAO{

}
