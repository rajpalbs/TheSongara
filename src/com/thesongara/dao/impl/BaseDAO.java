package com.thesongara.dao.impl;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.thesongara.dao.IBaseDAO;
import com.thesongara.model.DBValue;
import com.thesongara.model.Identifiable;
import com.thesongara.util.Constants;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Transactional
public abstract class BaseDAO<E extends Identifiable> implements IBaseDAO<E> {

	protected SessionFactory sessionFactory;
	protected Class<E> entityClass;

	public BaseDAO() {
		ParameterizedType genericSuperclass = (ParameterizedType) getClass().getGenericSuperclass();
		this.entityClass = (Class<E>) genericSuperclass.getActualTypeArguments()[0];
	}

	
	@Autowired
	public void setSessionFactory(final SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public Class<E> getEntityClass() {
		return entityClass;
	}

	@Override
	public Session getSession() {
		return getSessionFactory().getCurrentSession();
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public List<E> loadAll() {		
		Criteria criteria = getSession().createCriteria(entityClass);		
		return (List<E>) criteria.list();
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public E load(final long id) {
		return (E) getSession().load(entityClass, id);

	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public E get(final long id) {
		return (E) getSession().get(entityClass, id);
	}

	@Override
	@Transactional(propagation = Propagation.MANDATORY, readOnly = false)
	public void save(final E entity) {
		getSession().save(entity);
	}

	@Override
	@Transactional(propagation = Propagation.MANDATORY, readOnly = false)
	public void update(final E entity) {
		getSession().update(entity);
	}

	@Override
	@Transactional(propagation = Propagation.MANDATORY, readOnly = false)
	public void saveOrUpdate(final E entity) {
		getSession().saveOrUpdate(entity);
	}

	@Override
	@Transactional(propagation = Propagation.MANDATORY, readOnly = false)
	public E merge(final E entity) {
		return (E) getSession().merge(entity);
	}

	@Override
	@Transactional(propagation = Propagation.MANDATORY, readOnly = false)
	public void remove(final E entity) {
		getSession().delete(entity);
	}

	private void setResultColumnNames(final String[] resultColumnNames, SQLQuery query) {
		if (resultColumnNames != null) {
			for (String colName : resultColumnNames) {
				query.addScalar(colName);
			}
		}
	}

	private void validateParams(final String[] names, final Object[] values) {
		if (names != null && values == null) {
			throw new IllegalArgumentException("Both names & values must be provided. Values were found null");
		}
		if (names == null && values != null) {
			throw new IllegalArgumentException("Both names & values must be provided. Names were found null");
		}
		if (names != null && values != null && names.length != values.length) {
			throw new IllegalArgumentException("Both names and values should have same number of elements. " + names.length + " names and "
					+ values.length + " values were found");
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public <T> List<T> executeQueryInHibernate(final String queryString, final String[] paramValues) {
		return executeQueryInHibernate(queryString, paramValues, null, null);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public <T> List<T> executeQueryInHibernate(final String queryString, final String[] paramValues, final Class<T> returnType) {
		return executeQueryInHibernate(queryString, paramValues, null, returnType);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public <T> List<T> executeQueryInHibernate(final String queryString, final String[] paramValues, final String[] resultColumnNames) {
		return executeQueryInHibernate(queryString, paramValues, resultColumnNames, null);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public <T> List<T> executeQueryInHibernate(final String queryString, final String[] paramValues, final String[] resultColumnNames,
			final Class<T> returnType) {

		SQLQuery query = getSession().createSQLQuery(queryString);
		if (returnType != null) {
			query.addEntity(returnType);
		}
		if (paramValues != null) {
			setParamValues(paramValues, query);
		}
		if (resultColumnNames != null) {
			setResultColumnNames(resultColumnNames, query);
		}
		return (List<T>) query.list();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public <T> List<T> executeQueryObject(final String queryString, Class clazz) {
		if(clazz.equals(String.class)){
			return getSession().createSQLQuery(queryString).list();
		}
		return  getSession().createSQLQuery(queryString).setResultTransformer(Transformers.aliasToBean(clazz)).list();		
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public <T> List<T> executeQueryObject(final DetachedCriteria detachedCriteria, Class clazz) {
		Criteria criteria = detachedCriteria.getExecutableCriteria(getSession());	
		return criteria.setResultTransformer(Transformers.aliasToBean(clazz)).list();		
		
	}
	
	private void setParamValues(final String[] paramValues, SQLQuery query) {
		if (paramValues != null && paramValues.length > 0) {
			for (int liCnt = 0; liCnt < paramValues.length; liCnt++) {
				query.setString(liCnt, paramValues[liCnt]);
			}
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public int executeUpdate(final String queryString, final String[] paramValues) {
		SQLQuery query = getSession().createSQLQuery(queryString);
		setParamValues(paramValues, query);
		return query.executeUpdate();
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public E getSafeSingleEntityByColumnAndValue(final String columnName, final Object columnValue) {
		return getSafeSingleEntityByColumnAndValue(new String[] { columnName }, new Object[] { columnValue });
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public E getSafeSingleEntityByColumnAndValue(final String[] columnNames, final Object[] columnValues) {
		List<E> list = findByColumnAndValue(columnNames, columnValues, 0, 1);
		if (!list.isEmpty()) {
			return list.get(0);
		}
		return null;
	}

	private void prepareCriteiraWithPagination(final String[] columnNames, final Object[] columnValues, final int offset, final int size,
			Criteria criteria, boolean useLike) {
		prepareCriteria(columnNames, columnValues, criteria, useLike);
		addPaginationCriteria(offset, size, criteria);
	}

	private void prepareCriteria(final String[] columnNames, final Object[] columnValues, Criteria criteria, boolean useLike) {
		for (int i = 0; i < columnNames.length; i++) {
			if (columnValues[i] == null || columnValues[i] == DBValue.Null) {
				criteria.add(Restrictions.isNull(columnNames[i]));
			} else if (columnValues[i] == DBValue.NotNull) {
				criteria.add(Restrictions.isNotNull(columnNames[i]));
			} else {
				criteria.add(useLike ? Restrictions.like(columnNames[i], columnValues[i]) : Restrictions
						.eq(columnNames[i], columnValues[i]));
			}
		}
	}

	private void addPaginationCriteria(final int offset, final int size, Criteria criteria) {
		if (offset >= 0) {
			criteria.setFirstResult(offset);
		}
		if (size > 0) {
			criteria.setMaxResults(size);
		}
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public List<E> findByColumnAndValue(final String columnName, final Object columnValue) {
		return findByColumnAndValue(columnName, columnValue, -1, 0);
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public List<E> findByColumnAndValue(final String columnName, final Object columnValue, final int offset, final int size) {
		return findByColumnAndValue(new String[] { columnName }, new Object[] { columnValue }, offset, size);
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public List<E> findByColumnAndValue(final String[] columnNames, final Object[] columnValues) {
		return findByColumnAndValue(columnNames, columnValues, -1, 0);
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public List<E> findByColumnAndValue(final String[] columnNames, final Object[] columnValues, final int offset, final int size) {
		validateParams(columnNames, columnValues);

		Criteria criteria = getSession().createCriteria(entityClass);
		prepareCriteiraWithPagination(columnNames, columnValues, offset, size, criteria, false);
		return (List<E>) criteria.list();
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public List<E> findColumnAndValueByOrder(final String[] columnNames, final Object[] columnValues, final String orderColumnName,
			final boolean isLikeFlag, final String orderType) {

		Criteria criteria = getSession().createCriteria(entityClass);
		prepareCriteria(columnNames, columnValues, criteria, isLikeFlag);
		if (orderType != null && orderType.equalsIgnoreCase(Constants.ASCENDING_ORDER)) {
			criteria.addOrder(Order.asc(orderColumnName));
		} else if (orderType != null && orderType.equalsIgnoreCase(Constants.DESCENDING_ORDER)) {
			criteria.addOrder(Order.desc(orderColumnName));
		} else {
			criteria.addOrder(Order.asc(orderColumnName));
		}
		return (List<E>) criteria.list();
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public List<String> getListString(final String query) {
		Query hQuery = getSession().createQuery(query);
		return (List<String>) hQuery.list();
	}
	
	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public  List getListString(final DetachedCriteria deCriteria) {
		Criteria criteria = deCriteria.getExecutableCriteria(getSession());	
		return criteria.list();
	}

	@Override
	@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
	public List<E> findByCriteria(final DetachedCriteria deCriteria) {
		Criteria criteria = deCriteria.getExecutableCriteria(getSession());		
		return (List<E>) criteria.list();
	}
	
}