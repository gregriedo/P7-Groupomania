
import React from "react";
import "/Users/lhommesanscoeur/github/P7-Groupomania/frontend/src/styles/home.css";
import Link from '@material-ui/core/Link';
const Home = () => {
    return(
  
    <div className="container">
      <div className="text">
        <h1>Bienvenue Sur L'Application Groupomania !</h1>
        <h2>Ici Vous pouvez discuter pleinement avec vos collègues</h2>
        <h3>
          Pour cela il vous suffit simplement de vous connecter avec vos identifiants <br />
          <Link href="#/login">Ici</Link>
        </h3>
      </div>
      <p>
        Vous n'avez pas de compte ? Créez en un en cliquant</p> <Link href="#/signup">Ici</Link>
  
    </div>
  );
};

export default Home;
