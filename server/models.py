# x from flask_sqlalchemy import SQLAlchemy
# x from sqlalchemy_serializer import SerializerMixin
# x from sqlalchemy.ext.associationproxy import association_proxy
# x from sqlalchemy import MetaData


from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates


from config import db

# Models go here!

# convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# }

# metadata = MetaData(naming_convention=convention)
# db = SQLAlchemy(metadata=metadata)

post_tag = db.Table('post_tags',
                    db.Column('post_id', db.Integer, db.ForeignKey('posts.id')),
                    db.Column('tag_id', db
                    .Integer, db.ForeignKey('tags.id'))
                    )


class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    serialize_rules = ("-posts.comments",)

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    tags = db.relationship("Tag", secondary=post_tag, backref="posts")
    comments = db.relationship("Comment", backref="post")
    
    serialize_rules = ("-comments.post", "-user.posts", "-tags.posts", "-user.comments", "-user_id")
    
    
    def __repr__(self):
        return f'<Post "{self.title}">'

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    posts = db.relationship('Post', backref='user', cascade="all, delete-orphan")
    comments = db.relationship("Comment", backref="user", cascade="all, delete-orphan")
    
    serialize_rules = ("-comments.user", "-posts.user")
    
    def __repr__(self):
        return f'<User "{self.name}">'

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    serialize_rules = ("-user.comments", "-post.comments", "-user.posts", "-post.user")

    
    def show_post(self):
        post_comment = Post.query.filter(Post.id == self.post_id).first()
        return post_comment
    def show_user(self):
        user_comment = User.query.filter(User.id == self.user_id).first()
        return user_comment

    def __repr__(self):
        return f'<Comment "{self.content}">'
    
