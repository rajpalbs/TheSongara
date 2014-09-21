package com.thesongara.dao.user.impl;

import org.springframework.stereotype.Repository;

import com.thesongara.dao.impl.BaseDAO;
import com.thesongara.dao.user.IUserRoleDAO;
import com.thesongara.model.user.UserRole;

@Repository
public class UserRoleDAO extends BaseDAO<UserRole> implements IUserRoleDAO {
}