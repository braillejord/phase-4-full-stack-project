import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import SideNav from "./TopNav";
import FeedContainer from "./FeedContainer";
import Posts from "./PostDetail";
import CreatePost from "./CreatePost";
import TopNav from "./TopNav";
import About from "./About";
import Header from "./Header";
import SearchBar from "./SearchBar";
import PostDetail from "./PostDetail";
import EditPost from "./EditPost";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/check-session")
    .then(r => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  function onLogin(user) {
    setUser(user);
    console.log(`User set to ${user.name}`);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div id="page">
      <Switch>
        <Route exact path="/login">
          <Login onLogin={onLogin} />
        </Route>

        <Route exact path="/create-post">
          <Header>
            <TopNav handleLogout={handleLogout} />
            <CreatePost user={user}/>
          </Header>
        </Route>

        <Route exact path="/posts/:id/edit">
          <Header>
            <TopNav handleLogout={handleLogout} />
            <EditPost user={user}/>
          </Header>
        </Route>

        <Route exact path="/posts">
          <Header>
            <TopNav handleLogout={handleLogout} search={<SearchBar />} />
          </Header>
          <FeedContainer />
        </Route>

        <Route exact path="/posts/:id">
          <Header>
            <TopNav handleLogout={handleLogout} />
          </Header>
          <PostDetail user={user}/>
        </Route>

        <Route exact path="/">
          <Header>
            <TopNav handleLogout={handleLogout} />
          </Header>
          <About />
        </Route>

        <Route path="*">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

// MAKE THIS A TOP NAV TOMORROW WITH CUTE BUTTONS AND BIGGER LOGO

export default App;
