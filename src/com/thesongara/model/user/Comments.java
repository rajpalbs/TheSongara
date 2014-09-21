package com.thesongara.model.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.thesongara.model.BaseEntity;

@Entity
@Table(name = "user_account")
public class Comments extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "comment_type")
	private String commentType;

	@Column(name = "image_name")
	private long image;

	@Column(name = "data")
	private String comment;

	@ManyToOne
	@JoinColumn(name = "user", referencedColumnName = "id", nullable = false)
	private UserAccount user;

	public String getCommentType() {
		return commentType;
	}

	public void setCommentType(String commentType) {
		this.commentType = commentType;
	}

	public long getImage() {
		return image;
	}

	public void setImage(long image) {
		this.image = image;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public UserAccount getUser() {
		return user;
	}

	public void setUser(UserAccount user) {
		this.user = user;
	}

}
