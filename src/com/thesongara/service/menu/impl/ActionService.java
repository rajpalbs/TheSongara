package com.thesongara.service.menu.impl;

import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thesongara.dao.menu.IActionDAO;
import com.thesongara.service.menu.IActionService;

@Service
public class ActionService implements IActionService {
	
	@Autowired
	private IActionDAO actionDAO;
	
	public Map<String, Set<Object>> getAllAction(){
		return null;
	}
}
