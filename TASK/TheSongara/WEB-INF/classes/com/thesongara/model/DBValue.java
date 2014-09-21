package com.thesongara.model;

import org.hibernate.criterion.Restrictions;

/**
 * Enum that is used in building dynamic criterion based on NULL or NOTNULL.      
 */
public enum DBValue {
	/**
	 * This represents that on field only {@link Restrictions#isNotNull(String)}
	 * is to be put. Not a criteria that matches a specific value of the field
	 */
	NotNull,

	/**
	 * This represents that on field only {@link Restrictions#isNull(String)} is
	 * to be put.
	 */
	Null
}