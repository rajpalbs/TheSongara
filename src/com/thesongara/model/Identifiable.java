package com.thesongara.model;

import java.io.Serializable;

/**
 * Implement in entities which are uniquely identifiable.
 */
public interface Identifiable extends Serializable {
	long getId();
	void setId(long id);
}