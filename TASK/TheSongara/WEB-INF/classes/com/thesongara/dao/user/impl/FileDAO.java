package com.thesongara.dao.user.impl;

import org.springframework.stereotype.Repository;

import com.thesongara.dao.impl.BaseDAO;
import com.thesongara.dao.user.IFileDAO;
import com.thesongara.model.user.File;

@Repository
public class FileDAO extends BaseDAO<File> implements IFileDAO{

}
