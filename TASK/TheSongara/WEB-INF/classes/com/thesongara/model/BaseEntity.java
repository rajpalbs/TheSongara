package com.thesongara.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;



/**
 * Base class for all the entities.
 */
@MappedSuperclass
public abstract class BaseEntity implements Identifiable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="id")	
	private long id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		if (this.id != 0 && this.id != id) {
			throw new IllegalStateException(
					"The ID must not be changed after it is set.");
		}
		this.id = id;
	}

	protected final int getPersistedId() {
		if (id == 0L) {
			throw new IllegalStateException("Not persisted object of type:"
					+ getClass());
		}
		return (int) id;
	}

	@Override
	public int hashCode() {
		return getPersistedId();
	}

	@Override
	public boolean equals(Object o) {
		return o != null && o.getClass() == getClass()
				&& getPersistedId() == ((BaseEntity) o).getPersistedId();
	}
}