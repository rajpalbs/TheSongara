package com.thesongara.dao.user;

import java.util.List;

import com.thesongara.dao.IBaseDAO;
import com.thesongara.model.user.UserAccount;

public interface IUserAccountDAO extends IBaseDAO<UserAccount> {
	public List<UserAccount> loadAll();
}
