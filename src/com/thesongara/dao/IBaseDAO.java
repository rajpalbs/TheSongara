package com.thesongara.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;

import com.thesongara.model.Identifiable;

/**
 * Generic DAO interface for uniquely identifiable entities.<br/>
 * The entity is of type E<br/>
 * <br/>
 * <br/>
 * The DAOs are only supposed to return types of its respective entity,
 * collections of its entities or calculated primitive values (like counts).
 * 
 * 
 * @param <E>
 *            The entity type           
 *            
 */
@SuppressWarnings("rawtypes")
public interface IBaseDAO<E extends Identifiable> {
	
	public Session getSession();
	List<E> loadAll();
	E load(long id);
	E get(long id);
	void save(E entity);
	void update(E entity);
	void saveOrUpdate(E entity);
	E merge(E entity);
	void remove(E entity);
	<T> List<T> executeQueryInHibernate(final String queryString,
			final String[] paramValues);

	<T> List<T> executeQueryInHibernate(final String queryString,
			final String[] paramValues, final Class<T> returnType);

	<T> List<T> executeQueryInHibernate(final String queryString,
			final String[] paramValues, final String[] resultColumnNames);

	<T> List<T> executeQueryInHibernate(final String queryString,
			final String[] paramValues, final String[] resultColumnNames,
			final Class<T> returnType);
	
	<T> List<T> executeQueryObject(final String queryString, Class clazz);
	
	<T> List<T> executeQueryObject(final DetachedCriteria detachedCriteria, Class clazz);

	int executeUpdate(final String queryString, final String[] paramValues);

	E getSafeSingleEntityByColumnAndValue(final String columnName,
			final Object columnValue);
	E getSafeSingleEntityByColumnAndValue(final String[] columnNames,
			final Object[] columnValues);

	List<E> findByColumnAndValue(final String columnName,
			final Object columnValue);

	List<E> findByColumnAndValue(final String columnName,
			final Object columnValue, final int offset, final int size);

	List<E> findByColumnAndValue(final String[] columnNames,
			final Object[] columnValues);

	List<E> findByColumnAndValue(final String[] columnNames,
			final Object[] columnValues, final int offset, final int size);

	List<E> findColumnAndValueByOrder(final String[] columnNames,
			final Object[] columnValues, final String orderColumnName,
			final boolean isLikeFlag, String orderType);
	
	public List<String> getListString(final String query);	
	public List getListString(final DetachedCriteria deCriteria);
	public List<E> findByCriteria(final DetachedCriteria criteria);
}