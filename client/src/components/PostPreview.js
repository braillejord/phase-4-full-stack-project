import React from "react";

function PostPreview({id, body, created_at, title, author, tags}) {
    return (
        <div className="post-preview-container">
            <div className="post-preview-details">
                <p>{author}</p>
                <p>{title}</p>
                <p>{created_at}</p>
                <p>{body}</p>
                {tags.map((tag) => (
                    <span> #{tag} </span>
                ))}
            </div>
            <div className="post-preview-image-container">
                <img className="post-preview-image" src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/03/Hogwarts-Castle.jpg"/>
            </div>
        </div>
    )
}

export default PostPreview;