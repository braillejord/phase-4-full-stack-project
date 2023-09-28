import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/CreatePost.css";

function CreatePost({user}) {
  //     return (

  //             // <div id="create-post-container">
  //             //     <input id="create-post-title" placeholder="Article Title..."></input>
  //             //     <textarea id="create-post-text" placeholder="Start typing..." rows="100"></textarea>
  //             //     <button id="publish-post-button">Publish</button>
  //             // </div>

  //     )
  // }

  let session_user_id = user.id

  const initialState = {
    title: "",
    body: "",
    user_id: session_user_id,
  };
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const { title, body, user_id } = formData;

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://127.0.0.1:5555/posts`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      // .then((data) => console.log(data))
      .then((data) => history.push(`/posts/${data.id}`));
  }
  function handleChange(e) {
    let key = e.target.name;
    let newValue = e.target.value;
    // if (key === "tags" || key === "comments") {
    //   newValue = e.target.value.split(", ");
    // }
    setFormData({
      ...formData,
      [key]: newValue,
    });
  }

  // console.log(formData);

  return (
    <div className="post-container">
      <div className="centered-post"></div>
      <form className="center" onSubmit={handleSubmit}>
        <h1>New Post</h1>
        <br />
        <label>
          <h2>Title: </h2>
        </label>
        <input
          className="input-title"
          name="title"
          type="text"
          placeholder="Create a post title..."
          value={title}
          onChange={handleChange}
          required
        />
        <br />
        <label>
          <h2>Body: </h2>
        </label>
        <input
          className="input-body"
          name="body"
          type="text"
          placeholder="Write your post here..."
          value={body}
          onChange={handleChange}
          required
        />
        <br />
        <button className="post-btn" type="submit">
          🥁 Knowledge Rocks 🎸
        </button>
      </form>
    </div>
  );
}
export default CreatePost;
