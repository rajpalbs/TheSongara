package com.thesongara.model.menu;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.thesongara.model.BaseEntity;

@Entity
@Table(name = "action")
public class Action extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "action_name")
	private String actionName;

	@Column(name = "display_name")
	private String displayName;

	@ManyToOne
	@JoinColumn(name = "parent_action_id")
	private Action parentAction;

	@Column(name = "display_flag")
	private boolean isDisplay;

	@Column(name = "locale")
	private String locale;

	public String getActionName() {
		return actionName;
	}

	public void setActionName(String actionName) {
		this.actionName = actionName;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public Action getParentAction() {
		return parentAction;
	}

	public void setParentAction(Action parentAction) {
		this.parentAction = parentAction;
	}

	public boolean isDisplay() {
		return isDisplay;
	}

	public void setDisplay(boolean isDisplay) {
		this.isDisplay = isDisplay;
	}

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

}
