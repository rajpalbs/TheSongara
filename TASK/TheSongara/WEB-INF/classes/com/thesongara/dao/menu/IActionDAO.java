package com.thesongara.dao.menu;

import java.util.Map;
import java.util.Set;

import com.thesongara.dao.IBaseDAO;
import com.thesongara.model.menu.Action;

public interface IActionDAO extends IBaseDAO<Action> {
	public Map<String,Set<Action>> getChildActionMap();
}
