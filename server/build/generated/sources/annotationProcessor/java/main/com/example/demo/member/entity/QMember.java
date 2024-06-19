package com.example.demo.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -1457562293L;

    public static final QMember member = new QMember("member1");

    public final com.example.demo.config.QBaseTimeEntity _super = new com.example.demo.config.QBaseTimeEntity(this);

    public final ListPath<com.example.demo.board.entity.Comment, com.example.demo.board.entity.QComment> commentList = this.<com.example.demo.board.entity.Comment, com.example.demo.board.entity.QComment>createList("commentList", com.example.demo.board.entity.Comment.class, com.example.demo.board.entity.QComment.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final ListPath<com.example.demo.board.entity.LikeTable, com.example.demo.board.entity.QLikeTable> likeTableList = this.<com.example.demo.board.entity.LikeTable, com.example.demo.board.entity.QLikeTable>createList("likeTableList", com.example.demo.board.entity.LikeTable.class, com.example.demo.board.entity.QLikeTable.class, PathInits.DIRECT2);

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final ListPath<String, StringPath> roles = this.<String, StringPath>createList("roles", String.class, StringPath.class, PathInits.DIRECT2);

    public final StringPath username = createString("username");

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

