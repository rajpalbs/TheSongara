package com.thesongara.dao.user.impl;

import org.springframework.stereotype.Repository;

import com.thesongara.dao.impl.BaseDAO;
import com.thesongara.dao.user.IUserAccountDAO;
import com.thesongara.model.user.UserAccount;

@Repository
public class UserAccountDAO extends BaseDAO<UserAccount>  implements IUserAccountDAO {
}
