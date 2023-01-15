import React from "react";
import Navbar from "./Nav/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Newsbody";
import AboutPage from "./About/AboutPage";
import ArticlesPage from "./Article/ArticlesPage.jsx";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignIn/SignUpSection";
import UserList from "./lists/usersList";
import UserEditScreen from "./EditScreens/userEditScreens";
import ArticleEditScreen from "./EditScreens/articleEditScreen";
import FullArticlePage from "./FullArticle/FullArticlePage";
import Profile from "./Profile/ProfileScreen";


function Body() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/articles" exact component={ArticlesPage} />
        <Route path="/articles/:id" component={FullArticlePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/register" component={SignUp} />
        <Route path="/profile" component={Profile} />
        <Route path="/admin/userlist" component={UserList} />
        <Route path="/admin/user/:userId/edit" component={UserEditScreen} />
        <Route
          path="/admin/article/edit"
          component={ArticleEditScreen}
        />
        <Route path="/search/:keyword" component={Home} />
      </Switch>
    </Router>
  );
}

export default Body;
