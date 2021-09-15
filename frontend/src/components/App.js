import "/Users/lhommesanscoeur/github/P7-Groupomania/frontend/src/App.css";
import Banner from "/Users/lhommesanscoeur/github/P7-Groupomania/frontend/src/components/banner.js";
import "fontsource-roboto";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomePage from "../pages/home";
import ConnectForm from "../pages/login";
import CreateAccount from"../pages/signup";
import UserBoard from"../pages/userBoard";

import MultilineTextFields from "../pages/newArticle";
import PostComment from "../pages/newComment";

function App() {
  return (
    <HashRouter>
      <Banner />
      <Switch>
        
        <Route path="/newArticle" component={MultilineTextFields} />
        <Route path="/newComment" component={PostComment} />
        <Route path="/userBoard" component={UserBoard} />
        <Route path="/login" component={ConnectForm} />
        <Route path="/signup" component={CreateAccount} />
        <Route path="/" component={HomePage} />


      </Switch>
    </HashRouter>
  );
}

export default App;
