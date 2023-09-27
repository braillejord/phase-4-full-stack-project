import React from "react";

function CreatePost() {
    return (
        <>
            <div id="create-post-container">
                <input id="create-post-title" placeholder="Article Title..."></input>
                <textarea id="create-post-text" placeholder="Start typing..." rows="100"></textarea>
                <button id="publish-post-button">Publish</button>
            </div>
        </>
    )
}

export default CreatePost;