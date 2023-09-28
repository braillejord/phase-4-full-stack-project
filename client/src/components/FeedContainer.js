import React, {useState, useEffect} from "react";
import PostPreview from "./PostPreview"

function FeedContainer() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5555/posts")
        .then(r => r.json())
        .then(posts => setPosts(posts))
    }, [])
    
    return (
        <>
            <div id="feed-container">
                {posts.map((post) => (
                    <PostPreview 
                    key={post.id}
                    {...post}
                    />
                ))}
            </div>
        </>
    )
}

export default FeedContainer;