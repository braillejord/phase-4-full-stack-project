import React, { useState, useEffect } from "react";
import PostPreview from "./PostPreview";

function FeedContainer({user}) {
  const [posts, setPosts] = useState([]);
  const [viewMine, setViewMine] = useState(false)

  useEffect(() => {
    fetch("http://127.0.0.1:5555/posts")
      .then((r) => r.json())
      .then((posts) => setPosts(posts));
  }, []);

  let rendered_posts = posts.map((post) => (
    <PostPreview key={post.id} {...post} />
  ));

    console.log(posts)

  let mine = posts.filter((post) => {
    if (post.author === "BreElle Wells") {
      return true
    }
  })

  let my_posts = mine.map((post) => (
    <PostPreview key={post.id} {...post} />
  ));

  return (
    <>
      <button id="filter-by-mine" title="My Posts" onClick={() => setViewMine(!viewMine)}>
        <i class="ti ti-article"></i>
      </button>
      <div id="feed-container">{viewMine ? my_posts : rendered_posts}</div>
    </>
  );
}

export default FeedContainer;
