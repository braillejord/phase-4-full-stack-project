#!/usr/bin/env python3

from app import app
from models import db, User, Post, Comment, Tag, post_tag


if __name__ == '__main__':
    with app.app_context():
        import ipdb
        p1 = Post.query.first()
        u1 = User.query.first()
        c1 = Comment.query.first()
        t1 = Tag.query.first()
        ipdb.set_trace()
        pass

