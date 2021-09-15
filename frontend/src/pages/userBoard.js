import React, { useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import Link from "@material-ui/core/Link";

import Button from '@material-ui/core/Button';
import RecipeReviewCard from "/Users/lhommesanscoeur/github/P7-Groupomania/frontend/src/pages/article.js";
import "/Users/lhommesanscoeur/github/P7-Groupomania/frontend/src/styles/userBoard.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  roots: {
    "& > span": {
      margin: theme.spacing(2),
    },
  },
  grow: {
    flexGrow: 1,
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
 
}));

export default function PrimarySearchAppBar({ history }) {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));

  const [userR, setUserR] = useState([]);
  const id = user.userId;


  const deleteAccount = (e) =>{
    e.preventDefault();
    axios.delete(`http://localhost:3000/api/auth/${id}`)
    .then(() => {
      window.localStorage.clear();
      history.push("/home");
      window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
     
    }

  
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/auth/${id}`)
      .then((response) => {
        console.log(response.data);
        setUserR(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

 
  return (
    
      
       <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <div>{userR.username}</div>
          </Typography>
          
          
          
        
        </Toolbar>
      </AppBar>
      
   
      <div className="article">
        <RecipeReviewCard />
      </div>
      
      <footer>
      <div className="deleteButton">
          <Button className="button" onClick={deleteAccount} type="submit" variant="contained" color="secondary">Supprimer Compte</Button>
      </div>
      <div className="link">
          <Link color="primary" href="#/newArticle" className={classes.link}>
            Nouvel Article
          </Link>
      </div>    
      </footer>
    </div>
    
  );
}
