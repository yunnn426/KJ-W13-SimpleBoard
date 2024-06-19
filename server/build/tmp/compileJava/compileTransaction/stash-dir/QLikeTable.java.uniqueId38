package com.example.demo.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLikeTable is a Querydsl query type for LikeTable
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLikeTable extends EntityPathBase<LikeTable> {

    private static final long serialVersionUID = -1540846578L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLikeTable likeTable = new QLikeTable("likeTable");

    public final com.example.demo.config.QBaseTimeEntity _super = new com.example.demo.config.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final NumberPath<Long> like_id = createNumber("like_id", Long.class);

    public final com.example.demo.member.entity.QMember member;

    public final QPost post;

    public QLikeTable(String variable) {
        this(LikeTable.class, forVariable(variable), INITS);
    }

    public QLikeTable(Path<? extends LikeTable> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLikeTable(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLikeTable(PathMetadata metadata, PathInits inits) {
        this(LikeTable.class, metadata, inits);
    }

    public QLikeTable(Class<? extends LikeTable> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.example.demo.member.entity.QMember(forProperty("member")) : null;
        this.post = inits.isInitialized("post") ? new QPost(forProperty("post"), inits.get("post")) : null;
    }

}

