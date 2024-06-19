package com.example.demo.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QComment is a Querydsl query type for Comment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QComment extends EntityPathBase<Comment> {

    private static final long serialVersionUID = 171323830L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QComment comment1 = new QComment("comment1");

    public final com.example.demo.config.QBaseTimeEntity _super = new com.example.demo.config.QBaseTimeEntity(this);

    public final StringPath comment = createString("comment");

    public final NumberPath<Long> commentId = createNumber("commentId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final com.example.demo.member.entity.QMember member;

    public final QPost post;

    public QComment(String variable) {
        this(Comment.class, forVariable(variable), INITS);
    }

    public QComment(Path<? extends Comment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QComment(PathMetadata metadata, PathInits inits) {
        this(Comment.class, metadata, inits);
    }

    public QComment(Class<? extends Comment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.example.demo.member.entity.QMember(forProperty("member")) : null;
        this.post = inits.isInitialized("post") ? new QPost(forProperty("post"), inits.get("post")) : null;
    }

}

