import React from "react";

function PostPreview() {
    return (
        <div className="post-preview-container">
            <div className="post-preview-details">
                <p>Post Author</p>
                <p>Post Title</p>
                <p>Date Posted</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            </div>
            <div className="post-preview-image-container">
                <img className="post-preview-image" src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/03/Hogwarts-Castle.jpg"/>
            </div>
        </div>
    )
}

export default PostPreview;