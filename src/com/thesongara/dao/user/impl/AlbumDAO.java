package com.thesongara.dao.user.impl;

import org.springframework.stereotype.Repository;

import com.thesongara.dao.impl.BaseDAO;
import com.thesongara.dao.user.IAlbumDAO;
import com.thesongara.model.user.Album;

@Repository
public class AlbumDAO extends BaseDAO<Album> implements IAlbumDAO {

}
