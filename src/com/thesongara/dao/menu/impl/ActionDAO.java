package com.thesongara.dao.menu.impl;

import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Repository;

import com.thesongara.dao.impl.BaseDAO;
import com.thesongara.dao.menu.IActionDAO;
import com.thesongara.model.menu.Action;

@Repository
public class ActionDAO  extends BaseDAO<Action>  implements IActionDAO{
	public Map<String,Set<Action>> getChildActionMap(){
		return null;
	}

}
