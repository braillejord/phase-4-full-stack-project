import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import SideNav from "./TopNav";
import FeedContainer from "./FeedContainer";
import MyPosts from "./MyPosts";
import CreatePost from "./CreatePost";
import TopNav from "./TopNav";

function App() {
  return (
    <div id="page">
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/create-post">
            <TopNav />
            <CreatePost />
          </Route>
          <Route exact path="/my-posts">
            <TopNav />
            <MyPosts />
          </Route>
          <Route exact path="/">
            <TopNav />
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
