import React from "react";
import { Link } from "react-router-dom";
import "./css/Post.css";

function PostPreview({ id, body, created_at, title, author, tags }) {
  return (
    <>
      <div className="post-preview-container">
        <div className="post-preview-details">
          <h2>{author}</h2>
          <h4>{title}</h4>
          <p>{`${body.substring(0, 100)} ...`}</p>
          {tags.map((tag) => (
            <span> #{tag} </span>
          ))}
          <h6>{created_at}</h6>
        </div>

        <div className="post-preview-image-container">
          <img
            className="post-preview-image"
            src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/03/Hogwarts-Castle.jpg"
            alt="programming related material"
          />
          <button className="post-btn">
            <Link className="post-link" to={`/posts/${id}`}>
              <i class="ti ti-arrow-big-right"></i>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default PostPreview;
