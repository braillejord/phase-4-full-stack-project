import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function PostDetail({user}) {
  const [post, setPost] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <h1>No Posts Found</h1>;

  const { author_id, author, title, body, tags, comments, created_at, updated_at } = post;

 function handleDelete() {
    fetch(`http://127.0.0.1:5555/posts/${id}`, {
      method: 'DELETE',
    })
    .then(data => history.push(`/posts`))
 }

//  console.log(user.id)
//  console.log(author_id)

  return (
    <div id="post-container">
      <div id="post-body">
        <h1 id="post-body-title">{title}</h1>
        <h3 id="post-details">{author} · {created_at}</h3>
        <p>{updated_at}</p>
        <p id="post-body-text">{body}</p>
        {tags.map((tag) => (<span className="post-body-tag"> #{tag}</span>))}
        
        {/* {comments.map((comment) => (<p>{comment}</p>))} */}
        
        <div id="edit-delete-btns">
          {user.id == author_id
            ?
            <>
              <Link className="edit-post-btn-link" to={`/posts/${id}/edit`}>
                <button className="edit-post-btn">
                  <i class="ti ti-pencil-plus"></i>
                </button>
              </Link>
              <button className="delete-post-btn" onClick={handleDelete}><i class="ti ti-trash"></i></button>
            </>
            : null
          }
        </div>
      </div>
    </div>
  )

    
    // <div className="post-container post-centered">
    //   <div className="post-preview-container">
    //     <div className="post-preview-details">
    //       <h2>{author}</h2>
    //       <h4>{title}</h4>
    //       <p>{body}</p>
    //       {tags.map((tag) => (
    //         <span> #{tag} </span>
    //       ))}
    //       <h6>{created_at}</h6>
    //       {user.id == author_id
    //       ?
    //       <>
    //         <button className="post-btn">
    //           <Link className="post-link" to={`/posts/${id}/edit`}>
    //             Edit Post
    //           </Link>
    //         </button>
    //         <button className="post-btn" onClick={handleDelete}>Delete Button</button>
    //       </>
    //       : null
    //     }
    //     </div>

    //     <div className="post-preview-image-container">
    //       <img
    //         className="post-preview-image"
    //         src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/03/Hogwarts-Castle.jpg"
    //       />
    //     </div>
    //   </div>
    // </div>
  // );
}

export default PostDetail;
