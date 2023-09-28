import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function PostDetail() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <h1>...Loading</h1>;

  const { author, title, body, tags, comments, created_at, updated_at } = post;

 function handleDelete() {
    fetch(`http://127.0.0.1:5555/posts/${id}`, {
      method: 'DELETE',
    })
 }

  return (
    // <div id="post-container">
    //   <div id="post-body">
    //     <h1 id="post-body-title">{title}</h1>
    //     <h3 id="post-details">{author} · {created_at}</h3>
    //     <p>{updated_at}</p>
    //     <p id="post-body-text">{body}</p>
    //     {tags.map((tag) => (<span className="post-body-tag"> #{tag}</span>))}
        
    //     {/* {comments.map((comment) => (<p>{comment}</p>))} */}
    //   </div>
    // </div>
  // )
    
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
            <Link className="post-link" to={`/posts/${id}/edit`}>
              Edit Post
            </Link>
          </button>
          <button className="post-btn">
            <Link className="post-link" to={`/posts/`} onClick={handleDelete}>
              Delete Post
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