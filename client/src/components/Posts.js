import React, { useState, useEffect } from "react";
import PostPreview from "./PostPreview";

function Posts({user}) {
  const [posts, setPosts] = useState([]);

  console.log(user)

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/posts/1`)
      .then((r) => r.json())
      .then((posts) => setPosts(posts));
  }, []);

  let rendered_posts = posts.map((post) => (
    <PostPreview key={post.id} {...post} />
  ));

  return (
    <>
      <div id="feed-container">{rendered_posts}</div>
    </>
  );
}

export default Posts;
