package com.thesongara.dao.user.impl;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.thesongara.dao.impl.BaseDAO;
import com.thesongara.dao.user.IUserAccountDAO;
import com.thesongara.enums.UserRoleEnum;
import com.thesongara.model.user.UserAccount;

@Repository
public class UserAccountDAO extends BaseDAO<UserAccount>  implements IUserAccountDAO{
	
	public List<UserAccount> loadAll(){
		DetachedCriteria criteria = DetachedCriteria.forClass(UserAccount.class);
		//LOAD ONLY NON GUEST USER
		criteria.createAlias("userRole", "userRole").
				 add(Restrictions.ne("userRole.roleEnum", UserRoleEnum.GUEST));
		
		return findByCriteria(criteria);
	}
}
