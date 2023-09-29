#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Post, User, Comment, Tag

fake = Faker()

tag1 = Tag(name="javascript")
tag2 = Tag(name="python")
tag3 = Tag(name="ruby")
tag4 = Tag(name="react")
tag5 = Tag(name="flask")
tag6 = Tag(name="html")
tag7 = Tag(name="css")
tag8 = Tag(name="github")
tag9 = Tag(name="git")
tag10 = Tag(name="sql")


def create_users():
    u1 = User(email="breellejordyn@gmail.com", name="BreElle Wells")
    u1.password_hash = "dog"

    u2 = User(email="hirokikato1@gmail.com", name="Hiro Kato")
    u2.password_hash = "cat"

    db.session.add(u1)
    db.session.add(u2)

    users = [u1, u2]

    name_list = []
    for _ in range(25):
        name = fake.name()
        while name in name_list:
            name = fake.name()
        name_list.append(name)

        s = User(
            name=name,
        )

        s.password_hash = s.name + "password"

        users.append(s)

    return users


def create_posts():
    posts = []
    tags = [tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9, tag10]

    for n in range(40):
        p = Post(
            title=f"Random Blog No: {n+7}",
            body=fake.text(max_nb_chars=3000),
            user_id=rc([user.id for user in users]),
        )

        p.tags.append(tags[randint(0, 9)])
        p.tags.append(tags[randint(0, 9)])
        p.tags.append(tags[randint(0, 9)])
        posts.append(p)

    for n in range(7):
        p = Post(
            title=f"Random Blog No: {n+1}",
            body=fake.text(max_nb_chars=3000),
            user_id=1,
        )

        p.tags.append(tags[randint(0, 9)])
        p.tags.append(tags[randint(0, 9)])
        p.tags.append(tags[randint(0, 9)])
        posts.append(p)

    return posts


def create_comments():
    comments = []
    for n in range(20):
        c = Comment(
            content=fake.text(),
            user_id=rc([user.id for user in users]),
            post_id=rc([post.id for post in posts]),
        )
        comments.append(c)

    return comments


if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Clearing db...")
        db.drop_all()

        print("Creating tables...")
        db.create_all()

        print("Starting seed...")

        print("Seeding tags...")

        db.session.add_all([tag1, tag2, tag3, tag4])
        db.session.commit()

        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding posts...")
        posts = create_posts()
        db.session.add_all(posts)
        db.session.commit()

        print("Seeding comments...")
        comments = create_comments()
        db.session.add_all(comments)
        db.session.commit()

        print("Done seeding!")
