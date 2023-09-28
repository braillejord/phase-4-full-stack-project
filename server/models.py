# x from flask_sqlalchemy import SQLAlchemy
# x from sqlalchemy_serializer import SerializerMixin
# x from sqlalchemy.ext.associationproxy import association_proxy
# x from sqlalchemy import MetaData


from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy import func
from datetime import datetime
import re

from config import db, bcrypt

# Models go here!

# convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# }

# metadata = MetaData(naming_convention=convention)
# db = SQLAlchemy(metadata=metadata)

post_tag = db.Table(
    "post_tags",
    db.Column("post_id", db.Integer, db.ForeignKey("posts.id")),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id")),
)


class Tag(db.Model, SerializerMixin):
    __tablename__ = "tags"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    serialize_rules = ("-posts.comments",)

    validation_errors = []

    @classmethod
    def clear_validation_errors(cls):
        cls.validation_errors = []

    @validates("name")
    def validate_name(self, db_column, name):
        if isinstance("name", str) and len(name) >= 1:
            return name
        else:
            self.validation_errors.append("Name must be a string with at least 1 character.")


class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    tags = db.relationship("Tag", secondary=post_tag, backref="posts")
    comments = db.relationship("Comment", backref="post")

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ("-comments.post", "-user.posts", "-tags.posts", "-user.comments", "-user_id")

    validation_errors = []

    @classmethod
    def clear_validation_errors(cls):
        cls.validation_errors = []

    @validates("title")
    def validate_title(self, db_column, title):
        if isinstance("title", str) and len(title) >= 1:
            return title
        else:
            self.validation_errors.append("Title must be a string with at least 1 character.")

    @validates("body")
    def validate_body(self, db_column, body):
        if isinstance("body", str) and 1 <= len(body) <= 560:
            return body
        else:
            self.validation_errors.append("Body text must be a between 1 - 560 characters.")

    @validates("user_id")
    def validate_user(self, key, user_id):
        user = User.query.filter(User.id == user_id).first()
        if user:
            return user_id
        else:
            self.validation_errors.append("User not found.")

    def __repr__(self):
        return f'<Post "{self.title}">'


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    posts = db.relationship("Post", backref="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", backref="user", cascade="all, delete-orphan")

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ("-comments.user", "-posts.user")

    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    validation_errors = []

    @classmethod
    def clear_validation_errors(cls):
        cls.validation_errors = []

    @validates("name")
    def validate_name(self, db_column, name):
        if isinstance("name", str) and len(name) >= 1:
            return name
        else:
            self.validation_errors.append("Name must be a string with at least 1 character.")

    @validates("email")
    def validate_email(self, db_column, email):
        all_emails = [user.email for user in User.query.all()]
        email_regex = re.compile(
            r"([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+"
        )

        if email in all_emails:
            self.validation_errors.append("Email address is already taken")
        elif not re.fullmatch(email_regex, email):
            self.validation_errors.append("Invalid email, it has to be untrust me, we got RegEx")
        elif re.fullmatch(email_regex, email) and not email in all_emails:
            return email

    def __repr__(self):
        return f'<User "{self.name}">'


class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    serialize_rules = ("-user.comments", "-post.comments", "-user.posts", "-post.user")

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def show_post(self):
        post_comment = Post.query.filter(Post.id == self.post_id).first()
        return post_comment

    def show_user(self):
        user_comment = User.query.filter(User.id == self.user_id).first()
        return user_comment

    validation_errors = []

    @classmethod
    def clear_validation_errors(cls):
        cls.validation_errors = []

    @validates("content")
    def validate_content(self, db_column, content):
        if isinstance("content", str) and 1 <= len(content) <= 560:
            return content
        else:
            self.validation_errors.append("Content text must be a between 1 - 560 characters.")

    @validates("user_id")
    def validate_user(self, key, user_id):
        user = User.query.filter(User.id == user_id).first()
        if user:
            return user_id
        else:
            self.validation_errors.append("User not found.")

    @validates("post_id")
    def validate_post(self, key, post_id):
        post = Post.query.filter(Post.id == post_id).first()

        if post:
            return post_id
        else:
            self.validation_errors.append("Post not found.")

    def __repr__(self):
        return f'<Comment "{self.content}">'
