#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import *

# Views go here!


@app.route("/")
def get():
    return "<h1>Project Server</h1>"


# from flask import Flask, request, make_response, jsonify
# from flask_restful import Api, Resource
# from flask_cors import CORS
# from flask_migrate import Migrate

# # Local imports
# from models import *

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False
# api = Api(app)
# CORS(app)
# migrate = Migrate(app, db)
# db.init_app(app)


# Views go here!
@app.route("/about")
def index():
    pass


# Posts Routes


class Posts(Resource):
    def get(self):
        # posts = [
        #     post.to_dict(only=("user.name", "title", "body", "created_at"))
        #     for post in Post.query.all()
        # ]
        # return make_response(posts, 200)

        posts = Post.query.all()
        rendered_post_data = []

        for p in posts:
            post_obj = {
                "title": p.title,
                "body": p.body,
                "created_at": p.created_at,
                "author": p.user.name,
                "tags": [tag.name for tag in p.tags],
            }
            rendered_post_data.append(post_obj)

        return make_response(rendered_post_data, 200)

    def post(self):
        req = request.get_json()
        try:
            p = Post(title=req.get("title"), body=req.get("body"), user_id=req.get("user_id"))
            db.session.add(p)
            db.session.commit()
            post_json = p.to_dict()
            return make_response(post_json, 201)
        except:
            return make_response({"error": "Post creation failed"}, 400)


class Posts_By_Id(Resource):
    def get(self, id):
        p = Post.query.get(id)
        if p:
            post_json = p.to_dict()
            return make_response(post_json, 200)
        else:
            return make_response({"error": "Post not found"}, 404)

    def patch(self, id):
        p = Post.query.get(id)
        req = request.get_json()
        if p:
            try:
                for attr in req:
                    setattr(p, attr, req.get(attr))
                db.session.commit()
                post_json = p.to_dict(rules=("-comments",))
                return make_response(post_json, 202)
            except:
                make_response({"error": "Unable to edit post"}, 400)
        else:
            return make_response({"error": "Post not found"}, 404)

    def delete(self, id):
        p = Post.query.get(id)
        if p:
            db.session.delete(p)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({"error": "Post not found"}, 404)


# Comments Routes


class Comments(Resource):
    def get(self):
        comments = [comment.to_dict() for comment in Comment.query.all()]
        return make_response(comments, 200)

    def post(self):
        req = request.get_json()
        try:
            c = Comment(
                content=req.get("content"), user_id=req.get("user_id"), post_id=req.get("post_id")
            )
            db.session.add(c)
            db.session.commit()
            comment_json = c.to_dict()
            return make_response(comment_json, 201)
        except:
            return make_response({"error": "Comment creation failed"}, 400)


class Comments_By_Id(Resource):
    def get(self, id):
        c = Comment.query.get(id)
        if c:
            comment_json = c.to_dict()
            return make_response(comment_json, 200)
        else:
            return make_response({"error": "comment not found"}, 404)

    def patch(self, id):
        c = Comment.query.get(id)
        req = request.get_json()
        if c:
            try:
                for attr in req:
                    setattr(c, attr, req.get(attr))
                db.session.commit()
                comment_json = c.to_dict()
                return make_response(comment_json, 202)
            except:
                make_response({"error": "Unable to edit comment"}, 400)
        else:
            return make_response({"error": "Comment not found"}, 404)

    def delete(self, id):
        c = Comment.query.get(id)
        if c:
            db.session.delete(c)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({"error": "Comment not found"}, 404)


# User Routes


class Users(Resource):
    def get(self):
        users = [user.to_dict(only=("id", "name", "posts.title")) for user in User.query.all()]
        return make_response(users, 200)

    def post(self):
        req = request.get_json()
        try:
            u = User(
                name=req.get("name"),
            )
            db.session.add(u)
            db.session.commit()
            user_json = u.to_dict()
            return make_response(user_json, 201)
        except:
            return make_response({"error": "user creation failed"}, 400)


class Users_By_Id(Resource):
    def get(self, id):
        u = User.query.get(id)
        if u:
            user_json = u.to_dict()
            return make_response(user_json, 200)
        else:
            return make_response({"error": "user not found"}, 404)

    def patch(self, id):
        u = User.query.get(id)
        req = request.get_json()
        if u:
            try:
                for attr in req:
                    setattr(u, attr, req.get(attr))
                db.session.commit()
                user_json = u.to_dict()
                return make_response(user_json, 202)
            except:
                make_response({"error": "Unable to edit user"}, 400)
        else:
            return make_response({"error": "user not found"}, 404)

    def delete(self, id):
        u = User.query.get(id)
        if u:
            db.session.delete(u)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({"error": "user not found"}, 404)


# Tag Routes


class Tags(Resource):
    def get(self):
        tags = [tag.to_dict() for tag in Tag.query.all()]
        return make_response(tags, 200)

    def post(self):
        req = request.get_json()
        try:
            t = Tag(
                name=req.get("name"),
            )
            db.session.add(t)
            db.session.commit()
            tag_json = t.to_dict()
            return make_response(tag_json, 201)
        except:
            return make_response({"error": "Tag creation failed"}, 400)


class Tags_By_Id(Resource):
    def get(self, id):
        t = Tag.query.get(id)
        if t:
            tag_json = t.to_dict()
            return make_response(tag_json, 200)
        else:
            return make_response({"error": "tag not found"}, 404)

    def patch(self, id):
        t = Tag.query.get(id)
        req = request.get_json()
        if t:
            try:
                for attr in req:
                    setattr(t, attr, req.get(attr))
                db.session.commit()
                tag_json = t.to_dict()
                return make_response(tag_json, 202)
            except:
                make_response({"error": "Unable to edit tag"}, 400)
        else:
            return make_response({"error": "tag not found"}, 404)

    def delete(self, id):
        t = Tag.query.get(id)
        if t:
            db.session.delete(t)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({"error": "tag not found"}, 404)


api.add_resource(Comments, "/comments")
api.add_resource(Comments_By_Id, "/comments/<int:id>")
api.add_resource(Posts_By_Id, "/posts/<int:id>")
api.add_resource(Posts, "/posts")
api.add_resource(Users, "/users")
api.add_resource(Users_By_Id, "/users/<int:id>")
api.add_resource(Tags, "/tags")
api.add_resource(Tags_By_Id, "/tags/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
