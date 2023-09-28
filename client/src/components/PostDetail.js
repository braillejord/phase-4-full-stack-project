import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/Post.css";

function PostDetail() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <h1>...Loading</h1>;

  const { author, title, body, tags, created_at } = post;

  return (
    <div className="post-container post-centered">
      <div className="post-preview-container">
        <div className="post-preview-details">
          <h2>{author}</h2>
          <h4>{title}</h4>
          <p>{body}</p>
          {tags.map((tag) => (
            <span> #{tag} </span>
          ))}
          <h6>{created_at}</h6>
          <button className="post-btn">
            <Link className="post-link" to={`/posts/create-post`}>
              Edit Post
            </Link>
          </button>
        </div>

        <div className="post-preview-image-container">
          <img
            className="post-preview-image"
            src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/03/Hogwarts-Castle.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
