import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  input: {
    display: 'none',
  },
  
}));




 

export default function MultilineTextFields({ history }) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
 
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.userId;
  

  
  
  
  if(user){
    axios.defaults.headers.common['authorization'] = 'Bearer ' + user.token;
  }
  const createArticle = (e) => {
    e.preventDefault();
    
  

    axios
      .post("http://localhost:3000/api/article/", {
        title,
        message,
        user_id: id,
      })
      .then((response) => {
        console.log(response);
        history.replace("/userBoard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Titre"
          multiline
          rowsMax={4}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          
          id="standard-multiline-static"
          label="Message"
          multiline
          rows={4}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
      </div>
      
    
        
      <Button
        onClick={createArticle}
        type="submit"
        variant="contained"
        color="primary"
      >
        Publier
      </Button>
    </form>
  );
}
