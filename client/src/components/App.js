import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import SideNav from "./TopNav";
import FeedContainer from "./FeedContainer";
import MyPosts from "./MyPosts";
import CreatePost from "./CreatePost";
import TopNav from "./TopNav";

function App() {
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5555/check-session")
  //   .then(r => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user))
  //     }
  //   })
  // }, [])

  function onLogin(user) {
    setUser(user)
    console.log(`User set to ${user.name}`)
  }

  function handleLogout() {
    setUser(null)
  }

  return (
    <div id="page">
        <Switch>
          <Route exact path="/login">
            <Login 
            onLogin={onLogin}
            />
          </Route>
          <Route exact path="/create-post">
            <TopNav
            handleLogout={handleLogout}
            />
            <CreatePost />
          </Route>
          <Route exact path="/my-posts">
          <TopNav
            handleLogout={handleLogout}
            />
            <MyPosts />
          </Route>
          <Route exact path="/">
          <TopNav
            handleLogout={handleLogout}
            />
            <FeedContainer />
          </Route>
          <Route path="*">
            <h1>404 Not Found</h1>
          </Route>
        </Switch>
    </div>
  )
}


// MAKE THIS A TOP NAV TOMORROW WITH CUTE BUTTONS AND BIGGER LOGO

export default App;
